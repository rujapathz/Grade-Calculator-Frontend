// /** @type {import('tailwindcss').Config} */ ดีฟ้อลลลลลลล
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// -------------------------------
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}", // <--- บรรทัดนี้สำคัญ
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
