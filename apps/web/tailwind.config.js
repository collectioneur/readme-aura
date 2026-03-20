/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#0d0b1a',
          low: '#111020',
          DEFAULT: '#161428',
          high: '#1d1a35',
          highest: '#242142',
        },
        ink: {
          muted: '#6b6a8a',
          secondary: '#9897b8',
          DEFAULT: '#c4c3dc',
          bright: '#e8e7f5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'violet-glow': 'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        'violet-glow-center': 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
