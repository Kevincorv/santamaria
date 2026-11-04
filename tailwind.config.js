/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      colors: {
        // Paleta editorial del portal (guía visual de referencia)
        brand: {
          bg: '#F7F4ED', // fondo crema general
          sand: '#EFE8DA', // fondos alternos
          line: '#E3DCCC', // bordes suaves
          ink: '#202724', // texto principal
          forest: '#102D2B', // verde oscuro (header / footer)
          deep: '#0C221F', // verde más oscuro (sombras)
          pine: '#14342C', // títulos sobre fondo claro
          green: '#14604F', // botones / acentos
          'green-2': '#0F4B3D',
          gold: '#E9C56B', // texto manuscrito dorado
          cream: '#FBF8F2',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
        script: ['Caveat', '"Segoe Script"', 'cursive'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,45,43,0.06), 0 8px 24px -12px rgba(16,45,43,0.16)',
        'card-hover': '0 2px 4px rgba(16,45,43,0.08), 0 18px 40px -16px rgba(16,45,43,0.28)',
        pill: '0 6px 18px -8px rgba(16,45,43,0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      maxWidth: {
        shell: '1360px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.5s ease both',
      },
    },
  },
  plugins: [],
}
