/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}", // This tells Tailwind to scan everything in src
	],
	darkMode: "class", // Essential for your isDark logic
	theme: {
		extend: {},
	},
	plugins: [],
};
