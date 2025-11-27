import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/queries/products';
import { verifyToken } from '@/lib/auth';
import { CreateProductSchema } from '@/lib/schemas';

// GET all products
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        const products = await getAllProducts(limit, offset);

        return NextResponse.json({
            success: true,
            products,
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST create product (requires authentication)
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const authHeader = request.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);
        const user = verifyToken(token);

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid token' },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Validate input
        const validatedData = CreateProductSchema.parse({
            ...body,
            sellerId: user.userId, // Use authenticated user's ID
        });

        // Create product
        const product = await createProduct(validatedData);

        return NextResponse.json({
            success: true,
            product,
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create product' },
            { status: 400 }
        );
    }
}
