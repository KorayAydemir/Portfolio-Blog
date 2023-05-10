/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                solitude: "e2e8f0",
            },
        },
        screens: {
            "m-l": "414px",
            "m-s": "360px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    darkMode: "class",
    plugins: [require("@tailwindcss/typography")],
};
