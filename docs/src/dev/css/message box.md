# 仿消息框滚动效果

> 在接收消息时，需要实时查看最新（底部）的消息，可以通过滚动来实现

例如，有一个添加按钮和一个消息框，此时添加消息，消息框不会变化，只能手动滑动滚动条

```vue
<template>
  <div class="container">
    <a-button @click="addItem" class="add-button"> Add </a-button>

    <a-list class="msgBox">
      <a-list-item v-for="item in items" :key="item">
        {{ item }}
      </a-list-item>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref<string[]>([]);

const addItem = () => {
  items.value.push('Hello World');
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.msgBox {
  width: 400px;
  height: 300px;
  margin: 20px auto;
  background-color: #E9ECF0;
  overflow: auto;
}
</style>
```

此时，可以在添加消息之后，让浏览器滚动 `a-list`​ 到最底部，先给 `msgBox`​ 绑定一个 ref​ ，再用 `nextTick`​ 方法实现：

```vue
<template>
  <div class="container">
    <a-button @click="addItem" class="add-button"> Add </a-button>

    <a-list class="msgBox" ref="msgBoxRef">
      <a-list-item v-for="item in items" :key="item">
        {{ item }}
      </a-list-item>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

const items = ref<string[]>([]);

// 获取 ref 对象
const msgBoxRef = ref<any>(null);

const addItem = () => {
  items.value.push('Hello World');

  // 实现滚动
  nextTick(() => {
    if (msgBoxRef.value?.$el) {
	  msgBoxRef.value.$el.scrollTo({
	    top: msgBoxRef.value.$el.scrollHeight,
		behavior: 'smooth'
	  });
    }
  });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.msgBox {
  width: 400px;
  height: 300px;
  margin: 20px auto;
  background-color: #E9ECF0;
  overflow: auto;
}
</style>
```