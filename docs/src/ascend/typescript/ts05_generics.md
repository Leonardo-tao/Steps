# 泛型

## 简介

有时候，函数返回值会与参数类型相关

```javascript
function getFirstElement(arr) {
  return arr[0];
}
```

上面例子中，函数 `getFirstElement` 返回数组中第一个元素。数组中元素是什么类型，返回值就是什么类型

不使用泛型，这个函数的类型声明如下：

```typescript
function getFirstElement(arr: any[]): any {
  return arr[0];
}
```

这种类型声明不能直观地反映参数与返回值类型之间的关系

为了解决这个问题，`TypeScript` 就引入了 `泛型`（generics）。泛型的特点就是带有“类型参数”（type parameter）

类型声明可以写成这样：

```typescript
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}
```

上面示例中，函数 `getFirstElement()` 后面的部分 `<T>` 就是类型参数列表。类型参数要放在尖括号（ `<>` ）中

本例中只有一个类型参数 `T` ，`getFirstElement()` 的参数类型是 `T[]`，返回值类型是 `T`，就清楚地表示了两者之间的关系。比如，输入的参数类型是 `number[]`，那么 T 的值就是 `number`，因此返回值类型也是`number`

## 用法

### 类型声明

```typescript
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}
```

### 函数调用

函数调用时，需要提供类型参数

```typescript
getFirst<number>([1, 2, 3]);
```

为了方便，通常会省略类型参数，让 `Typescript` 自行判断：

```typescript
getFirst([1, 2, 3]);
```

上面示例中，`TypeScript` 会从实际参数 `[1, 2, 3]`，推断出类型参数 T 的值为 `number`

:::danger 注意

有些复杂的使用场景，`TypeScript` 可能推断不出类型参数的值，这时就必须显式给出了

:::

```typescript
function comb<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}
```

上面示例中，两个参数 `arr1` 和 `arr2` 都是同一个类型。调用时如果传递不同的类型，就会报错：

```typescript
comb([1, 2], ["a", "b"]); 	// 报错
```

报错是因为：`Typescript` 会认为两个参数不是同一种类型。想要解决，需要将类型参数改为“联合类型”

```typescript
comb<number | string>([1, 2], ["a", "b"]); // 正确
```



多个类型参数声明如下：

```ts
function map<T, U>(arr: T[], f: (arg: T) => U): U[] {
  return arr.map(f);
}

// 用法实例
map<string, number>(["1", "2", "3"], (n) => parseInt(n)); // 返回 [1, 2, 3]
```



### 接口声明

```ts
interface Box<Type> {
  contents: Type;
}

let box: Box<string>;
```

上面示例中，使用泛型接口时，需要给出类型参数的值（因为声明时未定义 `Type` 的类型）

:::detail 更多泛型接口用法

```typescript
interface Comparator<T> {
  compareTo(value: T): number;
}

class Rectangle implements Comparator<Rectangle> {
  compareTo(value: Rectangle): number {
    // ...
  }
}
```

上面示例中，先定义了一个泛型接口，然后将这个接口用于一个类

泛型接口还有第二种写法

```typescript
interface Fn {
  <Type>(arg: Type): Type;
}

function id<Type>(arg: Type): Type {
  return arg;
}

let myId: Fn = id;
```

上面示例中，`Fn` 的类型参数 `Type` 的具体类型，需要函数 `id` 在使用时提供。所以，最后一行的赋值语句不需要给出 `Type` 的具体类型

此外，第二种写法还有一个差异之处。那就是它的类型参数定义在某个方法之中，其他属性和方法不能使用该类型参数。前面的第一种写法，类型参数定义在整个接口，接口内部的所有属性和方法都可以使用该类型参数

:::



### 数组声明

数组有一种表示方法是 `Array<T>`，声明数组时，需要提供 `T` 的值



## 类型参数的默认值

类型参数可以设置默认值。使用时没有给出类型参数的值就会使用默认值

```typescript
function getFirst<T = string>(arr: T[]): T {
  return arr[0];
}
```

上面示例中，`getFirst()` 的类型参数默认值是 `string`，调用时如果不给出 `T` 的值，Typescript 就认为 `T` 等于 `string`

但是 Typescript 会从实际参数推断出 `T` 的值，并覆盖默认值，所以下面的代码不会报错：

```typescript
getFirst([1, 2, 3]);				// 1
```

上面示例中，实际参数是一个 `number` 数组，Typescript 推断 `T` 等于 `number`，从而覆盖掉默认值 `string`

:::danger 注意

一旦类型参数有默认值，则代表它是可选参数。若有多个类型参数，可选参数必须在必选参数后面

```typescript
<T = boolean, U> // 错误

<T, U = boolean> // 正确
```

:::

### 
