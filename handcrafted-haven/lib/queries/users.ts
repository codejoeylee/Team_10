import { sql } from '../db';
import { hashPassword } from '../auth';
import type { CreateUser, User } from '../schemas';

export async function createUser(data: CreateUser): Promise<User> {
    const hashedPassword = await hashPassword(data.password);

    const result = await sql`
    INSERT INTO users (email, password, name, role)
    VALUES (${data.email}, ${hashedPassword}, ${data.name}, ${data.role})
    RETURNING *
  `;

    return result[0] as User;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const result = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1
  `;

    return result[0] as User || null;
}

export async function getUserById(id: string): Promise<User | null> {
    const result = await sql`
    SELECT * FROM users WHERE id = ${id} LIMIT 1
  `;

    return result[0] as User || null;
}
