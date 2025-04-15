import type { DefaultTheme } from 'vitepress'

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
    items: [{ text: "easySearch", link: "/easySearch" }],
  },
  {
    text: "Utils",
    items: [{ text: "easyTime", link: "/utils/easyTime/easyTime" }],
  },
];
