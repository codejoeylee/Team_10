import { z } from 'zod';

// User schemas
export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
    role: z.enum(['seller', 'buyer', 'admin']),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

// Seller Profile schemas
export const SellerProfileSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    businessName: z.string().min(2),
    bio: z.string().optional(),
    location: z.string().optional(),
    specialty: z.string().optional(),
    imageUrl: z.string().url().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateSellerProfileSchema = SellerProfileSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

// Product schemas
export const ProductSchema = z.object({
    id: z.string().uuid(),
    sellerId: z.string().uuid(),
    name: z.string().min(2),
    description: z.string().optional(),
    price: z.number().positive(),
    category: z.string(),
    imageUrl: z.string().url().optional(),
    stock: z.number().int().nonnegative(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateProductSchema = ProductSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export const UpdateProductSchema = CreateProductSchema.partial();


// Review schemas
export const ReviewSchema = z.object({
    id: z.string().uuid(),
    productId: z.string().uuid(),
    userId: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CreateReviewSchema = ReviewSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});




// Type exports
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type SellerProfile = z.infer<typeof SellerProfileSchema>;
export type CreateSellerProfile = z.infer<typeof CreateSellerProfileSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type CreateReview = z.infer<typeof CreateReviewSchema>;