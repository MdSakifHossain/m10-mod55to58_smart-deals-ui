// @ts-nocheck
import { Link } from "react-router"
import { cn } from "@/lib/utils"
import { IconArrowRightDashed } from "@tabler/icons-react"
import { buttonVariants } from "@/components/ui/button"
import ProductCard from "@/components/my-components/ProductCard"

export default function RecentProducts({
  className,
  products,
  loading,
  error,
}) {
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <section className={cn("flex flex-col items-center gap-10", className)}>
      <h2 className="text-5xl">Recent Products</h2>

      {/* 3x2 grid */}
      <div className="grid w-full max-w-6xl grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard badge={false} key={product._id} product={product} />
        ))}
      </div>

      <Link
        to="/all-products"
        className={`${buttonVariants({ variant: "default", size: "lg" })} px-8`}
      >
        Show All
        <IconArrowRightDashed />
      </Link>
    </section>
  )
}
