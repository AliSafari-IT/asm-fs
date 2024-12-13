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
      fontFamily: {
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        'teams-purple': 'var(--teams-purple)',
        'teams-purple-dark': 'var(--teams-purple-dark)',
        'teams-purple-light': 'var(--teams-purple-light)',
        info: {
          light: '#e3f2fd',
          DEFAULT: '#2196f3',
          dark: '#1565c0',
        },
        success: {
          light: '#e8f5e9',
          DEFAULT: '#4caf50',
          dark: '#2e7d32',
        },
        warning: {
          light: '#fff3e0',
          DEFAULT: '#ff9800',
          dark: '#e65100',
        },
        danger: {
          light: '#ffebee',
          DEFAULT: '#f44336',
          dark: '#c62828',
        },
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