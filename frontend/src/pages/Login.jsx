import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLang } from '../context/LangContext'

function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { lang } = useLang()
  const navigate = useNavigate()

  const t = {
    en: { title: 'Members Area', subtitle: 'Enter congregation password', placeholder: 'Password', button: 'Enter', error: 'Incorrect password' },
    ru: { title: 'Для прихожан', subtitle: 'Введите пароль общины', placeholder: 'Пароль', button: 'Войти', error: 'Неверный пароль' },
    he: { title: 'אזור חברי הקהילה', subtitle: 'הכנס סיסמת קהילה', placeholder: 'סיסמה', button: 'כניסה', error: 'סיסמה שגויה' },
  }

  const T = t[lang]

async function handleSubmit() {
    setLoading(true)
    setError(false)
    try {
      const res = await axios.post('/api/check-password/', { password })
      localStorage.setItem('member_token', res.data.token)
      navigate('/events')
    } catch {
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#faf7f2',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'white', border: '1px solid #e8d5a3',
        borderRadius: '12px', padding: '3rem', width: '100%', maxWidth: '400px',
        textAlign: 'center', boxShadow: '0 4px 24px rgba(201,168,76,0.15)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <img src="/src/assets/pingue.png" alt="dove" style={{
  width: '100px', height: '100px', objectFit: 'contain',
  mixBlendMode: 'multiply', opacity: 1
}} />
        </div>

        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#3d2b0d', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          {T.title}
        </h1>
        <p style={{ color: '#8a6a1f', marginBottom: '2rem' }}>{T.subtitle}</p>

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder={T.placeholder}
          style={{
            width: '100%', padding: '0.8rem 1rem',
            background: '#faf7f2', border: '1px solid #c9a84c',
            borderRadius: '6px', color: '#2a1e08', fontSize: '1rem',
            marginBottom: '1rem', outline: 'none',
            textAlign: lang === 'he' ? 'right' : 'left'
          }}
        />

        {error && (
          <p style={{ color: '#c0392b', marginBottom: '1rem', fontSize: '0.9rem' }}>{T.error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%', padding: '0.8rem',
            background: '#3d2b0d', border: 'none',
            borderRadius: '6px', color: '#e8cc7a',
            fontSize: '1rem', cursor: 'pointer',
            fontFamily: 'Playfair Display, serif', letterSpacing: '0.05em'
          }}
        >
          {loading ? '...' : T.button}
        </button>
      </div>
    </div>
  )
}

export default Login