module.exports = {
    // Read more about JIT functionality @ https://tailwindcss.com/docs/just-in-time-mode
    mode: 'jit',
    purge: [
        './components/**/*.{ts,tsx}',
        './modules/**/*.{ts,tsx}',
        './pages/**/*.{ts,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
