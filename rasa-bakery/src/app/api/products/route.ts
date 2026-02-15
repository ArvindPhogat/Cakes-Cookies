import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Mock products data for local development
const mockProducts = [
  {
    id: 1,
    name: 'Money Plant Designer Cake',
    slug: 'money-plant-designer-cake',
    description: 'A beautiful designer cake with money plant decoration',
    shortDescription: 'Designer cake with money plant theme',
    isFeatured: true,
    isActive: true,
    image: '/MoneyPlantCake.png',
    images: ['/MoneyPlantCake.png'],
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
  },
  {
    id: 2,
    name: 'Rasmalai Cream Cake',
    slug: 'rasmalai-cream-cake',
    description: 'Delicious rasmalai flavored cream cake',
    shortDescription: 'Rasmalai flavored cream cake',
    isFeatured: true,
    isActive: true,
    image: '/RasmalaiCake.png',
    images: ['/RasmalaiCake.png'],
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
  },
  {
    id: 3,
    name: 'Red Velvet Vanilla Cake',
    slug: 'red-velvet-vanilla-cake',
    description: 'Classic red velvet cake with vanilla frosting',
    shortDescription: 'Red velvet with vanilla frosting',
    isFeatured: false,
    isActive: true,
    image: '/RedVanillaCake.png',
    images: ['/RedVanillaCake.png'],
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
  },
  {
    id: 4,
    name: 'Classic Vanilla Cake',
    slug: 'classic-vanilla-cake',
    description: 'Timeless classic vanilla sponge cake',
    shortDescription: 'Classic vanilla sponge cake',
    isFeatured: true,
    isActive: true,
    image: '/VanillaCake.png',
    images: ['/VanillaCake.png'],
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
  },
];

// GET /api/products - List products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    let result = [...mockProducts];

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by featured
    if (featured === 'true') {
      result = result.filter((p) => p.isFeatured);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    // For local development, just return success
    const body = await request.json();

    return NextResponse.json(
      {
        id: Date.now(),
        ...body,
        slug: body.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        message: 'Product created (mock)'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
