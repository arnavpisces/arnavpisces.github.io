/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Tight', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Inter Tight, sans-serif',
            color: '#fff',
            h1: {
              color: '#fff',
              fontFamily: 'Inter Tight, sans-serif',
            },
            h2: {
              color: '#fff',
              fontFamily: 'Inter Tight, sans-serif',
            },
            h3: {
              color: '#fff',
              fontFamily: 'Inter Tight, sans-serif',
            },
            strong: {
              color: '#fff',
            },
            a: {
              color: '#fff',
              '&:hover': {
                color: '#fff',
              },
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            'code': {
              fontWeight: '400',
              backgroundColor: '#1f2937',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

