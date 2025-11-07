import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Contact</h1>
        <p>Replace this with a contact form or contact details.</p>
      </main>
      <Footer />
    </div>
  )
}
