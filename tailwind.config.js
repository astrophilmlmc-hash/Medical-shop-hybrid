/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          blue: '#3B82F6',
          blueDark: '#1D4ED8',
          green: '#10B981',
          greenDark: '#059669',
          dark: '#1F2937',
          red: '#EF4444',
        }
      }
    },
  },
  plugins: [],
}
