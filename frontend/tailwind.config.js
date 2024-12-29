/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths as needed
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5230B2", // Define your custom color
        secondary: "#F0EDF8", // Define your custom color
        heading:"#1a0066"
      },
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'], // Add Montserrat font
      },
      backgroundImage: {
        'hero-pattern': "url('/public/doodle2.png')", // Add hero pattern image
      },
    },
  },
  plugins: [],
};
