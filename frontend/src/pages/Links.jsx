import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLang } from '../context/LangContext'

function Links() {
  const [links, setLinks] = useState([])
  const { lang } = useLang()

  useEffect(() => {
    axios.get('/api/links/')
      .then(res => setLinks(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
  }, [])

  const staticLinks = [
    { id: 's1', title: 'www.yeshua.co.il', url: 'https://www.yeshua.co.il', description: '' },
    { id: 's2', title: 'igod.co.il', url: 'https://igod.co.il/', description: '' },
    { id: 's3', title: 'www.oneforisrael.org', url: 'https://www.oneforisrael.org/', description: '' },
  ]

  const allLinks = links.length > 0 ? links : staticLinks

  const title = lang === 'en' ? 'Useful Links' : lang === 'ru' ? 'Полезные ссылки' : 'קישורים שימושיים'
  const disclaimer = lang === 'en'
    ? 'We are not directly responsible for external content'
    : lang === 'ru'
    ? 'Мы не несём ответственности за внешний контент'
    : 'אנחנו לא אחראים ישירות לתוכן האתרים הבאים'

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a1e08', padding: '4rem 8%' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '2.5rem', marginBottom: '0.5rem', borderBottom: '2px solid #c9a84c', paddingBottom: '1rem' }}>
        {title}
      </h1>
      <p style={{ color: '#8a6a1f', fontSize: '0.9rem', marginBottom: '3rem', marginTop: '1rem' }}>{disclaimer}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '700px' }}>
        {allLinks.map(link => (
          <a key={link.id} href={link.url} target="_blank" rel="noreferrer" style={{
            background: 'white', border: '1px solid #e8d5a3',
            borderRadius: '8px', padding: '1.2rem 1.5rem',
            textDecoration: 'none', display: 'block',
            boxShadow: '0 2px 8px rgba(201,168,76,0.1)',
            transition: 'box-shadow 0.2s, transform 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(201,168,76,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ color: '#3d2b0d', fontSize: '1.1rem', fontFamily: 'Playfair Display, serif' }}>{link.title}</div>
            {link.description && <div style={{ color: '#8a6a1f', fontSize: '0.9rem', marginTop: '4px' }}>{link.description}</div>}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Links