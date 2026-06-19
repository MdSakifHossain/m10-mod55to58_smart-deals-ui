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
import { IconTrash, IconTrashFilled } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/AuthProvider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function MyBids() {
  const [myBids, setMyBids] = useState([])
  const [refetchTrigger, setRefetchTrigger] = useState(0)
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
  }, [user, refetchTrigger])

  return (
    <PageStructure className="flex flex-col items-center gap-10 pb-28">
      <h2 className="text-5xl">My Bids: {myBids.length}</h2>

      {myBids.length > 0 ? (
        <ProductsTable bids={myBids} setRefetchTrigger={setRefetchTrigger} />
      ) : (
        <div className="flex min-h-[60svh] flex-col items-center justify-center">
          <p className="text-2xl text-muted-foreground">No Bids</p>
        </div>
      )}
    </PageStructure>
  )
}

function ProductsTable({ bids, setRefetchTrigger }) {
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
                    {bid.product.title.toString().length > 30
                      ? `${bid.product.title.toString().slice(0, 30)}..`
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
                <DeleteBidDialog
                  setRefetchTrigger={setRefetchTrigger}
                  bidId={bid._id}
                >
                  <Button variant="destructive">
                    <IconTrashFilled />
                    Delete
                  </Button>
                </DeleteBidDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function DeleteBidDialog({ bidId, setRefetchTrigger, children }) {
  const [dialogueOpen, setDialogueOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { user } = useAuth()

  const closeDialogue = () => setDialogueOpen(false)

  const handleDelete = async () => {
    try {
      setSubmitting(true)
      await api.delete(`/bids/${bidId}`, {
        data: {
          user_id: user?.dbUser?._id,
        },
      })
      setRefetchTrigger((prev) => prev + 1)
    } catch (error) {
      console.error(error)
      console.log(`Error happened`)
      alert("Something went wrong while Deleting BID")
    } finally {
      setSubmitting(false)
      closeDialogue()
    }
  }

  return (
    <AlertDialog open={dialogueOpen} onOpenChange={setDialogueOpen}>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <IconTrash />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Bid?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this Bid.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={submitting}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
