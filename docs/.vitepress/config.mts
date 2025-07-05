import { defineConfig } from 'vitepress'
import { nav, sidebar } from './router'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  lang: "zh-CN",
  title: "Steps",
  description: "Think big, but start small",
  lastUpdated: true,
  srcDir: "./src",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  sitemap: {
    hostname: "https://docs.codercat.top/",
  },
  themeConfig: {
    // 首页Logo
    logo: { src: "/favicon.ico", width: 24, height: 24 },
    nav,
    sidebar,
    outline: { label: "页面导航" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    // Algolia搜索
    search: {
      provider: "algolia",
      options: {
        appId: "2V7VGJEPMH",
        apiKey: "cfa54567d76f966c8cd96557f29f7fe0",
        indexName: "leonardo-taoio",
        locales: {
          root: {
            placeholder: "搜索文档",
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "清除查询条件",
                  resetButtonAriaLabel: "清除查询条件",
                  cancelButtonText: "取消",
                  cancelButtonAriaLabel: "取消",
                },
                startScreen: {
                  recentSearchesTitle: "搜索历史",
                  noRecentSearchesText: "没有搜索历史",
                  saveRecentSearchButtonTitle: "保存至搜索历史",
                  removeRecentSearchButtonTitle: "从搜索历史中移除",
                  favoriteSearchesTitle: "收藏",
                  removeFavoriteSearchButtonTitle: "从收藏中移除",
                },
                errorScreen: {
                  titleText: "无法获取结果",
                  helpText: "你可能需要检查你的网络连接",
                },
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                  searchByText: "搜索提供者",
                },
                noResultsScreen: {
                  noResultsText: "无法找到相关结果",
                  suggestedQueryText: "你可以尝试查询",
                  reportMissingResultsText: "你认为该查询应该有结果？",
                  reportMissingResultsLinkText: "点击反馈",
                },
              },
            },
          },
        },
      },
    },
    editLink: {
      pattern: "https://github.com/Leonardo-tao/Steps/edit/main/docs/src/:path",
      text: "在 GitHub 上编辑此页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Leonardo-tao" }],
    returnToTopLabel: "返回顶部",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025-present Leonardo-tao",
    },
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin); //代码组图标
      md.use(vitepressDemoPlugin, {
        stackblitz: {
          show: true,
        },
        codesandbox: {
          show: true,
        },
      });
    },
    image: {
      // 开启图片懒加载
      lazyLoading: true,
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": "./src",
      },
    },
    plugins: [
      groupIconVitePlugin(), //代码组图标
    ],
  },
});
