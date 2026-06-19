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
  IconShare,
  IconTrashFilled,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/AuthProvider"
import { useNavigate } from "react-router"

export default function MyProducts() {
  const [myProds, setMyProds] = useState([])
  const [refetchTrigger, setRefetchTrigger] = useState(0)
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
  }, [user.dbUser._id, refetchTrigger])

  return (
    <PageStructure className="flex flex-col items-center gap-10 pb-28">
      <h2 className="text-5xl">My Products: {myProds.length}</h2>

      {myProds.length !== 0 && (
        <ProductsTable
          products={myProds}
          setRefetchTrigger={setRefetchTrigger}
        />
      )}
    </PageStructure>
  )
}

function ProductsTable({ products, setRefetchTrigger }) {
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
              <TableCell>
                {product.title.length > 30
                  ? `${product.title.slice(0, 30)}...`
                  : product.title}
              </TableCell>
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
                <DropdownMenuDestructive
                  product={product}
                  setRefetchTrigger={setRefetchTrigger}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function DropdownMenuDestructive({ product, setRefetchTrigger }) {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleViewClick = () => {
    navigate(`/product-details/${product._id}`)
  }

  const handleShareClick = async () => {
    const final = `${window.location.origin}/product-details/${product._id}`
    try {
      await navigator.clipboard.writeText(final)
      alert("Product link copied to Clipboard")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const handleDeleteClick = async (productId) => {
    try {
      const { data: apiRes } = await api.delete(`/products/${productId}`, {
        data: {
          user_id: user.dbUser._id,
        },
      })
      console.log(apiRes)
      // setProducts((prev) => prev.filter((product) => product._id !== productId))
      setRefetchTrigger((prev) => prev + 1)
    } catch (error) {
      console.error(error)
    }
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
          <DropdownMenuItem onClick={handleShareClick}>
            <IconShare />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <IconPencil />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => handleDeleteClick(product._id)}
          >
            <IconTrashFilled />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
