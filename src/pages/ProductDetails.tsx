// @ts-nocheck
import PageStructure from "@/components/my-components/PageStructure"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  IconArrowNarrowLeftDashed,
  IconCheck,
  IconTrashFilled,
} from "@tabler/icons-react"
import { Link, useLoaderData } from "react-router"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/AuthProvider"

export default function ProductDetails() {
  const [bids, setBids] = useState([])
  const [bidsTrigger, setBidsTrigger] = useState(0)
  const { product, seller_info, error } = useLoaderData()

  useEffect(() => {
    const doTheThing = async () => {
      try {
        const { data: apiRes } = await api.get(`/products/${product._id}/bids`)
        setBids(apiRes)
        setBidsTrigger((prev) => prev + 1)
        console.log(apiRes)
      } catch (err) {
        console.error(err)
        alert("Something Went Wrong while getting All Bids")
      }
    }
    doTheThing()
  }, [product._id, bidsTrigger])

  if (error) {
    return (
      <div className="flex h-[80svh] items-center justify-center">
        <Empty className="h-full">
          <EmptyHeader>
            <EmptyTitle>{error.status} - Not Found</EmptyTitle>
            <EmptyDescription>{error.message}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <EmptyDescription>
              Need help? <a href="#">Go Home</a>
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      </div>
    )
  }

  return (
    <PageStructure className="grid grid-cols-1 gap-20">
      <div className="grid grid-cols-7 gap-10">
        <LeftSide>
          <div className="flex h-[50svh] w-full items-center justify-center">
            <img
              src={product ? product?.image : "https://placehold.co/1280x720"}
              alt="Product Image"
              className="w-6/12 rounded-2xl"
            />
          </div>
          <DescriptionCard product={product} />
        </LeftSide>

        <RightSide>
          <NavNameAndBadge product={product} />
          <StartingPriceCard product={product} />
          <ProductIdAndPostedOnCard product={product} />
          <SellerInfoCard sellerInfo={seller_info} product={product} />

          <BiddingDialogue product={product}>
            <Button size="lg" className="text-base font-semibold">
              I want Buy This Product
            </Button>
          </BiddingDialogue>
        </RightSide>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <h2 className="text-5xl">
          Bids For This Product:{" "}
          <span className="text-primary">{bids.length}</span>
        </h2>

        {bids.length > 0 && <ProductsTable bids={bids} />}
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

function DescriptionCard({ product }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Product Description</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-base font-bold">
        <p>
          <span className="text-primary">Condition: </span>
          <span className="capitalize">{product.condition}</span>
        </p>

        {product?.usage && (
          <p>
            <span className="text-primary">Usage Time: </span> {product?.usage}
          </p>
        )}
      </CardContent>

      <CardFooter className="text-muted-foreground">
        {product?.description}
      </CardFooter>
    </Card>
  )
}

function NavNameAndBadge({ product }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <Link
        to="/all-products"
        className={buttonVariants({ variant: "outline" })}
      >
        <IconArrowNarrowLeftDashed />
        Back to Products
      </Link>
      <p className="text-5xl">{product?.title}</p>
      <Badge variant="outline" className="rounded-full">
        {product?.category}
      </Badge>
    </div>
  )
}

function StartingPriceCard({ product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          ${product.price_min}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base">Price starts from here.</p>
      </CardContent>
    </Card>
  )
}

function ProductIdAndPostedOnCard({ product }) {
  const isoString = product.created_at
  const date = new Date(isoString)
  const day = date.getUTCDate().toString().padStart(2, "0")
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0")
  const year = date.getUTCFullYear()
  const formattedDate = `${day}/${month}/${year}`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-normal">Product Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="font-base">
          <span className="font-semibold">Product ID:</span>
          {product._id}
        </p>
        <p className="font-base">
          <span className="font-semibold">Posted:</span> {formattedDate}
        </p>
      </CardContent>
    </Card>
  )
}

function SellerInfoCard({ sellerInfo, product }) {
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
            <AvatarImage src={sellerInfo.user_image} />
            <AvatarFallback>{sellerInfo.user_name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{sellerInfo.user_name}</p>
            <p className="text-muted-foreground">{sellerInfo.user_email}</p>
          </div>
        </div>

        {/* Location, Contact, Status */}
        <div className="flex flex-col gap-3">
          <p>
            Location:{" "}
            {sellerInfo.user_location
              ? sellerInfo.user_location
              : "Not Specified"}
          </p>
          <p>Contact: {sellerInfo.user_email}</p>
          <p>
            Status:{" "}
            <Badge
              variant="outline"
              className="rounded-full border-amber-600 text-amber-600"
            >
              {product.status === "pending" && "On Sale"}
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductsTable({ bids }) {
  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="*:text-center">
            <TableHead>SL No</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Bid Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bids?.map((bid, i) => (
            <TableRow className="*:text-center" key={bid._id}>
              <TableCell>{i + 1}</TableCell>

              <TableCell className="flex justify-center">
                <div className="flex items-center justify-center gap-3">
                  <Avatar>
                    <AvatarImage
                      alt="Sara Chen"
                      src="https://github.com/shadcn.png"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <p>Sara Chen</p>
                    <p className="text-muted-foreground">
                      crafts.by.sara@shop.net
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>${bid.bid_price}</TableCell>

              <TableCell>
                <div className="grid grid-cols-2 gap-4">
                  <Button>
                    <IconCheck />
                    {/* Accept */}
                  </Button>
                  <Button variant="destructive">
                    <IconTrashFilled />
                    {/* Reject */}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function BiddingDialogue({ product, children }) {
  const [bidPrice, setBidPrice] = useState(null)
  const [dialogueOpen, setDialogueOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useAuth()
  const minValue = product.price_min

  const handleChange = (e) => setBidPrice(parseInt(e.target.value, 10))

  const handleSubmit = async (e) => {
    e.preventDefault()

    // logic
    if (bidPrice < minValue) {
      return alert(`Bidding Price cant be less than ${minValue}`)
    }

    // go for api call
    try {
      setIsSubmitting(true)

      const newBid = {
        buyer_id: user.dbUser._id,
        product_id: product._id,
        bid_price: bidPrice,
      }

      await api.post("/bids", newBid)
      setDialogueOpen(false)
    } catch (err) {
      console.error(err)
      alert(err.message || "Something went wrong while placing Bid")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AlertDialog open={dialogueOpen} onOpenChange={setDialogueOpen}>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Give Seller Your Offered Price</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <FieldWithTilte
            id="bidding_price"
            label={`Place your Price (Minimum ${minValue})`}
          >
            <Input
              id="bidding_price"
              placeholder={`Minimum ${minValue}`}
              type="number"
              className="px-5 py-6"
              required
              name="bidding_price"
              onChange={handleChange}
            />
          </FieldWithTilte>

          <Input
            type="submit"
            className={buttonVariants({ variant: "default" })}
            disabled={(bidPrice < minValue ? true : false) || isSubmitting}
          />
        </form>
        <AlertDialogFooter className="-mt-4">
          <AlertDialogCancel className="w-full" disabled={isSubmitting}>
            Cancel
          </AlertDialogCancel>
          {/* <AlertDialogAction>Submit Bid</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Helper
// function TwoColGrid({ children }) {
//   return <Field className="grid grid-cols-2 gap-5">{children}</Field>
// }

// Helper
function FieldWithTilte({ id, label = "Label is REQUIRED", children }) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
    </Field>
  )
}
