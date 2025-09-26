# Typescript 踩坑记录

## 无法找到模块 "xxx" 的声明文件，"xxx" 隐式拥有 "any" 类型

当在 `TypeScript` 中使用以下导出语句时：

```vue
<script setup lang="ts">
  import { parse } from '@/utils/parse.js';
</script>
```

当把 `script` 标签定义为 `ts` 语言时， `ts` 会使用模块解析策略来寻找对应的类型声明。

上面的例子中，显式地导入了 `js` 文件，所以 `ts` 会将其看作 一个纯 `js` 模块。默认情况下，不会去解析代码并进行 **类型推断**，只会检查是否有与之匹配的 `.d.ts` 类型声明文件。若没有类型声明，则会抛出这个错误：

>无法找到模块"XXX"的声明文件，隐式拥有 "any" 类型

### 解决方案

将文件类型改为 `ts`

原因：`ts` 会对此文件进行类型推断，若引入时不加后缀名 `.ts`，则会按照 `.ts` -> `.d.ts` -> `.js` -> `其他` 的顺序进行解析。当读到 `.ts` 文件后，`ts` 会进行类型推断，就没有任何隐式 "any" 的问题了



## 无法访问此文件

初始化 `vite`​ 项目，`tsconfig.app.json`​ 直接报错：

```json [tsconfig.app.json]
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",			// 报错
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### 解决方案

安装 @types/node​ 插件即可

```bash
npm install -D @types/node
```



## "xxx" 具有隐式 "any" 类型

当引入第三方库时，若使用其内部的方法，但是没有对它的参数进行类型声明，会报错：`xxx 具有隐式 any 类型`。这时候需要引入第三方库中定义的类型

打开 `node_modules`​ 文件夹，找到对应的依赖，找到其 `package.json​` 文件，里面有一项属性 types​ ，标明了库中所有类型的所在位置，将其引入到调用的地方即可