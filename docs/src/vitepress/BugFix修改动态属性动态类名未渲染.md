---
title: 【BugFix】修改动态属性，动态类名未渲染
date: '2025-02-12 16:31:26'
head: []
outline: deep
sidebar: false
prev: false
next: false
---





# 问题描述

封装组件时，修改 `types.ts`​ 中的类型定义（如 `IconProps`​ 的 `type`​ 属性），且父组件传递的 `type`​ 属性在 Vue Devtools 中可见，但动态类名（如 `t-icon--success`​）未正确添加到 DOM 元素中

```html
// Icon.vue
<template>
  <i class="t-icon" :class="{[`t-icon--${type}`]: type }">
    <font-awesome-icon v-bind="filteredProps"/>
  </i>
</template>
```

---

# 原因分析

1. **Vite 缓存机制**

    - Vite 默认对依赖模块（如 `.vue`​、`.ts`​ 文件）进行 **依赖预构建** 并缓存，某些情况下（如修改类型文件 `types.ts`​）可能未正确触发 **热更新（HMR）** 。
    - 非 Vue 单文件组件（如纯 `.ts`​ 文件）的改动可能未被 Vite 的 HMR 自动捕获。
2. **TypeScript 类型缓存**

    - TypeScript 的类型检查服务（如 VSCode 的 TS Server）可能缓存旧类型定义，导致 IDE 和构建工具感知不到最新类型。
3. **浏览器缓存干扰**

    - 浏览器可能缓存旧版 JavaScript 或 CSS 文件，导致代码更新未即时生效。

---

# 解决方案

目前没有找到什么比较好的解决办法......之后开发中再遇到类似情况，先尝试重启下项目

‍

如果有更好的解决方案欢迎大家在评论区提出

---
