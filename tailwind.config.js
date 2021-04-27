module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      // ? see assets/base.css for CSS variables
      colors: {
        // background theme colors (light, dark)
        'theme-primary': 'var(--theme-primary)',
        'theme-primary-2': 'var(--theme-primary-2)',
        'theme-secondary': 'var(--theme-secondary)',
        'theme-secondary-2': 'var(--theme-secondary-2)',

        // brand colors
        'brand-primary': 'var(--brand-primary)',
        'brand-primary-2': 'var(--brand-primary-2)',
        'brand-secondary': 'var(--brand-secondary)',
        'brand-secondary-2': 'var(--brand-secondary-2)',

        // miscellaneous colors
        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
        'accents-0': 'var(--accents-0)',
        'accents-1': 'var(--accents-1)',
        'accents-2': 'var(--accents-2)',
        'accents-3': 'var(--accents-3)',
        'accents-4': 'var(--accents-4)',
        'accents-5': 'var(--accents-5)',
        'accents-6': 'var(--accents-6)',
        'accents-7': 'var(--accents-7)',
        'accents-8': 'var(--accents-8)',
        'accents-9': 'var(--accents-9)',
        // violet: 'var(--violet)',
        // 'violet-light': 'var(--violet-light)',
        // pink: 'var(--pink)',
        // cyan: 'var(--cyan)',
        // blue: 'var(--blue)',
        // green: 'var(--green)',
        // red: 'var(--red)',
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      boxShadow: {
        'outline-2': '0 0 0 2px var(--brand-primary)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      },
      lineHeight: {
        'extra-loose': '2.2',
      },
      scale: {
        120: '1.2',
      },
      keyframes: {
        'fade-up': {
          '0%': { transform: 'translateY(3rem)' },
          '100%': { transform: 'translateY(3rem)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/ui')],
}
