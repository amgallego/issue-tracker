/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dce6ff',
          200: '#b9cdff',
          300: '#85aaff',
          400: '#4d7fff',
          500: '#1a56ff',
          600: '#0038e6',
          700: '#002db8',
          800: '#002496',
          900: '#001a70',
        },
        surface: {
          DEFAULT: '#0f1117',
          card:    '#181c28',
          border:  '#252a3a',
        },
      },
    },
  },
  plugins: [],
}
