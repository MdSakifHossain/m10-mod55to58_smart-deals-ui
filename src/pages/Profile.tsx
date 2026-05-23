// @ts-nocheck
import LogoutButton from "@/components/my-components/LogoutButton"
import PageStructure from "@/components/my-components/PageStructure"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/contexts/AuthProvider"
import { getRandomAvatar } from "@/lib/getRandomAvatar"

export default function Profile() {
  const { loading, user } = useAuth()

  return (
    <PageStructure className="flex flex-col items-center justify-center gap-4">
      <UserProfile loading={loading} user={user} />
      <div className="grid min-w-md grid-cols-2 gap-4">
        <p className="rounded-md border px-1 py-1 text-sm">Delete Button</p>
        <LogoutButton />
      </div>
    </PageStructure>
  )
}

function UserProfile({ loading, user }) {
  if (loading) {
    return (
      <Card className="min-w-md">
        <CardContent>
          <div className="flex w-fit items-center gap-4">
            <Skeleton className="size-24 shrink-0 rounded-full" />
            <div className="grid gap-5">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-5 w-44" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="min-w-md">
      <CardContent>
        <div className="flex w-fit items-center gap-4">
          <img
            src={user.photoURL || getRandomAvatar().url}
            alt="Profile"
            className="size-24 rounded-full border"
          />
          <div className="grid gap-2">
            <h3 className="text-2xl font-semibold">
              {user.displayName || `Null`}
            </h3>
            <p className="text-sm text-muted-foreground">
              someone@something.test
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
