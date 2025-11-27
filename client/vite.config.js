import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
    // Load environment variables
    const env = loadEnv(mode, process.cwd(), '');

    // Get your URL
    const url = env.VITE_BACKEND_URL;

    return {
        base: './', // Ensure relative paths for assets
        plugins: [react()],
        css: {
            postcss: {
                plugins: [tailwindcss(), autoprefixer()],
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
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
                plugins: [
                    visualizer({
                        filename: './dist/stats.html',
                        open: true,
                    }),
                ],
            },
        },
    };
});
