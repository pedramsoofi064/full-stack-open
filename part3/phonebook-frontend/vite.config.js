import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        // target: 'https://full-stack-open-part3-iiyt.onrender.com',
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
