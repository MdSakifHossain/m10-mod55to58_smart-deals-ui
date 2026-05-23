import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthProvider"
import { IconRun } from "@tabler/icons-react"

const LogoutButton = () => {
  const { logOutUser } = useAuth()

  return (
    <Button variant="destructive" onClick={() => logOutUser()}>
      Log Out
      <IconRun stroke={2} />
    </Button>
  )
}

export default LogoutButton
