import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const SiteSettingsContext = createContext()

// Fallback values used until /api/site-settings/ responds (or if it fails),
// so the site never renders blank contact info.
const DEFAULT_SETTINGS = {
  email: 'info.meshichit.afula@israelmail.com',
  phone: '+972552998715',
  phone_display: '055-299-8715',
  whatsapp_number: '972552998715',
  address_en: '',
  address_ru: '',
  address_he: '',
  address_es: '',
  service_hours_en: 'Meetings usually on Saturday mornings',
  service_hours_ru: 'Собрания обычно в субботу утром',
  service_hours_he: 'מפגשים בדרך כלל בשבת בבוקר',
  service_hours_es: 'Los encuentros suelen ser los sábados por la mañana',
}

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)

  useEffect(() => {
    axios.get('/api/site-settings/')
      .then(res => {
        if (res.data) setSettings({ ...DEFAULT_SETTINGS, ...res.data })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
