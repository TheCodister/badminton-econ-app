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
      fontSize: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
        p: '0.8rem',
      },
      fontWeight: {
        heading: '500',
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
  },
  darkMode: 'class',
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme('fontSize.h1'),
          fontWeight: theme('fontWeight.heading'),
        },
        h2: {
          fontSize: theme('fontSize.h2'),
          fontWeight: theme('fontWeight.heading'),
        },
        h3: {
          fontSize: theme('fontSize.h3'),
          fontWeight: theme('fontWeight.heading'),
        },
        h4: {
          fontSize: theme('fontSize.h4'),
          fontWeight: theme('fontWeight.heading'),
        },
        h5: {
          fontSize: theme('fontSize.h5'),
          fontWeight: theme('fontWeight.heading'),
        },
        h6: {
          fontSize: theme('fontSize.h6'),
          fontWeight: theme('fontWeight.heading'),
        },
        p: {
          fontSize: theme('fontSize.p'),
        },
        body: {
          fontFamily: theme('fontFamily.sans'),
        },
      })
    },
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
            background: '#111a15', // deep forest green-black, mirrors the warm cream of light
            foreground: '#e8e3da', // warm near-white, echoes light's cream background
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#4fa882', // brighter forest green — same family as light's #3f8066
            },
            secondary: {
              DEFAULT: '#c4a07e', // muted sandy tan — same family as light's #ddc1a2
              foreground: '#1a1a1a',
            },
            content1: '#1e3028', // card surface — clearly elevated above background
            content2: '#263d30', // hover / nested surface
            content3: '#2e4c3a',
            content4: '#375743',
          },
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
