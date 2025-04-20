---
layoutClass: m-nav-layout
outline: [2, 3, 4]
sidebar: false
layout: doc
editLink: false
prev: false
next: false
footer: false
comment: false
---

<script setup>
import { NAV_DATA } from './data1'
</script>


# 我的导航
::: tip
想要打造自己的导航网站？试试 [StashMark](https://leonardo-tao.github.io/StashMark)
:::
<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>