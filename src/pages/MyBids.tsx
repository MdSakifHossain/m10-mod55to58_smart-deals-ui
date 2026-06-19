// @ts-nocheck
import PageStructure from "@/components/my-components/PageStructure"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconTrashFilled } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/AuthProvider"

export default function MyBids() {
  const [myBids, setMyBids] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const userID = user?.dbUser?._id
    const doTheThing = async () => {
      try {
        if (userID) {
          const { data: apiRes } = await api.get(`/my_bids?user_id=${userID}`)
          setMyBids(apiRes)
        }
      } catch (err) {
        console.error(err)
        alert("something went wrong getting MY BIDS")
      }
    }
    doTheThing()
  }, [user])

  return (
    <PageStructure className="flex flex-col items-center gap-10 pb-28">
      <h2 className="text-5xl">My Bids: {myBids.length}</h2>

      {myBids.length > 0 ? (
        <ProductsTable bids={myBids} />
      ) : (
        <div className="flex min-h-[60svh] flex-col items-center justify-center">
          <p className="text-2xl text-muted-foreground">No Bids</p>
        </div>
      )}
    </PageStructure>
  )
}

function ProductsTable({ bids }) {
  console.log(bids)
  return (
    <div className="w-full max-w-7xl rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow className="*:text-center">
            <TableHead>SL No</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Bid Price</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bids?.map((bid, i) => (
            <TableRow className="*:text-center" key={i}>
              <TableCell>{i + 1}</TableCell>

              <TableCell className="flex gap-3">
                <img
                  src={bid.product.image || "https://placehold.co/1280x720"}
                  alt={bid.product.title || "Product Image"}
                  className="w-12"
                />
                <div className="flex flex-col items-start">
                  <p>
                    {bid.product.title.toString().length < 30
                      ? bid.product.title.toString().slice(0, 30)
                      : bid.product.title}
                  </p>
                  <p className="text-muted-foreground">
                    ${bid.product.price_min}
                  </p>
                </div>
              </TableCell>

              <TableCell>${bid.bid_price}</TableCell>

              <TableCell className="flex items-center justify-center gap-3">
                <Avatar>
                  <AvatarImage
                    alt={bid.product.seller.user_name}
                    src={bid.product.seller.user_image}
                  />
                  <AvatarFallback>
                    {bid.product.seller.user_name.toString().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <p>{bid.product.seller.user_name}</p>
                  <p className="text-muted-foreground">
                    {bid.product.seller.user_email}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className="rounded-full border-amber-600 text-amber-600"
                >
                  {bid.status}
                </Badge>
              </TableCell>

              <TableCell>
                <Button variant="destructive" disabled>
                  <IconTrashFilled />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
