import dns from 'dns';
import { readFile } from 'fs/promises';
import * as yaml from 'js-yaml';
import { defineConfig } from 'vite';
import locales from '../../locales/index.js';
import { getConfig } from './vite.config.js';

dns.setDefaultResultOrder('ipv4first');

const defaultConfig = getConfig();

const { port } = yaml.load(await readFile('../../.config/default.yml', 'utf-8'));

const httpUrl = `http://localhost:${port}/`;
const websocketUrl = `ws://localhost:${port}/`;

const devConfig = defineConfig({
	...defaultConfig,
	root: 'src',
	publicDir: '../assets',
	base: './',
	server: {
		host: 'localhost',
		port: 5174,
		proxy: {
			'/api': {
				changeOrigin: true,
				target: httpUrl,
			},
			'/assets': httpUrl,
			'/static-assets': httpUrl,
			'/client-assets': httpUrl,
			'/files': httpUrl,
			'/twemoji': httpUrl,
			'/fluent-emoji': httpUrl,
			'/sw.js': httpUrl,
			'/streaming': {
				target: websocketUrl,
				ws: true,
			},
			'/favicon.ico': httpUrl,
			'/identicon': {
				target: httpUrl,
				rewrite(path) {
					return path.replace('@localhost:5174', '');
				},
			},
			'/url': httpUrl,
			'/proxy': httpUrl,
		},
	},
	build: {
		...defaultConfig.build,
		rollupOptions: {
			...defaultConfig.build?.rollupOptions,
			input: 'index.html',
		},
	},

	define: {
		...defaultConfig.define,
		_LANGS_FULL_: JSON.stringify(Object.entries(locales)),
	},
});

export default devConfig;
