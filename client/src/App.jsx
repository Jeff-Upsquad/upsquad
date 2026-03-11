import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import Categories from './components/Categories'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Categories />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
