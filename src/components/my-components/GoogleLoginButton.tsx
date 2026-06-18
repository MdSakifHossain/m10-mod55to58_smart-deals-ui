// @ts-nocheck
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthProvider"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import { useNavigate } from "react-router"

const GoogleLoginButton = () => {
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await loginWithGoogle()
      navigate(`/`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      className="flex items-center justify-center gap-3"
      onClick={() => handleClick()}
    >
      <IconBrandGoogleFilled className="size-5" />
      <span>Continue with Google</span>
    </Button>
  )
}

export default GoogleLoginButton
