# 三种特殊的类型

## any 类型

### 基本含义

any 类型表示没有任何限制，该类型的变量可以赋予任意类型的值

```ts
let name: any;
name = 'Tom'
name = 123
name = true

// 甚至可以将 name 作为函数调用
name(123)
```

以上代码均无报错，这是因为，一旦将变量设为 any 类型，则 TypeScript 就关闭了对这个变量的类型检查

推荐在下面几种情况使用 any 类型：

- 因为某些特殊需求，需要关闭某些变量的类型检查
- 在从 JavaScript 迁移到 TypeScript 时，为了避免复杂类型的变量报错，可以先将变量设为 any 类型

### 类型推断

若开发者没有指定某些变量的类型，TypeScript 必须自己来推断变量类型，若无法推断，则会认为类型为 any

```ts
function add(x, y) {
  return x + y;
}

add(1, [1, 2, 3]); // 不报错
```

上述例子中，由于 x 和 y 的类型没有明确定义，且 TypeScript 无法推断出其类型，因此会将 x 和 y 当作 any 类型，以至于接下来调用 add 函数时，不会对 x 和 y 进行类型检查

::: danger

某些情况下，被推断为 any 并不是一件好事，后续可能引发错误，所以 TypeScript 提供了一个编译选项 `noImplicitAny`，当推断出类型为 any 时，会自动报错

::: details 特殊情况

当使用 let 或 var 声明变量时，即使不赋值或指定类型，也不会报错

```ts
let x;		// 不报错
let y;		// 不报错
```

因此，建议使用 `let` 和 `var` 声明变量时，一定要赋值或者显式声明类型，否则可能存在安全隐患

:::

:::

### 污染问题

any 类型还有一个最大的问题，就是可以赋值给任何类型的变量，导致那个变量受到污染

```ts
let x: any = "hello";
let y: number;

y = x; 			// 不报错

y * 123; 		// 不报错
y.toFixed(); 	// 不报错
```

示例中，y 被赋值为 x，此时并不会报错，因为 x 可以是任意类型。y 被赋值后也被推断为 any 类型，所以当 y 进行各种运算时，TypeScript 都不会检查出错误。这个隐患直到运行时才有可能暴露，因此不推荐使用 any 类型

## unknown 类型

为了解决 any 类型类型污染的问题，[TypeScript 3.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html) 引入了 `unknown` 类型。它与 `any` 含义相同，代表不确定的类型，所以，与 `any` 相同，所有类型的值都可以赋值给 `unknown` 类型：

```ts
let x: unknown;

x = 'Hello';
x = 123;
x = true;
```

但它的使用有一些限制，具体如下：

- `unknown` 类型的变量，不能直接赋值给其他变量

  ```ts
  let x: unknown = 123;
  
  let y: number = x;		// 报错
  let z: boolean = x;		// 报错
  ```

  上述例子中，`unknown` 类型的 x 被赋值给了其他变量，均会报错，避免了 [污染问题](#污染问题) ，解决了 `any` 类型的一大缺点
  
- 不能直接调用 `unknown` 的方法和属性

  ```ts
  let x: unknown = { name: 'Tom'};
  x.Tom;			// 报错
  
  let y: unknown = 'Hello World!';
  y.trim();		// 报错
  
  let z: unknown = (n = 0) => {n + 1};
  z();			// 报错
  ```

- `unknown` 只可以使用部分运算符，如运算符`==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof`运算符和`instanceof`运算符



那么，怎样才能使用 `unknown` 类型呢？——类型缩小

```ts
let a: unknown = 1;

if (typeof a === "number") {
  let r = a + 10; // 正确
}
```

上面的例子中，通过 `typeof` 来限定了 a 的类型，从而“缩小”为一个更明确的类型

## never 类型

指的是：该类型为空，不包含任何值

`never` 类型的一个重要特点是，可以赋值给任意其他类型。可以理解为“空集”，而空集是任何集合的子集

```ts
function f(): never {
  throw new Error("Error");
}

let v1: number = f(); // 不报错
let v2: string = f(); // 不报错
let v3: boolean = f(); // 不报错
```

