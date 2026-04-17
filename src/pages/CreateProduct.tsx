import PageStructure from "@/components/my-components/PageStructure"
import { buttonVariants } from "@/components/ui/button"
import { IconArrowNarrowLeftDashed } from "@tabler/icons-react"
import { Link } from "react-router"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

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
        <CardContent className="p-6">
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
  return (
    <form className="grid grid-cols-1 gap-8">
      {/* Title && Category */}
      <TwoColGrid>
        {/* Title */}
        <FieldWithTilte id="title" label="Title">
          <Input
            id="title"
            type="text"
            placeholder="e.g. Yamaha Fz Guitar for Sale"
            required
          />
        </FieldWithTilte>

        {/* Category */}
        <FieldWithTilte id="category" label="Category">
          <NativeSelect id="category">
            <NativeSelectOption value="">Select a Category</NativeSelectOption>
            <NativeSelectOption value="c1">c1</NativeSelectOption>
            <NativeSelectOption value="c2">c2</NativeSelectOption>
            <NativeSelectOption value="c3">c3</NativeSelectOption>
            <NativeSelectOption value="c4">c4</NativeSelectOption>
          </NativeSelect>
        </FieldWithTilte>
      </TwoColGrid>

      {/* Min && Max Price */}
      <TwoColGrid>
        {/* Min Price  */}
        <FieldWithTilte id="min_price" label="Min Price You want to Sale ($)">
          <Input
            id="min_price"
            type="number"
            placeholder="e.g. 18.5"
            required
          />
        </FieldWithTilte>

        {/* Max Price */}
        <FieldWithTilte id="max_price" label="Max Price You want to Sale ($)">
          <Input
            id="max_price"
            type="number"
            placeholder="Optional (default = Min Price)"
            required
          />
        </FieldWithTilte>
      </TwoColGrid>

      {/* product condition && usage time */}
      <TwoColGrid>
        {/* Product Condition  */}
        <FieldWithTilte id="product_condition" label="Product Condition">
          <RadioGroup
            defaultValue="new"
            className="flex w-fit items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="new" id="r1" />
              <Label htmlFor="r1">Brand New</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="used" id="r2" />
              <Label htmlFor="r2">Used</Label>
            </div>
          </RadioGroup>
        </FieldWithTilte>

        {/* Usage Time */}
        <FieldWithTilte id="usage_time" label="Product Usage time">
          <Input
            id="usage_time"
            type="text"
            placeholder="e.g. 1 year 3 month "
            required
          />
        </FieldWithTilte>
      </TwoColGrid>

      {/* Image URL */}
      <FieldWithTilte id="image_url" label="Your Product Image URL">
        <Input id="image_url" placeholder="https://..." type="url" required />
      </FieldWithTilte>

      {/* Seller Name && Email */}
      <TwoColGrid>
        <FieldWithTilte id="seller_name" label="Seller Name">
          <Input
            id="seller_name"
            type="text"
            placeholder="e.g. Artisan Roasters"
            required
          />
        </FieldWithTilte>

        <FieldWithTilte id="seller_email" label="Seller Email">
          <Input
            id="seller_email"
            type="email"
            placeholder="leli31955@nrlord.com"
            required
          />
        </FieldWithTilte>
      </TwoColGrid>

      {/* Seller Contact && Image URL */}
      <TwoColGrid>
        <FieldWithTilte id="seller_contact" label="Seller Contact">
          <Input
            id="seller_contact"
            type="tel"
            placeholder="e.g. +1-555-1234"
            required
          />
        </FieldWithTilte>

        <FieldWithTilte id="seller_image_url" label="Seller Image URL">
          <Input
            id="seller_image_url"
            type="url"
            placeholder="https://..."
            required
          />
        </FieldWithTilte>
      </TwoColGrid>

      {/* Location */}
      <FieldWithTilte id="location" label="Location">
        <Input id="location" placeholder="City, Country" type="text" required />
      </FieldWithTilte>

      {/* Product Description */}
      <FieldWithTilte
        id="product_description"
        label="Simple Description about your Product"
      >
        <Textarea
          className="min-h-48 resize-y"
          id="product_description"
          placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough..... "
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
