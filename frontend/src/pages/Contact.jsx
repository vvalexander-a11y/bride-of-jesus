import { useLang } from '../context/LangContext'

function Contact() {
  const { lang } = useLang()
  const isHe = lang === 'he'

  const t = {
    en: {
      label: "Get in Touch",
      title: "We'd love to hear from you",
      contactDetails: "Contact Details",
      meetings: "Meetings usually on Saturday mornings",
      wantToVisit: "Want to visit us?",
      visitText: "We'd love to welcome you! Reach out by phone or WhatsApp and we'll share all the details with you personally.",
    },
    ru: {
      label: "Связаться",
      title: "Мы рады услышать вас",
      contactDetails: "Контакты",
      meetings: "Собрания обычно в субботу утром",
      wantToVisit: "Хотите посетить нас?",
      visitText: "Мы будем рады видеть вас! Свяжитесь с нами по телефону или WhatsApp, и мы расскажем все детали лично.",
    },
    he: {
      label: "צרו קשר",
      title: "נשמח לשמוע מכם",
      contactDetails: "פרטי קשר",
      meetings: "מפגשים בדרך כלל בשבת בבוקר",
      wantToVisit: "רוצים לבקר אותנו?",
      visitText: "נשמח לארח אתכם! צרו קשר בטלפון או בוואטסאפ ונשתף אתכם בכל הפרטים באופן אישי.",
    }
  }

  const T = t[lang]

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#2a1e08' }} dir={isHe ? 'rtl' : 'ltr'}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
        .page-fade { animation: pageFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hover-lift {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(201,168,76,0.25) !important;
        }
      `}</style>

      <div className="page-fade" style={{ padding: '9rem 8% 5rem', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(to right, transparent, #c9a84c, transparent)'
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8a6a1f', marginBottom: '14px' }}>
            {T.label}
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#2a1e08', marginBottom: '3rem' }}>
            {T.title}
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', marginBottom: '16px', fontSize: '1.2rem' }}>{T.contactDetails}</h3>
              <p style={{ marginBottom: '10px', color: '#5a4020', fontSize: '16px' }}>
                📞 <a href="tel:+972552998715" style={{ color: '#8a6a1f' }}>055-299-8715</a>
              </p>
              <p style={{ marginBottom: '10px', color: '#5a4020', fontSize: '16px' }}>
                ✉️ <a href="mailto:info.meshichit.afuka@israelmail.com" style={{ color: '#8a6a1f' }}>info.meshichit.afuka@israelmail.com</a>
              </p>
              <p style={{ marginTop: '16px', color: '#8a6a1f', fontSize: '13px' }}>{T.meetings}</p>
            </div>

            <div className="hover-lift" style={{
              background: '#f5f0e8', border: '1px solid #e8d5a3', borderRadius: '10px',
              padding: '1.8rem'
            }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', marginBottom: '10px', fontSize: '1.1rem' }}>{T.wantToVisit}</h3>
              <p style={{ color: '#5a4020', lineHeight: 1.8, fontSize: '15px' }}>{T.visitText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact