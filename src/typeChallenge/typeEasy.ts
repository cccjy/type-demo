//pick 的实现
//从 T 中将所有的K提取出来，并生成一个新的类型 
//在泛型中使用extends并不是用来继承的，而是用来约束类型的。
//所以这个K extends keyof T，应该是说key被约束在T的key中，不能超出这个范围，否则会报错的。
type MyPick<T,K extends keyof T>={
    [S in K]:T[S]
}
//  实现 Readonly 不可以再对该对象的属性赋值。
//这个从字面意思就可以理解是将一个类型的所有成员变为只读的状态。
//看下面的示例，肯定可以随意给name赋值成别的字符串值
///被 readonly 标记的属性只能在声明时或类的构造函数中赋值。
//与 ES6 中的 const 很相似，但 readonly 只能用在类（TS 里也可以是接口）中的属性上，
//相当于一个只有 getter 没有 setter 的属性的语法糖。
//就是`keyof T` 拿到 `T` 所有属性名, 
//然后 `in` 进行遍历, 将值赋给 `K`, 
//最后 `T[K]` 取得相应属性的值时将其设置为readonly。
type MyReadonly<T> = {
    readonly [S in keyof T]: T[S]
 }
 //实现元组转换为对象
 //元组类型是另一种Array类型，它确切地知道包含多少个元素，以及它在特定位置包含哪些类型。
//这里的extends readonly any[] 是调用T[number] 所必须的，用来约束 T 的类型，T是一个元组，元组元素是只读的。
// T[number] 用于从元组 T 中获取值;
// in 用于迭代元组值;
// Value 是元组元素，用作构建对象的key和value。
 type TupleToObject<T extends readonly any[]> = {
    [Value in T[number]]: Value;
};

//实现First of Array 

type MyFirst<T extends any[]> = T extends never[] ? never : T[0]
type MyFirst2<T extends any[]> = T["length"] extends 0 ? never : T[0];
//Length of Tuple 获取元组的长度
type Length<T extends readonly any[]> = T['length']

// 实现 Exclude
type MyExclude<T, U> = T extends U ? never : T

// 实现Awaited
// 假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。
// 在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。
// 你的答案
type MyAwaited1<T> = T extends Promise<infer V> ? V extends Promise<unknown> ? MyAwaited<V> : V : never;

type MyAwaited<T> = T extends Promise<infer K> ? MyAwaited<K> : T
// 实现 If
//实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，
//以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型。
type If <C extends boolean, T, F> = C extends true ? T : F;
// 实现 Concat
//在类型系统里实现 JavaScript 内置的 Array.concat 方法
//，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。
type Concat<T extends any[],U extends any[]> = [...T,...U];

// 实现 Includes
 // Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。
 // your answers
type Includes<T extends readonly any[], U> = T extends (infer K)[] ? U extends K ? true : false : false

// 实现Push
// 在类型系统里实现通用的 Array.push 。
type Push<T extends any[], U> = [...T, U];

// 实现 Unshift
type Unshift<T extends any[], U> = [U, ...T];
//实现内置 Parameters
type MyParameters<T extends (...args: any[]) => any> = T extends (
    ...args: infer U
  ) => any
    ? U
    : never;







