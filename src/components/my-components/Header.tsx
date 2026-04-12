import { buttonVariants } from "@/components/ui/button"
import { Link, NavLink } from "react-router"
import { IconLogin2, IconUserPlus } from "@tabler/icons-react"

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
    to: "/create-products",
  },
]

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-20 py-4">
      {/* left */}
      <Link to="/" className="text-3xl font-bold">
        Smart<span className="text-primary">Deals</span>
      </Link>

      {/* middle */}
      <ul className="flex items-center gap-6 text-sm">
        {nav_links.map((link, index) => (
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
        <Link
          to="/register"
          className={buttonVariants({ size: "default" }) + ""}
        >
          Register
          <IconUserPlus />
        </Link>
      </div>
    </header>
  )
}
