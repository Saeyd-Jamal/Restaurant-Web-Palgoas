/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './about.html',
    './conect.html',
    './restaurant_address.html',
    './course_demand.html',
    './wait.html',
    './asset/js/**/*.js',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      height: {
        72: '18rem',
      },
      width: {
        90: '90%',
        50: '200px',
        '1/2' : '50%',
      },
      colors: {
        sacndary : {
          DEFAULT: '#A6A4A4',
          200: '#d3d1d1',
        },
        amber: {
          400: '#FFC700',
        },
        info: {
          DEFAULT: '#3b82f6',
          600: '#3b82f6', 
        },
        primary : {
          DEFAULT: '#3b82f6',
          600: '#3b82f6',
          700: '#2563eb',
          800: '#1d4ed8',
          900: '#1e40af',
        },
        surface : {
          DEFAULT: '#020617',
        },
        slate : {
          300: '#e2e8f0',
        },
        gray : {
          100: '#f3f4f6',
          300: '#e2e8f0',
          500: '#94a3b8',
        }
      },
    },
  },
  plugins: [],
}