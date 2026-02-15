import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// Mock admin user for local development
const mockAdmin = {
  email: 'admin@rasaessence.com',
  password: 'admin123',
  id: 1,
  name: 'Admin User',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { email?: string; password?: string };
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // For local development, check against mock admin
    if (email.toLowerCase() === mockAdmin.email && password === mockAdmin.password) {
      const response = NextResponse.json({
        success: true,
        user: {
          id: mockAdmin.id,
          email: mockAdmin.email,
          name: mockAdmin.name,
        },
      });

      // Set a simple session cookie for local development
      response.cookies.set('admin_session', 'mock_session_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
