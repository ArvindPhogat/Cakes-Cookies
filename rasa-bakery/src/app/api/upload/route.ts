import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// POST /api/upload - Upload image (mock for local development)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // For local development, return a mock URL
    // In production with Cloudflare, this would upload to R2
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const mockUrl = `/uploads/${timestamp}-${safeName}`;

    return NextResponse.json({
      success: true,
      url: mockUrl,
      key: `${timestamp}-${safeName}`,
      filename: file.name,
      size: file.size,
      type: file.type,
      message: 'File upload simulated (local development)',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
