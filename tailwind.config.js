/* eslint-disable import/no-extraneous-dependencies */
const lineClampPlugin = require('@tailwindcss/line-clamp');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    // Read more about JIT functionality @ https://tailwindcss.com/docs/just-in-time-mode
    mode: 'jit',
    purge: ['./components/**/*.{ts,tsx}', './modules/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontSize: {
            ...defaultTheme.fontSize,
            '3xl': ['1.75rem', '2.5rem'],
            '4xl': ['2rem', '3rem'],
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [lineClampPlugin],
};
