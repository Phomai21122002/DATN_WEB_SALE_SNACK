/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0c66e4',
                primaryCyan: '#e9f2ff',
                textColor: '#172b4d',
                hoverBackground: '#091e420f',
                defaultLayoutHeight: '60px',
                defaultLayoutWidth: '1150px',
                defaultLayoutHorizontalSpacer: '24px',
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
