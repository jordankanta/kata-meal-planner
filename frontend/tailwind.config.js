/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C00',
          light: '#FFA500',
          dark: '#E67E00',
        },
        secondary: {
          DEFAULT: '#FFD700',
          light: '#FFED4E',
          dark: '#FFC700',
        },
        orange: {
          500: '#FF8C00',
          600: '#E67E00',
        },
        yellow: {
          400: '#FFD700',
        },
      },
    },
  },
  plugins: [],
}
