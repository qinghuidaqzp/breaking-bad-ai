import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Injects the API key from Vercel environment variables at build time
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});