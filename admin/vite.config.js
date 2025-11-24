export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const url = env.VITE_BACKEND_URL

  return {
    base: mode === 'production' ? '/' : '/', // change '/' to '/admin/' if deployed in a subfolder
    plugins: [react()],
    server: {
      proxy: {
        '/api/uploads': {
          target: url,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/uploads/, '/uploads'),
        },
        '/api': {
          target: url,
          changeOrigin: true,
          secure: false,
        },
        '/uploads': {
          target: url,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
