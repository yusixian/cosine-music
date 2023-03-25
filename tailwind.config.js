module.exports = {
  darkMode: 'class', // https://tailwindcss.com/docs/dark-mode
  //
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        xs: { max: '475px' },
        md: { max: '768px' },
        tablet: '640px',
        xl: '1366px',
        '2xl': '1366px',
      },
      colors: {
        primary: '#3B82F6',
      },
      backgroundImage: {
        'cos-gradient': 'linear-gradient( 135deg, #FDF2F8 10%, #fff 100%)',
        'cos-gradient-dark': 'linear-gradient(160deg, rgba(28,28,28,1) 0%, rgba(55,60,56,1) 100%)',
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
      },
    },
  },
  plugins: [],
};
