import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLang } from '../context/LangContext'

function Home() {
  const { lang } = useLang()
  const [verse, setVerse] = useState(null)

  useEffect(() => {
    axios.get('/api/daily-verse/')
      .then(res => setVerse(res.data))
      .catch(err => console.error(err))
  }, [])

  const t = {
    en: {
      tagline: "A Messianic congregation in Afula, Israel — Jews and non-Jews gathering to worship, study, pray and walk together in faith.",
      verse1: '"For God so loved the world, that he gave his only Son"',
      verse1ref: "John 3:16",
      city: "Afula",
    },
    ru: {
      tagline: "Мессианская община в Афуле, Израиль — евреи и неевреи, собирающиеся для поклонения, изучения Писания и молитвы.",
      verse1: '«Ибо так возлюбил Бог мир, что отдал Сына Своего единородного»',
      verse1ref: "Иоанна 3:16",
      city: "Афула",
    },
    he: {
      tagline: "קהילה משיחית בעפולה, ישראל — יהודים ולא יהודים הנפגשים לעבודת ה׳, לימוד ותפילה.",
      verse1: '״כִּי-כָּכָה אָהַב אֱלֹהִים אֶת-הָעוֹלָם, עַד-כִּי נָתַן אֶת-בְּנוֹ יְחִידוֹ״',
      verse1ref: "יוחנן ג׳:טז",
      city: "עפולה",
    },
    es: {
      tagline: "Una congregación mesiánica en Afula, Israel — judíos y no judíos reunidos para adorar, estudiar, orar y caminar juntos en la fe.",
      verse1: '"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito"',
      verse1ref: "Juan 3:16",
      city: "Afula",
    }
  }

  const T = t[lang]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Frank+Ruhl+Libre:wght@300;400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        :root {
          --gold: #c9a84c;
          --gold-light: #e8cc7a;
          --gold-dark: #8a6a1f;
          --cream: #faf7f2;
          --warm-white: #ffffff;
          --brown: #3d2b0d;
          --text-dark: #2a1e08;
          --text-mid: #5a4020;
        }
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; overflow-x: hidden; }
        body { background: var(--cream); color: var(--text-dark); font-family: 'EB Garamond', serif; }

        #hero {
          position: relative; width: 100%; min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 100px 24px 60px;
          background: var(--cream);
          overflow: hidden;
        }
        .hero-deco-left, .hero-deco-right {
          position: absolute; top: 50%; transform: translateY(-50%);
          font-size: 200px; opacity: 0.05; color: var(--gold);
          pointer-events: none; user-select: none;
        }
        .hero-deco-left { left: 2%; }
        .hero-deco-right { right: 2%; }
        .hero-content { position: relative; z-index: 2; max-width: 820px; animation: heroIn 1.2s ease; }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .congregation-name-he {
          font-family: 'Frank Ruhl Libre', serif;
          font-size: clamp(42px, 8vw, 86px);
          font-weight: 700; color: var(--gold); line-height: 1.15; margin-bottom: 8px;
        }
        .congregation-name-en {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 4vw, 42px);
          font-style: italic; color: var(--brown); margin-bottom: 6px;
        }
        .congregation-name-ru {
          font-family: 'EB Garamond', serif;
          font-size: clamp(16px, 3vw, 26px);
          color: var(--text-mid); margin-bottom: 32px;
        }
        .city-tag {
          display: inline-block; border: 1px solid var(--gold);
          color: var(--gold-dark); font-size: 13px;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 6px 24px; margin-bottom: 40px; border-radius: 2px;
        }
        .divider-gold {
          width: 120px; height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), transparent);
          margin: 0 auto 36px;
        }
        .hero-tagline {
          font-size: clamp(16px, 2.5vw, 21px); line-height: 1.85;
          color: var(--text-mid); max-width: 640px; margin: 0 auto;
        }
        .hero-scroll-hint {
          position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
          color: var(--gold-dark); font-size: 24px;
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }

        #verse-strip {
          width: 100%;
          background: linear-gradient(135deg, #fdf9f0 0%, #f5ecd8 50%, #fdf9f0 100%);
          padding: 80px 24px; text-align: center;
          border-top: 1px solid #e8d5a3;
        }
        .verse-label {
          font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--gold-dark); margin-bottom: 20px;
          animation: verseFade 1s ease;
        }
        .verse-text {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: clamp(20px,3.2vw,32px); color: #3d2b0d;
          max-width: 750px; margin: 0 auto 16px; line-height: 1.6;
          animation: verseFade 1.2s ease;
        }
        .verse-ref {
          color: var(--gold); font-size: 15px; letter-spacing: 0.15em;
          font-weight: 600;
          animation: verseFade 1.4s ease;
        }
        @keyframes verseFade {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .hero-deco-left, .hero-deco-right { display: none; }
        }
      `}</style>

      <section id="hero">
        <div className="hero-deco-left">✡</div>
        <div className="hero-deco-right">✡</div>
        <div className="hero-content">
          <div className="congregation-name-he">כלת ישוע</div>
          <div className="congregation-name-en">Bride of Jesus</div>
          <div className="congregation-name-ru">Невеста Иисуса</div>
          <div className="city-tag">{T.city}</div>
          <div className="divider-gold"></div>
          <p className="hero-tagline">{T.tagline}</p>
        </div>
        <div className="hero-scroll-hint">↓</div>
      </section>

      <section id="verse-strip">
        <div className="verse-label">
          {lang === 'en' ? '— Verse of the Day —' : lang === 'ru' ? '— Стих дня —' : lang === 'he' ? '— פסוק היום —' : '— Versículo del Día —'}
        </div>
        <div className="verse-text">
          {verse ? (verse['text_' + lang] || verse.text_en) : T.verse1}
        </div>
        <div className="verse-ref">
          {verse ? (verse['reference_' + lang] || verse.reference_en) : T.verse1ref}
        </div>
      </section>
    </>
  )
}

export default Home