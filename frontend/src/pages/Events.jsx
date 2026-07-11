import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLang } from '../context/LangContext'

function Events() {
  const { lang } = useLang()
  const [tab, setTab] = useState('events')
  const [events, setEvents] = useState([])
  const [prayers, setPrayers] = useState([])
  const [talents, setTalents] = useState([])
  const [photos, setPhotos] = useState([])
  const [selected, setSelected] = useState(null)
  const [galleryStep, setGalleryStep] = useState('request')
  const [name, setName] = useState('')
  const [token, setToken] = useState(() => localStorage.getItem('gallery_token') || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const t = {
    en: {
      events: 'Events', gallery: 'Gallery', prayers: 'Prayer Requests', talents: 'Talents',
      noEvents: 'No upcoming events.',
      noPrayers: 'No prayer requests yet.',
      noTalents: 'No talents shared yet.',
      answered: 'Answered!',
      gallerySubtitle: 'This section requires additional approval.',
      prayersSubtitle: 'Let us carry one another\'s burdens in prayer.',
      talentsSubtitle: 'Drawings, songs, and creative gifts to glorify the Lord.',
      nameLabel: 'Your name', namePlaceholder: 'Enter your full name',
      requestBtn: 'Request Access', pendingTitle: 'Request Sent',
      pendingText: 'Your request has been sent to the administrator. Come back after approval.',
      checkBtn: 'Check Access', noPhotos: 'No photos yet.',
      error: 'Access not yet approved.', close: 'Close',
      anonymous: 'Anonymous',
      yaldeiYa: 'Yaldei Ya — Kids Ministry',
      otherPhotos: 'Other Photos',
    },
    ru: {
      events: 'События', gallery: 'Галерея', prayers: 'Молитвенные просьбы', talents: 'Таланты',
      noEvents: 'Событий пока нет.',
      noPrayers: 'Молитвенных просьб пока нет.',
      noTalents: 'Талантов пока не добавлено.',
      answered: 'Отвечено!',
      gallerySubtitle: 'Этот раздел требует дополнительного подтверждения.',
      prayersSubtitle: 'Носите бремена друг друга в молитве.',
      talentsSubtitle: 'Рисунки, песни и творческие дары для прославления Господа.',
      nameLabel: 'Ваше имя', namePlaceholder: 'Введите ваше полное имя',
      requestBtn: 'Запросить доступ', pendingTitle: 'Запрос отправлен',
      pendingText: 'Ваш запрос отправлен администратору. Вернитесь после подтверждения.',
      checkBtn: 'Проверить доступ', noPhotos: 'Фото пока нет.',
      error: 'Доступ ещё не одобрен.', close: 'Закрыть',
      anonymous: 'Анонимно',
      yaldeiYa: 'Ялдей Я — Детское служение',
      otherPhotos: 'Другие фото',
    },
    he: {
      events: 'אירועים', gallery: 'גלריה', prayers: 'בקשות תפילה', talents: 'כשרונות',
      noEvents: 'אין אירועים קרובים.',
      noPrayers: 'אין בקשות תפילה עדיין.',
      noTalents: 'עדיין לא שותפו כשרונות.',
      answered: 'נענתה!',
      gallerySubtitle: 'קטע זה דורש אישור נוסף.',
      prayersSubtitle: 'שאו איש את משא רעהו בתפילה.',
      talentsSubtitle: 'ציורים, שירים ומתנות יצירתיות לתפארת ה׳.',
      nameLabel: 'שמך', namePlaceholder: 'הכנס את שמך המלא',
      requestBtn: 'בקש גישה', pendingTitle: 'הבקשה נשלחה',
      pendingText: 'בקשתך נשלחה למנהל. חזור לאחר אישור.',
      checkBtn: 'בדוק גישה', noPhotos: 'אין תמונות עדיין.',
      error: 'הגישה טרם אושרה.', close: 'סגור',
      anonymous: 'אנונימי',
      yaldeiYa: 'ילדי יה — שירות ילדים',
      otherPhotos: 'תמונות נוספות',
    },
  }

  const T = t[lang]

  useEffect(() => {
    const memberToken = localStorage.getItem('member_token') || ''
    axios.get(`/api/events/?token=${encodeURIComponent(memberToken)}`)
      .then(res => setEvents(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
    axios.get(`/api/prayers/?token=${encodeURIComponent(memberToken)}`)
      .then(res => setPrayers(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
    axios.get(`/api/talents/?token=${encodeURIComponent(memberToken)}`)
      .then(res => setTalents(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (token) checkGalleryAccess(token)
  }, [])

  async function checkGalleryAccess(tk) {
    try {
      await axios.post('/api/gallery/check/', { token: tk })
      setGalleryStep('gallery')
      loadPhotos(tk)
    } catch {
      setGalleryStep('request')
    }
  }

  async function loadPhotos(tk) {
    try {
      const res = await axios.get(`/api/gallery/photos/?token=${tk}`)
      setPhotos(Array.isArray(res.data) ? res.data : [])
    } catch {}
  }

  async function handleRequest() {
    if (!name.trim()) return
    setLoading(true)
    setError('')
    try {
      await axios.post('/api/gallery/request/', { name })
      setGalleryStep('pending')
    } catch {
      setError(T.error)
    }
    setLoading(false)
  }

  async function handleCheck() {
    setLoading(true)
    setError('')
    try {
      await axios.post('/api/gallery/check/', { token })
      localStorage.setItem('gallery_token', token)
      setGalleryStep('gallery')
      loadPhotos(token)
    } catch {
      setError(T.error)
    }
    setLoading(false)
  }

  function getTitle(e) { return e['title_' + lang] || e.title_en }
  function getDesc(e) { return e['description_' + lang] || e.description_en }
  function getPrayerText(p) { return p['text_' + lang] || p.text_en || p.text_ru || p.text_he }

  function groupPhotosByAlbum(list) {
    const groups = []
    const byAlbum = new Map()
    for (const p of list) {
      const key = p.album_id || 'none'
      let group = byAlbum.get(key)
      if (!group) {
        const title = p.album_id
          ? (p['album_title_' + lang] || p.album_title_en)
          : T.otherPhotos
        group = { key, title, photos: [] }
        byAlbum.set(key, group)
        groups.push(group)
      }
      group.photos.push(p)
    }
    return groups
  }

  const tabs = [
    { key: 'events', label: T.events, icon: '📅' },
    { key: 'gallery', label: T.gallery, icon: '🖼' },
    { key: 'prayers', label: T.prayers, icon: '🙏' },
    { key: 'talents', label: T.talents, icon: '🎨' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a1e08', padding: '4rem 8%' }}>
      <style>{`
        .tab-content { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .events-tabs {
          display: flex;
          gap: 0.5rem;
          border-bottom: 2px solid #e8d5a3;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .events-tab-btn {
          padding: 0.8rem 2rem;
          cursor: pointer;
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          border: none;
          background: transparent;
          color: #8a6a1f;
          border-bottom: 3px solid transparent;
          border-radius: 8px 8px 0 0;
          font-weight: 400;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.65;
          white-space: nowrap;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .events-tab-btn.active {
          background: #fffdf8;
          color: #3d2b0d;
          border-bottom: 3px solid #c9a84c;
          border-top: 1px solid #e8d5a3;
          border-left: 1px solid #e8d5a3;
          border-right: 1px solid #e8d5a3;
          font-weight: 600;
          opacity: 1;
        }

        @media (max-width: 640px) {
          .events-tabs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.6rem;
            border-bottom: none;
          }
          .events-tab-btn {
            padding: 0.9rem 0.5rem;
            font-size: 0.95rem;
            border: 1px solid #e8d5a3;
            border-radius: 10px;
            background: #fffdf8;
            opacity: 1;
            flex-direction: column;
            gap: 0.3rem;
          }
          .events-tab-btn.active {
            border: 1px solid #c9a84c;
            background: #3d2b0d;
            color: #e8cc7a;
          }
          .events-tab-yaldei {
            grid-column: 1 / -1;
          }
        }
      `}</style>

      <div className="events-tabs">
        {tabs.map(item => (
          <button
            key={item.key}
            className={`events-tab-btn${tab === item.key ? ' active' : ''}`}
            onClick={() => setTab(item.key)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <a
          href="https://yaldei-ya.co.il/"
          target="_blank"
          rel="noreferrer"
          className="events-tab-btn events-tab-yaldei"
        >
          <span>🧒</span>
          <span>{T.yaldeiYa}</span>
        </a>
      </div>

      {tab === 'events' && (
        <div className="tab-content">
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '2.5rem', marginBottom: '2rem' }}>{T.events}</h1>
          {events.length === 0 && <p style={{ color: '#8a6a1f' }}>{T.noEvents}</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {events.map(e => (
              <div key={e.id} style={{
                background: 'white', border: '1px solid #e8d5a3',
                borderRadius: '8px', padding: '1.5rem 2rem',
                display: 'flex', gap: '2rem', alignItems: 'flex-start',
                boxShadow: '0 2px 12px rgba(201,168,76,0.1)'
              }}>
                <div style={{
                  background: '#3d2b0d', borderRadius: '6px', padding: '0.8rem 1.2rem',
                  textAlign: 'center', minWidth: '70px', flexShrink: 0
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#e8cc7a' }}>{new Date(e.date).getDate()}</div>
                  <div style={{ fontSize: '0.8rem', color: '#c9a84c', textTransform: 'uppercase' }}>
                    {new Date(e.date).toLocaleString(lang === 'ru' ? 'ru' : lang === 'he' ? 'he' : 'en', { month: 'short' })}
                  </div>
                </div>
                <div>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', marginBottom: '0.4rem' }}>{getTitle(e)}</h2>
                  {e.location && <p style={{ color: '#8a6a1f', fontSize: '0.9rem', marginBottom: '0.5rem' }}>📍 {e.location}</p>}
                  {getDesc(e) && <p style={{ color: '#5a4020', lineHeight: '1.7' }}>{getDesc(e)}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'prayers' && (
        <div className="tab-content">
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{T.prayers}</h1>
          <p style={{ color: '#8a6a1f', marginBottom: '2rem', fontStyle: 'italic' }}>{T.prayersSubtitle}</p>
          {prayers.length === 0 && <p style={{ color: '#8a6a1f' }}>{T.noPrayers}</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '800px' }}>
            {prayers.map(p => (
              <div key={p.id} style={{
                background: p.is_answered ? '#f4f9ef' : 'white',
                border: p.is_answered ? '1px solid #a8c890' : '1px solid #e8d5a3',
                borderRadius: '8px', padding: '1.5rem 2rem',
                boxShadow: '0 2px 12px rgba(201,168,76,0.1)', position: 'relative'
              }}>
                {p.is_answered && (
                  <div style={{
                    position: 'absolute', top: '1rem', insetInlineEnd: '1rem',
                    background: '#6a9c4e', color: 'white', borderRadius: '20px',
                    padding: '2px 14px', fontSize: '0.8rem'
                  }}>✓ {T.answered}</div>
                )}
                <p style={{ color: '#8a6a1f', fontSize: '0.85rem', marginBottom: '0.6rem' }}>
                  {p.name || T.anonymous} · {new Date(p.created_at).toLocaleDateString()}
                </p>
                <p style={{ color: '#3d2b0d', lineHeight: '1.8', fontSize: '1.05rem' }}>{getPrayerText(p)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'talents' && (
        <div className="tab-content">
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{T.talents}</h1>
          <p style={{ color: '#8a6a1f', marginBottom: '2rem', fontStyle: 'italic' }}>{T.talentsSubtitle}</p>
          {talents.length === 0 && <p style={{ color: '#8a6a1f' }}>{T.noTalents}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {talents.map(item => (
              <div key={item.id} style={{
                background: 'white', border: '1px solid #e8d5a3', borderRadius: '8px',
                overflow: 'hidden', boxShadow: '0 2px 12px rgba(201,168,76,0.1)'
              }}>
                {item.image && (
                  <img src={item.image} alt={getTitle(item)} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                )}
                <div style={{ padding: '1rem 1.2rem' }}>
                  {getTitle(item) && <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', marginBottom: '4px' }}>{getTitle(item)}</h3>}
                  {item.author && <p style={{ color: '#8a6a1f', fontSize: '0.85rem', marginBottom: '6px' }}>— {item.author}</p>}
                  {getDesc(item) && <p style={{ color: '#5a4020', fontSize: '0.9rem', lineHeight: '1.6' }}>{getDesc(item)}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'gallery' && (
        <div className="tab-content">
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{T.gallery}</h1>
          <p style={{ color: '#8a6a1f', marginBottom: '2rem' }}>{T.gallerySubtitle}</p>

          {galleryStep === 'request' && (
            <div style={{
              maxWidth: '480px', background: 'white', border: '1px solid #e8d5a3',
              borderRadius: '12px', padding: '2.5rem', boxShadow: '0 2px 12px rgba(201,168,76,0.1)'
            }}>
              <label style={{ display: 'block', color: '#3d2b0d', marginBottom: '8px' }}>{T.nameLabel}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={T.namePlaceholder} style={{
                width: '100%', padding: '0.8rem', background: '#faf7f2',
                border: '1px solid #c9a84c', borderRadius: '6px', color: '#2a1e08',
                fontSize: '1rem', marginBottom: '1rem', outline: 'none'
              }} />
              {error && <p style={{ color: '#c0392b', marginBottom: '1rem' }}>{error}</p>}
              <button onClick={handleRequest} disabled={loading} style={{
                width: '100%', padding: '0.8rem', background: '#3d2b0d', border: 'none',
                borderRadius: '6px', color: '#e8cc7a', fontSize: '1rem', cursor: 'pointer',
                fontFamily: 'Playfair Display, serif'
              }}>{loading ? '...' : T.requestBtn}</button>
            </div>
          )}

          {galleryStep === 'pending' && (
            <div style={{
              maxWidth: '480px', background: 'white', border: '1px solid #e8d5a3',
              borderRadius: '12px', padding: '2.5rem', textAlign: 'center',
              boxShadow: '0 2px 12px rgba(201,168,76,0.1)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', marginBottom: '1rem' }}>{T.pendingTitle}</h2>
              <p style={{ color: '#5a4020', lineHeight: '1.7', marginBottom: '2rem' }}>{T.pendingText}</p>
              <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="Token" style={{
                width: '100%', padding: '0.8rem', background: '#faf7f2',
                border: '1px solid #c9a84c', borderRadius: '6px', color: '#2a1e08',
                fontSize: '0.9rem', marginBottom: '1rem', outline: 'none'
              }} />
              {error && <p style={{ color: '#c0392b', marginBottom: '1rem' }}>{error}</p>}
              <button onClick={handleCheck} disabled={loading} style={{
                width: '100%', padding: '0.8rem', background: '#3d2b0d', border: 'none',
                borderRadius: '6px', color: '#e8cc7a', fontSize: '1rem', cursor: 'pointer',
                fontFamily: 'Playfair Display, serif'
              }}>{loading ? '...' : T.checkBtn}</button>
            </div>
          )}

          {galleryStep === 'gallery' && (
            <>
              {photos.length === 0 && <p style={{ color: '#8a6a1f' }}>{T.noPhotos}</p>}
              {groupPhotosByAlbum(photos).map(group => (
                <div key={group.key} style={{ marginBottom: '2.5rem' }}>
                  {group.title && (
                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '1.5rem', marginBottom: '1rem' }}>{group.title}</h2>
                  )}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {group.photos.map(p => (
                      <div key={p.id} onClick={() => setSelected(p)} style={{
                        cursor: 'pointer', borderRadius: '8px', overflow: 'hidden',
                        border: '1px solid #e8d5a3', background: 'white',
                        boxShadow: '0 2px 12px rgba(201,168,76,0.1)',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.25)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(201,168,76,0.1)' }}
                      >
                        <img src={p.image} alt={getTitle(p)} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                        {getTitle(p) && (
                          <div style={{ padding: '0.8rem 1rem', color: '#3d2b0d', fontSize: '0.9rem', fontFamily: 'Playfair Display, serif' }}>{getTitle(p)}</div>
                        )}
                        {p.date && (
                          <div style={{ padding: '0 1rem 0.8rem', color: '#8a6a1f', fontSize: '0.8rem' }}>{p.date}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {selected && (
                <div onClick={() => setSelected(null)} style={{
                  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
                  zIndex: 2000, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', padding: '2rem'
                }}>
                  <div onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%' }}>
                    <img src={selected.image} alt={getTitle(selected)} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }} />
                    {getTitle(selected) && (
                      <p style={{ textAlign: 'center', color: '#e8cc7a', marginTop: '1rem', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>{getTitle(selected)}</p>
                    )}
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                      <button onClick={() => setSelected(null)} style={{
                        background: 'transparent', border: '1px solid #c9a84c',
                        color: '#c9a84c', padding: '8px 24px', cursor: 'pointer', borderRadius: '4px'
                      }}>{T.close}</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Events
