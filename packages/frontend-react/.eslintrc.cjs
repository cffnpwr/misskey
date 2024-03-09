module.exports = {
	root: true,
	env: {
		node: false,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	plugins: ['react-refresh'],
	extends: [
		'../shared/.eslintrc.js',
		'plugin:react-hooks/recommended',
	],
	rules: {
		'@typescript-eslint/no-empty-interface': [
			'error',
			{
				'allowSingleExtends': true,
			},
		],
		// window の禁止理由: グローバルスコープと衝突し、予期せぬ結果を招くため
		// e の禁止理由: error や event など、複数のキーワードの頭文字であり分かりにくいため
		'id-denylist': ['error', 'window', 'e'],
		'no-shadow': ['warn'],
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
	globals: {
		// Node.js
		'module': false,
		'require': false,
		'__dirname': false,

		// Misskey
		'_DEV_': false,
		'_LANGS_': false,
		'_VERSION_': false,
		'_COMMIT_HASH_': false,
		'_ENV_': false,
		'_PERF_PREFIX_': false,
		'_DATA_TRANSFER_DRIVE_FILE_': false,
		'_DATA_TRANSFER_DRIVE_FOLDER_': false,
		'_DATA_TRANSFER_DECK_COLUMN_': false,
	},
};
