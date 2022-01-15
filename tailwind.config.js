const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ]
  ,
  theme: {
    extend: {
      colors: {
        'light-blue': colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
}
