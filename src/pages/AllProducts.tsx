import PageStructure from "@/components/my-components/PageStructure"
import ProductCard from "@/components/my-components/ProductCard"
import { api } from "@/lib/api"
import { useEffect, useState } from "react"
import { IconBuildingStore, IconRefresh } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function AllProducts() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const doTheThing = async () => {
      try {
        const { data: apiRes } = await api.get("/products")
        setProducts(apiRes)
      } catch (err) {
        console.error(err)
        alert("Something Went Wrong while getting All Products")
      }
    }
    doTheThing()
  }, [refreshTrigger])
  return (
    <PageStructure className="flex flex-col items-center gap-10">
      <h2 className="text-5xl">All Products</h2>

      {/* No Product State */}
      {products.length === 0 && (
        <div className="h-[70svh]">
          <Empty className="h-full bg-muted/30">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconBuildingStore stroke={2} />
              </EmptyMedia>
              <EmptyTitle>No Products</EmptyTitle>
              <EmptyDescription className="max-w-xs text-pretty">
                You&apos;re all caught up. New notifications will appear here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                variant="outline"
                onClick={() => setRefreshTrigger((prev) => prev + 1)}
              >
                <IconRefresh stroke={2} />
                Refresh
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      )}

      {/* Product.lenght > 0 */}
      {products.length > 0 && (
        <div className="grid w-full max-w-6xl grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard badge={true} key={product._id} product={product} />
          ))}
        </div>
      )}
    </PageStructure>
  )
}
