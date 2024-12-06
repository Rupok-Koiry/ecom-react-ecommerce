/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-white": "var(--primary-white)",
        "primary-background": "var(--primary-background)",
        "secondary-background": "var(--secondary-background)",
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "primary-grey": "var(--primary-grey)",
        "secondary-grey": "var(--secondary-grey)",
        "primary-orange": "var(--primary-orange)",
        "secondary-orange": "var(--secondary-orange)",
        "primary-green": "var(--primary-green)",
        "primary-red": "var(--primary-red)",
        "primary-blue": "var(--primary-blue)",
      },
    },
  },
  plugins: [],
};
