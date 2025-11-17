export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Handcrafted Haven</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900">Shop</a>
            <a href="/categories" className="text-gray-600 hover:text-gray-900">Categories</a>
            <a href="/artisan" className="text-gray-600 hover:text-gray-900">Artisans</a>
          </div>
          
          {/* Login */}
          <div>
            <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
          </div>
        </div>
      </div>
    </nav>
  );
}