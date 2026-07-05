import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import WhoWeAre from './pages/WhoWeAre'
import Leadership from './pages/Leadership'
import Contact from './pages/Contact'
import AboutJesus from './pages/AboutJesus'
import Articles from './pages/Articles'
import Sermons from './pages/Sermons'
import Events from './pages/Events'
import Links from './pages/Links'
import Login from './pages/Login'
import Legal from './pages/Legal'
import FAQ from './pages/FAQ'
import Navbar from './components/Navbar'
import AccessibilityWidget from './components/AccessibilityWidget'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import WhatsAppButton from './components/WhatsAppButton'

function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem('member_token')
  return isAuth ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <div id="main-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/who-we-are" element={<><Navbar /><WhoWeAre /></>} />
          <Route path="/leadership" element={<><Navbar /><Leadership /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/about-jesus" element={<><Navbar /><AboutJesus /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/articles" element={<><Navbar /><Articles /></>} />
          <Route path="/sermons" element={<><Navbar /><Sermons /></>} />
          <Route path="/events" element={
            <ProtectedRoute>
              <><Navbar /><Events /></>
            </ProtectedRoute>
          } />
          <Route path="/links" element={<><Navbar /><Links /></>} />
          <Route path="/legal" element={<><Navbar /><Legal /></>} />
          <Route path="/faq" element={<><Navbar /><FAQ /></>} />
        </Routes>
        <Footer />
      </div>
      <CookieBanner />
      <AccessibilityWidget />
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App