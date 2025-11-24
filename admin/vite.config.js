
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '')
  const apiUrl = env.VITE_BACKEND_URL

  return {
    // Set base path correctly for production
    // Use '/' if deployed at root domain (https://admin.sparkbrightcleaning.com/)
    // Change to '/admin/' if deployed in subfolder
    base: mode === 'production' ? '/' : '/',

    plugins: [react()],

    server: {
      // Only used in development
      proxy: {
        '/api/uploads': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/uploads/, '/uploads'),
        },
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        },
        '/uploads': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
