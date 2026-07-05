import { useState } from 'react'
import { useLang } from '../context/LangContext'

function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [underlineLinks, setUnderlineLinks] = useState(false)
  const [bigCursor, setBigCursor] = useState(false)
  const [grayscale, setGrayscale] = useState(false)
  const [readableFont, setReadableFont] = useState(false)
  const [lineSpacing, setLineSpacing] = useState(false)
  const [stopAnimations, setStopAnimations] = useState(false)
  const { lang } = useLang()

  const t = {
    en: {
      title: 'Accessibility',
      fontSize: 'Font Size',
      contrast: 'High Contrast',
      links: 'Underline Links',
      cursor: 'Large Cursor',
      grayscale: 'Grayscale',
      readableFont: 'Readable Font',
      lineSpacing: 'Line Spacing',
      stopAnimations: 'Stop Animations',
      reset: 'Reset',
      close: 'Close',
      hide: 'Hide button',
    },
    ru: {
      title: 'Доступность',
      fontSize: 'Размер шрифта',
      contrast: 'Высокий контраст',
      links: 'Подчеркнуть ссылки',
      cursor: 'Большой курсор',
      grayscale: 'Оттенки серого',
      readableFont: 'Читаемый шрифт',
      lineSpacing: 'Межстрочный интервал',
      stopAnimations: 'Остановить анимации',
      reset: 'Сброс',
      close: 'Закрыть',
      hide: 'Скрыть кнопку',
    },
    he: {
      title: 'נגישות',
      fontSize: 'גודל גופן',
      contrast: 'ניגודיות גבוהה',
      links: 'קו תחתי לקישורים',
      cursor: 'סמן גדול',
      grayscale: 'גווני אפור',
      readableFont: 'גופן קריא',
      lineSpacing: 'ריווח שורות',
      stopAnimations: 'עצור אנימציות',
      reset: 'איפוס',
      close: 'סגור',
      hide: 'הסתר כפתור',
    },
  }

  const T = t[lang]

  function applyFontSize(size) {
    setFontSize(size)
    document.documentElement.style.fontSize = size + '%'
  }

  function toggleContrast(val) {
    setHighContrast(val)
    const content = document.getElementById('main-content')
    if (content) {
      content.style.filter = buildFilter(val, grayscale)
    }
  }

  function toggleGrayscale(val) {
    setGrayscale(val)
    const content = document.getElementById('main-content')
    if (content) {
      content.style.filter = buildFilter(highContrast, val)
    }
  }

  function buildFilter(contrast, gray) {
    const parts = []
    if (contrast) parts.push('contrast(1.5) brightness(1.1)')
    if (gray) parts.push('grayscale(1)')
    return parts.join(' ')
  }

  function toggleLinks(val) {
    setUnderlineLinks(val)
    if (val) {
      const style = document.createElement('style')
      style.id = 'underline-links'
      style.textContent = 'a { text-decoration: underline !important; }'
      document.head.appendChild(style)
    } else {
      const el = document.getElementById('underline-links')
      if (el) el.remove()
    }
  }

  function toggleCursor(val) {
    setBigCursor(val)
    document.body.style.cursor = val ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cpath d=\'M8 2 L8 26 L13 21 L17 30 L20 29 L16 20 L23 20 Z\' fill=\'black\' stroke=\'white\' stroke-width=\'1\'/%3E%3C/svg%3E") 0 0, auto' : ''
  }

  function toggleReadableFont(val) {
    setReadableFont(val)
    const content = document.getElementById('main-content')
    if (content) {
      content.style.fontFamily = val ? 'Arial, Helvetica, sans-serif' : ''
    }
  }

  function toggleLineSpacing(val) {
    setLineSpacing(val)
    if (val) {
      const style = document.createElement('style')
      style.id = 'line-spacing'
      style.textContent = '#main-content p, #main-content li, #main-content div { line-height: 2.1 !important; letter-spacing: 0.03em !important; }'
      document.head.appendChild(style)
    } else {
      const el = document.getElementById('line-spacing')
      if (el) el.remove()
    }
  }

  function toggleStopAnimations(val) {
    setStopAnimations(val)
    if (val) {
      const style = document.createElement('style')
      style.id = 'stop-animations'
      style.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }'
      document.head.appendChild(style)
    } else {
      const el = document.getElementById('stop-animations')
      if (el) el.remove()
    }
  }

  function reset() {
    applyFontSize(100)
    toggleContrast(false)
    toggleGrayscale(false)
    toggleLinks(false)
    toggleCursor(false)
    toggleReadableFont(false)
    toggleLineSpacing(false)
    toggleStopAnimations(false)
  }

  const btnStyle = (active) => ({
    width: '100%', padding: '8px 12px', marginBottom: '8px',
    background: active ? '#c9a84c' : 'rgba(201,168,76,0.1)',
    border: '1px solid #8a6a1f', borderRadius: '6px',
    color: active ? '#1a1208' : '#e8cc7a',
    cursor: 'pointer', fontSize: '0.85rem', textAlign: 'right',
    fontWeight: active ? 'bold' : 'normal',
    transition: 'all 0.2s'
  })

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        aria-label="Show accessibility"
        style={{
          position: 'fixed', bottom: '5rem', left: '2rem', zIndex: 3000,
          background: 'rgba(26,18,8,0.8)', border: '1px solid #8a6a1f',
          borderRadius: '50%', width: '30px', height: '30px',
          color: '#8a6a1f', cursor: 'pointer', fontSize: '0.7rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        ♿
      </button>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={T.title}
        style={{
          position: 'fixed', bottom: '5rem', left: '2rem', zIndex: 3000,
          width: '52px', height: '52px', borderRadius: '50%',
          background: '#c9a84c', border: 'none', cursor: 'pointer',
          fontSize: '1.6rem', boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        ♿
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={T.title}
          style={{
            position: 'fixed', bottom: '9rem', left: '2rem', zIndex: 3000,
            background: '#1a1208', border: '1px solid #8a6a1f',
            borderRadius: '12px', padding: '1.5rem', width: '250px',
            maxHeight: '75vh', overflowY: 'auto',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
            direction: lang === 'he' ? 'rtl' : 'ltr'
          }}
        >
          <h3 style={{ color: '#c9a84c', fontFamily: 'serif', marginBottom: '1rem', fontSize: '1.1rem' }}>
            ♿ {T.title}
          </h3>

          <p style={{ color: '#8a6a1f', fontSize: '0.8rem', marginBottom: '6px' }}>{T.fontSize}</p>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {[90, 100, 115, 130].map(size => (
              <button key={size} onClick={() => applyFontSize(size)} style={{
                flex: 1, padding: '6px 4px',
                background: fontSize === size ? '#c9a84c' : 'rgba(201,168,76,0.1)',
                border: '1px solid #8a6a1f', borderRadius: '4px',
                color: fontSize === size ? '#1a1208' : '#e8cc7a',
                cursor: 'pointer',
                fontSize: size === 90 ? '0.7rem' : size === 100 ? '0.85rem' : size === 115 ? '1rem' : '1.1rem'
              }}>A</button>
            ))}
          </div>

          <button style={btnStyle(highContrast)} onClick={() => toggleContrast(!highContrast)}>
            {highContrast ? '✓ ' : ''}{T.contrast}
          </button>
          <button style={btnStyle(grayscale)} onClick={() => toggleGrayscale(!grayscale)}>
            {grayscale ? '✓ ' : ''}{T.grayscale}
          </button>
          <button style={btnStyle(underlineLinks)} onClick={() => toggleLinks(!underlineLinks)}>
            {underlineLinks ? '✓ ' : ''}{T.links}
          </button>
          <button style={btnStyle(bigCursor)} onClick={() => toggleCursor(!bigCursor)}>
            {bigCursor ? '✓ ' : ''}{T.cursor}
          </button>
          <button style={btnStyle(readableFont)} onClick={() => toggleReadableFont(!readableFont)}>
            {readableFont ? '✓ ' : ''}{T.readableFont}
          </button>
          <button style={btnStyle(lineSpacing)} onClick={() => toggleLineSpacing(!lineSpacing)}>
            {lineSpacing ? '✓ ' : ''}{T.lineSpacing}
          </button>
          <button style={btnStyle(stopAnimations)} onClick={() => toggleStopAnimations(!stopAnimations)}>
            {stopAnimations ? '✓ ' : ''}{T.stopAnimations}
          </button>

          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button onClick={reset} style={{
              flex: 1, padding: '8px', background: 'transparent',
              border: '1px solid #8a6a1f', borderRadius: '6px',
              color: '#8a6a1f', cursor: 'pointer', fontSize: '0.85rem'
            }}>{T.reset}</button>
            <button onClick={() => setOpen(false)} style={{
              flex: 1, padding: '8px', background: '#8a6a1f',
              border: 'none', borderRadius: '6px',
              color: '#f5f0e8', cursor: 'pointer', fontSize: '0.85rem'
            }}>{T.close}</button>
          </div>

          <button onClick={() => { setOpen(false); setHidden(true) }} style={{
            width: '100%', marginTop: '8px', padding: '6px',
            background: 'transparent', border: 'none',
            color: '#5a4020', cursor: 'pointer', fontSize: '0.75rem',
            textDecoration: 'underline'
          }}>{T.hide}</button>
        </div>
      )}
    </>
  )
}

export default AccessibilityWidget