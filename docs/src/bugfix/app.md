## Uniapp 项目样式在真机和调试界面不一致

在开发 `Uniapp​` 项目时，发现运行在真机和在 `HBuilder`​ 中，运行到浏览器中的样式不一致，具体体现在最外层容器的高度不一致


我们先给最外层容器添加一点样式：

```vue
<template>
	<view class="container"></view>
</template>

<style>
.container {
	height: 100vh;
	background-color: aquamarine;
}
</style>
```

界面中，我们发现出现了滚动条，这是为什么呢？

打开开发工具，可以发现 `uni-page`​ 由 `uni-page-head​` 和 `uni-page-wrapper`​ 组成。其中 `uni-page-head`​ 就是标题栏，占 44px，而 container​ 类在 `uni-page-wrapper​` 中：

​![image.png](https://cdn.jsdelivr.net/gh/Leonardo-tao/PicGo/img/20250902164112004.png)
​

故更改一下 container​ 类的高度，使用 `calc`​ 方法：

```vue
<template>
	<view class="container"></view>
</template>

<style>
.container {
	height: calc(100vh - 44px);
	background-color: aquamarine;
}
</style>
```

改完之后，滚动条的确消失了，但是再看手机上，最下方会多出一部分，这是因为

### 解决方案

在样式文件中声明不同环境下的样式即可

​![image](https://cdn.jsdelivr.net/gh/Leonardo-tao/PicGo/img/20250704143712.png)​