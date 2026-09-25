/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        void: {
          DEFAULT: '#090612',
          dark: '#05030B',
          deep: '#07040E',
          surface: '#120924',
          card: '#180E2E',
          border: '#2A1A4A',
          highlight: '#3B2468',
        },
        gold: {
          300: '#fde047',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          bronze: '#c89659',
          glow: '#d4af37',
        },
        sage: {
          50: '#F5F7F4',
          100: '#E7EDE5',
          200: '#CFDBCB',
          300: '#B0C3AA',
          400: '#82957C',
          500: '#647A5E',
          600: '#4A5A48',
          700: '#3D4C3C',
          800: '#2F3C2E',
          900: '#222D22',
        },
        terracotta: {
          50: '#FAF3EE',
          100: '#F4E5DA',
          200: '#ECCBB5',
          300: '#DFAC8C',
          400: '#D48D62',
          500: '#C87841',
          600: '#B4622D',
          700: '#914B20',
        },
        linen: {
          50: '#FCFBF8',
          100: '#FAF8F4',
          200: '#F3EFE6',
          300: '#E8E1D2',
        },
        charcoal: {
          50: '#F4F4F3',
          100: '#E6E6E4',
          500: '#72756E',
          700: '#454743',
          800: '#2C2D2A',
          900: '#1B1C1A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        editorial: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 10px -2px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 20px 40px -10px rgba(79, 70, 229, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.04)',
        'tactile': '0 12px 32px -4px rgba(74, 90, 72, 0.08), 0 4px 12px -2px rgba(27, 28, 26, 0.04)',
        'tactile-lg': '0 20px 45px -8px rgba(74, 90, 72, 0.12), 0 6px 18px -3px rgba(27, 28, 26, 0.06)',
        'antigravity-gold': '0 0 30px -5px rgba(212, 175, 55, 0.25)',
        'antigravity-purple': '0 0 40px -5px rgba(139, 92, 246, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        }
      }
    },
  },
  plugins: [],
}
