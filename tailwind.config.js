module.exports = {
	purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blue: '#00428C',
				// primary: '#00428C',
			},
			dropShadow: {
				xltop: '0 -2px 4px rgba(0, 0, 0, 0.2)',
			},
			zIndex: {
				100: '100 !important',
				99: '99 !important',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('daisyui')],
}
