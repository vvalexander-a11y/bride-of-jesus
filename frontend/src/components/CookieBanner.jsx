import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'

function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const { lang } = useLang()

  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted')
    if (!accepted) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookies_accepted', 'true')
    setVisible(false)
  }

  const t = {
    en: {
      text: 'This site uses local storage to remember your language preference and membership access. No tracking or advertising cookies are used.',
      accept: 'I Understand',
      more: 'Privacy Policy',
    },
    ru: {
      text: 'Этот сайт использует локальное хранилище для запоминания языка и доступа к разделу прихожан. Рекламные и отслеживающие куки не используются.',
      accept: 'Понятно',
      more: 'Политика конфиденциальности',
    },
    he: {
      text: 'אתר זה משתמש באחסון מקומי לזכירת שפה וגישה לאזור חברי הקהילה. לא נעשה שימוש בעוגיות מעקב או פרסום.',
      accept: 'הבנתי',
      more: 'מדיניות פרטיות',
    },
    es: {
      text: 'Este sitio utiliza almacenamiento local para recordar tu preferencia de idioma y tu acceso a la sección de miembros. No se utilizan cookies de seguimiento ni publicitarias.',
      accept: 'Entendido',
      more: 'Política de Privacidad',
    },
  }

  const T = t[lang]

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 4000,
      background: 'rgba(26,18,8,0.97)', borderTop: '1px solid #8a6a1f',
      padding: '1rem 2rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      direction: lang === 'he' ? 'rtl' : 'ltr'
    }}>
      <p style={{ color: '#d4c4a0', fontSize: '0.9rem', maxWidth: '700px', margin: 0 }}>
        {T.text}{' '}
        <Link to="/legal" style={{ color: '#c9a84c' }}>{T.more}</Link>
      </p>
      <button onClick={accept} style={{
        background: '#8a6a1f', border: 'none', borderRadius: '6px',
        color: '#f5f0e8', padding: '8px 24px', cursor: 'pointer',
        fontFamily: 'serif', fontSize: '0.95rem', whiteSpace: 'nowrap'
      }}>
        {T.accept}
      </button>
    </div>
  )
}

export default CookieBanner