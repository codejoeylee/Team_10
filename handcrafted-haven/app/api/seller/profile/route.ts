import { NextRequest, NextResponse } from 'next/server';
import { getSellerProfileByUserId, createSellerProfile, updateSellerProfile } from '@/lib/queries/sellers';
import { verifyToken } from '@/lib/auth';
import { CreateSellerProfileSchema } from '@/lib/schemas';

// GET seller profile (requires authentication)
export async function GET(request: NextRequest) {
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

        const profile = await getSellerProfileByUserId(user.userId);

        if (!profile) {
            return NextResponse.json(
                { success: false, error: 'Profile not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            profile,
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch profile' },
            { status: 500 }
        );
    }
}

// POST create seller profile (requires authentication)
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
        const validatedData = CreateSellerProfileSchema.parse({
            ...body,
            userId: user.userId,
        });

        // Create profile
        const profile = await createSellerProfile(validatedData);

        return NextResponse.json({
            success: true,
            profile,
        }, { status: 201 });

    } catch (error: any) {
        if (error.code === '23505') { // Unique constraint violation
            return NextResponse.json(
                { success: false, error: 'Profile already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create profile' },
            { status: 400 }
        );
    }
}

// PATCH update seller profile (requires authentication)
export async function PATCH(request: NextRequest) {
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

        // Update profile
        const profile = await updateSellerProfile(user.userId, body);

        if (!profile) {
            return NextResponse.json(
                { success: false, error: 'Profile not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            profile,
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update profile' },
            { status: 400 }
        );
    }
}
