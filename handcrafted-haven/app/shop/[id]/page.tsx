'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
}

interface Review {
    id: string;
    rating: number;
    comment: string;
    user_name: string;
    created_at: string;
}

interface Seller {
    businessName: string;
    bio: string;
    location: string;
    specialty: string;
    imageUrl: string;
}

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart, cartCount } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [seller, setSeller] = useState<Seller | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        if (params.id) {
            fetchProduct(params.id as string);
            fetchSeller(params.id as string);
            fetchReviews(params.id as string);
        }
    }, [params.id]);

    const fetchProduct = async (id: string) => {
        try {
            const response = await fetch(`/api/products/${id}`);
            const data = await response.json();

            if (data.success) {
                setProduct(data.product);
            }
        } catch (err) {
            console.error('Failed to fetch product');
        } finally {
            setLoading(false);
        }
    };

    const fetchSeller = async (productId: string) => {
        try {
            const response = await fetch(`/api/products/${productId}/seller`);
            const data = await response.json();

            if (data.success) {
                setSeller(data.seller);
            }
        } catch (err) {
            console.error('Failed to fetch seller info');
        }
    };

    const fetchReviews = async (id: string) => {
        try {
            const response = await fetch(`/api/reviews?productId=${id}`);
            const data = await response.json();

            if (data.success) {
                setReviews(data.reviews);
                const avg = data.reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / data.reviews.length;
                setAverageRating(avg || 0);
            }
        } catch (err) {
            console.error('Failed to fetch reviews');
        }
    };

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                addToCart({
                    id: product.id,
                    name: product.name,
                    price: Number(product.price),
                    imageUrl: product.imageUrl || '',
                });
            }
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to leave a review');
            return;
        }

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: params.id,
                    rating: reviewForm.rating,
                    comment: reviewForm.comment,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setShowReviewForm(false);
                setReviewForm({ rating: 5, comment: '' });
                fetchReviews(params.id as string);
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Failed to submit review');
        }
    };

    const StarDisplay = ({ rating }: { rating: number }) => (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}>
                    ★
                </span>
            ))}
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-stone-900 flex items-center justify-center">
                <div className="text-lg text-stone-600 dark:text-stone-300">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white dark:bg-stone-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
                        Product Not Found
                    </h1>
                    <Link href="/shop">
                        <button className="px-6 py-3 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition">
                            Back to Shop
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-stone-900">
            {/* Navigation */}
            <nav className="py-4 sm:py-6 px-4 sm:px-12 border-b border-stone-100 dark:border-stone-800">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <Link href="/" className="text-xl sm:text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                        Handcrafted Haven
                    </Link>
                    <div className="flex space-x-4 sm:space-x-8 text-base sm:text-lg font-medium text-stone-700 dark:text-stone-300">
                        <Link href="/shop" className="hover:text-stone-900 dark:hover:text-stone-100">
                            <span className="hidden sm:inline">Shop</span>
                            <svg className="w-6 h-6 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </Link>
                        <Link href="/cart" className="hover:text-stone-900 dark:hover:text-stone-100 relative">
                            <span className="hidden sm:inline">Cart</span>
                            <svg className="w-6 h-6 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                router.push('/login');
                            }}
                            className="hover:text-stone-900 dark:hover:text-stone-100 hidden sm:block"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                router.push('/login');
                            }}
                            className="hover:text-stone-900 dark:hover:text-stone-100 sm:hidden"
                            aria-label="Logout"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>


            {/* Product Detail */}
            <main className="max-w-7xl mx-auto px-4 sm:px-12 py-16">
                <Link href="/shop" className="text-amber-900 dark:text-amber-500 hover:underline mb-8 inline-block">
                    ← Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Image */}
                    <div className="bg-stone-100 dark:bg-stone-800 rounded-lg overflow-hidden aspect-square">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-sm font-medium rounded-full">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-4xl font-serif font-semibold text-stone-900 dark:text-stone-100 mb-4">
                            {product.name}
                        </h1>

                        {/* Rating Display */}
                        <div className="flex items-center gap-3 mb-4">
                            <StarDisplay rating={Math.round(averageRating)} />
                            <span className="text-stone-600 dark:text-stone-300">
                                {averageRating > 0 ? averageRating.toFixed(1) : 'No reviews yet'} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>

                        <div className="text-3xl font-bold text-amber-900 dark:text-amber-500 mb-6">
                            ${Number(product.price).toFixed(2)}
                        </div>

                        <div className="mb-6">
                            {product.stock > 0 ? (
                                <span className="text-green-600 dark:text-green-500 font-medium">
                                    ✓ In Stock ({product.stock} available)
                                </span>
                            ) : (
                                <span className="text-red-600 dark:text-red-500 font-medium">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                                Description
                            </h2>
                            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                                {product.description || 'This beautiful handcrafted item is made with care and attention to detail.'}
                            </p>
                        </div>

                        {/* Seller Info */}
                        {seller && (
                            <div className="mb-8 p-4 bg-stone-50 dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
                                <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                                    About the Artisan
                                </h2>
                                <div className="flex items-start gap-4">
                                    {seller.imageUrl && (
                                        <img
                                            src={seller.imageUrl}
                                            alt={seller.businessName}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-stone-900 dark:text-stone-100">
                                            {seller.businessName}
                                        </h3>
                                        {seller.location && (
                                            <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                                                📍 {seller.location}
                                            </p>
                                        )}
                                        {seller.specialty && (
                                            <p className="text-sm text-amber-900 dark:text-amber-500 mb-2">
                                                Specialty: {seller.specialty}
                                            </p>
                                        )}
                                        {seller.bio && (
                                            <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
                                                {seller.bio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg w-32">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700 transition"
                                >
                                    −
                                </button>
                                <span className="px-4 py-2 border-x border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-100 flex-1 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                    className="px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700 transition disabled:opacity-50"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="w-full px-8 py-4 bg-amber-900 text-white font-medium text-lg rounded-lg hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <Link href="/shop">
                            <button className="w-full px-8 py-4 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 font-medium rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t border-stone-200 dark:border-stone-700 pt-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                            Customer Reviews
                        </h2>
                        {typeof window !== 'undefined' && localStorage.getItem('token') ? (
                            <button
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                className="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition"
                            >
                                Write a Review
                            </button>
                        ) : (
                            <Link href="/login">
                                <button className="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition">
                                    Login to Review
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <form onSubmit={handleSubmitReview} className="bg-stone-50 dark:bg-stone-800 rounded-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
                                Leave a Review
                            </h3>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                    Rating
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                            className="text-3xl"
                                        >
                                            <span className={star <= reviewForm.rating ? 'text-yellow-500' : 'text-gray-300'}>
                                                ★
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                    Comment
                                </label>
                                <textarea
                                    rows={4}
                                    value={reviewForm.comment}
                                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                    className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                                    placeholder="Share your experience with this product..."
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition"
                                >
                                    Submit Review
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowReviewForm(false)}
                                    className="px-6 py-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Reviews List */}
                    {reviews.length === 0 ? (
                        <p className="text-center text-stone-600 dark:text-stone-300 py-8">
                            No reviews yet. Be the first to review this product!
                        </p>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="border-b border-stone-200 dark:border-stone-700 pb-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <StarDisplay rating={review.rating} />
                                        <span className="font-medium text-stone-900 dark:text-stone-100">
                                            {review.user_name}
                                        </span>
                                        <span className="text-sm text-stone-500 dark:text-stone-400">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {review.comment && (
                                        <p className="text-stone-600 dark:text-stone-300 mt-2">
                                            {review.comment}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

