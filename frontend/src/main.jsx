import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './context/LangContext'
import { SiteSettingsProvider } from './context/SiteSettingsContext'

axios.defaults.baseURL = window.location.origin

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <SiteSettingsProvider>
          <App />
        </SiteSettingsProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
)