module.exports = {
	root: true,
	parser: "vue-eslint-parser",
	extends: [
		'prettier',
		'plugin:vue/recommended', 
		"plugin:prettier/recommended",
		'plugin:prettier-vue/recommended', 
		"plugin:@typescript-eslint/recommended",
		"@vue/prettier",
		"@vue/typescript",
	],
	plugins: [
		"vue",
		"@typescript-eslint"
	],
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
		parser: "@typescript-eslint/parser",
		allowImportExportEverywhere: true,
		ecmaFeatures: {
			legacyDecorators: true,
			modules: true,
			experimentalObjectRestSpread: true,
		},
		ecmaVersion: 6,
		sourceType: 'module',
	},
}
