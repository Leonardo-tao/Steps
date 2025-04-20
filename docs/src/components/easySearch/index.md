# easySearch

一个可用于多条件查询的高级搜索组件

## 模板预览

通过给 `easySearch` 传入 `exposingFields` ，展示外面的默认筛选项
<demo vue="./demo.vue" scope="global" />

<br>

## 基础用法

点击 `更多` 展开弹出框，增加更多筛选项，逻辑符号默认为 `包含`<br>
<small>可通过 `一键生成` 按钮，快速生成所有字段的筛选项</small>
<demo vue="./index.vue" scope="global" />

## API

### Attributes

| 属性名         | 说明             | 类型                      | 默认值 |
| -------------- | ---------------- | ------------------------- | ------ |
| exposingFields | 展示在外的筛选项 | `Array<FieldItem>`        | `[]`   |
| fields         | 所有筛选项       | `Array<FieldItem>`        | `[]`   |
| operators      | 可选的逻辑符号   | `Array<{label, value}>`   | 预置7种|


```ts [FieldItem 结构]
{
  label: string,    // 显示名称
  field: string,    // 字段名
  type: string,     // 输入类型(input/number/select/date)
  options?: Array<{label, value}> // 选择型字段的选项
}
```

### events

| 事件名 | 说明 | 类型 |
| ------ | ---- | ---- |
|        |      |      |
|        |      |      |
|        |      |      |



### slots

| 插槽名 | 说明 |
| ------ | ---- |
|        |      |
|        |      |
|        |      |



### 常见问题


