/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#060d1c',
          low: '#0c1929',
          DEFAULT: '#0f1f35',
          high: '#162540',
          highest: '#1e2e4a',
        },
        ink: {
          muted: '#4a6280',
          secondary: '#7a98b8',
          DEFAULT: '#b0c8e0',
          bright: '#e0eeff',
        },
        teal: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        emerald: {
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'teal-glow': 'radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.18) 0%, rgba(0, 180, 180, 0.08) 40%, transparent 70%)',
        'teal-glow-center': 'radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.14) 0%, transparent 70%)',
        'teal-glow-left': 'radial-gradient(ellipse at 20% 50%, rgba(6, 182, 212, 0.12) 0%, transparent 60%)',
      },
    },
  },
  plugins: [],
}
