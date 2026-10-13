/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d62839',
          dark: '#c0392b',
          light: '#e63950',
        },
        charcoal: {
          DEFAULT: '#1f2937',
          dark: '#111827',
          light: '#374151',
        },
        brand: {
          red: '#d62839',
        }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-in': 'slideIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 20px 40px rgba(214,40,57,0.2)',
        'red': '0 8px 25px rgba(214,40,57,0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(214,40,57,0.4) 100%)',
        'red-gradient': 'linear-gradient(135deg, #d62839, #c0392b)',
        'dark-gradient': 'linear-gradient(135deg, #7a1220 0%, #1f2937 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
