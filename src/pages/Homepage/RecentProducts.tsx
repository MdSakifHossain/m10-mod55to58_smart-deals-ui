// @ts-nocheck
import { Link } from "react-router"
import { cn } from "@/lib/utils"
import { IconArrowRightDashed } from "@tabler/icons-react"
import { buttonVariants } from "@/components/ui/button"
import ProductCard from "@/components/my-components/ProductCard"

export default function RecentProducts({ className }) {
  return (
    <section className={cn("flex flex-col items-center gap-10", className)}>
      <h2 className="text-5xl">Recent Products</h2>

      {/* 3x2 grid */}
      <div className="grid w-full max-w-6xl grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ProductCard badge={true} key={i} />
        ))}
      </div>

      <Link
        to="/all-products"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        Show All
        <IconArrowRightDashed />
      </Link>
    </section>
  )
}
