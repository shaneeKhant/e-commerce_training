/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      Rubik: ["Rubik", "sans-serif"]
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: 'rem',
        xl: 'rem',
        '2xl': 'rem',
      },
    },

    extend: {
      fontFamily: {
        Roboto_head: ["Poppins", "sans-serif"],
        Popin_body: ["Roboto", "sans-serif"],
        Montser_head: ['Montserrat', "sans-serif"]
      },

      colors: {
        primary: {
          100: "#d6d8dc",
          200: "#acb0ba",
          300: "#838997",
          400: "#596175",
          500: "#303a52",
          600: "#262e42",
          700: "#1d2331",
          800: "#131721",
          900: "#0a0c10"
        },
        secondary: {
          100: "#d3dfe7",
          200: "#a7bfd0",
          300: "#7aa0b8",
          400: "#4e80a1",
          500: "#226089",
          600: "#1b4d6e",
          700: "#143a52",
          800: "#0e2637",
          900: "#07131b"
        },
      },
    },
  },
  plugins: [],
}

