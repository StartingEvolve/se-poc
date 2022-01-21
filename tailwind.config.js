/* eslint-env es6 */
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{html,ts}',
    './src/app/shared/components/**/*.{html,ts}'
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
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')({
    strategy: "class"
  }), require('@tailwindcss/line-clamp')],
}
