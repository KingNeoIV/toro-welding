// Entry point of the site: finds the <div id="root"> in index.html and draws the whole React app inside it.
// index.css (imported below) loads Tailwind and the site's theme colors and fonts for every page.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // StrictMode only adds extra developer checks while running locally. It has no effect on the live site.
  <StrictMode>
    <App />
  </StrictMode>,
)
