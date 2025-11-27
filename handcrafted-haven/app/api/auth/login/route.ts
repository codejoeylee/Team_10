import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/queries/users';
import { verifyPassword, generateToken } from '@/lib/auth';
import { LoginSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = LoginSchema.parse(body);

        // Get user by email
        const user = await getUserByEmail(validatedData.email);

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await verifyPassword(validatedData.password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken({ userId: user.id, email: user.email });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Login failed' },
            { status: 400 }
        );
    }
}
