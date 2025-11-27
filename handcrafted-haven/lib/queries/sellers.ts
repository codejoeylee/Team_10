import { sql } from '../db';
import type { SellerProfile, CreateSellerProfile } from '../schemas';

export async function createSellerProfile(data: CreateSellerProfile): Promise<SellerProfile> {
    const result = await sql`
    INSERT INTO seller_profiles (user_id, business_name, bio, location, specialty, image_url)
    VALUES (
      ${data.userId}, 
      ${data.businessName}, 
      ${data.bio || null}, 
      ${data.location || null}, 
      ${data.specialty || null}, 
      ${data.imageUrl || null}
    )
    RETURNING *
  `;

    return result[0] as SellerProfile;
}

export async function getSellerProfileByUserId(userId: string): Promise<SellerProfile | null> {
    const result = await sql`
    SELECT * FROM seller_profiles WHERE user_id = ${userId} LIMIT 1
  `;

    return result[0] as SellerProfile || null;
}

export async function getSellerProfileById(id: string): Promise<SellerProfile | null> {
    const result = await sql`
    SELECT * FROM seller_profiles WHERE id = ${id} LIMIT 1
  `;

    return result[0] as SellerProfile || null;
}

export async function updateSellerProfile(
    userId: string,
    data: Partial<CreateSellerProfile>
): Promise<SellerProfile | null> {
    const updates: string[] = [];
    const values: any[] = [];

    if (data.businessName !== undefined) {
        updates.push(`business_name = $${updates.length + 1}`);
        values.push(data.businessName);
    }
    if (data.bio !== undefined) {
        updates.push(`bio = $${updates.length + 1}`);
        values.push(data.bio);
    }
    if (data.location !== undefined) {
        updates.push(`location = $${updates.length + 1}`);
        values.push(data.location);
    }
    if (data.specialty !== undefined) {
        updates.push(`specialty = $${updates.length + 1}`);
        values.push(data.specialty);
    }
    if (data.imageUrl !== undefined) {
        updates.push(`image_url = $${updates.length + 1}`);
        values.push(data.imageUrl);
    }

    if (updates.length === 0) return null;

    updates.push(`updated_at = NOW()`);

    const result = await sql`
    UPDATE seller_profiles 
    SET ${sql.raw(updates.join(', '))}
    WHERE user_id = ${userId}
    RETURNING *
  `;

    return result[0] as SellerProfile || null;
}

export async function getAllSellers(limit = 50, offset = 0): Promise<SellerProfile[]> {
    const result = await sql`
    SELECT * FROM seller_profiles 
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `;

    return result as SellerProfile[];
}
