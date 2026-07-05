import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLang } from '../context/LangContext'

function FAQ() {
  const [faqs, setFaqs] = useState([])
  const [open, setOpen] = useState(null)
  const { lang } = useLang()

  useEffect(() => {
    axios.get('/api/faq/')
  .then(res => setFaqs(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err))
  }, [])

  function getQuestion(f) { return f['question_' + lang] || f.question_en }
  function getAnswer(f) { return f['answer_' + lang] || f.answer_en }

  const title = lang === 'en' ? 'Questions & Answers' : lang === 'ru' ? 'Вопросы и ответы' : 'שאלות ותשובות'
  const subtitle = lang === 'en'
    ? 'Common questions about our faith and congregation'
    : lang === 'ru'
    ? 'Частые вопросы о нашей вере и общине'
    : 'שאלות נפוצות על האמונה שלנו והקהילה'

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a1e08', padding: '4rem 8%' }}>
      <style>{`
        .faq-item {
          animation: fadeIn 0.4s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease;
        }
        .faq-answer.open {
          max-height: 500px;
        }
      `}</style>

      <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '2.5rem', marginBottom: '0.5rem', borderBottom: '2px solid #c9a84c', paddingBottom: '1rem' }}>
        {title}
      </h1>
      <p style={{ color: '#8a6a1f', marginBottom: '3rem', fontStyle: 'italic' }}>{subtitle}</p>

      {faqs.length === 0 && (
        <p style={{ color: '#8a6a1f' }}>
          {lang === 'en' ? 'No questions yet.' : lang === 'ru' ? 'Вопросов пока нет.' : 'אין שאלות עדיין.'}
        </p>
      )}

      <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((f, i) => (
          <div key={f.id} className="faq-item" style={{
            background: 'white', border: '1px solid #e8d5a3',
            borderRadius: '8px', overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(201,168,76,0.1)'
          }}>
            <button
              onClick={() => setOpen(open === f.id ? null : f.id)}
              style={{
                width: '100%', padding: '1.2rem 1.5rem',
                background: open === f.id ? '#3d2b0d' : 'white',
                border: 'none', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                textAlign: lang === 'he' ? 'right' : 'left',
                transition: 'background 0.3s ease'
              }}
            >
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.1rem',
                color: open === f.id ? '#e8cc7a' : '#3d2b0d',
                fontWeight: '600'
              }}>
                {getQuestion(f)}
              </span>
              <span style={{
                color: open === f.id ? '#c9a84c' : '#8a6a1f',
                fontSize: '1.4rem', marginLeft: '1rem', flexShrink: 0,
                transition: 'transform 0.3s ease',
                transform: open === f.id ? 'rotate(45deg)' : 'rotate(0)'
              }}>+</span>
            </button>
            <div className={`faq-answer ${open === f.id ? 'open' : ''}`}>
              <div style={{
                padding: '1.2rem 1.5rem',
                color: '#5a4020', lineHeight: '1.8', fontSize: '1rem',
                borderTop: '1px solid #e8d5a3',
                direction: lang === 'he' ? 'rtl' : 'ltr'
              }}>
                {getAnswer(f)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ