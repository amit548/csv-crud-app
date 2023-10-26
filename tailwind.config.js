/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./web/src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
