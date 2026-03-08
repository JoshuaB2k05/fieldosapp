const fs = require('fs');
let code = fs.readFileSync('C:\\Users\\ELCOT\\.gemini\\antigravity\\scratch\\krishi-mitra\\src\\data.js', 'utf8');
code = code.replace(/window\.D = window\.D \|\| {};\r?\nwindow\.D\.(\w+) = /g, 'export const $1 = ');
fs.writeFileSync('C:\\Users\\ELCOT\\.gemini\\antigravity\\scratch\\krishi-mitra\\src\\data.js', code);
console.log('Fixed data.js exports!');
