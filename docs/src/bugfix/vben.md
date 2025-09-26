# Vben Admin 踩坑记录
## [sass]importer.findFileUrl is not a function

```bash
ERROR [vite] (client) Pre-transform error: [sass] Error: TypeError: 
	  importer.findFileUrl is not a function
  ╷
1 │ @use "@vben/styles/global" as *;
  │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ╵
```
在启动 `vebn` 项目时，找不到 `findFileUrl` 方法。原因是在 `Sass` 1.87.0 版本中，`NodePackageImporter` 的 API 发生了变化，导致 `findFileUrl` 方法不可用，从而引发错误

### 解决方案

```ts:line-numbers [internal/vite-config/src/config/application.ts]
import type { NodePackageImporter as DartNodePackageImporter } from 'sass'; // [!code ++]
import type { CSSOptions, UserConfig } from 'vite';

import type { DefineApplicationOptions } from '../typing';

import path, { relative } from 'node:path';

import { findMonorepoRoot } from '@vben/node-utils';

import { NodePackageImporter } from 'sass'; // [!code --]
import { NodePackageImporter } from 'sass-embedded'; // [!code ++]
import { defineConfig, loadEnv, mergeConfig } from 'vite';
```
```ts:line-numbers=103
function createCssOptions(injectGlobalScss = true): CSSOptions {
  const root = findMonorepoRoot();
  return {
    preprocessorOptions: injectGlobalScss
      ? {
          scss: {
            additionalData: (content: string, filepath: string) => {
              const relativePath = relative(root, filepath);
              // apps下的包注入全局样式
              if (relativePath.startsWith(`apps${path.sep}`)) {
                return `@use "@vben/styles/global" as *;\n${content}`;
              }
              return content;
            },
            api: 'modern',
            importers: [new NodePackageImporter()], // [!code --]
            importers: [new NodePackageImporter() as unknown as DartNodePackageImporter], // [!code ++]
          },
        }
      : {},
  };
}

export { defineApplicationConfig };
```

### 解析

**NodePackageImporter** 是 Dart Sass 1.71.0 开始支持的，它允许使用 `@use "pkg:..."` 来加载 `node_modules` 中定义的 Sass 文件

虽然 `sass` 和 `sass-embedded` 中都含有 `NodePackageImporter`，但实际上 `Vite` 内部默认使用的是 `sass-embedded`，所以会出现类型不匹配（如 `importer.findFileUrl is not a function`）的问题

由于 `sass` 和 `sass-embedded` 提供 [相同的 `Javascript API`](https://sass-lang.com/documentation/js-api/)，所以直接将 `NodePackageImporter` 声明为项目中的 `sass` 类型

### 参考链接

[How to use scss pkg imports? #17948](https://github.com/vitejs/vite/discussions/17948)