# 基本用法

## 类型声明
先看下面的代码：
```ts
const str: string = "hello world";
console.log(str);       // hello world
```
我们可以看到，在变量名后面加上了冒号和类型，这就是类型声明

### 不同的类型声明的方法
#### 变量声明
```ts
// 字符串类型
const str: string = "hello world";
// 数字类型
const num: number = 123;
// 布尔类型
const bool: boolean = true;
// 数组类型
const arr: number[] = [1, 2, 3];
// 对象类型
const obj: { name: string, age: number } = { name: "Tom", age: 18 };
```

#### 函数声明
```ts
function add(a: number, b: number): number {
    return a + b;
}
```

#### 复杂结构声明
```ts
// 二维数组
const arr: [string, number][] = [["Tom", 18], ["Jack", 20]];
// 对象数组
const obj: { name: string, age: number }[] = [{ name: "Tom", age: 18 }, { name: "Jack", age: 20 }];
```
数组中的元素可以是任意类型，需声明其类型为 `any`
```ts 
const arr: (string | { name: string; age: number })[] = [
    "Tom", 
    { name: "Tom", age: 18 }
];

const arr: any[] = [
    "Boy", 
    [
        "Tom", 
        { name: "Tom", age: 18 }, 
        { name: "Jack", age: 20 }
    ]
];
```
## 类型推断
类型声明并不是必需的，如果没有，TypeScript 会自己推断类型

```ts
let age = 123;
```
上面示例中，变量 age 并没有类型声明，TypeScript 就会推断它的类型。由于它被赋值为一个数值，因此 TypeScript 推断它的类型为 number。

后面，如果变量foo更改为其他类型的值，跟推断的类型不一致，TypeScript 就会报错。
```ts
let age = 123;
age = "hello"; // 报错
```
上面示例中，变量 age 的类型推断为 number，后面赋值为字符串，TypeScript 就报错了。

TypeScript 也可以推断函数的返回值。
```ts
function toString(num: number) {
  return String(num);
}
```
上面示例中，函数 toString() 没有声明返回值的类型，但是 TypeScript 推断返回的是字符串。正是因为 TypeScript 的类型推断，所以函数返回值的类型通常是省略不写的。

从这里可以看到，TypeScript 的设计思想是，类型声明是可加可不加的。即使不加类型声明，依然是有效的 TypeScript 代码，只是不能保证 TypeScript 会正确推断出类型。因此，所有 JavaScript 代码都是合法的 TypeScript 代码。
::: tip
这样设计还有一个好处，将以前的 JavaScript 项目改为 TypeScript 项目时，你可以逐步地为老代码添加类型，即使有些代码没有添加，也不会导致无法运行。
:::
<br>
## TypeScript 的编译
运行环境（浏览器和 NodeJs ）不支持识别 TypeScript，所以 TypeScript 的目的是在编译阶段对 JavaScript 进行类型检查，然后编译成 JavaScript 来运行。一旦编译为 JavaScript 后，TypeScript 就不再起作用了。所以，你会发现，在 IDE 中 TS 项目可能检查出了很多错误，但是并不会影响 JavaScript 的运行。
<br>
## 值与类型
在 TypeScript 中，值（value）和类型（type）是两个不同的概念。而 TypeScript 只涉及类型，不涉及值。在编译过程中，其实就是把“类型代码”全部拿掉，只保留“值代码”。