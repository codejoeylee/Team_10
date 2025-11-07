import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Handcrafted Haven</title>
        <meta name="description" content="Marketplace for handmade goods" />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto p-6">
        <section className="text-center py-12">
          <h1 className="text-4xl font-serif mb-4">Handcrafted Haven</h1>
          <p className="max-w-2xl mx-auto">A marketplace for artisans to showcase and sell unique handmade items. Replace this text with your project content.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Featured Items</h2>
          <p className="text-sm text-gray-600">Add product listings here.</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
