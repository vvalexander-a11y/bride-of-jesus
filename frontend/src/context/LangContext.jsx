import { createContext, useContext, useState } from 'react'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const browserLang = navigator.language.slice(0, 2)
    if (browserLang === 'ru') return 'ru'
    if (browserLang === 'he') return 'he'
    return 'en'
  })

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}