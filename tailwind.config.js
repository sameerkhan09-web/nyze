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
          DEFAULT: '#00F2FF', // Electric Cyan
          hover: '#00D1DB',
          glow: 'rgba(0, 242, 255, 0.5)',
        },
        secondary: {
          DEFAULT: '#BC13FE', // Neon Purple
          hover: '#9D11D4',
          glow: 'rgba(188, 19, 254, 0.5)',
        },
        accent: {
          DEFAULT: '#39FF14', // Neon Green
          glow: 'rgba(57, 255, 20, 0.5)',
        },
        cyber: {
          black: '#020617', // Deep Space Black
          dark: '#0F172A',  // Navy Dark
          light: '#1E293B', // Slate
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      backgroundImage: {
        'sci-fi-gradient': 'radial-gradient(circle at top center, #1E293B 0%, #020617 100%)',
        'neon-gradient': 'linear-gradient(90deg, #00F2FF 0%, #BC13FE 100%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 242, 255, 0.3), 0 0 20px rgba(0, 242, 255, 0.1)',
        'neon-purple': '0 0 10px rgba(188, 19, 254, 0.3), 0 0 20px rgba(188, 19, 254, 0.1)',
        'glass': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, filter: 'brightness(1)' },
          '50%': { opacity: 0.8, filter: 'brightness(1.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
