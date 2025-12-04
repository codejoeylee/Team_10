'use client';

import { useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
    isActive: boolean;
}

interface ProductForm {
    name: string;
    description: string;
    price: string;
    category: string;
    imageUrl: string;
    stock: string;
    isActive: boolean;
}

export default function ProductListingPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<ProductForm>({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        stock: '',
        isActive: true,
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();

            if (data.success) {
                setProducts(data.products);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description || '',
                price: product.price.toString(),
                category: product.category,
                imageUrl: product.imageUrl || '',
                stock: product.stock.toString(),
                isActive: product.isActive,
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                imageUrl: '',
                stock: '',
                isActive: true,
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData: any = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            stock: parseInt(formData.stock),
            isActive: formData.isActive,
        };

        // Only include imageUrl if it has a value
        if (formData.imageUrl && formData.imageUrl.trim() !== '') {
            productData.imageUrl = formData.imageUrl;
        }

        try {
            const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
            const method = editingProduct ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();

            if (data.success) {
                fetchProducts();
                handleCloseModal();
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Failed to save product');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();

            if (data.success) {
                fetchProducts();
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-stone-600 dark:text-stone-300">Loading products...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                    Product Listings
                </h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-6 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition"
                >
                    Add New Product
                </button>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-stone-600 dark:text-stone-300 text-lg mb-4">
                        No products yet. Start by adding your first product!
                    </p>
                    <button
                        onClick={() => handleOpenModal()}
                        className="px-6 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition"
                    >
                        Add Product
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                            <div className="h-48 bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-stone-400">No Image</span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-stone-600 dark:text-stone-300 mb-3 line-clamp-2">
                                    {product.description || 'No description'}
                                </p>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xl font-bold text-amber-900 dark:text-amber-500">
                                        ${Number(product.price).toFixed(2)}
                                    </span>
                                    <span className="text-sm text-stone-600 dark:text-stone-300">
                                        Stock: {product.stock}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleOpenModal(product)}
                                        className="flex-1 px-4 py-2 bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100 rounded hover:bg-stone-200 dark:hover:bg-stone-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="flex-1 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-800 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Product Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-stone-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-serif font-semibold text-stone-900 dark:text-stone-100">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 text-2xl"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                                        placeholder="Handwoven Basket"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                                        placeholder="Describe your product..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                            Price *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            required
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                            Stock *
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                        Category *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                                        placeholder="Home Decor, Fashion, etc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-900 dark:text-stone-100 mb-2">
                                        Image URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900 dark:bg-stone-700 dark:text-stone-100"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 text-amber-900 border-stone-300 rounded focus:ring-amber-900"
                                    />
                                    <label htmlFor="isActive" className="ml-2 text-sm text-stone-900 dark:text-stone-100">
                                        Active (visible to buyers)
                                    </label>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 px-6 py-3 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition"
                                    >
                                        {editingProduct ? 'Update Product' : 'Add Product'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
