# ElementUI 踩坑记录
## Error: [ElementForm]unpected width

​`el-form`​ 中，使用以下模板，控制台会报错：Error: [ElementForm]unpected width​

```vue
<template>
	<el-form :model="queryParams" v-show="showSearch" label-width="auto">
    <!-- 其他代码 -->
	</el-form>
</template>
```

可能有以下两种原因：

- 组件中存在 v-show​ 时，并且 `el-form`​ 中 `labelWidth`​ 设为 auto​ 时，就会获取不到 label​ 的宽度，导致报错
- `el-form-item` 中有 `style="display:none"`，删除或注释即可


### 解决方案

去掉 `labelWidth="auto"`​

```vue
<template>
	<el-form :model="queryParams" v-show="showSearch">
		<!-- 其他代码 -->
	</el-form>
</template>
```

---

> 文章参考：
> 
> [element [ElementForm]unpected width &&unpected width报错解决](https://blog.csdn.net/qq_39969425/article/details/125377402)