// @ts-nocheck
import { Button } from "@/components/ui/button"
import { IconTrash } from "@tabler/icons-react"

const DeleteAccountButton = () => {
  const handleButtonPress = () => {
    console.log(`[Delete] Button Pressed`)
  }

  return (
    <Button variant="destructive" onClick={() => handleButtonPress()}>
      <IconTrash stroke={2} />
      Delete Account
    </Button>
  )
}

export default DeleteAccountButton
