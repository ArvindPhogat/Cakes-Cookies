import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Mock categories data
const mockCategories = [
  { id: 1, name: 'Valentine', slug: 'valentine', description: "Valentine's Day special cakes", displayOrder: 1, isActive: true },
  { id: 2, name: 'Birthday', slug: 'birthday', description: 'Birthday celebration cakes', displayOrder: 2, isActive: true },
  { id: 3, name: 'Anniversary', slug: 'anniversary', description: 'Anniversary cakes', displayOrder: 3, isActive: true },
  { id: 4, name: 'Theme Cakes', slug: 'theme-cakes', description: 'Themed cakes for all occasions', displayOrder: 4, isActive: true },
  { id: 5, name: 'Custom', slug: 'customized-cakes', description: 'Customized cakes', displayOrder: 5, isActive: true },
  { id: 6, name: 'Desserts', slug: 'desserts', description: 'Delicious desserts', displayOrder: 6, isActive: true },
];

// GET /api/categories - List all categories
export async function GET() {
  try {
    return NextResponse.json(mockCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create category (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, displayOrder } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return NextResponse.json(
      {
        id: Date.now(),
        name,
        slug,
        description,
        displayOrder: displayOrder || 0,
        isActive: true,
        message: 'Category created (mock)',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// PUT /api/categories - Update category (Admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, displayOrder, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      id,
      name,
      description,
      displayOrder,
      isActive,
      message: 'Category updated (mock)',
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}
