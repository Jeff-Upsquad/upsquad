import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pricing from './pages/Pricing'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F7F6F3] text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
