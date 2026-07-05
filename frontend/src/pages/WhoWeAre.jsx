import { useLang } from '../context/LangContext'

function WhoWeAre() {
  const { lang } = useLang()
  const isHe = lang === 'he'

  const t = {
    en: {
      label: "Who We Are",
      title: "A community of faith, prayer & fellowship",
      about: "We are a Messianic congregation, believing in God and His Son Yeshua (Psalm 2:7), our Messiah and Lord (John 3:16). A group of families and individuals — Jews and non-Jews — meeting regularly, usually on Saturday mornings.",
      worship: "Worship", worshipDesc: "We gather to praise and worship the Lord together, in faith and joy.",
      bible: "Bible Study", bibleDesc: "In-depth study of the Tanakh and the New Testament — the living Word of God.",
      prayer: "Prayer Together", prayerDesc: "We pray together, listen, and bring one another's needs before the Lord.",
      fellowship: "Fellowship", fellowshipDesc: "A warm and welcoming community — everyone is invited, regardless of background.",
    },
    ru: {
      label: "О нас",
      title: "Община веры, молитвы и общения",
      about: "Мы — мессианская община, верующая в Бога и в Его Сына Йешуа (Псалом 2:7), нашего Мессию и Господа (Иоанна 3:16). Группа семей и верующих — евреи и неевреи — которые регулярно собираются в субботу утром.",
      worship: "Поклонение", worshipDesc: "Мы собираемся, чтобы вместе прославлять Господа с верой и радостью.",
      bible: "Изучение Библии", bibleDesc: "Глубокое изучение Танаха и Нового Завета — живого Слова Бога.",
      prayer: "Совместная молитва", prayerDesc: "Молимся вместе и несём нужды друг друга пред Господом.",
      fellowship: "Общение", fellowshipDesc: "Тёплая и открытая община — все приглашены, вне зависимости от прошлого.",
    },
    he: {
      label: "מי אנחנו",
      title: "קהילה שמאמינה, מתפללת ומתחברת",
      about: "אנחנו קהילה משיחית, המאמינה באלוהים ובבנו ישוע (תהילים ב׳:7), משיחנו ואדוננו (יוחנן ג׳:16). קבוצה של משפחות ורווקים, יהודים ולא יהודים, הנפגשים בדרך כלל שבת בבוקר.",
      worship: "עבודת ה׳", worshipDesc: "אנחנו מתכנסים כדי לשבח ולעבוד את ה׳ יחד.",
      bible: "לימוד הכתובים", bibleDesc: "לימוד מעמיק של התנ״ך והברית החדשה.",
      prayer: "תפילה משותפת", prayerDesc: "אנחנו מתפללים יחד ומפקידים אחד את צרכי השני לפני ה׳.",
      fellowship: "התחברות", fellowshipDesc: "קהילה חמה ומקבלת — כאן כולם מוזמנים.",
    }
  }

  const T = t[lang]

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#2a1e08' }} dir={isHe ? 'rtl' : 'ltr'}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        .page-fade { animation: pageFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hover-lift {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        .wwa-item { animation: wwaFade 0.6s ease backwards; }
        .wwa-item:nth-child(1) { animation-delay: 0.05s; }
        .wwa-item:nth-child(2) { animation-delay: 0.15s; }
        .wwa-item:nth-child(3) { animation-delay: 0.25s; }
        .wwa-item:nth-child(4) { animation-delay: 0.35s; }
        @keyframes wwaFade {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="page-fade" style={{
        padding: '9rem 8% 4rem', position: 'relative'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(to right, transparent, #c9a84c, transparent)'
        }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8a6a1f', marginBottom: '14px' }}>
            {T.label}
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#2a1e08', marginBottom: '32px', lineHeight: 1.3 }}>
            {T.title}
          </h1>
          <p style={{ fontSize: '17px', lineHeight: 1.9, color: '#5a4020', maxWidth: '750px', marginBottom: '3rem' }}>
            {T.about}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '2.5rem 3rem' }}>
            {[
              { icon: '🕊', title: T.worship, desc: T.worshipDesc },
              { icon: '📖', title: T.bible, desc: T.bibleDesc },
              { icon: '🙏', title: T.prayer, desc: T.prayerDesc },
              { icon: '🫂', title: T.fellowship, desc: T.fellowshipDesc },
            ].map((item, i) => (
              <div key={i} className="wwa-item hover-lift" style={{ borderTop: '2px solid rgba(201,168,76,0.3)', paddingTop: '20px' }}>
                <div style={{ fontSize: '26px', marginBottom: '10px' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', marginBottom: '8px', fontSize: '1.2rem' }}>{item.title}</h3>
                <p style={{ color: '#5a4020', lineHeight: 1.7, fontSize: '15px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoWeAre