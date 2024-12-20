/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Quicksand', 'sans-serif'],
		},
		extend: {
			colors: {
				dark: '#855f3c',
				light: '#c8b07f',
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-hidden': {
					'scrollbar-width': 'none', // Firefox
					'-ms-overflow-style': 'none', // IE and Edge
				},
				'.scrollbar-hidden::-webkit-scrollbar': {
					display: 'none', // Chrome, Safari, and Opera
				},
			});
		}),
	],
};
