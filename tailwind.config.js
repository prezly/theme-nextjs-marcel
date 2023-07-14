/* eslint-disable import/no-extraneous-dependencies */
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
        screens: {
            sm: `${370 + 20 * 2}px`, // 370px + (40px padding) = 410px
            md: `${770 + 32 * 2}px`, // 770px + (64px padding) = 834px
            lg: `${1040 + 32 * 2}px`, // 1040px + (64px padding) = 1104px
        },
        container: (theme) => ({
            center: true,
            padding: {
                DEFAULT: theme('spacing.5'),
                md: theme('spacing.8'),
                lg: theme('spacing.8'),
            },
        }),
        extend: {
            ringWidth: {
                3: '3px',
            },
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
                    DEFAULT: '#3977B9',
                    dark: '#3167A0',
                    darker: '#2A5888',
                    darkest: '#234971',
                },
                success: {
                    tint: '#51E186',
                    DEFAULT: '#22C55E',
                    shade: '#136D34',
                },
                error: {
                    tint: '#F58A8A',
                    DEFAULT: '#EF4444',
                    shade: '#BC1010',
                },
                danger: {
                    shade: '#E11D48',
                },
                warning: {
                    tint: '#F9CD44',
                    DEFAULT: '#EAB308',
                    shade: '#856605',
                    bg: '#fef3c7',
                },
                modalBg: 'rgba(31, 41, 55, 0.92)',
            },
        },
    },
    variants: {
        extend: {},
    },
};
