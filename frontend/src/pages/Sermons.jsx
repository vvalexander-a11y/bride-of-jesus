import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLang } from '../context/LangContext'

function Sermons() {
  const [sermons, setSermons] = useState([])
  const [selected, setSelected] = useState(null)
  const [fontSize, setFontSize] = useState(18)
  const { lang } = useLang()

  useEffect(() => {
    axios.get('/api/sermons/')
      .then(res => setSermons(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
  }, [])

  function getTitle(s) { return s['title_' + lang] || s.title_en }
  function getDesc(s) { return s['description_' + lang] || s.description_en }
  function getContent(s) { return s['content_' + lang] || s.content_en }

  const t = {
    en: { title: 'Sermons', noSermons: 'No sermons yet.', read: 'Read', download: 'Download', watch: 'Watch', close: 'Close' },
    ru: { title: 'Проповеди', noSermons: 'Проповедей пока нет.', read: 'Читать', download: 'Скачать', watch: 'Смотреть', close: 'Закрыть' },
    he: { title: 'דרשות', noSermons: 'אין דרשות עדיין.', read: 'קרא', download: 'הורד', watch: 'צפה', close: 'סגור' },
    es: { title: 'Sermones', noSermons: 'Aún no hay sermones.', read: 'Leer', download: 'Descargar', watch: 'Ver', close: 'Cerrar' },
  }
  const T = t[lang]

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a1e08', padding: '4rem 8%' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '2.5rem', marginBottom: '3rem', borderBottom: '2px solid #c9a84c', paddingBottom: '1rem' }}>
        {T.title}
      </h1>

      {sermons.length === 0 && <p style={{ color: '#8a6a1f' }}>{T.noSermons}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {sermons.map(s => (
          <div key={s.id} style={{
            background: 'white', border: '1px solid #e8d5a3',
            borderRadius: '8px', padding: '1.5rem 2rem',
            boxShadow: '0 2px 12px rgba(201,168,76,0.1)'
          }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', marginBottom: '0.5rem' }}>{getTitle(s)}</h2>
            <p style={{ color: '#8a6a1f', fontSize: '0.9rem', marginBottom: '0.8rem' }}>
              {s.date} {s.speaker && `· ${s.speaker}`}
            </p>
            {getDesc(s) && <p style={{ color: '#5a4020', lineHeight: '1.7', marginBottom: '1rem' }}>{getDesc(s)}</p>}

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {getContent(s) && (
                <button onClick={() => setSelected(s)} style={{
                  background: '#c9a84c', border: 'none', borderRadius: '6px',
                  color: 'white', padding: '6px 18px', cursor: 'pointer',
                  fontFamily: 'serif', fontSize: '0.95rem'
                }}>📖 {T.read}</button>
              )}
              {s.file && (
                <a href={s.file} download style={{
                  background: 'transparent', border: '1px solid #c9a84c',
                  borderRadius: '6px', color: '#8a6a1f', padding: '6px 18px',
                  textDecoration: 'none', fontSize: '0.95rem'
                }}>⬇ {T.download}</a>
              )}
              {s.url && (
                <a href={s.url} target="_blank" rel="noreferrer" style={{
                  background: '#3d2b0d', border: 'none', borderRadius: '6px',
                  color: 'white', padding: '6px 18px', textDecoration: 'none',
                  fontSize: '0.95rem'
                }}>▶ {T.watch}</a>
              )}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          zIndex: 2000, display: 'flex', flexDirection: 'column',
          alignItems: 'center', padding: '1rem', overflowY: 'auto'
        }}>
          <div style={{ width: '100%', maxWidth: '800px' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem'
            }}>
              <h3 style={{ fontFamily: 'serif', color: 'white', fontSize: '1.3rem' }}>{getTitle(selected)}</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setFontSize(f => Math.min(f + 2, 32))} style={{
                  background: '#c9a84c', border: 'none', borderRadius: '4px',
                  color: 'white', padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold'
                }}>A+</button>
                <button onClick={() => setFontSize(f => Math.max(f - 2, 12))} style={{
                  background: 'transparent', border: '1px solid #c9a84c',
                  borderRadius: '4px', color: '#c9a84c', padding: '6px 12px', cursor: 'pointer'
                }}>A-</button>
                <button onClick={() => setSelected(null)} style={{
                  background: 'transparent', border: '1px solid #c9a84c',
                  borderRadius: '4px', color: '#c9a84c', padding: '6px 16px', cursor: 'pointer'
                }}>✕ {T.close}</button>
              </div>
            </div>
            <div style={{
              background: 'white', color: '#2a1e08', borderRadius: '8px',
              padding: '3rem', fontSize: fontSize + 'px', lineHeight: '1.9',
              fontFamily: 'Georgia, serif', direction: lang === 'he' ? 'rtl' : 'ltr'
            }}>
              {getContent(selected).split('\n').map((line, i) => (
                <p key={i} style={{ marginBottom: '1rem' }}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sermons