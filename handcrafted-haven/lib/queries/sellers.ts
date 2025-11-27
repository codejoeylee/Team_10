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

  return result.rows[0] as SellerProfile;
}

export async function getSellerProfileByUserId(userId: string): Promise<SellerProfile | null> {
  const result = await sql`
    SELECT * FROM seller_profiles WHERE user_id = ${userId} LIMIT 1
  `;

  return (result.rows[0] as SellerProfile) || null;
}

export async function getSellerProfileById(id: string): Promise<SellerProfile | null> {
  const result = await sql`
    SELECT * FROM seller_profiles WHERE id = ${id} LIMIT 1
  `;

  return (result.rows[0] as SellerProfile) || null;
}

export async function updateSellerProfile(
  userId: string,
  data: Partial<CreateSellerProfile>
): Promise<SellerProfile | null> {
  const setParts: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.businessName !== undefined) {
    setParts.push(`business_name = $${paramCount++}`);
    values.push(data.businessName);
  }
  if (data.bio !== undefined) {
    setParts.push(`bio = $${paramCount++}`);
    values.push(data.bio);
  }
  if (data.location !== undefined) {
    setParts.push(`location = $${paramCount++}`);
    values.push(data.location);
  }
  if (data.specialty !== undefined) {
    setParts.push(`specialty = $${paramCount++}`);
    values.push(data.specialty);
  }
  if (data.imageUrl !== undefined) {
    setParts.push(`image_url = $${paramCount++}`);
    values.push(data.imageUrl);
  }

  if (setParts.length === 0) return null;

  setParts.push('updated_at = NOW()');
  values.push(userId);

  const query = `
        UPDATE seller_profiles 
        SET ${setParts.join(', ')}
        WHERE user_id = $${paramCount}
        RETURNING *
    `;

  const result = await sql.query(query, values);
  return (result.rows[0] as SellerProfile) || null;
}

export async function getAllSellers(limit = 50, offset = 0): Promise<SellerProfile[]> {
  const result = await sql`
    SELECT * FROM seller_profiles 
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `;

  return result.rows as SellerProfile[];
}
