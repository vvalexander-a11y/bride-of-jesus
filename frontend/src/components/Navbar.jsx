import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useState, useEffect } from 'react'

function Navbar() {
  const { lang, setLang } = useLang()
  const [visible, setVisible] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current < 10) setVisible(true)
      else if (current > lastScroll) setVisible(false)
      else setVisible(true)
      setLastScroll(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  const labels = {
    en: { home: 'Home', whoweare: 'Who We Are', leadership: 'Leadership', contact: 'Get in Touch', jesus: 'More About Jesus', members: 'Members' },
    ru: { home: 'Дом', whoweare: 'Кто мы', leadership: 'Руководство', contact: 'Связаться', jesus: 'Больше об Иисусе', members: 'Прихожанам' },
    he: { home: 'בית', whoweare: 'מי אנחנו', leadership: 'הנהגה', contact: 'צרו קשר', jesus: 'עוד על ישוע', members: 'חברי קהילה' },
  }

  const t = labels[lang]
  const linkStyle = { color: '#f5f0e8', textDecoration: 'none', fontSize: '1.05rem' }
  const mobileLinkStyle = { color: '#f5f0e8', textDecoration: 'none', fontSize: '1.2rem', padding: '0.8rem 0', borderBottom: '1px solid #3d2b0d', display: 'block' }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(26,18,8,0.97)', backdropFilter: 'blur(8px)',
        padding: '0 2rem', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '64px',
        borderBottom: '1px solid #3d2b0d',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease',
      }}>
        <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ fontFamily: 'serif', fontSize: '1.5rem', color: '#c9a84c', textDecoration: 'none' }}>
          Bride of Jesus
        </Link>

        <div className="desktop-menu" style={{ display: 'flex', gap: '1.4rem' }}>
          <Link to="/" style={linkStyle}>{t.home}</Link>
          <Link to="/who-we-are" style={linkStyle}>{t.whoweare}</Link>
          <Link to="/leadership" style={linkStyle}>{t.leadership}</Link>
          <Link to="/contact" style={linkStyle}>{t.contact}</Link>
          <Link to="/about-jesus" style={linkStyle}>{t.jesus}</Link>
          <Link to="/login" style={{ ...linkStyle, color: '#c9a84c' }}>{t.members}</Link>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['en', 'ru', 'he'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{
                background: lang === l ? '#8a6a1f' : 'transparent',
                border: '1px solid #8a6a1f', color: '#e8cc7a',
                padding: '4px 10px', cursor: 'pointer', borderRadius: '2px', fontSize: '0.8rem'
              }}>{l.toUpperCase()}</button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="burger-btn"
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: '#c9a84c', fontSize: '1.5rem', padding: '4px 8px', display: 'none'
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 999,
          background: 'rgba(26,18,8,0.98)', padding: '1rem 2rem 2rem',
          borderBottom: '1px solid #3d2b0d',
          transform: visible ? 'translateY(0)' : 'translateY(-200%)',
          transition: 'transform 0.3s ease',
        }}>
          <Link to="/" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>{t.home}</Link>
          <Link to="/who-we-are" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>{t.whoweare}</Link>
          <Link to="/leadership" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>{t.leadership}</Link>
          <Link to="/contact" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>{t.contact}</Link>
          <Link to="/about-jesus" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>{t.jesus}</Link>
          <Link to="/login" style={{ ...mobileLinkStyle, color: '#c9a84c', border: 'none' }} onClick={() => setMenuOpen(false)}>{t.members}</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .burger-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar