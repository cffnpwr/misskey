/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// https://vitejs.dev/config/build-options.html#build-modulepreload
import { createRoot } from 'react-dom/client';
import 'vite/modulepreload-polyfill';
import App from './App.jsx';

const removeSplash = () => {
	const splash = document.getElementById('splash');
	if (splash) {
		splash.style.opacity = '0';
		splash.style.pointerEvents = 'none';
	}
};

const splash = document.getElementById('splash');
// 念のためnullチェック(HTMLが古い場合があるため(そのうち消す))
if (splash) splash.addEventListener('transitionend', () => {
	splash.remove();
});

let rootDom = document.getElementById('root');
if (!rootDom) {
	rootDom = document.createElement('div');
	rootDom.id = 'root';
	document.body.appendChild(rootDom);
}
const root = createRoot(rootDom);

root.render(<App/>);

removeSplash();
