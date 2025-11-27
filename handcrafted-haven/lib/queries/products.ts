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
  const setParts: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.name !== undefined) {
    setParts.push(`name = $${paramCount++}`);
    values.push(data.name);
  }
  if (data.description !== undefined) {
    setParts.push(`description = $${paramCount++}`);
    values.push(data.description);
  }
  if (data.price !== undefined) {
    setParts.push(`price = $${paramCount++}`);
    values.push(data.price);
  }
  if (data.category !== undefined) {
    setParts.push(`category = $${paramCount++}`);
    values.push(data.category);
  }
  if (data.imageUrl !== undefined) {
    setParts.push(`image_url = $${paramCount++}`);
    values.push(data.imageUrl);
  }
  if (data.stock !== undefined) {
    setParts.push(`stock = $${paramCount++}`);
    values.push(data.stock);
  }
  if (data.isActive !== undefined) {
    setParts.push(`is_active = $${paramCount++}`);
    values.push(data.isActive);
  }

  if (setParts.length === 0) return null;

  setParts.push('updated_at = NOW()');
  values.push(id);

  const query = `
        UPDATE products 
        SET ${setParts.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
    `;

  const result = await sql.query(query, values);
  return (result.rows[0] as Product) || null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM products WHERE id = ${id}
  `;

  return result.rowCount !== null && result.rowCount > 0;
}
