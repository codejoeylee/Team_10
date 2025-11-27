# Backend Setup Guide

## Database Setup (Vercel Postgres)

### Option 1: Through Vercel Dashboard (Recommended)

1. **Push your project to GitHub**
2. **Import to Vercel** at https://vercel.com
3. **Go to Storage tab** in your project
4. **Create a Postgres database**
5. **Vercel automatically sets environment variables** for you
6. **Run the schema** in the Vercel Postgres Query tab

### Option 2: Local Development

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Link your project**: `vercel link`
3. **Pull environment variables**: `vercel env pull .env.local`
4. **Create `.env.local`** manually if needed:
   ```
   POSTGRES_URL=your-vercel-postgres-url
   JWT_SECRET=your-secure-random-string
   ```

## Initialize Database Schema

Run the SQL commands from `lib/schema.sql` in Vercel Postgres Query tab:

```sql
-- Copy and paste the contents of lib/schema.sql
```

## Project Structure

```
lib/
├── db.ts                 # Database connection
├── auth.ts              # Authentication utilities (bcrypt, JWT)
├── schemas.ts           # Zod validation schemas
├── queries/
│   ├── users.ts         # User CRUD operations
│   ├── products.ts      # Product CRUD operations
│   └── sellers.ts       # Seller profile CRUD operations
├── schema.sql           # Database schema
└── README.md            # This file
```

## Usage Examples

### Create a User
```typescript
import { createUser } from '@/lib/queries/users';

const user = await createUser({
  email: 'seller@example.com',
  password: 'securepassword',
  name: 'John Doe',
  role: 'seller'
});
```

### Authenticate User
```typescript
import { getUserByEmail } from '@/lib/queries/users';
import { verifyPassword, generateToken } from '@/lib/auth';

const user = await getUserByEmail('seller@example.com');
if (user && await verifyPassword('password', user.password)) {
  const token = generateToken({ userId: user.id, email: user.email });
}
```

### Create Product
```typescript
import { createProduct } from '@/lib/queries/products';

const product = await createProduct({
  sellerId: 'user-uuid',
  name: 'Handwoven Basket',
  description: 'Beautiful handcrafted basket',
  price: 85.00,
  category: 'Home Decor',
  imageUrl: 'https://example.com/image.jpg',
  stock: 10,
  isActive: true
});
```

### Get Products by Seller
```typescript
import { getProductsBySeller } from '@/lib/queries/products';

const products = await getProductsBySeller('seller-uuid');
```

## Security Notes

- Never commit `.env.local` to version control
- Use strong JWT secrets in production
- Passwords are automatically hashed with bcrypt
- JWT tokens expire after 7 days
