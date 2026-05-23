// @ts-nocheck
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthProvider"
import { IconRun } from "@tabler/icons-react"
import { useNavigate } from "react-router"

const LogoutButton = () => {
  const { logOutUser } = useAuth()
  const navigate = useNavigate()

  const handleButtonPress = () => {
    logOutUser()
    navigate("/")
  }

  return (
    <Button variant="destructive" onClick={() => handleButtonPress()}>
      Log Out
      <IconRun stroke={2} />
    </Button>
  )
}

export default LogoutButton
