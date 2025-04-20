# 获取时间工具

## 基础功能演示
<demo vue="./index.vue" />

## 参数说明

| 参数        | 说明                          | 可选值                          | 默认值    |
|-----------|-----------------------------|------------------------------|--------|
| type      | 输出类型                       | date/time/datetime           | datetime |
| dateStyle | 日期显示风格                     | full/long/medium/short       | medium  |
| timeStyle | 时间显示风格                     | full/long/medium/short       | medium  |
| lang      | 语言                          | zh/en                        | zh     |
| date      | 要格式化的日期对象                 | JavaScript Date 对象           | new Date() |
| separator | 日期时间分隔符（当 type = datetime 时有效） | 任意字符串                      | 空格     |

## 功能特性
1. 智能日期格式化：支持4种预定义样式
   - full：完整格式（包含星期）
   - long：详细格式（不含星期）
   - medium：标准日期格式（YYYY-MM-DD）
   - short：简写格式

2. 多语言支持：
   - 中文：自动显示中文星期和年月日格式
   - 英文：显示英文月份全称和 GMT 时区

3. 时间格式化：
   - 自动处理前导零
   - 支持时区显示（full 样式）

4. 实用函数：
   - getRecentDays(num)：生成最近 num 天的日期数组
   - 严格的参数校验（自动抛出错误）