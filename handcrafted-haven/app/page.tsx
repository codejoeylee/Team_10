'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


// ---GUYS STATIC DATA ---
const Products = [
  {
    id: 1,
    name: 'Handwoven Tote Bag',
    price: '$85.00',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&q=80'
  },
  {
    id: 2,
    name: 'Ceramic Vase',
    price: '$55.00',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&q=80'
  },
  {
    id: 3,
    name: 'Organic Cotton T Shirt',
    price: '$55.00',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'
  },
];

const categories = [
  {
    id: 1,
    title: 'Home Decor',
    description: 'Handcrafted pieces to beautify your space',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80'
  },
  {
    id: 2,
    title: 'Fashion & Accessories',
    description: 'Unique wearables and vintage finds',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80'
  },
  {
    id: 3,
    title: 'Artisan Crafts',
    description: 'One-of-a-kind handmade treasures',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80'
  },
  {
    id: 4,
    title: 'Pottery & Ceramics',
    description: 'Functional art for everyday use',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80'
  },
];

// ---GUYS REUSABLE COMPONENTS ---

const StarRating = () => {
  return (
    <div className="flex space-x-0.5 text-sm">
      <span className="text-yellow-500">★</span>
      <span className="text-yellow-500">★</span>
      <span className="text-yellow-500">★</span>
      <span className="text-yellow-500">★</span>
      <span className="text-yellow-500">★</span>
    </div>
  );
};

const ProductCard = ({ name, price, image }: { name: string; price: string; image: string }) => (
  <div className="flex flex-col group cursor-pointer">
    <div className="w-full h-80 bg-stone-100 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-medium text-stone-900">{name}</h3>
      <p className="mt-1 text-sm text-stone-700">{price}</p>
      <div className="mt-1">
        <StarRating />
      </div>
    </div>
  </div>
);

const CategoryCard = ({ title, description, image }: { title: string; description: string; image: string }) => (
  <div className="group cursor-pointer">
    <div className="w-full h-64 bg-stone-100 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
    <h3 className="mt-4 text-xl font-medium text-stone-900">{title}</h3>
    <p className="mt-2 text-sm text-stone-600">{description}</p>
  </div>
);

// --- FOOTER COMPONENT ---
const Footer = () => (
  <footer className="bg-stone-50 border-t border-stone-200 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-12 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-serif font-semibold text-stone-900 mb-4">
            Handcrafted Haven
          </h3>
          <p className="text-sm text-stone-600">
            A curated marketplace for vintage and handmade goods.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-medium text-stone-800 mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-stone-600">
            <li><a href="#" className="hover:text-stone-900">New Arrivals</a></li>
            <li><a href="#" className="hover:text-stone-900">Sales</a></li>
            <li><a href="#" className="hover:text-stone-900">Collections</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-medium text-stone-800 mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-stone-600">
            <li><a href="#" className="hover:text-stone-900">FAQ</a></li>
            <li><a href="#" className="hover:text-stone-900">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-stone-900">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-medium text-stone-800 mb-4">Connect</h4>
          <ul className="space-y-2 text-sm text-stone-600">
            <li><a href="#" className="hover:text-stone-900">Instagram</a></li>
            <li><a href="#" className="hover:text-stone-900">Pinterest</a></li>
            <li><a href="#" className="hover:text-stone-900">Terms & Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-stone-200 text-center">
        <p className="text-sm text-stone-500">
          &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- MAIN PAGE COMPONENT ---
export default function MarketplacePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Head>
        <title>Handcrafted Haven Marketplace</title>
      </Head>

      {/*Navigation bar*/}
      <nav className="py-6 px-4 sm:px-12 border-b border-stone-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-serif font-semibold text-stone-900">
            Handcrafted Haven
          </div>
          <div className="flex space-x-8 text-lg font-medium text-stone-700">
            <Link href="/shop" className="hover:text-stone-900">Shop</Link>
            <Link href="/shop" className="hover:text-stone-900">Category</Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover:text-stone-900">
                Logout
              </button>
            ) : (
              <Link href="/login" className="hover:text-stone-900">Log In</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Container: flex-grow ensures this takes up all remaining space 
          before the footer, pushing the footer to the bottom. 
          The max-w-7xl centering is essential here.
      */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-12 pt-16">

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Text and Button Column */}
          <div className="flex flex-col space-y-8">
            <h1 className="text-6xl font-serif font-semibold text-stone-900 leading-tight">
              Explore our marketplace
            </h1>
            <p className="text-xl text-stone-600">
              A marketplace of <span className="font-semibold text-amber-900 italic">vintage, hand-hewn goods.</span>
            </p>
            <Link href="/shop">
              <button className="w-fit px-8 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition duration-150 shadow-md">
                explore categories
              </button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="w-full rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
              alt="Handwoven basket"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* FEATURED PRODUCTS SECTION */}
        <section className="mt-20">
          <h2 className="text-4xl font-serif font-semibold text-stone-900 mb-10">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {Products.map((product) => (
              <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} />
            ))}
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-semibold text-stone-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-stone-600">
              Discover unique handcrafted items across our curated collections
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} title={category.title} description={category.description} image={category.image} />
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="mt-24 bg-stone-50 -mx-4 sm:-mx-12 px-4 sm:px-12 py-16 rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-semibold text-stone-900 mb-6">
                Crafted with Care
              </h2>
              <p className="text-lg text-stone-600 mb-4">
                Every item in our marketplace tells a story. We partner with talented artisans
                and vintage collectors to bring you unique, high-quality pieces that add character
                to your life.
              </p>
              <p className="text-lg text-stone-600 mb-6">
                From hand-thrown pottery to vintage textiles, each product is carefully selected
                to ensure authenticity and craftsmanship.
              </p>
              <button className="px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition duration-150">
                Learn Our Story
              </button>
            </div>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
                alt="Craftsman at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="mt-24">
          <h2 className="text-4xl font-serif font-semibold text-stone-900 mb-12 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-stone-200 rounded-lg p-8">
              <StarRating />
              <p className="mt-4 text-stone-700 italic">
                "The quality is exceptional. I love supporting artisans and finding unique pieces
                that you can't get anywhere else."
              </p>
              <p className="mt-4 text-sm font-medium text-stone-900">— Sarah M.</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-lg p-8">
              <StarRating />
              <p className="mt-4 text-stone-700 italic">
                "Every purchase feels special. The attention to detail and craftsmanship is
                evident in everything I've ordered."
              </p>
              <p className="mt-4 text-sm font-medium text-stone-900">— James L.</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-lg p-8">
              <StarRating />
              <p className="mt-4 text-stone-700 italic">
                "I've found so many treasures here. The vintage selection is curated perfectly,
                and shipping is always fast."
              </p>
              <p className="mt-4 text-sm font-medium text-stone-900">— Emily R.</p>
            </div>
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="mt-24 mb-16 bg-amber-50 -mx-4 sm:-mx-12 px-4 sm:px-12 py-16 rounded-2xl text-center">
          <h2 className="text-3xl font-serif font-semibold text-stone-900 mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            Subscribe to our newsletter for new arrivals, artisan spotlights, and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
            <button className="px-6 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition duration-150">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}