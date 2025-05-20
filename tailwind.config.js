/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/interfaces/components/**/*.{js,ts,jsx,tsx}",
      "./src/interfaces/ui/**/*.{js,ts,jsx,tsx}",
      "./src/interfaces/views/*.{js,ts,jsx,tsx}",
      "./src/interfaces/views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

