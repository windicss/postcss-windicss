# postcss-windicss

[![NPM version](https://img.shields.io/npm/v/postcss-windicss?color=a1b858&label=)](https://www.npmjs.com/package/postcss-windicss)

> 🧪 Expiremental.

> ⚠️ Using this package is **discouraged** as there are some limitations of PostCSS's API. Use our [first-class integrations](https://next.windicss.org/guide/installation.html) for each dedicated framework/build tool to get the best develop experience and performance. This plugin should be your last option to use Windi CSS.

## Install

```bash
npm i -D postcss-windicss postcss
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-windicss': { /* ... */ },
  },
}
```

```css
/* main.css */
@windicss;
```

```js
// windi.config.js
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ["scr/**/*.{html,vue,jsx,tsx,svelte}"]
  }
})
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)
