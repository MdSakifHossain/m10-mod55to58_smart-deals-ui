// @ts-nocheck
import { useAuth } from "@/contexts/AuthProvider"
import { Spinner } from "@/components/ui/spinner"
import { Navigate } from "react-router"

const PrivatePage = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="flex items-center justify-center gap-4 text-3xl">
          Loading.. <Spinner className="size-8" />
        </p>
      </div>
    )
  }

  if (user) return children

  return <Navigate to={`/login`} />
}

export default PrivatePage
