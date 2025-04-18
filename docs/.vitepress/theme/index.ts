import Theme from "vitepress/theme";

import mediumZoom from 'medium-zoom'; // 引入放大镜
import { nextTick, onMounted, watch } from 'vue';
import { inBrowser, useData, useRoute } from 'vitepress';
import ElementPlus from "element-plus"; // 引入组件库
import "element-plus/dist/index.css"; // 引入样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 引入图标库
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import { NProgress } from 'nprogress-v2/dist/index.js'; // 进度条组件
import DataPanel from "./components/DataPanel.vue" // 不蒜子组件
import busuanzi from 'busuanzi.pure.js' // 不蒜子统计

import 'nprogress-v2/dist/index.css'; // 进度条样式
import 'virtual:group-icons.css'; //代码组样式
import './style/var.scss';  // 引入全局样式
import './style/blur.scss'; // 引入毛玻璃效果样式

export default {
  ...Theme,
  enhanceApp({ app, router }) {
    app.use(ElementPlus); // 注册组件库
    app.component('DataPanel' , DataPanel) // 注册不蒜子组件
    
    // 注册图标库
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    if(inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
        NProgress.done() // 停止进度条
      }
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

    // giscus配置（github讨论）
    // Get frontmatter and route
    const { frontmatter } = useData();
        
    giscusTalk({
      repo: 'Leonardo-tao/Steps', //仓库
      repoId: 'R_kgDOOWKXuw', //仓库ID
      category: 'General', // 讨论分类
      categoryId: 'DIC_kwDOOWKXu84CpNAe', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  },
};
