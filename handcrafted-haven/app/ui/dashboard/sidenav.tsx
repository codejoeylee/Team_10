import Link from 'next/link';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col bg-stone-50 border-r border-stone-200">
            <Link href="/" className="flex items-center p-6 border-b border-stone-200">
                <h2 className="text-xl font-serif font-semibold text-stone-900">
                    Handcrafted Haven
                </h2>
            </Link>
            <div className="flex flex-col gap-2 p-4">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                    <span>Dashboard</span>
                </Link>
                <Link
                    href="/dashboard/productlisting"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                    <span>Product Listing</span>
                </Link>
                <Link
                    href="/dashboard/sellerprofile"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                    <span>Seller Profile</span>
                </Link>
                <Link
                    href="/dashboard/community"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                >
                    <span>Community</span>
                </Link>
            </div>
        </div>
    );
}