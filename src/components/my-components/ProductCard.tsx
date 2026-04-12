import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const ProductCard = ({ badge }) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 shadow-md">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader className="grid gap-2.5">
        <CardAction>
          {badge && (
            <Badge
              variant="outline"
              className="rounded-full border-primary text-primary"
            >
              Featured
            </Badge>
          )}
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription className="text-sm font-medium dark:text-primary">
          $55.99 - $75
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-0">
        <Button
          className="w-full border-primary text-primary"
          variant="outline"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
