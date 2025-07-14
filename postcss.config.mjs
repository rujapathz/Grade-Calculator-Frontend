// postcss.config.js (แก้ไขให้เป็น ES Module syntax และถูกต้อง)

// ไม่ต้อง import tailwindcss เข้ามาโดยตรงอีก
// ปลั๊กอิน PostCSS จะรู้จักชื่อแพ็กเกจ '@tailwindcss/postcss' โดยตรง
import autoprefixer from "autoprefixer";

const config = {
    plugins: {
        // ใช้ชื่อ String ของแพ็กเกจ PostCSS plugin ตรงๆ ที่นี่
        // นี่คือสิ่งที่ Error บ่งชี้และเป็นวิธีที่ PostCSS ต้องการ
        "@tailwindcss/postcss": {},
        autoprefixer: {},
    },
};

export default config;

//----------------------------------

// const config = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//   },
// };
// export default config;

//----------------------

// const tailwindcss = require('@tailwindcss/postcss')
// module.exports = {
//   plugins: [
//     tailwindcss(),
//     require('autoprefixer'),
//   ],
// };
