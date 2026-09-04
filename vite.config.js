import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // the site is hosted at https://kari-nami.github.io/csx4107-project1-kanban-board/
  // so assets need this base path to load correctly on GitHub Pages
  base: '/csx4107-project1-kanban-board/',
  plugins: [react()],
})
