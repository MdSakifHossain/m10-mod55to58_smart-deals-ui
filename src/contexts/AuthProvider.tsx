// @ts-nocheck
import React, { createContext, useState, useEffect, useContext } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth"
import { auth } from "@/firebase/firebase.init"
import axios from "axios"
import logger from "@/lib/logger"

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUserWithEmail = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const loginWithEmail = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOutUser = () => {
    setLoading(true)
    return signOut(auth)
  }

  const syncUserToDB = async (user) => {
    const userData = {
      firebase_uid: user.uid,
      user_name: user.displayName,
      user_image: user.photoURL,
      user_location: null,
      user_phone: user.phoneNumber,
      user_email: user.email,
    }

    try {
      await axios.post("http://localhost:3000/users", userData)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteAccount = async () => {
    setLoading(true)
    try {
      const userUid = auth.currentUser.uid
      await deleteUser(auth.currentUser)
      await axios.delete(`http://localhost:3000/users/${userUid}`)
      logger("[Firebase] Account Deletion Complete")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        logger("[Firebase] User Logged In")
        await syncUserToDB(currentUser)
      } else {
        logger("[Firebase] User Logged Out")
      }

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
