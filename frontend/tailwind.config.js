/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5230B2", 
        secondary: "#F0EDF8",
        heading:"#1a0066"
      },
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'], 
      },
      backgroundImage: {
        'hero-pattern': "url('/public/doodle2.png')", 
      },
    },
  },
  plugins: [],
};
