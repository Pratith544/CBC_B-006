import { z } from "zod"

// Schema for product creation
export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100, "Product name is too long"),
  price: z.number().min(0, "Price cannot be negative"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Invalid image URL").optional(),
})

// Schema for product query parameters
export const productQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  category: z.string().optional(),
})

// Types derived from the schemas
export type CreateProductInput = z.infer<typeof createProductSchema>
export type ProductQueryParams = z.infer<typeof productQuerySchema>

// Response types
export interface ProductResponse {
  products: Array<{
    id: string
    name: string
    price: number
    description?: string
    category: string
    imageUrl?: string
    createdAt: Date
  }>
  total: number
  page: number
  limit: number
}

export interface ErrorResponse {
  error: string
}
