/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        smb: "340px",
        mb: "420px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require('@tailwindcss/forms')],
};
