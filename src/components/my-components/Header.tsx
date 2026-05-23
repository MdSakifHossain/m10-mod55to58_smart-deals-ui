// @ts-nocheck
import { Link, NavLink } from "react-router"
import { IconLogin2, IconUser } from "@tabler/icons-react"
import { useAuth } from "@/contexts/AuthProvider"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { buttonVariants } from "../ui/button"

const nav_links = [
  {
    text: "Home",
    to: "/",
    private: false,
  },
  {
    text: "All Products",
    to: "/all-products",
    private: false,
  },
  {
    text: "My Products",
    to: "/my-products",
    private: true,
  },
  {
    text: "My Bids",
    to: "/my-bids",
    private: true,
  },
  {
    text: "Create Product",
    to: "/create-product",
    private: true,
  },
]

export const Header = () => {
  const { user, loading } = useAuth()

  const filteredLinks = nav_links.filter((link) => {
    if ((link.private === true && user) || link.private === false) return true

    return false
  })

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
          : filteredLinks.map((link, index) => (
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
          <Skeleton className="size-10 rounded-full" />
        ) : user ? (
          <Link to="/profile" title="Open Profile">
            <Avatar size="lg">
              <AvatarImage src={user.photoURL} />
              <AvatarFallback>
                <IconUser stroke={2} className="size-5" />
              </AvatarFallback>
              <AvatarBadge className="bg-primary" />
            </Avatar>
          </Link>
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
