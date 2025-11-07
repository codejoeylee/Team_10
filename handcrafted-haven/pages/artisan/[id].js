import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ArtisanPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Artisan: {id}</h1>
        <p>Replace this with the artisan profile (bio, gallery, products).</p>
      </main>
      <Footer />
    </div>
  )
}
