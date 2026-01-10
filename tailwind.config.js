import { heroui } from '@heroui/theme'

/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        blue: {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c7fb',
          300: '#66aaf9',
          400: '#338ef7',
          500: '#006FEE',
          600: '#005bc4',
          700: '#004493',
          800: '#002e62',
          900: '#001731',
        },
        // .. rest of the colors
      },
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: '#f6f1eb', // or DEFAULT
            foreground: '#000000', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              background: '#f6f1eb',
              foreground: '#FFFFFF',
              DEFAULT: '#3f8066',
            },
            secondary: {
              DEFAULT: '#ddc1a2',
              background: '#f6f1eb',
              foreground: '#000000',
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: '#000000', // or DEFAULT
            foreground: '#ECEDEE', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE',
            },
          },
          // ... rest of the colors
        },
        mytheme: {
          // custom theme
          extend: 'dark',
          colors: {
            primary: {
              DEFAULT: '#BEF264',
              foreground: '#000000',
            },
            focus: '#BEF264',
          },
        },
      },
    }),
  ],
}
