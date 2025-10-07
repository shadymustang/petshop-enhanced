const fs = require('fs')
const path = require('path')

function walk(dir, cb) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const full = path.join(dir, dirent.name)
    const base = path.basename(full)
    // skip large or generated folders
    if (dirent.isDirectory()) {
      if (['node_modules', '.git', '.next', 'public', 'build', 'dist'].includes(base)) return
      walk(full, cb)
    } else {
      cb(full)
    }
  })
}

const root = path.join(__dirname, '..')
const targets = [root]

const fileExts = ['.ts', '.tsx', '.js', '.jsx']

targets.forEach(t => {
  if (!fs.existsSync(t)) return
  walk(t, (file) => {
    if (!fileExts.includes(path.extname(file))) return
    let s = fs.readFileSync(file, 'utf8')
    // Detect occurrences of package@version (e.g. @radix-ui/react-tooltip@1.1.8)
    const regex = /(["'`])?([@a-zA-Z0-9_\-\/]+?)@(\d[\w\.\-]*)/g
    let m
    let found = false
    while ((m = regex.exec(s)) !== null) {
      found = true
      console.log('Found', path.relative(root, file), '->', m[0])
    }
    // (diagnostic run: do not modify files here)
  })
})

console.log('Done')
