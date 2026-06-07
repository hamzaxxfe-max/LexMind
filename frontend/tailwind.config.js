export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        jungle: {
          50: "#edf5f0",
          100: "#d1e6d9",
          200: "#a3cdb3",
          300: "#6eaf87",
          400: "#3d8f5f",
          500: "#1A4C38",
          600: "#163e2d",
          700: "#113022",
          800: "#0b2218",
          900: "#05140d",
        },
        cream: {
          50: "#fffdfa",
          100: "#fef9f0",
          200: "#fcf0d6",
          300: "#f9e4b8",
          400: "#f5d699",
          500: "#F5E6CC",
          600: "#e6d0a3",
          700: "#d4b87a",
          800: "#b89a52",
          900: "#967a32",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
