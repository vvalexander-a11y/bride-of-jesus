import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLang } from '../context/LangContext'

function Gallery() {
  const { lang } = useLang()
  const [step, setStep] = useState('request') // request | pending | gallery
  const [name, setName] = useState('')
  const [token, setToken] = useState(() => localStorage.getItem('gallery_token') || '')
  const [photos, setPhotos] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const t = {
    en: {
      title: 'Photo Gallery',
      subtitle: 'This section is restricted to congregation members.',
      nameLabel: 'Your name',
      namePlaceholder: 'Enter your full name',
      requestBtn: 'Request Access',
      pendingTitle: 'Request Sent',
      pendingText: 'Your request has been sent to the administrator. Please check back later after approval.',
      checkBtn: 'Check Access',
      noPhotos: 'No photos yet.',
      error: 'Access not yet approved or name not found.',
      close: 'Close',
    },
    ru: {
      title: 'Фотогалерея',
      subtitle: 'Этот раздел только для членов общины.',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Введите ваше полное имя',
      requestBtn: 'Запросить доступ',
      pendingTitle: 'Запрос отправлен',
      pendingText: 'Ваш запрос отправлен администратору. Вернитесь позже после подтверждения.',
      checkBtn: 'Проверить доступ',
      noPhotos: 'Фото пока нет.',
      error: 'Доступ ещё не одобрен.',
      close: 'Закрыть',
    },
    he: {
      title: 'גלריית תמונות',
      subtitle: 'קטע זה מיועד לחברי הקהילה בלבד.',
      nameLabel: 'שמך',
      namePlaceholder: 'הכנס את שמך המלא',
      requestBtn: 'בקש גישה',
      pendingTitle: 'הבקשה נשלחה',
      pendingText: 'בקשתך נשלחה למנהל. חזור מאוחר יותר לאחר אישור.',
      checkBtn: 'בדוק גישה',
      noPhotos: 'אין תמונות עדיין.',
      error: 'הגישה טרם אושרה.',
      close: 'סגור',
    },
  }

  const T = t[lang]

  useEffect(() => {
    if (token) checkAccess(token)
  }, [])

  async function checkAccess(t) {
    try {
      await axios.post('/api/gallery/check/', { token: t })
      setStep('gallery')
      loadPhotos(t)
    } catch {
      setStep('request')
    }
  }

  async function loadPhotos(t) {
    try {
      const res = await axios.get(`/api/gallery/photos/?token=${t}`)
      setPhotos(res.data)
    } catch {}
  }

  async function handleRequest() {
    if (!name.trim()) return
    setLoading(true)
    try {
      await axios.post('/api/gallery/request/', { name })
      setStep('pending')
    } catch {
      setError(T.error)
    }
    setLoading(false)
  }

  async function handleCheck() {
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('/api/gallery/check/', { token })
      if (res.data.approved) {
        localStorage.setItem('gallery_token', token)
        setStep('gallery')
        loadPhotos(token)
      }
    } catch {
      setError(T.error)
    }
    setLoading(false)
  }

  function getTitle(p) { return p['title_' + lang] || p.title_en || '' }

  return (
    <div style={{ minHeight: '100vh', background: '#1a1208', color: '#f5f0e8', padding: '4rem 8%' }}>
      <h1 style={{ fontFamily: 'serif', color: '#c9a84c', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        {T.title}
      </h1>
      <p style={{ color: '#8a6a1f', marginBottom: '3rem' }}>{T.subtitle}</p>

      {/* REQUEST STEP */}
      {step === 'request' && (
        <div style={{
          maxWidth: '480px', background: 'rgba(201,168,76,0.06)',
          border: '1px solid #8a6a1f', borderRadius: '12px', padding: '2.5rem'
        }}>
          <label style={{ display: 'block', color: '#e8cc7a', marginBottom: '8px', fontSize: '0.95rem' }}>
            {T.nameLabel}
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={T.namePlaceholder}
            style={{
              width: '100%', padding: '0.8rem 1rem',
              background: 'rgba(201,168,76,0.08)', border: '1px solid #8a6a1f',
              borderRadius: '6px', color: '#f5f0e8', fontSize: '1rem',
              marginBottom: '1rem', outline: 'none'
            }}
          />
          {error && <p style={{ color: '#c0392b', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          <button onClick={handleRequest} disabled={loading} style={{
            width: '100%', padding: '0.8rem', background: '#8a6a1f',
            border: 'none', borderRadius: '6px', color: '#f5f0e8',
            fontSize: '1rem', cursor: 'pointer', fontFamily: 'serif'
          }}>
            {loading ? '...' : T.requestBtn}
          </button>
        </div>
      )}

      {/* PENDING STEP */}
      {step === 'pending' && (
        <div style={{
          maxWidth: '480px', background: 'rgba(201,168,76,0.06)',
          border: '1px solid #8a6a1f', borderRadius: '12px', padding: '2.5rem', textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <h2 style={{ fontFamily: 'serif', color: '#c9a84c', marginBottom: '1rem' }}>{T.pendingTitle}</h2>
          <p style={{ color: '#b8a88a', lineHeight: '1.7', marginBottom: '2rem' }}>{T.pendingText}</p>
          <input
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="Token"
            style={{
              width: '100%', padding: '0.8rem', background: 'rgba(201,168,76,0.08)',
              border: '1px solid #8a6a1f', borderRadius: '6px', color: '#f5f0e8',
              fontSize: '0.9rem', marginBottom: '1rem', outline: 'none'
            }}
          />
          {error && <p style={{ color: '#c0392b', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          <button onClick={handleCheck} disabled={loading} style={{
            width: '100%', padding: '0.8rem', background: '#8a6a1f',
            border: 'none', borderRadius: '6px', color: '#f5f0e8',
            fontSize: '1rem', cursor: 'pointer', fontFamily: 'serif'
          }}>
            {loading ? '...' : T.checkBtn}
          </button>
        </div>
      )}

      {/* GALLERY STEP */}
      {step === 'gallery' && (
        <>
          {photos.length === 0 && (
            <p style={{ color: '#8a6a1f' }}>{T.noPhotos}</p>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {photos.map(p => (
              <div key={p.id}
                onClick={() => setSelected(p)}
                style={{
                  cursor: 'pointer', borderRadius: '8px', overflow: 'hidden',
                  border: '1px solid #8a6a1f', transition: 'transform 0.2s',
                  background: 'rgba(201,168,76,0.04)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={p.image} alt={getTitle(p)} style={{
                  width: '100%', height: '200px', objectFit: 'cover', display: 'block'
                }} />
                {getTitle(p) && (
                  <div style={{ padding: '0.8rem 1rem', color: '#e8cc7a', fontSize: '0.9rem' }}>
                    {getTitle(p)}
                  </div>
                )}
                {p.date && (
                  <div style={{ padding: '0 1rem 0.8rem', color: '#8a6a1f', fontSize: '0.8rem' }}>
                    {p.date}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {selected && (
            <div onClick={() => setSelected(null)} style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
              zIndex: 2000, display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '2rem'
            }}>
              <div onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%' }}>
                <img src={selected.image} alt={getTitle(selected)} style={{
                  width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px'
                }} />
                {getTitle(selected) && (
                  <p style={{ textAlign: 'center', color: '#e8cc7a', marginTop: '1rem', fontFamily: 'serif', fontSize: '1.1rem' }}>
                    {getTitle(selected)}
                  </p>
                )}
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button onClick={() => setSelected(null)} style={{
                    background: 'transparent', border: '1px solid #8a6a1f',
                    color: '#e8cc7a', padding: '8px 24px', cursor: 'pointer',
                    borderRadius: '4px', fontSize: '0.9rem'
                  }}>{T.close}</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Gallery