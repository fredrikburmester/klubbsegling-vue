module.exports = {
    purge: ['./dist/**/*.html', './src/**/*.{vue,js,ts,tsx,html}'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                blue: '#00428C',
            },
            dropShadow: {
                '3xl': '0 0px 23px 12px rgba(0,0,0,0.25)',
            },
            zIndex: {
                100: '100 !important',
                99: '99 !important',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['bumblebee'],
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
    },
}
