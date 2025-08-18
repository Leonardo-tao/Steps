# TypeScript 简介

## 什么是 TypeScript？
TypeScript 是 JavaScript 的一个超集，它添加了类型系统，并提供了许多其他特性，如接口、泛型、装饰器等。TypeScript 的目的并不是创造一种全新语言，而是增强 JavaScript 的功能，使其更适合多人合作的企业级项目。

## 动态类型 vs 静态类型
### 动态类型
由于 JavaScript 没有过多类型限制，所以可以随时改变变量的类型，因此为 `动态类型`
```js
// 例一：
let x = 1;
x = 'hello';

// 例二：
let y = { name: 'Tom' };
delete y.name;
y.age = 18;
```
例一中，x 的类型从 Num 变成了 String，编译完成前无法预知它的类型是什么，即类型变化是动态的

<br>
例二中，y 的 name 属性被删掉之后，又新增了 age 属性，在编译完成前也无法预知一个对象中有什么属性，这也是动态的

<br>

### 静态类型
JavaScript 这些动态属性，导致代码约束性差，不利于实时发现错误，所以 TypeScript 引入了严格的类型系统，属于静态类型语言
<br>
上面的代码在 TypeScript 中均会报错：
```ts
// 例一：
let x: number = 1;
x = 'hello'; // error: 不能将类型“string”分配给类型“number”

// 例二：
let y: {name?: string, age: number} = { 
  name: "tom", 
  age: 18
};
delete y.name;
delete y.age;

delete y.name;
delete y.age; // error: delete 操作符的操作数必须是可选的
```
例二中，由于 age 是非可选属性，所以不能被删除

<br>

## 静态类型的优缺点

| 优点 | 缺点 |
| --- | --- |
|运行时类型检查有利于静态分析：无需运行即可发现错误，包含拼写/语义/方法调用错误 |丧失了动态类型的代码灵活性（类型转换受限、动态特性不可用）|
|类型信息可以部分代替代码文档，减少注释依赖 |增加了编程工作量，需编写类型声明，需确保类型正确性 |
|有助于代码重构：参数/返回值类型不变则功能稳定|兼容性问题：过去大部分 JavaScript 项目都没有做 TypeScript 适配|
