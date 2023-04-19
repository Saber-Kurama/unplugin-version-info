# @dangojs/unplugin-version-info

[![NPM version](https://img.shields.io/npm/v/@dangojs/unplugin-version-info?color=a1b858&label=)](https://www.npmjs.com/package/@dangojs/unplugin-version-info)

打包构建增加构建信息的插件


## 安装

```bash
npm i @dangojs/unplugin-version-info
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import VersionInfo from '@dangojs/unplugin-version-info/vite';

export default defineConfig({
  plugins: [
    VersionInfo(),
  ],
})
```



<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// 暂无测试
// rollup.config.js
// import Starter from 'unplugin-starter/rollup'

// export default {
//   plugins: [
//     Starter({ /* options */ }),
//   ],
// }
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-starter/webpack')()
  ]
}
```

<br></details>


<details>
<summary>Vue CLI</summary><br>

```ts
const VersionInfo = require('@dangojs/unplugin-version-info').default;
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
       VersionInfo.webpack(),
    ],
  },
}
```

<br></details>


## Options的参数
|参数|类型|说明|默认值|
|---|---|----|----|
|filename| `string` |html文件的名称 | `index.html`|


