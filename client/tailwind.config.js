/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#D4FF4D',
          blue: '#A8E8E8',
          pink: '#A8E8E8',
          orange: '#F76808',
          green: '#42CC77',
          lime: '#D4FF4D',
          cyan: '#A8E8E8',
          dark: '#000000',
        },
        surface: {
          primary: '#FFFFFF',
          secondary: '#F5F5F2',
          dark: '#0A0A0A',
          'dark-card': '#141414',
        },
        'text-primary': '#0A0A0A',
        'text-secondary': '#525252',
        'text-muted': '#A3A3A3',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"Sometype Mono"', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display': ['3.25rem', { lineHeight: '1.0', fontWeight: '800', letterSpacing: '-0.03em' }],
        'display-xl': ['3.25rem', { lineHeight: '1.0', fontWeight: '800', letterSpacing: '-0.03em' }],
        'display-l': ['2.5rem', { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.025em' }],
        'h1': ['2rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['2.5rem', { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.025em' }],
        'h3': ['2rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h4': ['1.5rem', { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.015em' }],
        'h5': ['1.125rem', { lineHeight: '1.35', fontWeight: '600', letterSpacing: '-0.01em' }],
        'body-l': ['1.125rem', { lineHeight: '1.65', fontWeight: '400' }],
        'body-m': ['0.9375rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-s': ['0.8125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'caption': ['0.6875rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.14em' }],
        'label': ['0.625rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.18em' }],
      },
      letterSpacing: {
        'display': '-0.03em',
        'display-l': '-0.025em',
        'heading': '-0.02em',
        'subheading': '-0.015em',
        'body': '0',
        'mono-wide': '0.10em',
        'mono-wider': '0.14em',
        'mono-widest': '0.18em',
      },
      maxWidth: {
        'container': '1160px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'sm': '0 2px 4px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.10)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.14)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.10)',
        'glow-purple': '0 0 40px rgba(212, 255, 77, 0.4)',
        'glow-pink': '0 0 40px rgba(168, 232, 232, 0.35)',
        'brutal': '4px 4px 0 0 #000000',
        'brutal-sm': '3px 3px 0 0 #000000',
        'brutal-lg': '6px 6px 0 0 #000000',
        'brutal-hover': '6px 6px 0 0 #000000',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.5, 0, 0.5, 1) forwards',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.5, 0, 0.5, 1) forwards',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.5, 0, 0.5, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.5, 0, 0.5, 1) forwards',
        'gradient-rotate': 'gradientRotate 6s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        gradientRotate: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 255, 77, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 255, 77, 0.5)' },
        },
      },
      transitionTimingFunction: {
        'natural': 'cubic-bezier(0.5, 0, 0.5, 1)',
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        'short': '250ms',
        'long': '500ms',
      },
    },
  },
  plugins: [],
}
