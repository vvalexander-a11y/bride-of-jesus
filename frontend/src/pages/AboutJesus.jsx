import { useLang } from '../context/LangContext'

function AboutJesus() {
  const { lang } = useLang()
  const isHe = lang === 'he'

  const t = {
    en: {
      label: "More About Jesus",
      title: "Want to know more about the faith?",
      intro: "Read the Bible and the New Testament — the living Word of God. Below are trusted resources to explore.",
      disclaimer: "We are not directly responsible for external content",
      readBible: "Read the Bible and the New Testament 📖",
    },
    ru: {
      label: "Больше об Иисусе",
      title: "Хотите узнать больше о вере?",
      intro: "Читайте Библию и Новый Завет — живое Слово Бога. Ниже — проверенные ресурсы для изучения.",
      disclaimer: "Мы не несём ответственности за внешний контент",
      readBible: "Читайте Библию и Новый Завет 📖",
    },
    he: {
      label: "עוד על ישוע",
      title: "רוצים לדעת עוד על האמונה?",
      intro: "קראו את התנ״ך ואת הברית החדשה — דבר האלוהים החי. להלן משאבים מומלצים.",
      disclaimer: "אנחנו לא אחראים ישירות לתוכן האתרים הבאים",
      readBible: "קראו את התנ״ך ואת הברית החדשה 📖",
    }
  }

  const T = t[lang]

  const links = [
    { title: 'www.yeshua.co.il', url: 'https://www.yeshua.co.il' },
    { title: 'igod.co.il', url: 'https://igod.co.il/' },
    { title: 'www.oneforisrael.org', url: 'https://www.oneforisrael.org/' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a1e08' }} dir={isHe ? 'rtl' : 'ltr'}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
        .page-fade { animation: pageFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .aj-link {
          animation: ajFade 0.5s ease backwards;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .aj-link:nth-child(1) { animation-delay: 0.05s; }
        .aj-link:nth-child(2) { animation-delay: 0.15s; }
        .aj-link:nth-child(3) { animation-delay: 0.25s; }
        @keyframes ajFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .aj-link:hover {
          box-shadow: 0 8px 24px rgba(201,168,76,0.3) !important;
          transform: translateY(-3px);
        }
      `}</style>

      <div className="page-fade" style={{ padding: '9rem 8% 5rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8a6a1f', marginBottom: '14px', textAlign: 'center' }}>
            {T.label}
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(26px,4vw,38px)', fontWeight: 700, color: '#2a1e08', marginBottom: '1.5rem', textAlign: 'center' }}>
            {T.title}
          </h1>
          <p style={{ color: '#5a4020', fontSize: '16px', lineHeight: 1.8, marginBottom: '3rem', textAlign: 'center' }}>
            {T.intro}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noreferrer" className="aj-link" style={{
                background: 'white', border: '1px solid #e8d5a3',
                borderRadius: '8px', padding: '1.2rem 1.5rem',
                textDecoration: 'none', display: 'block',
                boxShadow: '0 2px 8px rgba(201,168,76,0.1)'
              }}>
                <div style={{ color: '#3d2b0d', fontSize: '1.05rem', fontFamily: 'Playfair Display, serif' }}>{link.title}</div>
              </a>
            ))}
          </div>

          <p style={{ fontSize: '12px', color: '#999', marginTop: '1.5rem', textAlign: 'center' }}>{T.disclaimer}</p>
        </div>
      </div>
    </div>
  )
}

export default AboutJesus