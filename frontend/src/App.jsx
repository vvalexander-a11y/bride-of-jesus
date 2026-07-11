import { Routes, Route, Navigate, Outlet, useParams, useLocation } from 'react-router-dom'
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
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import AccessibilityWidget from './components/AccessibilityWidget'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import WhatsAppButton from './components/WhatsAppButton'
import { URL_LANGS } from './utils/lang'

function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem('member_token')
  return isAuth ? children : <Navigate to="/login" />
}

// Публичные страницы. Каждая рендерится дважды: без префикса (иврит, корень)
// и вложенно под /:lang (en/ru/es) — см. Routes ниже.
const pageRoutes = [
  { path: '/', Component: Home },
  { path: '/who-we-are', Component: WhoWeAre },
  { path: '/leadership', Component: Leadership },
  { path: '/contact', Component: Contact },
  { path: '/about-jesus', Component: AboutJesus },
  { path: '/articles', Component: Articles },
  { path: '/sermons', Component: Sermons },
  { path: '/links', Component: Links },
  { path: '/legal', Component: Legal },
  { path: '/faq', Component: FAQ },
]

const KNOWN_PATHS = pageRoutes.map(r => r.path)

function withNavbar(Component) {
  return <><Navbar /><Component /></>
}

// Проверяет :lang. Если он не en/ru/es:
//  - и путь после префикса существует — редирект на ивритскую версию того же пути;
//  - иначе — 404.
// Если lang валиден — пропускает дальше вложенные роуты (Outlet).
function LangGuard() {
  const { lang } = useParams()
  const location = useLocation()

  if (URL_LANGS.includes(lang)) {
    return <Outlet />
  }

  const segments = location.pathname.split('/').filter(Boolean)
  const rest = segments.slice(1)
  const restPath = rest.length ? '/' + rest.join('/') : '/'

  if (KNOWN_PATHS.includes(restPath)) {
    return <Navigate to={restPath} replace />
  }

  return withNavbar(NotFound)
}

function App() {
  return (
    <>
      <div id="main-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          {/* Раздел прихожан — без языковых URL, не меняется */}
          <Route path="/login" element={withNavbar(Login)} />
          <Route path="/events" element={
            <ProtectedRoute>{withNavbar(Events)}</ProtectedRoute>
          } />

          {/* Иврит — язык по умолчанию, без префикса */}
          {pageRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={withNavbar(Component)} />
          ))}

          {/* en / ru / es — с языковым префиксом */}
          <Route path="/:lang" element={<LangGuard />}>
            {pageRoutes.map(({ path, Component }) =>
              path === '/' ? (
                <Route key="index" index element={withNavbar(Component)} />
              ) : (
                <Route key={path} path={path.slice(1)} element={withNavbar(Component)} />
              )
            )}
            <Route path="*" element={withNavbar(NotFound)} />
          </Route>
        </Routes>
        <Footer />
      </div>
      <CookieBanner />
      <AccessibilityWidget />
      <WhatsAppButton />
    </>
  )
}

export default App
