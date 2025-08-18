# TypeScript 的类型系统

## 基本类型

`JavaScript` 将值分为 8 种类型：

- boolean
- string
- number
- bigint
- symbol
- object
- null
- undefined

TypeScript 继承于 JavaScript，将以上 8 种作为基本类型

注：null 和 undefined 既可以当作值，也可以作为类型

:::details boolean 类型



:::

:::details string 类型



:::

:::details number 类型



:::

:::details bigint 类型



:::

:::details symbol 类型



:::

:::details object 类型



:::

:::details null 类型, undefined 类型



:::



## 包装对象类型

### 概念

Typescript 的 8 种类型种，`null` 和 `undefined` 是两种特殊类型，而 `object` 属于复合类型，其余属于原始类型，即不可再分的值

- boolean
- string
- number
- symbol
- bigint

这五种原始类型都有对应的“包装对象”，即在需要时会自动包装为对象：

```ts
"Hello".charAt(1);				// 'e'
```

上面的代码中，字符串调用了 `charAt` 方法，但在 JavaScript 中，只有对象可以调用方法，原始类型的值并没有方法。之所以可以运行，是因为调用时，字符串会自动转为包装对象，由包装对象调用 `charAt` 方法

### 获取包装对象

五种包装对象中，以下三种可以直接通过构造函数来获取包装对象：

- `Boolean()`
- `String()`
- `Number()`

```ts
const s = new String('Hello');
typeof s;				// 'object'
s.charAt(1);		// 'e'
```

例子中，`s` 是字符串 `'hello'` 的包装对象。虽然 `s` 是一个对象，但它继承了 `String.prototype` 上的所有方法，因此可以使用所有字符串方法

### 包装对象类型与字面量类型