// @ts-nocheck
import React, { createContext, useState, useEffect, useContext } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@/firebase.init"
import { api } from "@/lib/api"

const AuthContext = createContext(undefined)

const googleProvider = new GoogleAuthProvider()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // -------------------------
  // DB helper (single source of truth)
  // -------------------------
  const ensureUserInDB = async (firebaseUser) => {
    try {
      const res = await api.get(`/users/firebase/${firebaseUser.uid}`)
      if (res.data) return res.data
    } catch {
      // just ignore this shit. i dont have to do any clg or something like this
    }

    const newUser = {
      firebase_uid: firebaseUser.uid,
      user_name: firebaseUser.displayName,
      user_image: firebaseUser.photoURL,
      user_location: null,
      user_phone: firebaseUser.phoneNumber,
      user_email: firebaseUser.email,
    }

    await api.post("/users", newUser)

    const { data: createdUser } = await api.get(
      `/users/firebase/${firebaseUser.uid}`
    )

    return createdUser
  }

  // -------------------------
  // EMAIL SIGNUP
  // -------------------------
  const createUserWithEmail = async (email, password) => {
    setLoading(true)

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // EMAIL LOGIN
  // -------------------------
  const loginWithEmail = async (email, password) => {
    setLoading(true)

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // GOOGLE LOGIN (clean)
  // -------------------------
  const loginWithGoogle = async () => {
    setLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)

      return result
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // LOGOUT
  // -------------------------
  const logOutUser = async () => {
    setLoading(true)

    try {
      return await signOut(auth)
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // DELETE ACCOUNT
  // -------------------------
  const deleteAccount = async () => {
    setLoading(true)

    try {
      const uid = auth.currentUser.uid

      await api.delete(`/users/${uid}`)
      await deleteUser(auth.currentUser)
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // UPDATE PROFILE
  // -------------------------
  const updateUserProfile = async (updateInfo) => {
    setLoading(true)

    try {
      await updateProfile(auth.currentUser, updateInfo)

      await api.patch(`/users/${auth.currentUser.uid}`, {
        user_name: updateInfo.displayName,
        user_image: updateInfo.photoURL,
      })
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // -------------------------
  // AUTH STATE LISTENER
  // -------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null)
        setLoading(false)
        return
      }

      const dbUser = await ensureUserInDB(currentUser)

      setUser({
        firebaseUser: currentUser,
        dbUser,
      })
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // -------------------------
  // CONTEXT VALUE
  // -------------------------
  const authContextValues = {
    user,
    loading,
    createUserWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logOutUser,
    deleteAccount,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context)
    throw new Error(
      "AuthContext is Missing. Place the Provider on the Main Tree"
    )

  return context
}
