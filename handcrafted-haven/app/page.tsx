import Head from 'next/head';

// --- MOCK DATA ---
const mockProducts = [
  { id: 1, name: 'Handwoven Tote Bag', price: 85.00, rating: 5 },
  { id: 2, name: 'Ceramic Vase', price: 55.00, rating: 5 },
  { id: 3, name: 'Organic Cotton T Shirt', price: 55.00, rating: 5 },
];

// --- REUSABLE COMPONENTS (StarRating and ProductCard remain the same) ---

const StarRating = ({ rating = 5 }) => { /* ... (Unchanged) ... */
  const fullStars = Array(rating).fill('★');
  const emptyStars = Array(5 - rating).fill('★'); 

  return (
    <div className="flex space-x-0.5 text-xs">
      <div className="text-yellow-600">
        {fullStars.map((star, index) => (
          <span key={`full-${index}`}>{star}</span>
        ))}
      </div>
      <div className="text-gray-300">
        {emptyStars.map((star, index) => (
          <span key={`empty-${index}`}>{star}</span>
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => ( /* ... (Unchanged) ... */
  <div className="flex flex-col">
    <div
      className="w-full h-80 bg-stone-100 flex items-center justify-center overflow-hidden rounded-lg"
    >
      <span className="text-stone-400 font-medium">Product Image Area</span>
    </div>

    <div className="mt-4">
      <h3 className="text-lg font-medium text-stone-900">{product.name}</h3>
      <p className="mt-1 text-sm text-stone-700">${product.price.toFixed(2)}</p>
      <div className="mt-1">
        <StarRating rating={product.rating} />
      </div>
    </div>
  </div>
);

// --- FOOTER COMPONENT (Unchanged) ---
const Footer = () => ( /* ... (Unchanged) ... */
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
                    &copy; {new Date().getFullYear()} HI Handcrafted Haven. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

// --- MAIN PAGE COMPONENT ---
export default function MarketplacePage() {
  return (
    // Set min-height and flex column for sticky footer
    <div className="min-h-screen bg-white flex flex-col">
      <Head>
        <title>Handcrafted Haven Marketplace</title>
      </Head>

      {/* 🛑 Navigation Bar: Removed redundant max-w-7xl from inside the nav 
           and ensured it uses the correct flex properties. This section is now 
           correctly aligned across the top of the page.
      */}
      <nav className="py-6 px-4 sm:px-12 border-b border-stone-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-2xl font-serif font-semibold text-stone-900">
                Handcrafted Haven
            </div>
            <div className="flex space-x-8 text-lg font-medium text-stone-700">
            <a href="#" className="hover:text-stone-900">Shop</a>
            <a href="#" className="hover:text-stone-900">Category</a>
            <a href="#" className="hover:text-stone-900">Log In</a>
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
              A marketplace of **vintage, hand-hewn goods.**
            </p>
            <button className="w-fit px-8 py-3 bg-amber-900 text-white font-medium rounded-lg hover:bg-amber-800 transition duration-150 shadow-md">
              explore categories
            </button>
          </div>

          {/* Image Column Placeholder */}
          <div className="w-full bg-stone-100 rounded-xl overflow-hidden shadow-lg p-6">
            <div 
                className="w-full h-96 bg-stone-200 flex items-center justify-center rounded-lg"
            >
                 <span className="text-stone-500 font-medium">Main Hero Image Area</span>
            </div>
          </div>
        </div>
      
        {/* PRODUCT GRID SECTION */}
        <section className="mt-20">
          <h2 className="text-4xl font-serif font-semibold text-stone-900 mb-10">
            Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      
      {/* FOOTER CALL */}
      <Footer />
    </div>
  );
}