import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/queries/users';
import { generateToken } from '@/lib/auth';
import { CreateUserSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = CreateUserSchema.parse(body);

        // Create user
        const user = await createUser(validatedData);

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
        }, { status: 201 });

    } catch (error: any) {
        if (error.code === '23505') { // Unique constraint violation
            return NextResponse.json(
                { success: false, error: 'Email already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: error.message || 'Registration failed' },
            { status: 400 }
        );
    }
}
