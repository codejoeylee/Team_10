import { sql } from '../db';
import type { Review, CreateReview } from '../schemas';

export async function createReview(data: CreateReview): Promise<Review> {
    const result = await sql`
    INSERT INTO reviews (product_id, user_id, rating, comment)
    VALUES (${data.productId}, ${data.userId}, ${data.rating}, ${data.comment || null})
    RETURNING *
  `;

    return result.rows[0] as Review;
}

export async function getReviewsByProduct(productId: string): Promise<any[]> {
    const result = await sql`
    SELECT r.*, u.name as user_name
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ${productId}
    ORDER BY r.created_at DESC
  `;

    return result.rows;
}

export async function getAverageRating(productId: string): Promise<number> {
    const result = await sql`
    SELECT AVG(rating)::float as average
    FROM reviews
    WHERE product_id = ${productId}
  `;

    return result.rows[0]?.average || 0;
}

export async function deleteReview(id: string): Promise<boolean> {
    const result = await sql`
    DELETE FROM reviews WHERE id = ${id}
  `;

    return result.rowCount !== null && result.rowCount > 0;
}
