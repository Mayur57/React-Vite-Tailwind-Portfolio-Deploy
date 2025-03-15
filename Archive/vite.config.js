import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ], 
  server: {
    proxy: {
      "/send-email": {
        target: "https://react-vite-tailwind-portfolio-deploy-hdgx.vercel.app",
        changeOrigin: true,
        secure: true,
      },
      "/poke": {
        target: "https://react-vite-tailwind-portfolio-deploy-hdgx.vercel.app",
        changeOrigin: true,
        secure: true,
      },
      "/last-visitor": {
        target: "https://react-vite-tailwind-portfolio-deploy-hdgx.vercel.app",
        changeOrigin: true,
        secure: true,
      }
    },
  },
})
