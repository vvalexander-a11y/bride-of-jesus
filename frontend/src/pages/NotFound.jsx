import { useLang } from '../context/LangContext'
import { localizedPath } from '../utils/lang'
import { Link } from 'react-router-dom'

function NotFound() {
  const { lang } = useLang()
  const isHe = lang === 'he'

  const t = {
    en: { title: 'Page Not Found', text: "The page you're looking for doesn't exist or has moved.", home: 'Back to Home' },
    ru: { title: 'Страница не найдена', text: 'Страница, которую вы ищете, не существует или была перемещена.', home: 'На главную' },
    he: { title: 'הדף לא נמצא', text: 'הדף שחיפשת אינו קיים או שהוסר.', home: 'חזרה לדף הבית' },
    es: { title: 'Página No Encontrada', text: 'La página que buscas no existe o ha sido movida.', home: 'Volver al Inicio' },
  }

  const T = t[lang]

  return (
    <div style={{
      minHeight: '100vh', background: '#faf7f2', color: '#2a1e08',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '4rem 8%', textAlign: 'center', direction: isHe ? 'rtl' : 'ltr'
    }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#c9a84c' }}>404</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '2rem', marginBottom: '1rem' }}>
          {T.title}
        </h1>
        <p style={{ color: '#5a4020', marginBottom: '2rem', fontSize: '1.05rem' }}>{T.text}</p>
        <Link to={localizedPath('/', lang)} style={{
          display: 'inline-block', background: '#3d2b0d', color: '#e8cc7a',
          padding: '0.8rem 2rem', borderRadius: '6px', textDecoration: 'none',
          fontFamily: 'Playfair Display, serif'
        }}>{T.home}</Link>
      </div>
    </div>
  )
}

export default NotFound
