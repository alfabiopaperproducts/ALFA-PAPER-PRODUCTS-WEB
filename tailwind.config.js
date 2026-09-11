/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#399139',
          50: '#f0f8f0',
          100: '#def1de',
          200: '#bee3be',
          300: '#92d092',
          400: '#62b562',
          500: '#399139',
          600: '#2b782b',
          700: '#245f24',
          800: '#204c20',
          900: '#1b3f1b',
          950: '#0a220a',
        },
        kraft: {
          50: '#faf8f5',
          100: '#f4efe6',
          200: '#ede4d4',
          300: '#ded2bb',
          400: '#cab69a',
          500: '#b89e7d',
          600: '#a38466',
          700: '#846952',
          800: '#6b5544',
          900: '#58463a',
        },
        charcoal: {
          DEFAULT: '#1b241d',
          50: '#f6f7f6',
          100: '#e1e5e2',
          200: '#c2cac4',
          300: '#9eaaa1',
          400: '#7a8a7e',
          500: '#5a6a5e',
          600: '#435147',
          700: '#343f37',
          800: '#262f29',
          900: '#1b241d',
          950: '#0f1410',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'premium': '0 20px 25px -5px rgba(27, 36, 29, 0.08), 0 10px 10px -5px rgba(27, 36, 29, 0.04)',
      },
    },
  },
  plugins: [],
}
