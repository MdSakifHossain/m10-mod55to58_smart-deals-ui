import PageStructure from "@/components/my-components/PageStructure"
import { Button, buttonVariants } from "@/components/ui/button"
import { IconArrowNarrowLeftDashed } from "@tabler/icons-react"
import { Link } from "react-router"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProductDetails() {
  return (
    <PageStructure className="grid grid-cols-1 gap-20">
      <div className="grid grid-cols-7 gap-10">
        <LeftSide>
          <img src="https://placehold.co/1280x720" alt="Product Image" />
          <DescriptionCard />
        </LeftSide>

        <RightSide>
          <NavNameAndBadge />
          <StartingPriceCard />
          <ProductIdAndPostedOnCard />
          <SellerInfoCard />
          <Button size="lg" className="text-base font-semibold">
            I want Buy This Product
          </Button>
        </RightSide>
      </div>
    </PageStructure>
  )
}

function LeftSide({ children }) {
  return <div className="col-span-3 flex flex-col gap-8">{children}</div>
}

function RightSide({ children }) {
  return <div className="col-span-4 flex flex-col gap-6">{children}</div>
}

function DescriptionCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Product Description</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-base font-bold">
        <p>
          <span className="text-primary">Condition: </span> New
        </p>

        <p>
          <span className="text-primary">Usage Time: </span> 3 Month
        </p>
      </CardContent>
      <CardFooter className="text-muted-foreground">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </CardFooter>
    </Card>
  )
}

function NavNameAndBadge() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link
        to="/all-products"
        className={buttonVariants({ variant: "outline" })}
      >
        <IconArrowNarrowLeftDashed />
        Back to Products
      </Link>
      <p className="text-5xl">Yamaha Fz Guitar For Sale</p>
      <Badge variant="outline" className="rounded-full">
        Art and Hobbies
      </Badge>
    </div>
  )
}

function StartingPriceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">$22.5 - $30</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base">Price starts from here.</p>
      </CardContent>
    </Card>
  )
}

function ProductIdAndPostedOnCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-normal">Product Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="font-base">
          <span className="font-semibold">Product ID:</span>{" "}
          68f753ae2174ca368ec882f4
        </p>
        <p className="font-base">
          <span className="font-semibold">Posted:</span> 10/19/2024
        </p>
      </CardContent>
    </Card>
  )
}

function SellerInfoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-normal">
          Seller Information
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* seller handle */}
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Sara Chen</p>
            <p className="text-muted-foreground">crafts.by.sara@shop.net</p>
          </div>
        </div>

        {/* Location, Contact, Status */}
        <div className="flex flex-col gap-3">
          <p>Location: Los Angeles, CA</p>
          <p>Contact: sara.chen_contact</p>
          <p>
            Status:{" "}
            <Badge
              variant="outline"
              className="rounded-full border-amber-600 text-amber-600"
            >
              on sale
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
