import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

import { nav, sidebar } from './router'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/Steps/",
  lang: "zh-CN",
  title: "Steps",
  description: "Think big, but start small",
  lastUpdated: true,
  srcDir: "./src",
  head:[['link',{rel:'icon',href:'/favicon.ico'}]],
  themeConfig: {
    logo: { src: "/favicon.ico", width: 24, height: 24 },
    nav,
    sidebar,
    outline: {
      label: "页面导航",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    editLink: {
      pattern: "https://github.com/Leonardo-tao/Steps/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
    search: {
      provider: "local",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Leonardo-tao" }],
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin) //代码组图标
      md.use(vitepressDemoPlugin, {
        stackblitz: {
          show: true,
        },
        codesandbox: {
          show: true,
        },
      });
    },
  },
  vite: { 
    plugins: [
      groupIconVitePlugin() //代码组图标
    ],
  },
});