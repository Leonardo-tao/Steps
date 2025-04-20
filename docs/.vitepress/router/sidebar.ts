import type { DefaultTheme } from 'vitepress'

/* 可通过 collapsed: true 来控制菜单是否可折叠 */

export const sidebar: DefaultTheme.Config['sidebar'] = [
  {
    text: "VitePress",
    items: [
      { text: "初始化", link: "/VitePress/initialize" },
      { text: "部署到 Github", link: "/VitePress/deploy_github" },
      { text: "部署到网站", link: "/VitePress/deploy_site" },
      { text: "插件", link: "/VitePress/plugins" },
    ],
  },
  {
    text: "Components",
    items: [
      { text: "easySearch", link: "/Components/easySearch" },
      { text: "navlist", link: "/Components/NavList" }
    ],
  },
  {
    text: "Utils",
    items: [{ text: "easyTime", link: "/Utils/easyTime/easyTime" }],
  },
];
