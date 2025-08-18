# 插件


## 图片放大镜
引入 [medium-zoom](https://github.com/francoischalifour/medium-zoom) 插件
```bash [npm]
$ npm install medium-zoom
```
<br>

在 `.vitepress/theme/index.ts` 中引入以下行
```ts{3-5,9-21} [.vitepress/theme/index.ts]
import Theme from "vitepress/theme";

import mediumZoom from 'medium-zoom'; // 引入放大镜
import { nextTick, onMounted, watch } from 'vue';
import { useRoute } from 'vitepress'

export default {
  ...Theme,
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  },
};
```
添加完之后，发现放大的图片会被 sidebar 区域遮挡，在 `.vitepress/theme/style/var.css` 中加入如下代码：
```css [.vitepress/theme/style/var.css]
.medium-zoom-overlay {
  z-index: 30;
}

.medium-zoom-image {
  z-index: 9999 !important;/* 给的值是21，但是实测盖不住，直接999 */
}
```

测试效果：

![A005](https://cdn.jsdelivr.net/gh/Leonardo-tao/PicGo@main/img/A005.jpg)