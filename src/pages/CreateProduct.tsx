// @ts-nocheck
import PageStructure from "@/components/my-components/PageStructure"
import { buttonVariants } from "@/components/ui/button"
import { IconArrowNarrowLeftDashed } from "@tabler/icons-react"
import { Link } from "react-router"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useEffect, useState } from "react"
import { FieldContent, FieldTitle } from "@/components/ui/field"
import { api } from "@/lib/api"
import { useAuth } from "@/contexts/AuthProvider"

export default function CreateProduct() {
  return (
    <PageStructure className="flex flex-col items-center gap-10">
      {/* page head area */}
      <div className="flex flex-col items-center gap-4">
        <Link
          to="/all-products"
          className={buttonVariants({ variant: "outline" })}
        >
          <IconArrowNarrowLeftDashed />
          Back to Products
        </Link>
        <h2 className="text-5xl">Create Product</h2>
      </div>

      {/* Card */}
      <Card className="w-full max-w-5xl">
        <CardContent className="pt-4">
          <Fooorm />
        </CardContent>
      </Card>
    </PageStructure>
  )
}

// Helper
function TwoColGrid({ children }) {
  return <Field className="grid grid-cols-2 gap-5">{children}</Field>
}

// Helper
function FieldWithTilte({ id, label = "Label is REQUIRED", children }) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
    </Field>
  )
}

function Fooorm() {
  const [categories, setCategories] = useState([])
  const [condition, setCondition] = useState("fresh") // "fresh" or "used"
  const { user } = useAuth()

  useEffect(() => {
    const doTheThing = async () => {
      try {
        const res = await axios.get("/category.json")
        setCategories(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    doTheThing()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    const newProductObj = {
      seller_id: user.dbUser._id,
      ...data, // title, description, image, price_min, category,
      condition,
      usage_time: data.usage ? data.usage : null,
    }

    try {
      await api.post("/products", newProductObj)
      e.target.reset()
      alert("Product Added")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
      {/* Title && Category */}
      <TwoColGrid>
        {/* Title */}
        <FieldWithTilte id="title" label="Title">
          <Input
            id="title"
            type="text"
            placeholder="e.g. Yamaha Fz Guitar for Sale"
            className="px-4 py-5.5"
            required
            name="title"
          />
        </FieldWithTilte>

        {/* Category */}
        <FieldWithTilte id="category" label="Category">
          <NativeSelect id="category" name="category">
            <NativeSelectOption value="">Select a Category</NativeSelectOption>
            {categories.map((item) => (
              <NativeSelectOption key={item._id} value={item.slug}>
                {item.icon} {item.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </FieldWithTilte>
      </TwoColGrid>
      {/* Min Price  */}
      <FieldWithTilte id="min_price" label="Min Price You want to Sale ($)">
        <Input
          id="price_min"
          type="number"
          placeholder="e.g. 18.5"
          required
          className="px-4 py-5.5"
          name="price_min"
        />
      </FieldWithTilte>
      {/* product condition && usage time */}
      <TwoColGrid>
        {/* Product Condition  */}
        <FieldWithTilte id="product_condition" label="Product Condition">
          <RadioGroup
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="flex"
          >
            <FieldLabel htmlFor="fresh">
              <Field orientation="horizontal">
                <RadioGroupItem value="fresh" id="fresh" />
                <FieldContent>
                  <FieldTitle>Fresh</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>

            <FieldLabel htmlFor="used">
              <Field orientation="horizontal">
                <RadioGroupItem value="used" id="used" />
                <FieldContent>
                  <FieldTitle>Used</FieldTitle>
                </FieldContent>
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldWithTilte>

        {/* Usage Time */}
        <FieldWithTilte id="usage_time" label="Product Usage time">
          <Input
            id="usage"
            type="text"
            placeholder="e.g. 1 year 3 month "
            className="px-4 py-5.5"
            required
            disabled={condition === "fresh"}
            name="usage"
          />
        </FieldWithTilte>
      </TwoColGrid>
      {/* Image URL */}
      <FieldWithTilte id="image_url" label="Your Product Image URL">
        <Input
          id="image"
          placeholder="https://"
          type="url"
          required
          className="px-4 py-5.5"
          name="image"
        />
      </FieldWithTilte>
      {/* Product Description */}
      <FieldWithTilte
        id="product_description"
        label="Simple Description about your Product"
      >
        <Textarea
          className="min-h-48 resize-y px-4 py-3"
          id="product_description"
          placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough..... "
          name="description"
        />
      </FieldWithTilte>

      {/* Submit btn */}
      <Input
        type="submit"
        value="Create a Product"
        className={cn(buttonVariants({ variant: "default", size: "lg" }))}
      />
    </form>
  )
}
