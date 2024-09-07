/** @type {Plugin} */

const plugin = require('tailwindcss/plugin')
const {scrollbarGutter, scrollbarWidth, scrollbarColor} = require("tailwind-scrollbar-utilities");

module.exports = {
  content: [
    './src/**/**.{html, ts},', './src/app/**/*.{html, ts}',
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {},
  },
  plugins:
    [
      scrollbarGutter(),
      scrollbarWidth(),
      scrollbarColor(),
      plugin(function({ addUtilities }) {
        addUtilities({
          '.no-scrollbar::-webkit-scrollbar': {
            'display': 'none',
          },
          '.no-scrollbar': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          },
        })
      }),
      require('flowbite/plugin')
    ],
}
