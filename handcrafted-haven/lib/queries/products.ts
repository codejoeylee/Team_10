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

    return result[0] as Product;
}

export async function getProductById(id: string): Promise<Product | null> {
    const result = await sql`
    SELECT * FROM products WHERE id = ${id} LIMIT 1
  `;

    return result[0] as Product || null;
}

export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
    const result = await sql`
    SELECT * FROM products WHERE seller_id = ${sellerId} ORDER BY created_at DESC
  `;

    return result as Product[];
}

export async function getAllProducts(limit = 50, offset = 0): Promise<Product[]> {
    const result = await sql`
    SELECT * FROM products 
    WHERE is_active = true 
    ORDER BY created_at DESC 
    LIMIT ${limit} OFFSET ${offset}
  `;

    return result as Product[];
}

export async function updateProduct(id: string, data: UpdateProduct): Promise<Product | null> {
    const updates: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) {
        updates.push(`name = $${updates.length + 1}`);
        values.push(data.name);
    }
    if (data.description !== undefined) {
        updates.push(`description = $${updates.length + 1}`);
        values.push(data.description);
    }
    if (data.price !== undefined) {
        updates.push(`price = $${updates.length + 1}`);
        values.push(data.price);
    }
    if (data.category !== undefined) {
        updates.push(`category = $${updates.length + 1}`);
        values.push(data.category);
    }
    if (data.imageUrl !== undefined) {
        updates.push(`image_url = $${updates.length + 1}`);
        values.push(data.imageUrl);
    }
    if (data.stock !== undefined) {
        updates.push(`stock = $${updates.length + 1}`);
        values.push(data.stock);
    }
    if (data.isActive !== undefined) {
        updates.push(`is_active = $${updates.length + 1}`);
        values.push(data.isActive);
    }

    if (updates.length === 0) return null;

    updates.push(`updated_at = NOW()`);

    const result = await sql`
    UPDATE products 
    SET ${sql.raw(updates.join(', '))}
    WHERE id = ${id}
    RETURNING *
  `;

    return result[0] as Product || null;
}

export async function deleteProduct(id: string): Promise<boolean> {
    const result = await sql`
    DELETE FROM products WHERE id = ${id}
  `;

    return result.length > 0;
}
