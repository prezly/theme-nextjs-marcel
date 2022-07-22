/* eslint-disable import/no-extraneous-dependencies */
const lineClampPlugin = require('@tailwindcss/line-clamp');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
                neutral: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#374A63',
                    700: '#1D344A',
                    800: '#162A3D',
                    900: '#111827',
                },
                primary: {
                    lightest: '#76A4D5',
                    lighter: '#5F95CE',
                    light: '#4885C7',
                    main: '#3977B9',
                    dark: '#3167A0',
                    darker: '#2A5888',
                    darkest: '#234971',
                },
                success: {
                    tint: '#51E186',
                    main: '#22C55E',
                    shade: '#136D34',
                },
                error: {
                    tint: '#F58A8A',
                    main: '#EF4444',
                    shade: '#BC1010',
                },
                warning: {
                    tint: '#F9CD44',
                    main: '#EAB308',
                    shade: '#856605',
                },
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
