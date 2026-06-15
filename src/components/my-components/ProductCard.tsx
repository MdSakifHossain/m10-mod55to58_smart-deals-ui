import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Link } from "react-router"

const ProductCard = ({ badge, product }) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 shadow-md">
      <div className="absolute inset-0 z-30 aspect-video bg-black/15" />
      <img
        src={
          product?.image ? product?.image : "https://avatar.vercel.sh/shadcn1"
        }
        alt="Product Image"
        className="relative z-20 aspect-video w-full object-cover dark:brightness-80"
      />
      <CardHeader className="grid gap-2.5">
        <CardAction>
          {badge && (
            <Badge
              variant="outline"
              className="rounded-full border-primary text-primary"
            >
              {product?.condition}
            </Badge>
          )}
        </CardAction>
        <CardTitle>{product?.title}</CardTitle>
        <CardDescription className="text-base font-medium dark:text-primary">
          ${product?.price_min}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto border-0">
        <Link
          to={`/product-details/${product?._id}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full border-primary text-primary"
          )}
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
