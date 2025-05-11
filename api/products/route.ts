// app/api/products/route.ts

import { type NextRequest, NextResponse } from "next/server";
import { getProductModel, type IProduct } from "../../lib/models/product";
import {
  createProductSchema,
  productQuerySchema,
  type ProductResponse,
  type ErrorResponse,
} from "../../lib/validations/product";
import { ZodError } from "zod";

/**
 * GET /api/products
 *
 * Used by the /marketplace page to fetch paginated products with optional filtering
 */
export async function GET(
  request: NextRequest
): Promise<NextResponse<ProductResponse | ErrorResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
      category: searchParams.get("category") || undefined,
    };

    const { page, limit, category } = productQuerySchema.parse(queryParams);

    const skip = (page - 1) * limit;
    const query: Record<string, any> = {};
    if (category) query.category = category;

    const Product = await getProductModel();

    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
    ]);

    const transformedProducts = products.map((prod: any) => ({
      id: prod._id.toString(),
      name: prod.name,
      price: prod.price,
      description: prod.description,
      category: prod.category,
      imageUrl: prod.imageUrl,
      createdAt: prod.createdAt,
    }));

    return NextResponse.json(
      { products: transformedProducts, total, page, limit },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 *
 * Used by the /addProducts page to create a new product
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<IProduct | ErrorResponse>> {
  try {
    const body = await request.json();
    const validatedData = createProductSchema.parse(body);

    const Product = await getProductModel();
    const newProduct = new Product(validatedData);
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating product:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
