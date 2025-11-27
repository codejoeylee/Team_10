import { sql } from '../db';
import type { Product, CreateProduct, UpdateProduct } from '../schemas';

export async function createProduct(data: CreateProduct): Promise<Product> {
  const result = await sql`
    INSERT INTO products (seller_id, name, description, price, category, image_url, stock, is_active)
    VALUES (
      ${data.sellerId}, 
      ${data.name}, 
      ${data.description || null}, 
      ${data.price}, 
      ${data.category}, 
      ${data.imageUrl || null}, 
      ${data.stock}, 
      ${data.isActive}
    )
    RETURNING *
  `;

  return result.rows[0] as Product;
}

export async function getProductById(id: string): Promise<Product | null> {
  const result = await sql`
    SELECT * FROM products WHERE id = ${id} LIMIT 1
  `;

  return (result.rows[0] as Product) || null;
}

export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
  const result = await sql`
    SELECT * FROM products WHERE seller_id = ${sellerId} ORDER BY created_at DESC
  `;

  return result.rows as Product[];
}

export async function getAllProducts(limit = 50, offset = 0): Promise<Product[]> {
  const result = await sql`
    SELECT * FROM products 
    WHERE is_active = true 
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `;

  return result.rows as Product[];
}

export async function updateProduct(id: string, data: UpdateProduct): Promise<Product | null> {
  // Build update fields dynamically
  const updates: any = {};

  if (data.name !== undefined) updates.name = data.name;
  if (data.description !== undefined) updates.description = data.description;
  if (data.price !== undefined) updates.price = data.price;
  if (data.category !== undefined) updates.category = data.category;
  if (data.imageUrl !== undefined) updates.image_url = data.imageUrl;
  if (data.stock !== undefined) updates.stock = data.stock;
  if (data.isActive !== undefined) updates.is_active = data.isActive;

  if (Object.keys(updates).length === 0) return null;

  // Use Vercel Postgres tagged template for update
  const result = await sql`
    UPDATE products 
    SET 
      name = COALESCE(${updates.name || null}, name),
      description = COALESCE(${updates.description || null}, description),
      price = COALESCE(${updates.price || null}, price),
      category = COALESCE(${updates.category || null}, category),
      image_url = COALESCE(${updates.image_url || null}, image_url),
      stock = COALESCE(${updates.stock !== undefined ? updates.stock : null}, stock),
      is_active = COALESCE(${updates.is_active !== undefined ? updates.is_active : null}, is_active),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return (result.rows[0] as Product) || null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM products WHERE id = ${id}
  `;

  return result.rowCount !== null && result.rowCount > 0;
}
