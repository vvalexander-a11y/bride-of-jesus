import { createContext, useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { URL_LANGS, localizedPath } from '../utils/lang'

const LangContext = createContext()

const MEMBER_PATHS = ['/login', '/events']

function isMemberPath(pathname) {
  return MEMBER_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
}

function detectBrowserLang() {
  const browserLang = navigator.language.slice(0, 2)
  if (browserLang === 'ru') return 'ru'
  if (browserLang === 'he') return 'he'
  return 'en'
}

export function LangProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  // Раздел прихожан (Events/Login) хранит язык независимо от URL — как и раньше.
  const [memberLang, setMemberLang] = useState(detectBrowserLang)

  const memberRoute = isMemberPath(location.pathname)
  const segments = location.pathname.split('/').filter(Boolean)
  const urlLang = URL_LANGS.includes(segments[0]) ? segments[0] : 'he'

  const lang = memberRoute ? memberLang : urlLang

  function setLang(newLang) {
    if (memberRoute) {
      setMemberLang(newLang)
      return
    }
    const rest = URL_LANGS.includes(segments[0]) ? segments.slice(1) : segments
    const restPath = rest.length ? '/' + rest.join('/') : '/'
    navigate(localizedPath(restPath, newLang))
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'

    if (memberRoute) {
      // Раздел прихожан не индексируется под языковыми URL — hreflang не нужен.
      document.querySelectorAll('link[data-hreflang]').forEach(el => el.remove())
      return
    }

    const rest = URL_LANGS.includes(segments[0]) ? segments.slice(1) : segments
    const canonicalPath = rest.length ? '/' + rest.join('/') : '/'
    const origin = window.location.origin

    const entries = [
      ['he', canonicalPath],
      ['en', localizedPath(canonicalPath, 'en')],
      ['ru', localizedPath(canonicalPath, 'ru')],
      ['es', localizedPath(canonicalPath, 'es')],
    ]

    entries.forEach(([hreflang, path]) => {
      let el = document.querySelector(`link[data-hreflang="${hreflang}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'alternate')
        el.setAttribute('hreflang', hreflang)
        el.setAttribute('data-hreflang', hreflang)
        document.head.appendChild(el)
      }
      el.setAttribute('href', origin + path)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, lang])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
