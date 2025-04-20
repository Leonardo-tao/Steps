<template>
  <div class="easy-search">
    <el-form inline>
      <slot></slot>
      <el-form-item v-for="item in exposedFields" :key="item.field" :label="item.label" :prop="item.field">
        <el-input v-model="item.value" clearable style="width: 120px" />
      </el-form-item>
      <el-form-item>
        <el-button :icon="Operation">更多(0)</el-button>
        <el-button :icon="Search" plain type="primary">搜索</el-button>
        <el-button :icon="Refresh" plain type="danger">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EasySearch'
})
import { reactive } from 'vue'
import { Refresh, Operation, Search } from '@element-plus/icons-vue'

const exposedFields = reactive([
  {
    label: "姓名",
    field: "name",
    type: "input",
    operator: "ct",
    value: ""
  },
  {
    label: "年龄",
    field: "age",
    type: "number",
    operator: "ct",
    value: ""
  }
])
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>