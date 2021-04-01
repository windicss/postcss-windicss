# postcss-windicss

[![NPM version](https://img.shields.io/npm/v/postcss-windicss?color=a1b858&label=)](https://www.npmjs.com/package/postcss-windicss)

> 🧪 Expiremental.

> ⚠️ Using this package is **discouraged** as there are some limitations of PostCSS's API. Use our [first-class integrations](https://next.windicss.org/guide/installation.html) for each dedicated framework/build tool to get the best develop experience and performance. This plugin should be your last option to use Windi CSS.

## Installation

Install `postcss-windicss` from NPM

```bash
npm i -D postcss-windicss
```

Create `postcss.config.js` under your project root

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-windicss': { /* ... */ },
  },
}
```

Add `@windicss` to your main css entry:

```css
/* main.css */
@windicss;
```

Create `windi.config.js` / `windi.config.ts` under your project root with this configurations

```js
// windi.config.js
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['scr/**/*.{html,vue,jsx,tsx,svelte}'],
  },
  /* ... */
})
```

And enjoy!

## Progress

### Features

- [x] Build
- [x] Hot reload
- [x] Inline class utilities 
- [x] Load TypeScript / ESM configure
- [x] `@apply`
- [ ] `@layer` `@screen` `@variant`
- [ ] "Design in DevTools"

### Frameworks

Currently tested on 

- [x] Vite

Feel free to add more if you got it working on other tools/frameworks!

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)
