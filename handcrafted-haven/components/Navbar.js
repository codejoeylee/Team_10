import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/"><a className="font-bold text-lg">Handcrafted Haven</a></Link>
        <div className="space-x-4">
          <Link href="/"><a>Home</a></Link>
          <Link href="/contact"><a>Contact</a></Link>
        </div>
      </div>
    </nav>
  )
}
