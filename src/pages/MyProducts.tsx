// @ts-nocheck
import PageStructure from "@/components/my-components/PageStructure"

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
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/AuthProvider"
import { useNavigate } from "react-router"

export default function MyProducts() {
  const [myProds, setMyProds] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const doTheThing = async () => {
      try {
        const url = `/my_products?user_id=${user.dbUser._id}`
        const { data: prods } = await api.get(url)
        setMyProds(prods)
      } catch (err) {
        console.error(err)
        alert("Something Went wrong while getting all my Product")
      }
    }
    doTheThing()
  }, [user.dbUser._id])

  return (
    <PageStructure className="flex flex-col items-center gap-10 pb-28">
      <h2 className="text-5xl">My Products: 1n</h2>

      <ProductsTable products={myProds} />
    </PageStructure>
  )
}

function ProductsTable({ products }) {
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
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product, i) => (
            <TableRow key={i} className="*:text-center">
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <img
                  className="max-w-24"
                  src={product.image}
                  alt={product.title.slice(0, 2)}
                />
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell className="capitalize">{product.category}</TableCell>
              <TableCell>${product.price_min}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="rounded-full border-amber-600 text-amber-600"
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenuDestructive product={product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function DropdownMenuDestructive({ product }) {
  const navigate = useNavigate()

  const handleViewClick = () => {
    navigate(`/product-details/${product._id}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="icon-lg" variant={"ghost"}>
            <IconDotsVertical />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleViewClick}>
            <IconEye />
            View
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <IconPencil />
            Edit
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            disabled
            variant="destructive"
            onClick={() => {
              console.log(`Delete ${product.title}`)
            }}
          >
            <IconTrashFilled />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
