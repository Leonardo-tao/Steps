/**
 * 代码组图标
 * 自定义方法：先在 [iconify](https://icon-sets.iconify.design/vscode-icons/?keyword=vscode-icons) 中找到中意的图标
 * 然后复制图标名称，填写到下方对应位置
 */

const languageIcons = {
  html: "vscode-icons:file-type-html",
  css: "vscode-icons:file-type-css2",
  js: "vscode-icons:file-type-js-official",
  md: "vscode-icons:file-type-markdown",
  ts: "vscode-icons:file-type-typescript-official",
  vue: "vscode-icons:file-type-vue",
};

/* 生成对应后缀名的图标 */
function generateExtensionIcons(map) {
  return Object.fromEntries(
    Object.entries(map).map(([key, value]) => [`.${key}`, value])
  );
}

const extensionIcons = generateExtensionIcons(languageIcons);

export default {
  customIcon: {
    ...languageIcons,
    ...extensionIcons,
  },
};
