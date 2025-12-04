import { NextRequest, NextResponse } from 'next/server';
import { createReview, getReviewsByProduct } from '@/lib/queries/reviews';
import { verifyToken } from '@/lib/auth';
import { CreateReviewSchema } from '@/lib/schemas';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json(
                { success: false, error: 'Product ID required' },
                { status: 400 }
            );
        }

        const reviews = await getReviewsByProduct(productId);

        return NextResponse.json({
            success: true,
            reviews,
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
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

        const validatedData = CreateReviewSchema.parse({
            ...body,
            userId: user.userId,
        });

        const review = await createReview(validatedData);

        return NextResponse.json({
            success: true,
            review,
        }, { status: 201 });

    } catch (error: any) {
        if (error.code === '23505') {
            return NextResponse.json(
                { success: false, error: 'You have already reviewed this product' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create review' },
            { status: 400 }
        );
    }
}
