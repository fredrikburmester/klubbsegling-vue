module.exports = {
	purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blue: '#00428C',
				// primary: '#00428C',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('daisyui')],
}
