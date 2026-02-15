import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Mock product data
const mockProducts: Record<string, object> = {
  '1': {
    id: 1,
    name: 'Money Plant Designer Cake',
    slug: 'money-plant-designer-cake',
    description: 'A beautiful designer cake with money plant decoration, perfect for celebrations and special occasions.',
    shortDescription: 'Designer cake with money plant theme',
    isFeatured: true,
    isActive: true,
    image: '/MoneyPlantCake.png',
    images: [{ url: '/MoneyPlantCake.png', isPrimary: true }],
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
    categoryIds: [1, 2],
  },
  '2': {
    id: 2,
    name: 'Rasmalai Cream Cake',
    slug: 'rasmalai-cream-cake',
    description: 'Delicious rasmalai flavored cream cake with traditional Indian flavors.',
    shortDescription: 'Rasmalai flavored cream cake',
    isFeatured: true,
    isActive: true,
    image: '/RasmalaiCake.png',
    images: [{ url: '/RasmalaiCake.png', isPrimary: true }],
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
    categoryIds: [2, 3],
  },
  '3': {
    id: 3,
    name: 'Red Velvet Vanilla Cake',
    slug: 'red-velvet-vanilla-cake',
    description: 'Classic red velvet cake with vanilla frosting.',
    shortDescription: 'Red velvet with vanilla frosting',
    isFeatured: false,
    isActive: true,
    image: '/RedVanillaCake.png',
    images: [{ url: '/RedVanillaCake.png', isPrimary: true }],
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
    categoryIds: [1],
  },
  '4': {
    id: 4,
    name: 'Classic Vanilla Cake',
    slug: 'classic-vanilla-cake',
    description: 'Timeless classic vanilla sponge cake.',
    shortDescription: 'Classic vanilla sponge cake',
    isFeatured: true,
    isActive: true,
    image: '/VanillaCake.png',
    images: [{ url: '/VanillaCake.png', isPrimary: true }],
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
    categoryIds: [2],
  },
  // Slug-based lookups
  'money-plant-designer-cake': { $ref: '1' },
  'rasmalai-cream-cake': { $ref: '2' },
  'red-velvet-vanilla-cake': { $ref: '3' },
  'classic-vanilla-cake': { $ref: '4' },
};

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/products/[id] - Get single product
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    let product = mockProducts[id];

    // Handle slug lookups
    if (product && '$ref' in product) {
      product = mockProducts[(product as { $ref: string }).$ref];
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product (Admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // For local development, just return success
    return NextResponse.json({
      success: true,
      id: parseInt(id),
      ...body,
      message: 'Product updated (mock)',
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product (Admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    return NextResponse.json({
      success: true,
      message: `Product ${id} deleted (mock)`,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
