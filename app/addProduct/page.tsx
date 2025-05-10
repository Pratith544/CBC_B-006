"use client"

import type React from "react"

import { useState } from "react"
import { BookOpenCheck, Upload, ArrowLeft, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { categories } from "../../data/products"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AddProductPage() {
  const [productImage, setProductImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    quantity: 1,
    unit: "kg",
    freshness: "Today",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProductImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePriceChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, price: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          name: "",
          description: "",
          price: 0,
          category: "",
          quantity: 1,
          unit: "kg",
          freshness: "Today",
        })
        setProductImage(null)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BookOpenCheck size={32} />
              <h1 className="text-2xl font-bold">Local Marketplace</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/products" className="flex items-center text-primary hover:underline">
            <ArrowLeft size={20} className="mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add Your Product</h1>

          <div className="bg-accent text-accent-foreground p-4 mb-8 rounded-lg">
            <div className="flex items-start">
              <Info size={24} className="mr-3 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg">
                  Share your farm-fresh produce or handcrafted items with the community. Complete the form below to list
                  your product on the Local Marketplace.
                </p>
              </div>
            </div>
          </div>

          {showSuccess ? (
            <Card className="bg-green-50 border-green-200 mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-green-700 mb-2">Product Added Successfully!</h2>
                <p className="text-green-600">
                  Your product has been added to the marketplace. Customers can now view and purchase your product.
                </p>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg">
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Organic Tomatoes"
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-lg">
                      Category
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                      required
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-lg">
                      Price (₹)
                    </Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Slider
                          defaultValue={[0]}
                          max={1000}
                          step={5}
                          value={[formData.price]}
                          onValueChange={handlePriceChange}
                          className="py-4"
                        />
                      </div>
                      <Input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min={0}
                        max={1000}
                        className="w-24 h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-lg">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        min={1}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit" className="text-lg">
                        Unit
                      </Label>
                      <Select value={formData.unit} onValueChange={(value) => handleSelectChange("unit", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilogram (kg)</SelectItem>
                          <SelectItem value="g">Gram (g)</SelectItem>
                          <SelectItem value="l">Liter (l)</SelectItem>
                          <SelectItem value="ml">Milliliter (ml)</SelectItem>
                          <SelectItem value="piece">Piece</SelectItem>
                          <SelectItem value="dozen">Dozen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="freshness" className="text-lg">
                      Freshness
                    </Label>
                    <Select
                      value={formData.freshness}
                      onValueChange={(value) => handleSelectChange("freshness", value)}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select freshness" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Today">Harvested Today</SelectItem>
                        <SelectItem value="1 day">1 day old</SelectItem>
                        <SelectItem value="2 days">2 days old</SelectItem>
                        <SelectItem value="3 days">3 days old</SelectItem>
                        <SelectItem value="1 week">1 week old</SelectItem>
                        <SelectItem value="Non-perishable">Non-perishable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-lg">
                      Product Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your product, including details about quality, origin, and any special features..."
                      required
                      className="min-h-[150px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-lg">
                      Product Image
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      {productImage ? (
                        <div className="space-y-4">
                          <div className="relative w-full h-48 mx-auto overflow-hidden rounded-lg">
                            <img
                              src={productImage || "/placeholder.svg"}
                              alt="Product preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button type="button" variant="outline" onClick={() => setProductImage(null)}>
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <div className="py-8 space-y-4">
                          <Upload size={48} className="mx-auto text-muted-foreground" />
                          <p className="text-muted-foreground">Drag and drop an image, or click to browse</p>
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("image")?.click()}
                          >
                            Upload Image
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button type="submit" className="px-8" disabled={isSubmitting}>
                  {isSubmitting ? "Adding Product..." : "Add Product"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="bg-card text-card-foreground border-t border-border py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-muted-foreground">
                Local Marketplace connects farmers and small businesses with customers in their community. Support local
                businesses and get fresh produce directly from the source.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-muted-foreground">Phone: 1800-123-4567</p>
              <p className="text-muted-foreground">Email: help@localmarket.com</p>
              <p className="text-muted-foreground">Address: 123 Market Street, Dehradun</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Help</h3>
              <button className="text-primary hover:underline block mb-2 min-h-[48px] flex items-center">
                How to place an order
              </button>
              <button className="text-primary hover:underline block mb-2 min-h-[48px] flex items-center">
                Seller registration
              </button>
              <button className="text-primary hover:underline block min-h-[48px] flex items-center">
                Payment options
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground">© 2025 Local Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
