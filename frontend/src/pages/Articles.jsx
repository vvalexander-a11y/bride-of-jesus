import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLang } from '../context/LangContext'

function Articles() {
  const [articles, setArticles] = useState([])
  const { lang } = useLang()

  useEffect(() => {
    axios.get('/api/articles/')
      .then(res => setArticles(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
  }, [])

  function getTitle(a) { return a['title_' + lang] || a.title_en }
  function getContent(a) { return a['content_' + lang] || a.content_en }

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a1e08', padding: '4rem 8%' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '2.5rem', marginBottom: '3rem', borderBottom: '2px solid #c9a84c', paddingBottom: '1rem' }}>
        {lang === 'en' ? 'Articles' : lang === 'ru' ? 'Статьи' : 'מאמרים'}
      </h1>

      {articles.length === 0 && (
        <p style={{ color: '#8a6a1f' }}>
          {lang === 'en' ? 'No articles yet.' : lang === 'ru' ? 'Статей пока нет.' : 'אין מאמרים עדיין.'}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {articles.map(a => (
          <div key={a.id} style={{
            background: 'white', border: '1px solid #e8d5a3',
            borderRadius: '8px', padding: '2rem',
            boxShadow: '0 2px 12px rgba(201,168,76,0.1)'
          }}>
            {a.image && <img src={a.image} alt={getTitle(a)} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1.5rem' }} />}
            <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', marginBottom: '0.5rem', fontSize: '1.5rem' }}>{getTitle(a)}</h2>
            <p style={{ color: '#8a6a1f', fontSize: '0.9rem', marginBottom: '1rem' }}>{new Date(a.created_at).toLocaleDateString()}</p>
            <p style={{ color: '#5a4020', lineHeight: '1.8' }}>{getContent(a)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Articles