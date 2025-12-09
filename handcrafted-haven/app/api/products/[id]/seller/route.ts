import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/queries/products';
import { getSellerProfileByUserId } from '@/lib/queries/sellers';

// GET seller info for a product
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Get the product to find the seller_id
        const product = await getProductById(id);

        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        // Get the seller profile
        const seller = await getSellerProfileByUserId(product.sellerId);

        if (!seller) {
            return NextResponse.json(
                { success: false, error: 'Seller profile not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            seller,
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch seller info' },
            { status: 500 }
        );
    }
}
