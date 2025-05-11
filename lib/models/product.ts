import mongoose, { Schema, type Document, type Model } from "mongoose"
import connectToDatabase from "../../lib/mongodb"

// Define the Product interface
export interface IProduct extends Document {
  name: string
  price: number
  description?: string
  category: string
  imageUrl?: string
  createdAt: Date
}

// Define the Product schema
const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create or retrieve the Product model
let Product: Model<IProduct>

try {
  // Try to retrieve an existing model to prevent OverwriteModelError
  Product = mongoose.model<IProduct>("Product")
} catch {
  // If the model doesn't exist, create a new one
  Product = mongoose.model<IProduct>("Product", ProductSchema)
}

// Export a function to get the Product model after ensuring DB connection
export async function getProductModel(): Promise<Model<IProduct>> {
  await connectToDatabase()
  return Product
}

export default Product
