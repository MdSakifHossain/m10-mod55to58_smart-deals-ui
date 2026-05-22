// @ts-nocheck
import React, { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"
import { auth } from "@/firebase/firebase.init"

const AuthProvider = ({ children }) => {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(
          `[Firebase] Logged In - ${currentUser.providerData[0].providerId.replace(
            ".com",
            ""
          )} 🐬🐢🦭`
        )
      } else {
        console.log("[Firebase] Logged Out - 🕊️")
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
  }

  return <AuthContext value={authContextValues}>{children}</AuthContext>
}

export default AuthProvider
