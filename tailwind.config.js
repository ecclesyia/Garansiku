/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: { card: '0 1px 2px rgb(15 23 42 / 0.06)' }
    }
  },
  plugins: []
};
