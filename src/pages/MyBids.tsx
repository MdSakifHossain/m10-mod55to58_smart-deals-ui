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

export default function MyBids() {
  return (
    <PageStructure className="flex flex-col items-center gap-10 pb-28">
      <h2 className="text-5xl">My Bids: 1n</h2>

      <ProductsTable />
    </PageStructure>
  )
}

function ProductsTable() {
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
          {[...Array(12)].map((_, i) => (
            <TableRow className="*:text-center">
              <TableCell>{i + 1}</TableCell>

              <TableCell className="flex gap-3">
                <img
                  src="https://placehold.co/1280x720"
                  alt="Product Image"
                  className="w-16"
                />
                <div className="flex flex-col items-start">
                  <p>Orange Juice</p>
                  <p className="text-muted-foreground">$22.5</p>
                </div>
              </TableCell>

              <TableCell>$100</TableCell>

              <TableCell className="flex items-center justify-center gap-3">
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
              </TableCell>

              <TableCell>
                <Badge
                  variant="outline"
                  className="rounded-full border-amber-600 text-amber-600"
                >
                  Pending
                </Badge>
              </TableCell>

              <TableCell>
                <Button variant="destructive">
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
