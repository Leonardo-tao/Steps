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
import { NAV_DATA } from './data'
</script>


# 我的导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>