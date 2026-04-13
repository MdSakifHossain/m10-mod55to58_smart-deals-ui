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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  IconDotsVertical,
  IconEye,
  IconPencil,
  IconTrashFilled,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

export default function MyProducts() {
  return (
    <PageStructure className="flex flex-col items-center gap-10 pb-28">
      <h2 className="text-5xl">My Products: 1n</h2>

      <ProductsTable />
    </PageStructure>
  )
}

function ProductsTable() {
  return (
    <div className="w-full max-w-4xl rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow className="*:text-center">
            <TableHead>SL No</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(12)].map((_, i) => (
            <TableRow className="*:text-center">
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <Avatar className="mx-auto">
                  <AvatarImage
                    alt="shadcn"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>SH</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>Orange Juice</TableCell>
              <TableCell>Beverage</TableCell>
              <TableCell>$100</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="rounded-full border-amber-600 text-amber-600"
                >
                  Pending
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenuDestructive />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function DropdownMenuDestructive() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button>
            <IconDotsVertical />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconPencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconEye />
            Mark as Read
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <IconTrashFilled />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
