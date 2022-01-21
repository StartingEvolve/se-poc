const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/app/shared/components/**/*.{html,ts}',
  ],

  mode: 'jit',
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
