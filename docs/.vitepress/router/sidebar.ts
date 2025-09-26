import type { DefaultTheme } from 'vitepress'

/* 可通过 collapsed: true 来控制菜单是否可折叠 */

export const sidebar: DefaultTheme.Config['sidebar'] = [
  {
    text: "VitePress",
    items: [
      { text: "初始化", link: "/vitepress/initialize" },
      { text: "部署到 Github", link: "/vitepress/deploy_github" },
      { text: "部署到网站", link: "/vitepress/deploy_site" },
      { text: "插件", link: "/vitepress/plugins" },
    ],
  },
  {
    text: "Components",
    items: [
      { text: "easySearch 1.0", link: "/components/easySearch" },
      { text: "navlist", link: "/components/navList" }
    ],
  },
  {
    text: "Utils",
    items: [{ text: "easyTime", link: "/utils/easyTime" }],
  },
  {
    text: "踩坑记录",
    items: [
      { text: "typescript 踩坑记录", link: "/bugfix/typescript" },
      { text: "vben 踩坑记录", link: "/bugfix/vben" },
      { text: "wot-ui 踩坑记录", link: "/bugfix/wot-ui" },
    ],
  }
];
