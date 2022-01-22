module.exports = {
	extends: ['plugin:vue/recommended', 'plugin:prettier-vue/recommended', 'prettier'],

	settings: {
		'prettier-vue': {
			SFCBlocks: {
				template: true,
				script: true,
				style: true,

				customBlocks: {
					docs: { lang: 'markdown' },
					config: { lang: 'json' },
					module: { lang: 'js' },
					comments: false,
				},
			},
			usePrettierrc: true,
			fileInfoOptions: {
				ignorePath: '.testignore',
				withNodeModules: false,
			},
		},
	},

	rules: {
		'vue/script-setup-uses-vars': 'off',
		'vue/no-multiple-template-root': 'off',
		'prettier-vue/prettier': [
			'error',
			{
				printWidth: 100,
				singleQuote: true,
				semi: false,
				trailingComma: 'es5',
			},
		],
	},
	parserOptions: {
        "parser": "babel-eslint",
        "allowImportExportEverywhere": true,
        "ecmaFeatures": {
            "legacyDecorators": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        },
        "ecmaVersion": 6,
        "sourceType": "module",
    },
}
