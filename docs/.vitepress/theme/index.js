import Theme from "vitepress/theme";
import ElementPlus from "element-plus"; // 引入组件库
import "element-plus/dist/index.css"; // 引入样式

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(ElementPlus); // 注册组件库
  },
};
