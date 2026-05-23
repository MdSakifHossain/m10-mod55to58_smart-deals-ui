// @ts-nocheck
import { Button, buttonVariants } from "@/components/ui/button"
import { Link, NavLink } from "react-router"
import { IconLogin2, IconRun } from "@tabler/icons-react"
import { useAuth } from "@/contexts/AuthProvider"
import { Skeleton } from "@/components/ui/skeleton"

const nav_links = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "All Products",
    to: "/all-products",
  },
  {
    text: "My Products",
    to: "/my-products",
  },
  {
    text: "My Bids",
    to: "/my-bids",
  },
  {
    text: "Create Product",
    to: "/create-product",
  },
]

export const Header = () => {
  const { user, logOutUser, loading } = useAuth()

  return (
    <header className="flex items-center justify-between px-20 py-4">
      {/* left */}
      <Link to="/" className="text-3xl font-bold">
        Smart<span className="text-primary">Deals</span>
      </Link>

      {/* middle */}
      <ul className="flex items-center gap-6 text-sm">
        {loading
          ? nav_links.map((_, index) => (
              <Skeleton key={index} className="h-5 w-21" />
            ))
          : nav_links.map((link, index) => (
              <li key={index}>
                <NavLink
                  className="pb-0.5 hover:border-b hover:border-primary"
                  to={link.to}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
      </ul>

      {/* right */}
      <div className="flex gap-4">
        {loading ? (
          <Skeleton className="h-8.5 w-25.5 rounded-md" />
        ) : user ? (
          <Button variant="destructive" onClick={() => logOutUser()}>
            Log Out
            <IconRun stroke={2} />
          </Button>
        ) : (
          <Link
            to="/login"
            className={
              buttonVariants({ variant: "outline", size: "default" }) +
              "border! border-primary! text-primary"
            }
          >
            <IconLogin2 />
            Login
          </Link>
        )}
      </div>
    </header>
  )
}
