// vite.config.ts
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			includeAssets: [
				'favicon.ico',
				'robots.txt',
				'apple-touch-icon.png',
			],
			manifest: {
				name: 'Klubbsegling',
				short_name: 'Klubbsegling',
				description: 'Sveriges bästa klubbseglings hemsida!',
				theme_color: '#00428C',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
				],
			},
		}),
	],
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
