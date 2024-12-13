import withMT from "../../../node_modules/@material-tailwind/react/utils/withMT";

const config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teams-purple': 'var(--teams-purple)',
        'teams-purple-dark': 'var(--teams-purple-dark)',
        'teams-purple-light': 'var(--teams-purple-light)',
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      borderColor: {
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

/** @type {import('tailwindcss').Config} */
export default withMT(config);