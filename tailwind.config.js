/* eslint-disable import/no-extraneous-dependencies */
const lineClampPlugin = require('@tailwindcss/line-clamp');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    // Read more about JIT functionality @ https://tailwindcss.com/docs/just-in-time-mode
    mode: 'jit',
    content: ['./components/**/*.{ts,tsx}', './modules/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
    darkMode: 'media', // or 'class'
    theme: {
        fontSize: {
            ...defaultTheme.fontSize,
            '3xl': ['1.75rem', '2.5rem'],
            '4xl': ['2rem', '3rem'],
        },
        extend: {
            colors: {
                primary: '#3B82F6',
                primaryShade: '#0950C3',
                modalBg: 'rgba(31, 41, 55, 0.92)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [lineClampPlugin],
};
