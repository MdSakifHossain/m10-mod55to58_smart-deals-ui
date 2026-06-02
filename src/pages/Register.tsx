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
import { getRandomAvatar } from "@/lib/getRandomAvatar"

export default function Register() {
  return (
    <PageStructure className="flex w-full flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </PageStructure>
  )
}

function SignupForm({ className, ...props }) {
  const { createUserWithEmail, updateUserProfile } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const { email, password, confirmPassword, displayName } =
      Object.fromEntries(formData.entries())

    if (password !== confirmPassword) {
      return console.error(
        `[Firebase] Password && confirmPassword Must be Same`
      )
    }

    try {
      await createUserWithEmail(email, password)
      await updateUserProfile({
        displayName,
        photoURL: getRandomAvatar().url,
      })
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* top part */}
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* left part */}
          <form className="p-6 md:p-8" onSubmit={(e) => handleSubmit(e)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>

              {/* email field */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              {/* Display Name */}
              <Field>
                <FieldLabel htmlFor="displayName">Display Name</FieldLabel>
                <Input
                  id="displayName"
                  type="text"
                  name="displayName"
                  placeholder="Your Name"
                  required
                />
              </Field>

              {/* Passowrd and confirm password */}
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      name="confirmPassword"
                      required
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit">Create Account</Button>
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
                Already have an account? <Link to="/login">Log in</Link>
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

      {/* bottom part */}
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
