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

  const createUserWithEmail = async (email, password) => {
    setLoading(true)

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await api.post("/users", {
        firebase_uid: result?.user?.uid,
        user_name: result?.user?.displayName,
        user_image: result?.user?.photoURL,
        user_location: null,
        user_phone: result?.user?.phoneNumber,
        user_email: result?.user?.email,
      })
      return result
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

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

  const deleteAccount = async () => {
    setLoading(true)
    const userUID = auth.currentUser.uid
    try {
      // delete user form DB first with api.delete() then delete from Firebase
      await api.delete(`/users/${userUID}`)
      await deleteUser(auth.currentUser)
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

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

  const loginWithGoogle = async () => {
    setLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)

      let exists = true

      try {
        const dbUser = await api.get(`/users/firebase/${result.user.uid}`)

        exists = !!dbUser.data
      } catch (err) {
        exists = false
      }

      if (!exists) {
        await api.post("/users", {
          firebase_uid: result.user.uid,
          user_name: result.user.displayName,
          user_image: result.user.photoURL,
          user_location: null,
          user_phone: result.user.phoneNumber,
          user_email: result.user.email,
        })
      }

      return result
    } catch (err) {
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // if (currentUser) {
      //   logger("[Firebase] User Logged In")
      // } else {
      //   logger("[Firebase] Not Logged In")
      // }

      setUser(currentUser)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const authContextValues = {
    user,
    loading,
    createUserWithEmail,
    loginWithEmail,
    logOutUser,
    deleteAccount,
    updateUserProfile,
    loginWithGoogle,
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
