// @ts-nocheck
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthProvider"
import { IconTrash } from "@tabler/icons-react"
import { useNavigate } from "react-router"

const DeleteAccountButton = () => {
  const { deleteAccount } = useAuth()
  const navigate = useNavigate()

  const handleButtonPress = () => {
    deleteAccount()
    navigate("/")
  }

  return (
    <Button variant="destructive" onClick={() => handleButtonPress()}>
      <IconTrash stroke={2} />
      Delete Account
    </Button>
  )
}

export default DeleteAccountButton
