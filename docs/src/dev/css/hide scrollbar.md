# 隐藏原生滚动条

假设容器类名为 `scroll-container`，可如下配置：
```css
.scroll-container {
	width: 300px;
	height: 200px;
	overflow: auto; /* 保留滚动功能 */
	-ms-overflow-style: none; /* IE和Edge */
	scrollbar-width: none; /* Firefox */
}

.scroll-container::-webkit-scrollbar {
	display: none; /* 隐藏滚动条 */
}
```
