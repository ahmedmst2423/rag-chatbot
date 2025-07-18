import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
  },
  define:{
    'process.env.REACT_APP_BASE_API': JSON.stringify(process.env.REACT_APP_BASE_API),
  }
})