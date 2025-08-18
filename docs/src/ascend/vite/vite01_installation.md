# Vite

## 搭建 Vite 项目

::: tip 兼容性

所需 [Node.js](https://nodejs.org) 版本 > 20

:::

::: code-group
``` bash [npm]
$ npm create vite@latest
```
``` bash [pnpm]
$ pnpm create vite
```
:::
还可以通过附加的选项直接指定项目名称和模板，例如，要构建一个 Vite + Vue3 + TS 项目：
::: code-group

``` bash [npm]
# npm 7+，需要添加额外的 --：
$ npm create vite@latest my-vue-app -- --template vue-ts
```
``` bash [pnpm]
$ pnpm create vite my-vue-app --template vue-ts
```
:::
::: details 更多项目模板
`vanilla`, `vanilla-ts`, `vue`, `vue-ts`, `react`, `react-ts`, `react-swc`, `react-swc-ts`, `preact`, `preact-ts`, `lit`, `lit-ts`, `svelte`, `svelte-ts`, `solid`, `solid-ts`, `qwik`, `qwik-ts`
:::



## 项目中安装

::: code-group

``` bash [npm]
$ npm install -D vite
```

``` bash [pnpm]
$ pnpm add -D vite
```

:::

并创建一个 `index.html` 如下：

```html
<p>Hello Vite!</p>
```

然后运行下列命令即可

::: code-group

``` bash [npm]
$ npx vite
```

``` bash [pnpm]
$ pnpm vite
```

:::

之后就可以在 `http://localhost:5173` 上访问 `index.html`









