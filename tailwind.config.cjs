/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				tall: { raw: '(min-height: 700px)' },
			},
		},
	},
	plugins: [],
};
