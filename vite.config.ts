// vite.config.ts
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            includeAssets: ['favicon.ico', 'robots.txt', '/img/apple-touch-icon.png'],
            manifest: {
                name: 'Klubbsegling',
                short_name: 'Klubbsegling',
                description: 'Sveriges bästa klubbseglings hemsida!',
                theme_color: '#00428C',
                icons: [
                    {
                        src: '/img/android-chrome-192x192.png',
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
