import Link from 'next/link'

export default function ProductCard({ id, title }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="h-40 bg-gray-100 mb-3 flex items-center justify-center">Image</div>
      <h3 className="font-semibold">{title || 'Product Title'}</h3>
      <p className="text-sm text-gray-600">Price</p>
      <Link href={`/product/${id || '1'}`}><a className="inline-block mt-3 underline">View</a></Link>
    </div>
  )
}
