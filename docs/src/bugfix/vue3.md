## 表单的 v-model 绑定失效

开发登录表单时，输入账号和密码，均不会被绑定。打印 `loginForm` 发现其中的 `username` 和 `password` 都是空字符串

```vue
<template>
	<wd-form :model="loginForm" ref="loginForm">
		<wd-input v-model="loginForm.username" label="账号" @input="showLoginForm" />
		<wd-input v-model="loginForm.password" label="密码" @input="showLoginForm" />
	</wd-form>
</template>

<script setup>
import { reactive } from 'vue';

const loginForm = reactive({
	username: '',
	password: ''
});

function showLoginForm() {
	console.log('loginForm: ', loginForm);
}
```

打印账号和密码均为空字符串，说明响应式变量没有被正确绑定到组件实例。观察到 `wd-form` 中使用了 `loginForm` 作为 `ref` 值，故推断组件引用 `ref="loginForm"` 挂载的对象，覆盖了响应式数据 `loginForm`，导致绑定失效

### 解决方案

将 `ref="loginForm"` 去掉，或更换参数名，例如 `ref="loginFormRef"`
