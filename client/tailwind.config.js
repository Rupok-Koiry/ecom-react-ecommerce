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
        "primary-brand": "var(--primary-brand)",
        "secondary-brand": "var(--secondary-brand)",
        "success-color": "var(--success-color)",
        "error-color": "var(--error-color)",
        "warning-color": "var(--warning-color)",
        "info-color": "var(--info-color)",
      },
    },
  },
  plugins: [],
};
