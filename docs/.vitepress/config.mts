import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin'; 
import { nav, sidebar } from './router'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/Steps/",
  lang: "zh-CN",
  title: "Steps",
  description: "Think big, but start small",
  lastUpdated: true,
  srcDir: "./src",
  head:[['link',{rel:'icon',href:'/Steps/favicon.ico'}]],
  themeConfig: {
    logo: { src: "/public/favicon.ico", width: 24, height: 24 },
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
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    search: {
      provider: "local",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Leonardo-tao" }],
  },
  markdown: {
    config(md) {
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
});

export interface LastUpdatedOptions {
  /**
   * @default 'Last updated'
   */
  text?: string;

  /**
   * @default
   * { dateStyle: 'short',  timeStyle: 'short' }
   */
  formatOptions?: Intl.DateTimeFormatOptions & { forceLocale?: boolean };
}