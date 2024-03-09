import { globalStyle, keyframes, style } from '@vanilla-extract/css';

globalStyle('#root', {
	maxWidth: '1280px',
	margin: '0 auto',
	padding: '2rem',
	textAlign: 'center',
});

export const logo = style({
	height: '6em',
	padding: '1.5em',
	willChange: 'filter',
	transition: 'filter 300ms',
	':hover': {
		filter: 'drop-shadow(0 0 2em #646cffaa)',
	},
});
export const logoSpin = keyframes({
	from: {
		transform: 'rotate(0deg)',
	},
	to: {
		transform: 'rotate(360deg)',
	},
});
export const logoReact = style([
	logo,
	{
		animation: `${logoSpin} infinite 20s linear`,
		':hover': {
			filter: 'drop-shadow(0 0 2em #61dafbaa)',
		},
	},
]);
export const card = style({
	padding: '2em',
});
export const readTheDocs = style({
	color: '#888',
});
