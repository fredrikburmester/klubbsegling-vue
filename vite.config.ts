// vite.config.ts
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            mode: 'development',
            base: '/',
            srcDir: 'src',
            includeAssets: ['favicon.ico', 'robots.txt', '/img/icons/apple-touch-icon.png'],
            manifest: {
                name: 'Klubbsegling',
                short_name: 'Klubbsegling',
                description: 'Sveriges bästa klubbseglings hemsida!',
                theme_color: '#00428C',
                start_url: '/',
                display: 'standalone',
                background_color: '#00428C',
                icons: [
                    {
                        src: '/img/icons/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'img/icons/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                ],
            },
        }),
    ],
    define: {
        'process.env': {},
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },
    css: {
        preprocessorOptions: {},
    },
    build: {
        minify: true,
    },
})
