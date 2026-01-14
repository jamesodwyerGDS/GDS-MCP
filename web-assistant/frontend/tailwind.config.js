/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neptune: '#024DDF',
        cosmos: '#121212',
        granite: '#646464',
        slate: '#949494',
        spotlight: '#FFFFFF',
        diatomite: '#EBEBEB',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
