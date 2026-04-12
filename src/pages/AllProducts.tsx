import PageStructure from "@/components/my-components/PageStructure"
import ProductCard from "@/components/my-components/ProductCard"

export default function AllProducts() {
  return (
    <PageStructure className="flex flex-col items-center gap-10">
      <h2 className="text-5xl">All Products</h2>

      <div className="grid w-full max-w-6xl grid-cols-3 gap-6">
        {[...Array(12)].map((_, i) => (
          <ProductCard badge={true} key={i} />
        ))}
      </div>
    </PageStructure>
  )
}
