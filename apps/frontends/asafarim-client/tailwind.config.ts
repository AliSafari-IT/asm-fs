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
    screens: {
      'dark-mode': { 'raw': '(prefers-color-scheme: dark)' },
    },
    variants: {
      extend: {
        opacity: ['disabled', 'group-hover', 'responsive'],
      },
    },
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
          light: '#f8d7da',
          DEFAULT: '#f44336',
          dark: '#c62828',
        },
        error: {
          light: '#f8d7da',
          DEFAULT: '#ef5350',
          dark: '#d32f2f',
        },
        primary: {
          light: 'var(--bg-primary-light)',
          DEFAULT: 'var(--bg-primary)',
          dark: 'var(--bg-primary-dark)',
        },
        secondary: {
          light: 'var(--bg-secondary-light)',
          DEFAULT: 'var(--bg-secondary)',
          dark: 'var(--bg-secondary-dark)',
        },
        tertiary: {
          light: 'var(--bg-tertiary-light)',
          DEFAULT: 'var(--bg-tertiary)',
          dark: 'var(--bg-tertiary-dark)',
        },
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--bg-tertiary)',
        info: 'var(--bg-info)',
        success: 'var(--bg-success)',
        warning: 'var(--bg-warning)',
        danger: 'var(--bg-danger)',
        error: 'var(--bg-error)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        info: 'var(--text-info)',
        success: 'var(--text-success)',
        warning: 'var(--text-warning)',
        danger: 'var(--text-danger)',
        error: 'var(--text-error)',
      },
      borderColor: {
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
        info: 'var(--border-info)',
        success: 'var(--border-success)',
        warning: 'var(--border-warning)',
        danger: 'var(--border-danger)',
        error: 'var(--border-error)',
        focus: 'var(--border-focus)',
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': { 'background-position': '0% center' },
          '50%': { 'background-position': '100% center' },
          '100%': { 'background-position': '0% center' },
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      classNames: {
        'btn-create': 'bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-700 hover:bg-blue-600',
        'btn-edit': 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-300',
        'btn-delete': 'bg-red-500 text-white dark:bg-red-600 dark:hover:bg-red-700 hover:bg-red-600',
        'btn-cancel': 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 hover:bg-gray-200',
        'btn-accept': 'bg-green-500 text-white dark:bg-green-600 dark:hover:bg-green-700 hover:bg-green-600',
        'btn-reject': 'bg-red-500 text-white dark:bg-red-600 dark:hover:bg-red-700 hover:bg-red-600',
        'btn-approve': 'bg-green-500 text-white dark:bg-green-600 dark:hover:bg-green-700 hover:bg-green-600',
      },
      screens: {
        'xs': '320px',    // Small phones (iPhone SE, Galaxy S8)
        'sm': '480px',    // Large phones (iPhone 12, Pixel 5)
        'md': '768px',    // Tablets (iPad Mini, iPad Air)
        'lg': '1024px',   // Small laptops
        'xl': '1280px',   // Desktop monitors
        '2xl': '1536px',  // Large desktop monitors
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

/** @type {import('tailwindcss').Config} */
export default withMT(config);