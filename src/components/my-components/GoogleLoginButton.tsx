import { Button } from "@/components/ui/button"
import { IconBrandGoogleFilled } from "@tabler/icons-react"

const GoogleLoginButton = () => {
  return (
    <Button
      variant="outline"
      type="button"
      className="flex items-center justify-center gap-3"
    >
      <IconBrandGoogleFilled className="size-5" />
      <span>Continue with Google</span>
    </Button>
  )
}

export default GoogleLoginButton
