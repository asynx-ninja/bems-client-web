/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
      lg: "976px",
      x: "1350px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        primary: "Gilmer-Regular",
        'bold': "Gilmer-Bold",
        'light': "Gilmer-Light",
        'medium': "Gilmer-Medium",
        'heavy': "Gilmer-Heavy",
      },
      colors: {
        'white': '#FFFFFF',
        'custom-green-header': '#295141',
        'custom-red': '#B90000',
        'custom-grey': '#D9D9D9',
        'custom-blue': '#4891FF',
        'custom-green-button': '#268F26',
        'custom-yellow ': '#EDAB00',
        'custom-gold': '#D3B574',
        'custom-gold1': '#FFCF67',
        'custom-red1': '#FF2828',
        'custom-green-table-header': '#295141',
        'custom-amber': '#EFB050',
        'custom-red-button': "#B95252",
        'custom-green-button2': '#369987',
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require("flowbite/plugin"),
  ],
};

