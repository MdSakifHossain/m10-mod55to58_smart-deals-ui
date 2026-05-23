// @ts-nocheck
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthProvider"
import { IconLogout } from "@tabler/icons-react"
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
      <IconLogout stroke={2} />
      Log Out
    </Button>
  )
}

export default LogoutButton
