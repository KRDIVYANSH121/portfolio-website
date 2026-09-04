/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0e0f13',
        card: '#16181f',
        accent: '#6ee7c8',
        text: '#eef1f6',
        muted: '#9aa1ad',
      }
    },
  },
  plugins: [],
}
