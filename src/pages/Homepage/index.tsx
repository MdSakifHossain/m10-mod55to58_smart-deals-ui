import PageStructure from "@/components/my-components/PageStructure"
import HeroSection from "./HeroSection"
import { Link } from "react-router"
import { buttonVariants } from "@/components/ui/button"

export default function Homepage() {
  return (
    <PageStructure>
      <HeroSection />

      {/* Cards Section */}
      <section className="flex flex-col items-center gap-10">
        <h2 className="text-5xl">Recent Products</h2>
        <div className="grid w-full grid-cols-3 gap-6 *:border *:py-16 *:text-center">
          {[...Array(6)].map((_, i) => (
            <p key={i}>3 col x 2 row</p>
          ))}
        </div>
        <Link
          to="/all-products"
          className={buttonVariants({ variant: "default", size: "lg" })}
        >
          Show All
        </Link>
      </section>
    </PageStructure>
  )
}
