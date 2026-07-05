import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

function Footer() {
  const { lang } = useLang()

  const t = {
    en: { legal: 'Privacy Policy & Accessibility', rights: 'Bride of Jesus Congregation · Afula, Israel' },
    ru: { legal: 'Политика конфиденциальности и доступность', rights: 'Община «Невеста Иисуса» · Афула, Израиль' },
    he: { legal: 'מדיניות פרטיות ונגישות', rights: 'קהילת "כלת ישוע" · עפולה, ישראל' },
  }

  const T = t[lang]

  return (
    <footer style={{
      background: '#0a0704', color: '#8a6a1f',
      textAlign: 'center', padding: '24px',
      fontSize: '13px', borderTop: '1px solid #3d2b0d'
    }}>
      <div style={{ marginBottom: '8px' }}>{T.rights}</div>
      <Link to="/legal" style={{ color: '#c9a84c', textDecoration: 'none', fontSize: '12px' }}>
        ♿ {T.legal}
      </Link>
    </footer>
  )
}

export default Footer