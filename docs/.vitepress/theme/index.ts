import { nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";
import Theme from "vitepress/theme";
import mediumZoom from 'medium-zoom'; // 引入放大镜
import ElementPlus from "element-plus"; // 引入 ElementPlus 组件库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'// 引入 ElementPlus 图标库
import Confetti from "./components/Confetti.vue"; // 引入五彩纸屑样式组件

import "element-plus/dist/index.css"; // 引入 elementPlus 样式
import './style/index.scss'; // 引入自定义样式

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(ElementPlus); // 注册组件库

    // 注册图标库
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    // 五彩纸屑
    app.component("Confetti", Confetti);
  },
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