// @ts-nocheck
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router"

import { IconSearch } from "@tabler/icons-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

// * -+-+-+-+-+-+--- \
// * ---- Config ---- >
// * -+-+-+-+-+-+--- /

const config = {
  // Heading and Description
  heading: "Deal your Products in a Smart way!",
  description:
    "SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!",

  // CTAs
  buttons: {
    btn1: {
      text: "Discover Products",
      url: "/all-products",
    },
    btn2: {
      text: "Post Product",
      url: "/create-product",
    },
  },

  // Search Input
  searchBox: {
    placeholder: "search For Products, Categoriees...",
    buttonText: "Search",
  },
}

export default function HeroSection({ className }) {
  return (
    <section
      className={cn(
        "container mx-auto flex flex-col items-center gap-8 py-32 text-center",
        className
      )}
    >
      {/* title && subtitle */}
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <h1 className="text-3xl font-semibold lg:text-6xl">{config.heading}</h1>
        <p className="text-balance text-muted-foreground lg:text-lg">
          {config.description}
        </p>
      </div>

      {/* buttons */}
      <CTAs config={config.buttons} />

      {/* search box */}
      <SearchInputGroup config={config.searchBox} />
    </section>
  )
}

function CTAs({ config }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link
        to={config.btn1.url}
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        {config.btn1.text}
      </Link>
      <Link
        to={config.btn2.url}
        className={
          buttonVariants({ variant: "outline", size: "lg" }) +
          "border! border-primary! text-primary"
        }
      >
        {config.btn2.text}
      </Link>
    </div>
  )
}

function SearchInputGroup({ config }) {
  return (
    <div className="mx-auto grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder={config.placeholder} readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={config.buttonText}
            title={config.buttonText}
            size="icon-xs"
            variant="ghost"
            onClick={() => {
              // doSomething()
            }}
          >
            <IconSearch />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
