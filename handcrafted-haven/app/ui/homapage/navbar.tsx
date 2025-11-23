export default function Navbar() {
    return (
        <>
            {/*Navigation bar*/}
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
        </>
    );
}