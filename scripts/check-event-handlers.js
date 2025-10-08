const fs = require('fs');
const path = require('path');

function walk(dir, cb) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
    const res = path.resolve(dir, d.name);
    if (d.isDirectory()) walk(res, cb);
    else cb(res);
  });
}

const root = path.resolve(__dirname, '..', 'src');
const handlerRegex = /on(?:Click|Submit|Change|Input|Focus|Blur|MouseEnter|MouseLeave|KeyDown|KeyUp)\s*=/g;
const clientDirectiveRegex = /^(['\"])use client\1/;
let problems = [];

walk(root, (file) => {
  if (!file.endsWith('.tsx') && !file.endsWith('.jsx')) return;
  const txt = fs.readFileSync(file, 'utf8');
  if (handlerRegex.test(txt)) {
    const firstLine = txt.split('\n')[0];
    if (!clientDirectiveRegex.test(firstLine)) {
      problems.push(file);
    }
  }
});

if (problems.length) {
  console.error('\nFound interactive components without "use client" directive:');
  problems.forEach((p) => console.error(' - ' + p));
  process.exit(1);
} else {
  console.log('OK — all interactive components contain "use client" as first line (or no handlers found).');
  process.exit(0);
}
