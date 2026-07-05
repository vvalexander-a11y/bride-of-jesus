import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLang } from '../context/LangContext'

function Leadership() {
  const { lang } = useLang()
  const isHe = lang === 'he'
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    axios.get('/api/leadership-photo/')
      .then(res => setPhoto(res.data))
      .catch(err => console.error(err))
  }, [])

  const t = {
    en: {
      label: "Congregation Leadership",
      title: "David · Yochanan · Alex",
      message: "Wherever you are on your journey, whatever brought you here — you are welcome. If you're searching for truth, for hope, for a home for your soul, we want you to know: Yeshua is real, He is near, and He loves you. Come as you are. We would be honored to walk this road with you.",
      names: "דוד · יוחנן · אלכס",
    },
    ru: {
      label: "Руководство общины",
      title: "Давид · Йоханан · Алекс",
      message: "Где бы ты ни находился на своём пути, что бы ни привело тебя сюда — тебе рады. Если ты ищешь истину, надежду, дом для своей души — знай: Йешуа реален, Он рядом, и Он любит тебя. Приходи таким, какой ты есть. Для нас честь пройти этот путь вместе с тобой.",
      names: "דוד · יוחנן · אלכס",
    },
    he: {
      label: "הנהגת הקהילה",
      title: "דוד · יוחנן · אלכס",
      message: "לא משנה איפה אתה נמצא במסע שלך, מה שהביא אותך לכאן — אתה מוזמן. אם אתה מחפש אמת, תקווה, בית לנשמה שלך — דע: ישוע אמיתי, הוא קרוב, והוא אוהב אותך. בוא כפי שאתה. יהיה לנו לכבוד ללכת יחד בדרך הזו.",
      names: "דוד · יוחנן · אלכס",
    }
  }

  const T = t[lang]

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a1e08' }} dir={isHe ? 'rtl' : 'ltr'}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        .page-fade { animation: pageFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lead-photo-wrap { animation: leadIn 1s ease; transition: transform 0.3s ease; }
        .lead-photo-wrap:hover { transform: scale(1.015); }
        @keyframes leadIn { from { opacity:0; transform: scale(0.97);} to {opacity:1; transform:scale(1);} }
        .hover-lift {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(201,168,76,0.25) !important;
        }
      `}</style>

      <div className="page-fade" style={{ padding: '9rem 8% 5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8a6a1f', marginBottom: '14px' }}>
          {T.label}
        </div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#2a1e08', marginBottom: '3rem' }}>
          {T.title}
        </h1>

        <div className="lead-photo-wrap" style={{
          maxWidth: '480px', margin: '0 auto 3rem',
          borderRadius: '12px', overflow: 'hidden',
          border: '1px solid #e8d5a3', boxShadow: '0 8px 30px rgba(201,168,76,0.2)'
        }}>
          {photo && photo.image ? (
            <img src={photo.image} alt={T.title} style={{ width: '100%', display: 'block' }} />
          ) : (
            <div style={{
              width: '100%', aspectRatio: '4/3', background: '#f0e8d5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#c9a84c', fontSize: '3rem'
            }}>
              🕊
            </div>
          )}
        </div>

        <div className="hover-lift" style={{
          maxWidth: '640px', margin: '0 auto',
          background: 'white', border: '1px solid #e8d5a3', borderRadius: '12px',
          padding: '2.5rem', boxShadow: '0 2px 12px rgba(201,168,76,0.1)'
        }}>
          <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '17px', lineHeight: 1.9, color: '#3d2b0d' }}>
            {T.message}
          </p>
          <div style={{ marginTop: '2rem', color: '#8a6a1f', fontSize: '15px', letterSpacing: '0.05em' }}>
            {T.names}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leadership