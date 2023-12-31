/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/**/*.{js,jsx,ts,tsx}",
],
variants: {
  extend: {
    // ...
    // Add 'hover' variant if not already present
    backgroundColor: ['responsive', 'hover', 'focus'],
    // ...
  },
},
theme: {
  extend: {
    backgroundColor: ['responsive', 'hover', 'focus'],
  },
},
plugins: [],
}
