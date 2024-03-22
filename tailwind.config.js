/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
  
    extend: {
      colors: {
        'bluenf': '#1242bf',
      },

      fontFamily: {
        'mont': ['Montserrat']
      },
    },
  },
  plugins: [],
}

