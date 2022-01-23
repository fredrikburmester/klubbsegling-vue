# Klubbsegling

🌐 <https://klubbsegling.se>

> Sveriges bästa klubbseglingshemsida!

### Errors

```
 <stdin>:5312:0: note: This rule cannot come before a "@charset" rule
    5312 │ @media (min-width: 1536px) {
```

Fixed by adding: `css = css.replace(/@charset "UTF-8";/ig,'')` to `./node_modules/vite/dist/node/chunks/dep-f5552faa.js` at line `20576` `async function minifyCSS(css, config) {...`.
