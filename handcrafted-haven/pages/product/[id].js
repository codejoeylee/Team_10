import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ProductPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Product: {id}</h1>
        <p>Replace this page with your product detail implementation (images, description, reviews, add-to-cart).</p>
      </main>
      <Footer />
    </div>
  )
}
