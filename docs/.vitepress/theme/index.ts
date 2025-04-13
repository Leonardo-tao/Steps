import Theme from "vitepress/theme";

import mediumZoom from 'medium-zoom'; // 引入放大镜
import { nextTick, onMounted, watch } from 'vue';
import { useRoute } from 'vitepress'
import ElementPlus from "element-plus"; // 引入组件库
import "element-plus/dist/index.css"; // 引入样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'// 引入图标库

import './style/var.css';
import './style/blur.css';

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(ElementPlus); // 注册组件库
    
    // 注册图标库
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
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
