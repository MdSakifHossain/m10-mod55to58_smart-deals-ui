// @ts-nocheck
import PageStructure from "@/components/my-components/PageStructure"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "@/contexts/AuthProvider"

export default function Login() {
  return (
    <PageStructure className="flex w-full flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </PageStructure>
  )
}

function LoginForm({ className, ...props }) {
  const { loginWithEmail } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData.entries())

    try {
      await loginWithEmail(email, password)
      navigate("/")
    } catch (err) {
      console.error(err)
      alert(err)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* left part */}
          <form className="p-6 md:p-8" onSubmit={(e) => handleSubmit(e)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-xs underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  className="flex items-center justify-center gap-3"
                >
                  <IconBrandGoogleFilled className="size-5" />
                  <span>Sign-In with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/register">Register</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* right part */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://images.unsplash.com/photo-1664455340023-214c33a9d0bd"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
