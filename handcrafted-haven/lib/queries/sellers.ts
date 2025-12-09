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
    RETURNING 
      id,
      user_id as "userId",
      business_name as "businessName",
      bio,
      location,
      specialty,
      image_url as "imageUrl",
      created_at as "createdAt",
      updated_at as "updatedAt"
  `;

  return result.rows[0] as SellerProfile;
}

export async function getSellerProfileByUserId(userId: string): Promise<SellerProfile | null> {
  const result = await sql`
    SELECT 
      id,
      user_id as "userId",
      business_name as "businessName",
      bio,
      location,
      specialty,
      image_url as "imageUrl",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM seller_profiles 
    WHERE user_id = ${userId} 
    LIMIT 1
  `;

  return (result.rows[0] as SellerProfile) || null;
}

export async function getSellerProfileById(id: string): Promise<SellerProfile | null> {
  const result = await sql`
    SELECT 
      id,
      user_id as "userId",
      business_name as "businessName",
      bio,
      location,
      specialty,
      image_url as "imageUrl",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM seller_profiles 
    WHERE id = ${id} 
    LIMIT 1
  `;

  return (result.rows[0] as SellerProfile) || null;
}

export async function updateSellerProfile(
  userId: string,
  data: Partial<CreateSellerProfile>
): Promise<SellerProfile | null> {
  const updates: any = {};

  if (data.businessName !== undefined) updates.business_name = data.businessName;
  if (data.bio !== undefined) updates.bio = data.bio;
  if (data.location !== undefined) updates.location = data.location;
  if (data.specialty !== undefined) updates.specialty = data.specialty;
  if (data.imageUrl !== undefined) updates.image_url = data.imageUrl;

  if (Object.keys(updates).length === 0) return null;

  const result = await sql`
    UPDATE seller_profiles 
    SET 
      business_name = COALESCE(${updates.business_name || null}, business_name),
      bio = COALESCE(${updates.bio || null}, bio),
      location = COALESCE(${updates.location || null}, location),
      specialty = COALESCE(${updates.specialty || null}, specialty),
      image_url = COALESCE(${updates.image_url || null}, image_url),
      updated_at = NOW()
    WHERE user_id = ${userId}
    RETURNING 
      id,
      user_id as "userId",
      business_name as "businessName",
      bio,
      location,
      specialty,
      image_url as "imageUrl",
      created_at as "createdAt",
      updated_at as "updatedAt"
  `;

  return (result.rows[0] as SellerProfile) || null;
}

export async function getAllSellers(limit = 50, offset = 0): Promise<SellerProfile[]> {
  const result = await sql`
    SELECT 
      id,
      user_id as "userId",
      business_name as "businessName",
      bio,
      location,
      specialty,
      image_url as "imageUrl",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM seller_profiles 
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `;

  return result.rows as SellerProfile[];
}
