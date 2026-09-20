import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Build settings for the site.
export default defineConfig({
  plugins: [
    react(),       // lets Vite understand React (JSX) code
    tailwindcss(), // turns Tailwind class names into real CSS
  ],
  // The site is served from the root of its own domain (toro-welding.com, see public/CNAME),
  // so links to files start from "/". This would need to change only if the site moved into a subfolder.
  base: '/',
})