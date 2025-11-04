/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f4fc',
          100: '#d0e8f9',
          200: '#a1d1f3',
          300: '#72baed',
          400: '#43a3e7',
          500: '#0A66C2', // LinkedIn blue
          600: '#08569f',
          700: '#06407c',
          800: '#042b54',
          900: '#02162c',
        },
        accent: {
          light: '#e7f3ff',
          DEFAULT: '#0A66C2',
          dark: '#004182',
        },
        background: {
          primary: '#ffffff',
          secondary: '#f3f6f8',
          tertiary: '#e8ebed',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#666666',
          tertiary: '#999999',
          inverse: '#ffffff',
        },
      },
    },
  },
  plugins: [],
};
