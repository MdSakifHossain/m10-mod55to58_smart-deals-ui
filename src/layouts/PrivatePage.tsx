// @ts-nocheck
import { useAuth } from "@/contexts/AuthProvider"
import { Spinner } from "@/components/ui/spinner"
import { Navigate } from "react-router"

const PrivatePage = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <p>
        Loading... <Spinner />
      </p>
    )
  }

  if (user) return children

  return <Navigate to={`/login`} />
}

export default PrivatePage
