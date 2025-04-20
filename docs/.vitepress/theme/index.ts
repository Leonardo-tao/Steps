// 框架核心
import Theme from "vitepress/theme";
import { nextTick, onMounted, watch, h } from 'vue';
import { inBrowser, useData, useRoute } from 'vitepress';

// 第三方库
import mediumZoom from 'medium-zoom';                           // mediumZoom图片放大镜
import ElementPlus from "element-plus";                         // ElementPlus组件库
import busuanzi from 'busuanzi.pure.js';                        // 不蒜子访问量统计
import LinkCard from "./components/LinkCard.vue";               // 链接卡片组件
import Confetti from "./components/Confetti.vue";               // 五彩纸屑组件
import BackToTop from "./components/BackToTop.vue";             // 返回顶部组件
import DataPanel from "./components/DataPanel.vue";             // 不蒜子组件
import MNavLinks from "../../src/Nav/MNavLinks.vue";            // 导航栏组件 
import { NProgress } from 'nprogress-v2/dist/index.js';         // 进度条组件
import giscusTalk from 'vitepress-plugin-comment-with-giscus';  // 评论插件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 图标库



//样式文件
import './style/blur.scss';                                     // 毛玻璃效果
import './style/index.scss';                                    // 自定义样式
import 'virtual:group-icons.css';                               // 代码组样式
import 'nprogress-v2/dist/index.css';                           // 跳转进度条
import "element-plus/dist/index.css";                           // 组件库样式

export default {
  ...Theme,
  enhanceApp({ app, router }) {
    app.use(ElementPlus); // 注册组件库

    app.component("Confetti", Confetti);    // 注册五彩纸屑组件
    app.component("LinkCard", LinkCard);    // 注册链接卡片组件
    app.component("DataPanel", DataPanel);  // 注册不蒜子组件
    app.component("MNavLinks", MNavLinks);  // 注册导航栏组件
    // 注册图标库
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    if (inBrowser) {
      NProgress.configure({ showSpinner: false });
      router.onBeforeRouteChange = () => {
        NProgress.start(); // 开始进度条
      };
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
        NProgress.done(); // 停止进度条
      };
    }
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)" });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

    // giscus配置（github讨论）
    // Get frontmatter and route
    const { frontmatter } = useData();

    giscusTalk(
      {
        repo: "Leonardo-tao/Steps", // 仓库
        repoId: "R_kgDOOWKXuw", // 仓库ID
        category: "General", // 讨论分类
        categoryId: "DIC_kwDOOWKXu84CpNAe", // 讨论分类ID
        mapping: "pathname",
        inputPosition: "bottom",
        lang: "zh-CN",
      },
      {
        frontmatter,
        route,
      },
      true // 默认值为true(启用),可以使用“comment:true”序言在页面上单独设置
    );
  },
  Layout: () => {
    const props: Record<string, any> = {};
    // 获取 frontmatter
    const { frontmatter } = useData();

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }

    return h(Theme.Layout, props, {
      "doc-footer-before": () => h(BackToTop), // 使用doc-footer-before插槽
    });
  },
};