import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
    // Load env file
    const env = loadEnv(mode, process.cwd(), '')

    // Access your variable
    const url = env.VITE_BACKEND_URL

    return {
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
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['react', 'react-dom', 'react-router-dom'],
                        ui: ['react-bootstrap', 'lucide-react']
                    }
                }
            },
            cssCodeSplit: true,
            assetsInlineLimit: 4096
        },
        base: './',
    }
})