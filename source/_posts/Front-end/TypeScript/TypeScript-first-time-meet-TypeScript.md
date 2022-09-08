---
title: 筆記 | TypeScript - 初探 TypeScript
tags: [TypeScript]
author: Rosa Hong 
categories: [Front-end,TypeScript]
description:
date: 2022-09-07 04:25:55
---
> 影片連結 :  [Live 🔴: TypeScript Crash Course with Matt Pocock - YouTube](https://www.youtube.com/watch?v=p6dO9u0M7MQ&t)

## 摘要
跟著 Matt Pocock 從基礎學習 TypeScript。一直都想學習 TypeScript，我只知道他是有型別的 JavaScript，避免 JavaScript 包山包海亂變形的詭異問題。

擇日不如撞日，剛好 `vscode` 官方熱騰騰的教學出來，那就直接來學習吧 ! 😄

影片有練習的專案，就不偷渡了，有興趣可以到影片連結下載。
除了初階，更前些時段有出進階的講座 : [LIVE 🔴: TypeScript tips and Tricks with Matt - YouTube](https://www.youtube.com/watch?v=hBk4nV7q6-w)
<!-- more -->

## 前置作業
專案是使用測試的方式來檢測每個檔案測驗是否通過，所以要先把專案的架構裝好，專案是使用 `yarn`
```bash
yarn
```

要測試是否通過，就會跳出測試結果
```
yarn exercise 01 
```

## 簡單認識 TypeScript
TypeScript 是一個討厭的英語老師🤣，它會一直糾正你的文法 (型別) 錯誤😡，只要錯了老師就會畫紅線。

開發者的任務就是把錯誤給正確地糾正過來，當個好學生。

## 從錯誤找訊息
當中在編輯器出現紅線，錯誤顯示 : 
```js
Parameter 'a' implicitly has an 'any' type.
```

> 編輯器不知道 a 到底是什麼類型，自動加註隱性類型 "any"

英文老師說你有錯😡，叫你改。

## TypeScript error Translator
錯誤看不懂嗎 ? 沒關係，Matt 竟然做了一個友善版的錯誤顯示，叫 **TypeScript Error Translator**，用 Extension 就可以安裝。

👉 Extension 連結 :  [TypeScript Error Translator - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator)

![搭拉 ! 用白話的方式告訴我們錯誤](https://i.imgur.com/U9tQhV3.png)

## 修正錯誤 : 正確指出型別
以 01 題為例，JavaScript 的數字類型只有 number ，我們要用  `number`，來辨別 a 、 b 的型別
```ts
export const addTwoNumbers = (a:number, b:number) => {
  return a + b;
};
```

## TS 為什麼在 function 裡不會自動指向正確的型別 ? 
問題點在於 **開發者知道自己丟進去的 function 參數是什麼型別，那為什麼我們還要特別替參數加上型別 ?**  

可以想像 TS 在 function 加上型別是幫助函式進行 **推理**，我們知道 **加號** 是運算子，不只是數字，而 `+` 在不同的型別會有不同結果 : 
```ts
// 可能等於 數字 相加
(a : number, b : number)
a + b = 1 + 2

// 可能等於 字串 相加
(a : string, b : string)
a + b = firstName + lastName
```
從這裡就可以知道 *如果沒有型別*，function 會依靠輸入的型別會跑出兩種結果，與其等到跑出結果再糾正，不如在進入運算前就指出錯誤。 

那為什麼 **宣告變數** 不用加入型別呢 ?   
```js
// ❌ 我們不用這樣
const firstName : string = 'Rosa'
```
在建立時已經把 string 的型別分配給 `firstName` ， TS 知道它一開始就有類別。

function 就如上面所說，不知道 **將來的輸入來源** 來自什麼，所以一開始我們在限制輸入的型別，讓 TS 也能推理出我們預期的輸出的型別。

## 在專案中找出要修正的 TS 檔案
- 測試專案中的所有的 `.ts` 檔是否通過 :
```bash
yarn tsc
```
- 單個檔案編譯
```
yarn tsc 〔檔名〕
```

`npm` 也是一樣的，如果是裝 global 可以直接 `tsc` 使用 command line 執行；如果是裝在專案內部則加上  `npx tsc`

## 都使用 any 會怎麼樣嗎 ?
`any` 是一個危險的型別 😡 ，可以的話盡量不用，可以從 3 個方向來看為什麼 : 
1. 純輸出值
2. 指派給新的變數的函式輸出值
3. 新產生的變數型別，使用 prototype function 不會顯示，或者錯誤也不會提醒🤔

```ts
export const addTwoNumbers = (a:any, b:any) => {
  return a + b;
};
// 1. 隨便亂填編輯器也不管你
addTwoNumbers('123'+[])

// 2. num 也會變成 any
const string1 = addTwoNumbers('123'+[])

// 3. 想要使用內建 method 沒有任何提示或錯誤
string1.split(' ')
```
1. 非預期的輸出，vscode 不知道我們要什麼東西
2. 變數在宣告時 TS 就能知道型別，在 `any` 的情況下，由於輸入是隨意的，變數接收的輸出變得非預期，結果也變 `any` 
3. 當我們打出  `num.` 的時候，不會有任何提示函式，因為 TS 不知道型別對應不到內建 method 。 `num` 被定義為 any ，沒有任何內建函式可使用

![字串沒有跳出任何型別有關的 method😵|400x280](https://i.imgur.com/Oo0jcFb.png)
在有明確的型別狀況下，vscode 會跳出對應型別的 method， any 使得 vscode 不知道該怎麼辦。除非編譯執行後才能知道結果，TS 如果好好的寫型別，在開發階段都能矯正這些問題了。

### 什麼時候用 any ?
如果很明確知道輸入與輸出的型別，就不該使用。越邏輯底層的 function 越不該使用，因為 TS 的型別就像瀑布流一樣，會被往下傳遞，試想一下如果是用 any ，瀑布流的型別簡直變成土石流等級，什麼都夾什麼都不奇怪。
```ts
export const addTwoNumbers = (a: number, b:number) => {
  return a + b;
};
// number + number，vscode 會推理出回傳是 number
const newNumber = addTwoNumbers(1,2)
const multiple = (number : number)=>{
  return number * 2
}
// number 為輸入，其回傳也是 number 
const result = multiple(newNumber)
```
以上面的例子，一開始就已知道型別，使得整個邏輯就知道輸入與最終輸出的型別，在呼叫時如果我們填寫到錯誤型別的值，TS 也能夠提醒我們。如果都用 `any` ，就沒有老師會糾正，錯誤率可能會提高😵。

其實影片沒有很明確提到 any 的使用情境，只有說到非常複雜的情況才可能用 any 🤔
官方也有提及，在開發合併不同專案初期可以使用來避免非預期狀況，不然就像跟用了`@ts-ignore` 一樣的效果，再者應該使用 `unknown`。

👉 官方連結 [TypeScript: Documentation - Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any)

### 補充 : any v.s unknown
any 跟 [unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown) 很像，unknown 是 any 的安全版，那安全在哪呢 ?

any 也是任何變數或參數沒有定義的情況下的預設值，any 型別使用任何屬性或方法都可以通過，TS 不會理你，但 `unknown` 就不行了 : 
![any 沒有錯誤，unknown 就有|300x140](https://i.imgur.com/lrmjp2a.png)

## TS 在 runtime 中不會有任何作用
 事實上 TS 最終編譯出來還是長的跟 JavaScript 一模一樣 : 
```ts
export const addTwoNumbers = (a: number, b:number) :number => {
  return a + b;
};
```
- 編譯後 : 
```js
export const addTwoNumbers = (a, b) => {
  return a + b;
};
```

一開始可能會覺得既然產出有沒有 TS 都一樣，那為什麼要 TS 🤷‍♀️。

> TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor. **Catch errors early in your editor.**  — TypeScript

TS 幫助在 **開發階段** 早點發現問題，減少 runtime 發生錯誤，不只如此也可以提升開發品質。用影片 "英文老師" 的概念來說 : 「嚴師出高徒」 🤣 

如果真的想要忽略 TS 的強硬指定，可以加上 `ignore`，通常會加上 lint 工具，可以加上 rules 顯示如果使用 ignore 要出現 warn 提示
```ts
export const addTwoNumbers = (a: number, b:number) => {
  return a + b;
};

// @ts-ignore
addTwoNumbers('123243terqadfa',[]) // 🤪 不會有任何問題
```
即使我們有定義型別，但因為加上 ignore ，TS 的檢查會跳過這個呼叫的 function，就跟 `any` 的作用差不多。

## 回傳值加上型別
在參數括號後面加上型別
```ts
// (param) : type
export const addTwoNumbers = (a: number, b:number) : number => {
  // ❌ 回傳值為字串是會跳出錯誤的
  return (a + b).toString() 
  // ✅ 回傳值一定要是 number
  return Number(a + b);
};
```
一開始指定也並免我們寫出非輸出的型別。

相關題是 08 題，不過這題有點奇妙，解決的辦法 2 是完全沒填入東西🤔
```ts
const makeUser = ():User => {
  return {
    id: 1,
    firstName: 'rosa',
    lastName: 'hong',
    role:"admin",
    posts: [
      {
        id : 2,
        title: '123'
      },
    ],
  };
};
```
我在想 Matt 是不是在指 `return` 可填可不填🤔，果然是 [官方的 Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#return-type-annotations)  給出了答案 : 
> Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its return statements.

跟宣告變數的型別一樣的道理，不用特別給予回傳值的型別，TS 根據 return 值會自己推理 return 的型別。

## 物件的型別 (Object type)
01 題著重在函式的 Primitive type 的 *參數*。 因為參數的輸入值來源是隨意的，沒有定義型別可能導致非預期的輸出。

02 題是講解 Object type 的參數，由於 object type 對應不同的 key-value 需要個別定義。有 3 種用法，影響的是 TS 會顯示不同的提示 : 
1. type
2. inline type
3. interface

### type
`type` 不只可以運用在 Primitive type 上，也可以使用在 Object
```ts
type Param = {
  first : number;
  second : number;
}
export const addTwoNumbers = (params:Param) : number=> {
  return params.first + params.second
};
// ✅ 
const result = addTwoNumbers({first : 1,second : 2})
```
輸入型別錯誤的訊息 : 
```plaintext
(property) second: number
Type 'string' is not assignable to type 'number'.
```

### inline arguments
把內容給拆開寫在同一行  : 
```ts
export const addTwoNumbers = (params: { first: number; second: number;}) => {
  return params.first + params.second;
};
```
變得不易讀又冗長😵

輸入型別錯誤的訊息，跟 type 一樣 :  
```plaintext
(property) second: number
Type 'string' is not assignable to type 'number'.
```
可以說 `type` 是把型別打包提出去，使程式碼更易讀。  

### Interface
只能用在物件上 (Object/Class)
```ts
interface AddTwoNumbersArgs {
  first: number;
  second: number;
}

export const addTwoNumbers = (params: AddTwoNumbersArgs) => {
  return params.first + params.second;
};
```
輸入型別錯誤的訊息，interface 用 `obj.a` 這種方式說明 : 
```plaintext
(property) AddTwoNumbersArgs.second: number
Type 'string' is not assignable to type 'number'.
```
type 跟 interface 在 object type *應用* 上是差不多的，不過他們在某些情境上還是有差別。

### 補充 : type v.s Interface
> 文章連結 : 
> 1. [【Day 19】TypeScript 介面(Interface) v.s. 型別別名(Type Alias)](https://ithelp.ithome.com.tw/articles/10224646)
> 2. [Typing Component Props | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#useful-table-for-types-vs-interfaces)

從上面看來，可以知道 : 
- interface 只能用在物件上
- type 是 Primitive 與 Object type 都可以使用

細節還有很多小不同，關注在應用上 :   
1. 單純表示靜態格式資料概念時使用 type，重複多方利用時使用 interface
2. 若原始資料型別、列舉 (Enum) 和元組 (Tuple) 型別和複合型別，只能使用 type 進行宣告
3. Interface 和 Type 可以混用擴展
  - 不希望再被擴充或靜態的型別格式就應該用 type 宣告 type，藉由 union 或 intersection 達成擴展
  - 之後被擴充或多方利用，宣告成 interface，藉由 extends 去達成擴展

另一個比較實際的問題就是 [效能](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)，結論是 interface 會比 type alias 好 。 

## 物件解構定義型別
在 React 是透過 props 來傳遞資料，通常使用時會直接解構
```jsx
const Compoment = ({count})=>{
  // 等同於 const {count} = props
  return <div>{count}</div>
}
```
解構好用到無處不在，再加上 TS 時會長怎樣呢 ? 先從一般的 JS 看起，把上面的例子改成解構式  : 
```ts
/* ❌ 錯誤 必須遵守 left hand side，分開寫不會被當作混和成物件的型別 
  (parameter) number: any.Duplicate identifier 'number'.
*/
export const addTwoNumbers = ({first:number,second:number})=> {
  return first + second
};
// ✅ 正確
export const addTwoNumbers = ({first,second}:{first:number,second:number}) : number=> {
  return first + second
};
```
結構變得冗長且難讀😵，在如果有多個屬性就會很痛苦，所以通常會提出來

- 改用 interface 會是比較好的選擇 : 
```ts
interface AddTwoNumbersArgs {
  first : number;
  second : number;
}
// ❌ 必須遵守 left hand side，分開寫不會被當作混和成物件的型別
export const addTwoNumbers = ({first:number,second:number} : AddTwoNumbersArgs) => {
  return first + second;
};
// ✅ OK
export const addTwoNumbers = ({first,second} : AddTwoNumbersArgs) => {
  return first + second;
};
```
錯誤訊息，會正確地告訴我們某物件型別的 key 是否錯誤
```plaintext
(property) AddTwoNumbersArgs.first: number
Type 'string' is not assignable to type 'number'.
```

在 React 可能會看到
```tsx
// inline 
const Compoment = ({count} : {count : number})=>{
  return <div>{count}</div>
}
// 或是 type
type Props{
  children? : React.ReactNode;
  count : number
}

const Compoment = ({count} : Props)=>{
  return <div>{count}</div>
}
```
interface 也是可以，兩者的差別可以看 : [Typing Component Props | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#useful-table-for-types-vs-interfaces) 。

文章有提及 *建議* 的原則 :  
- **interface** 較適合用在封裝、第三方套件程式碼，擴展的其內部的類型
- **type** 較適合 React Component 中的 props 與 state ，保持一致性與更嚴謹的限制

不過最終目的都是確保一致性，事實上並沒有限制一定要 type 還是 interface。

## optional 
利用問號 `？` 來表示有沒有存在，跟 JavaScript 中的 optional chaining 一樣，可以 [參考我之前的筆記](https://blog.rosa.tw/2022/06/JavaScript/JavaScript-null-undefined-operator)  

- 檢查 middle 是否存在沒有就...
```js
const person = {
  first : 'rosa',
  last : 'hong'
}
const mid = person?.middle || 'no'
```

### 物件的型別 
範例 03 ，如果呼叫函式時其中的參數是不一定要輸入的
```ts
// 等同於 inline 的 { first: string; last?: string }
type User = {
  first : string;
  last? : string;
}

export const getName = (params: { first: string; last?: string }) => {
  if (params.last) {
    return `${params.first} ${params.last}`;
  }
  return params.first;
};
// ✅ OK
getName({first:'rosa'})
/*
❌ 缺少 first
Property 'first' is missing in type '{ last: string; }' but required in type '{ first: string; last?: string | undefined; }'.ts(2345)
*/
const name1 = getName({last:'hong'})
```
沒有 optional `?` 的 key 一定要輸入，老師叫你填就要填😡

### 參數型別
範例 04 ，跟 03 有 87% 相似🤔
```ts
export const getName = (first: string, last?: string) => {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
};

// ✅ 第二個參數沒有也不會有問題
const name1 = getName('rosa'); // rosa
const name2 = getName('rosa','hong') // rosa hong
```

> 如果想要參數具有預設值呢 ? 

#### 預設值不能與 optional 同時存在
**預設值不能同時使用 optional**，既然是 **預設值** TS 會覺得這裡不會是 `undefined` 
```ts
/* ❌ 參數不能同時擁有問號跟初始值
(parameter) last: string | undefined
Parameter cannot have question mark and initializer.
*/
export const getName = (first :string, last?: string = '123') => {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
};
```
如同變數一開始就已經賦值了，TS 是知道這裡具有型別而且有值
```ts
let last  = '123'
```

#### 多個 optional 參數
如果第一個參數為 optional，後面的參數是必要的，會發生錯誤。等同於第一個參數傳入 undefined，沒什麼意義😑
```ts
/* ❌ 第一個跟傳遞 undefined 同等意義，TS 不喜歡這樣，因為沒意義
(parameter) last: string
A required parameter cannot follow an optional parameter.
*/
export const getName = (first? : string , last: string) => {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
};
// 沒什麼意義😑
const name1 = getName(undefined,'hong')
```

撇除第一個刻意 optional ，也可以有多個參數 : 
```ts
export const getName = (first : string , middle?: string,last?: string) => {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
};
// 跳過某值一樣是 undefined
const name1 = getName('rosa',undefined,'hong')
```
不過用這種方式時應該都會選擇用 **物件** 的方式傳入，因為直接傳入還得要完全照順序，用物件就不用了🤔，也不用傳什麼 `undefined`。
```ts
type Person = {
  first : string;
  middle?:string;
  last?: string;
}
export const getName = ({first,middle,last} : Person) => {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
};
const name1 = getName({first: 'rosa',last:'hong'})
```

## 函式中的其餘參數 (rest parameter)
optional 是在知道有多少個有無必要的輸入值使用，如果本身不知道到底有多少個輸入，rest parameter 提供參數更彈性的方式，把後面 `...` 的部份算做 **一組** 陣列來看待。

對 TS 來說就是一個 Array ，但是陣列內容是不得而知的，因此要為內部的集合定義 : 
```ts
export const getName = (frist:string,...otherName :string[]) => {
  return [frist,...otherName].join(' ');
};
// ✅
const result = getName('hello','fewfwe','fewfwe','13412fsa')
// ❌ 1234 不是 string
const result2 = getName('hello','fewfwe','fewfwe',1234)
```

## Type assertion v.s Type annotation
> 文章參考 : 這要付費 [Type Annotation vs Assertion in Typescript — one important difference](https://medium.com/@bsalwiczek/type-annotation-vs-assertion-in-typescript-one-important-difference-4f4df715b5fe)

`timecode : 47 min` ，寫筆記有點忘在哪，所標一下。相關題是 05 題。

- 從這個例子可以感受到 `as` 跟直接 `type` 哪裡有不一樣 : 
```ts
type User = {
  first : number,
  second : number 
}
// ❌ 報錯，少了 first
const john : User = {
  second : 4
};
// ✅ 沒問題
const rosa = {
  first : 3,
} as User
```
- **Type annotation** : `value : type`。 永遠都只能叫這個 type，非常硬性的。
- **Type assertion** : `value as type`。  轉變 (cast) 成這個型別的，但比較像之後在檢查。

雖然看起來沒差🤔，但在實際上錯誤訊息是 annotation 會在宣告的時後就被阻止，也就是開發階段就知道，而 assertion 則是編譯過後才會被阻止 : 
```ts
type Human = {
    age: number
    name: string
    spokenLanguage: string
}

let human = { age: 18, spokenLanguage: "English" };
const human2: Human = human; // ❌ 還沒編譯這裡就出現錯誤
console.log(human2.name.toUpperCase()); 

const human3 = human as Human;
console.log(human3.name.toUpperCase()); // ❌ 執行到這行報錯
```

影片中的說法蠻好笑的， 直接 `type` 就像是老師逼你一定要做對，`as` 是你告訴老師說你會做啦，但是藉口很多，老師只好無奈答應。另一個說法是 as 就像 CSS 到處加 `!important` 把舊有的 type 覆蓋過去。

另外 `as` 不能用在 exact type，比如已經知道它是 number 還硬要掰成 string : 
```ts
/* ❌ Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
*/
const age = 18 as string
```

## Scope 的問題
> 文章連結 : [Block-scoping](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#block-scoping)

`timecode : 48:44`，這題一開始我不知道為什麼要講這個🤔，更像是 JavaScript 的基礎，也就是 Scope 跟 Scope chain 的問題 : 
```ts
let defaultUser:User;

const getUserId = (user:User)=>{
  return user.id
}
/* ❌ let defaultUser: User
  Variable 'defaultUser' is used before being assigned.
*/
getUserId(defaultUser) // 稱做 1

// 測試資料，但 getUserId 沒有出現錯誤，稱做 2
it("Should get the user id", () => {
  expect(getUserId(defaultUser)).toEqual(1);
});
```
1 之所以會出現錯誤，是常見的 let/const 在還沒賦值之前，就使用到值的 TDZ (Temporal Dead Zone)，一般的 JavaScript 在執行過後才會出錯，TS 這時候就很聰明的幫我們抓到了。

2 為什麼沒有呢 ? 因為它被 block 包住 `{ }`，已經是另一個泛為了。 1 是暴露在全域，因此就已知 `defaultUser` 是 `unassigned`，而我們也知道 let/const 的 scope 是以 block 為限， 2 之所以沒有出現錯誤，因為這裡的輸入值 `defaultUser` 可能在同一個 block 或是 scope chain 上的某個 `defaultUser`，這已經不是編譯前能夠執行的，TS 不會主動找 scope chain 上的，所以就不會出現錯誤。

## Discriminated Unions (|) : 選擇一個
範例 06 ，使用 `｜` (OR) 來讓 type 有不同的 **值** 可選擇，作為種類的提示字元很好用
```ts
interface User {
  // ...
  role: "admin" | "user" | "super-admin";
}
```

![內部都是 string ，只要打出引號編輯器會自己跳出選項](https://i.imgur.com/5iQbhoa.png)
刻意讓 `role : '123'`，沒有值被包含在內的情況會提示 : 
```plaintext
(property) User.role: "admin" | "user" | "super-admin"
How do we ensure that role is only one of:
  - 'admin'
  - 'user'
  - 'super-admin'
```

### 補充 : Enum 枚舉
Enum 跟 `｜` 非常類似，但差別在於 Enum 是真的會在 runtime 產生物件，而 `｜` 不會。
TT 沒有東西產生；EE 有產生物件。
![範例來自 : https://stackoverflow.com/questions/40275832/typescript-has-unions-so-are-enums-redundant](https://i.imgur.com/upuhvfl.png)

影片中 Matt 說實際上很少用到，並沒有特別解說，還說 TS 開發團隊可能很後悔出這個🤣。不過我查了一下，Enum 適合用在管理多組常數，我第一直覺想到 redux 中的 `action.type`。以往會將 reducer 的 action 拆出去 `action.type` 避免打字出現錯誤。

用上面的例子改，role 其實可以被窮舉出有多少身分，這些是固定的
```ts
enum Role{
  admin,
  user,
  ['super-admin'] // 斜槓的問題，利用 Symbol 的方式解決
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: Role
}
export const defaultUser: User = {
  id: 1,
  firstName: "Matt",
  lastName: "Pocock",
  role: Role.admin // 👉 這裡的 role 是數字
};
```
role 只要透過已存在的 `Role` 物件去尋找就可以了。 
![用物件的形式賦值](https://i.imgur.com/Bm3d7Ul.png)
Enum 還提供另一種功能，[Reverse mappings](https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings)，可以得出字串字 : 
```ts
enum Role{
  admin,
  user ,
  ['super-admin'],
}

const user  = Role.user // 1

const defaultUser: User = {
  id: 1,
  firstName: "Matt",
  lastName: "Pocock",
  role: Role[user] // 👉 user 是數字去往回找 Role[0]
};
console.log(defaultUser.role) // 'user'
```
有人是提到這樣會產生新的物件對效能上有差別，如果要節省 JavaScript 大小不如用 `|` 🤔。

另一個實用的例子就是 神 Q 超人大大有提到的 Response status codes : [TypeScript | 善用 Enum 提高程式的可讀性 - 基本用法 feat. JavaScript](https://medium.com/enjoy-life-enjoy-coding/typescript-%E5%96%84%E7%94%A8-enum-%E6%8F%90%E9%AB%98%E7%A8%8B%E5%BC%8F%E7%9A%84%E5%8F%AF%E8%AE%80%E6%80%A7-%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95-feat-javascript-b20d6bbbfe00)。

## Array 的兩種用法
07 題， posts 是陣列類型的寫法，裡面裝 type Post 物件類型 
```ts
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: "admin" | "user" | "super-admin";
  posts: Post[]; // ✅ 可以這樣
  posts: Array<Post>; // ✅ 也可以這樣
}

export const defaultUser: User = {
  id: 1,
  firstName: "Matt",
  lastName: "Pocock",
  role: "admin",
  posts: [
    {
      id: 1,
      title: "How I eat so much cheese",
    },
  ],
};
```
- `Post[]` 是  `Array<Post>` 的簡寫。

## 交集型別 Intersection Types (&) : 合併大法
> 文章參考 : [Intersection Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types)

以 06 題為例，interface 直接把 role 屬性寫在裡面，還有其他的寫法
- **interface 合併** ([Merging Interfaces](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces)) : 除了建立在新的類型 (extends) 擴展，也可以從 "自己" 作為接口擴展，如果插入是 key 一定要是唯一值 (unique)，而且同一種 key 定義到不同型別會產生錯誤
```ts
interface User {
  id: number;
  firstName: string;
  lastName: string;
}
interface User{
  role : "admin" | "user" | "super-admin";
}
```
- & ─ Intersection Types : 用於合併 type 或 interface 給新的 type 。  type 也可以定義物件型別。
```ts
type User = {
  id: number;
  firstName: string;
  lastName: string;
} & {
  role : "admin" | "user" | "super-admin";
}

// 以原本 06 為 interface ，也可以合併 interface
interface BaseUser{
  id: number;
  firstName: string;
  lastName: string;
}
type User = BaseUser & {
  role : "admin" | "user" | "super-admin";
}
```
直接把 role 焊在裡面是一樣的，但是 role 是獨立的 type，讓型別在設定時可以更彈性。
- 再獨立出來 : 
```ts
type User = {
  id: number;
  firstName: string;
  lastName: string;
} & {
  role : Role
}
type Role = "admin" | "user" | "super-admin";
```
如此一來上半部就是固定的模板， `&` 之後的就像疊加上去的，如果要加什麼東西也可以在 `&` 上去 。

### 補充 : interface 的 extends v.s  Intersection Types
> 文章參考 : 
> 1. [types - Difference between extending and intersecting interfaces in TypeScript? - Stack Overflow](https://stackoverflow.com/questions/52681316/difference-between-extending-and-intersecting-interfaces-in-typescript)
> 2. [Interfaces vs. Intersections](https://www.typescriptlang.org/docs/handbook/2/objects.html#interfaces-vs-intersections)
> 3. [javascript - Extends vs Intersection in Typescript - Stack Overflow](https://stackoverflow.com/questions/67498054/extends-vs-intersection-in-typescript)

兩者的目的很像，主要是看自己應用的習慣，官方說到最大的差別是錯誤的處理 : **同樣的 key 怎麼辦 ?**  extends 會出現錯誤，但 type 使用 `&` 的不會。  
1. type 交集兩個 interface 並不會變 interface ，一樣是 type。 A 跟 B 一樣會產生交集。
   ```ts
   interface A{}
   interface B{}
   type C = A & B
   ```
2. interface extends 的 key 型別如果有用多個值差集，只能從中繼承，不能有額外的型別；type 就沒那麼嚴格，雖然是交集，但沒有的也不會出錯。
  ```ts
  interface Parent {
      x: string | number;
  }
  // ✅ ok 
  interface Child1 extends Parent {
      x: string;
  }
  // ❌ 出現錯誤，boolean 並不在 Parent.x 裡面
  interface Child2 extends Parent { 
      x: string | boolean;
  }
  // ✅ 不會怎樣，只是做交集，並沒有繼承建立新的插進去
  type IntersectedChild = Parent & {x: string | boolean };
  type IntersectedChildX = IntersectedChild['x']; // string
  ```

記住，interface 之不能直接做交集 : 
```ts
// ❌ 不會有這樣的東西
interface User{
  id: number;
  firstName: string;
  lastName: string;
} & {
  role : ...
}
```

## 組合技 Intersection Types + Discriminated Unions
以 06 題為例，可以把 role 當成附加 key ，定義不同的物件內容 : 
```ts
type User = {
  id: number;
  firstName: string;
  lastName: string;
} &( {
  role: "admin";
  adminPassword : string; 
} | {
  role : "user";
} |{
  role : 'super-admin';
  superadminPassword: string;
})
```

> 記得 `&` 後面的括號包起來，視為一整組。

如此一來在 User 使用時， role 可以根據填入的字串決定哪種 password。填入 `"user"` 則不用。
```ts
// ✅ No error
const Rosa :User = {
  id: 1,
  firstName: 'rosa',
  lastName: 'hong',
  role: "user"
}
/* ❌
Property 'adminPassword' is missing in type '{ id: number; firstName: string; lastName: string; role: "admin"; }' but required in type '{ role: "admin"; adminPassword: string; }'
*/
const Rosa :User = {
  id: 1,
  firstName: 'rosa',
  lastName: 'hong',
  role: "admin"
}
```
如此一來可以按照 role 的不同訂定不同的 key。

### 再拆解
`timecode : 58:50、59:14` ，源於影片最後一題，這也是我覺得蠻實用的一個，幾乎把 type 能切就切。

把上面 `&` 之後的部份另外提出成 type ，並且個別用物件 bracket notation 分配給 Role : 
```ts
type User =  {
  id: number;
  firstName: string;
  lastName: string;
} & UserRoleAttributes

// 差集的原因，role 是會被提出來，像數學的結合律🤔 
type UserRoleAttributes = | 
{
  role : "admin";
  adminpassword:string;
} |{
  role : "user"
} | {
  role : "super-admin";
  superpassword: string  
}

// 利用 bracket notation 拿到物件屬性，也就是 "admin" | "user" | "super-admin"
type Role = UserRoleAttributes["role"]
```
我覺得這個概念應該是 Role 原本用字串串起來，方便開發 IDE 提示，但是當我們用 `&` 串在一起之後，反而沒辦法獨立出來，如果其他地方也有要使用到 `Role`，豈不就要另外建立嗎 ? 

回到型別也會瀑布流這點， `UserRoleAttributes` 提出來之後，它就是一個物件，差集的部份是每個都有 role 這個 key ，雖然不能 `UserRoleAttributes.role` ，Object 還有 bracket notation 可以用字串方式取得值，Role 就可以再被提出來。

## 被提到但沒解答 :  @decorator
在影片中是被提問的，講者說這很少用到🤔。     
目前還是實驗性功能，[官網](https://www.typescriptlang.org/docs/handbook/decorators.html#introduction)是說用主要用在類別 (Class)，可以參考莫大這片文章 : [十分鐘帶你了解 TypeScript Decorator. 什麼是 Decorator ?](https://oldmo860617.medium.com/%E5%8D%81%E5%88%86%E9%90%98%E5%B8%B6%E4%BD%A0%E4%BA%86%E8%A7%A3-typescript-decorator-48c2ae9e246d) 。  

decorator 的用處是在不修改原程式碼的狀況下，在執行原函式的前後做一些特定的操作，同時也把可以重複使用的邏輯切分出去。

很好!現在的我看不懂🤪，不過應該是用在物件導向開發上有不少幫助，[這項更能未來很可能納為 JavaScript 標準之一](https://github.com/tc39/proposal-decorators) 。

## 解剩下的題目
影片到第 07 題就沒了，不過專案的題目有到 18 題，一邊看 handbook 來學習💪

### 09 & 10 型別斷言 Type Assertion
#### 09 promises problem
有一些 TS 沒辦法辨別出來的類型，例如 DOM 節點對於 TS 指能辨別到 `HTMLElement`，如果是更詳細的資訊 (如來自於 `HTMLCanvasElement` ) 是沒辦法被辨別的。用 Type Assertion 可以手動添加一個值的型別。

型別斷言有兩種形式 : 
- `<Type>value`
- `value as <Type>`

在 09 題，data 所回傳的是 Promise 的陣列物件 (await 的緣故)，內涵多個物件的結構，用 `LukeSkywalker` 定義好型別加上去 : 
```ts
export const fetchLukeSkywalker = async (): Promise<LukeSkywalker> => {
  const data = await fetch("https://swapi.dev/api/people/1").then((res) => {
    return res.json();
  });

  return data;
};
```
- 解法 2 是在 return 時直接使用 `as` 
```ts
return data as LukeSkywalker;
```

我又查了 Handbook， [Handbook 提到](https://www.typescriptlang.org/docs/handbook/2/objects.html#the-array-type) :   
>Modern JavaScript also provides other data structures which are generic, like `Map<K, V>`, `Set<T>`, and `Promise<T>`. All this really means is that because of how Map, Set, and Promise behave, they can work with any sets of types.

泛型類別的資料結構，最常見的就是 Array， `[]` 有時不只包含一種型別，利用泛型可以讓 TS 在使用時去推斷 `Array<T>` T 的型別。 Map 、 Set 以及 Promise 也可以用這種方式。

- 第一次嘗試用泛型🤔
```ts
export const fetchLukeSkywalker = async <T>(): Promise<T> => {
  const data = await fetch("https://swapi.dev/api/people/1").then((res) => {
    return res.json();
  });

  return data;
};
// 呼叫時帶入型別
const result = fetchLukeSkywalker<LukeSkywalker>()
```
我想用這樣可以讓參數帶入特別的網址，更彈性的帶入指定的型別🤔，後來查一查真的有這些使用方法 : 
- 這篇提到 any 的部分應該改為 unknown，避免發生呼叫函式方法錯誤的問題 : [Node-Fetch: Generic for "body".json() method](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/36868#issuecomment-512989650)
- 實際上別人問的問題 : [promise - How to use fetch in TypeScript - Stack Overflow](https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript)

應用在 React 上的例子可以參考 Kent.C.Dodds 的文章 :  [Using fetch with TypeScript](https://kentcdodds.com/blog/using-fetch-with-type-script)

#### 補充 : 什麼是泛型 (Generics) ?
> 文章參考 : [泛型 - TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial/advanced/generics?q=Promise)

泛型（Generics）是指在定義函式、介面或類別的時候，不預先指定具體的型別，而 **在使用的時候再指定型別的一種特性**。

關於泛型我也不太了解，簡單來說型別不用再一開始就提供型別，而是有用到時在賦予就好。就像 fetch 的例子，回傳值照理來說是 `Promise<any>` ，無法固定一種型別內容，如果要根據網址來動態辨別資料型別，泛型就是個很好的小幫手。

#### 10 Set Problem
跟 Promise 的解法一樣，只是不在函式中，而是一般的變數
```ts
const guitarists = new Set<string>();
```
Set 可以看做是一種 type ，`Set<Type>` ，而 `<Type>` 是一種型別模板， 每一個 Set 內部都會被定義 string 的型別。

在 interface 或 type (Type aliases) 也都能使用，利用 `type` 產生的可以更加彈性用在 Primitive type 中。 (這句好像怪怪的)

### 11 Records
Records 是 TypeScript 提供內部一些幫助轉換型別的方法，稱做 [Utility Types ](https://www.typescriptlang.org/docs/handbook/utility-types.html) 工具型別。可以看到每一個 Utility 都接收 Type 並且產生另一種 Type。跟 function 很像對吧， `Type = f(type)` 🤔

11 題，可以看到都有用到 `id` 這個 property，但是 id 是輸入來的，並非已被定義的 property

#### 解法 1 : Bracket notation
物件造訪有兩種方式 : 
1. 熟悉的 dot notation : `obj.a` 
2. 可以輸入字串字或數字的 [Bracket notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors#bracket_notation)  : `obj['0']` or `obj['rosa']`  

既然 id 是任意的，dot 只適合固定已知的 property，所以用 bracket
```ts
type Cache = {
  [id: string] : string
}
const createCache = () => {
  const cache:Cache = {};
  // ...
};
```
#### 解法 2 : inline 寫法
跟上面的一樣，只是在原地拆開
```ts
const createCache = () => {
  const cache:{
    [id: string] : string
  } = {};
  // ...
};
```

#### 解法 3 : Records
用法 : `Record<Keys, Type>` 。  一次指定 key 跟 value 的型別

此外也可以做物件 key-value 的組合方法，官方的提供的範例 : 
```ts
// CatInfo 物件的 type
interface CatInfo {
  age: number;
  breed: string;
}
// CatName 的 type
type CatName = "miffy" | "boris" | "mordred";

// Record 使其對應一起
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
cats.boris;
```
如此一來 key 就被限制在 `CatName` 的範圍裡，新增減少都不行，info 也是要照格式填。

回到練習題 11，key-value 配對，我們只要填上 key-value 的型別就完成了
```ts
const cache: Record<string, string> = {};
```

### 12 限縮 Narrowing + typeof guards
> 文章參考 :  [TypeScript: Documentation - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards)

Unions ( `|` ) 的使用除了多個字串，讓我們在編輯器上直接做快速選擇之外，如果放多種不同型別，會有排序定型別、限縮型別的效果 : 
```ts
const coerceAmount = (amount: number | { amount: number }) => {};
```
參數 `amount` 允許輸入兩種型別，分別是 number 跟 object 。在 JavaScript 中如果要知道值得型別會使用 `typeof` ，除了幾個比較特例的 Array 或 null ，大部分的型別都是可以被辨別出來的。

變數使用 ( `|` ) 之後在內部要再用 `typeof` 幫助我們更精準判斷其型別，TS 稱做 **typeof
type guards**， 以 12 題的解法加上 `typeof` 判斷限制。 
```ts
const coerceAmount = (amount: number | { amount: number }) => {
    if(typeof amount === 'number') return amount
    return amount.amount
};
```

> 別忘了 `typeof` 回傳值是 string 

`typeof` 適合拿來用在基本型別與 object 、 function ，其他的 null 、0 (數字/字串)、`NaN` 等都有對應的方式解決，可以參考官方的 handbook。

### 13 try catch 中的錯誤處理
13 題是 try...catch 錯誤很常見的情形 ， [e 是錯誤 ( Error ) 的物件，是一個泛型](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Error#error_types)，簡單來說不能很確定他的型別，這時候要 e 怎麼定義呢 ? 
```ts
const tryCatchDemo = (state: "fail" | "succeed") => {
  try {
    if (state === "fail") {
      throw new Error("Failure!");
    }
  } catch (e) {
    return e.message;
  }
};
```

#### 解法 1 : Type Assertion
已知他是個 Error 物件，並不在一般的型別裡面。我們可以用型別斷言 (Type Assertion) 來幫助辨別更細節的類型，例如 : Error 可能是 `DOMException` 
```ts
catch (e) {
  // 用 as 
  return (e as Error).message;
  
  // 要變成這樣也是可以🤔 (?)
  return (<Error>e).message
}
```
咦 ? 為什麼不是寫在參數 `e` 旁邊呢 ? 
> 文章參考 : [Get a catch block error message with TypeScript](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript)

```ts
/* ❌ interface Error
Catch clause variable type annotation must be 'any' or 'unknown' if specified.
*/
catch (e : Error) {
  return e.message;
}
```
結果會發生錯誤，Error 也不再 TS 辨識的型別裡面，`Error` 就被當作型別 (type/interface)，實際上是 `catch(e)` 這裡就被判別為 Error ，太早了，JS 會跳出錯誤。

#### 解法 2 : any
我覺得更像是某種逃避/忽略手段🤣。不過這樣的情形不少見，例如 : 跟 fetch 回傳 Promise 拿來回的資料也是泛型，因此有的人處理會是 `Promise<any>` 
```ts
catch (e : any) {
  return e.message;
}
```

#### 解法 3 : instance of 
> 文章參考 : [instance of narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing)

跟上面提及的 Narrowing 是同一組，只是更細微的找尋 prototype chain 上的 instance，例如 : `Object.prototype` 是一切的起源，但是 string 、 number 等這些東西也有是在型別包裹器的 chain 上，JS 找鏈上的規則是找到就停，因此 string 會停留在 `String.prototype` ，讓 string 可以用類似物件使用 method。

instance of 可以在更細分不同的 Error 型別，或者就拿它來判斷是不是 Error 的一種
```js
catch (e) {
  if (e instanceof Error) {
    return e.message;
  }
}
```
👉 MDN 也有提到這部分 [try...catch - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#conditional_catch-blocks)， 用 instance of 區分不同的 Error。

### 14 extends : interface 物件擴充
14 題就是把相同的型別邏輯拉出來，相關使用的都用繼承，沒什麼難度
```ts
interface UserBase {
  id : string
}
interface User extends UserBase{
  firstName: string;
  lastName: string;
}

interface Post extends UserBase{
  title: string;
  body: string;
}

interface Comment extends UserBase{
  comment: string;
}
```

### 15 intersection : 物件交集合併
交集 `&` 可以讓 `type` 合併， 15 題可以看到多了 `posts` key，在回傳的部分可以加上 type : 
```ts
export const getDefaultUserAndPosts = (): User & {posts: Post[]} => {
  return {
    id: "1",
    firstName: "Matt",
    lastName: "Pocock",
    posts: [
      {
        id: "1",
        title: "How I eat so much cheese",
        body: "It's pretty edam difficult",
      },
    ],
  };
};
```
這邊用一行解決，以可以另外提出 `type XX = User & {posts: Post[]}`，另外用 `as` 也是種解法，但不是那麼直覺。
```ts
// type 提出來
type UserwPosts = User & {posts: Post[]} 
// as 
return {...} as (User & {posts: Post[]}) 
```

### 16 omit and pick
>文章參考 : [Omit & Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)

除了 Record ，`Omit` 跟 `Pick` 都是 Utility type 之一，我覺得跟 `Array.filter` 一樣。
- `Omit<Type,Keys>`  : 忽略
- `Pick<Type, Keys>` : 挑出需要的

一開始我想說怎麼不要用 `optional` 呢 🤔 ? 結果是不行的，因為它不是真的消失在這個 type 裡面，只是把 id 看做 `undefined`。

Omit 跟 Pick 後面傳入的 keys 可以多個字串，要使用差集 ( `|` )，就像漏斗一樣，把結果給篩出來 : 
```ts
// 不要 id
type MyType = Omit<User,"id">;
// 要 firstName & lastName
type MyType = Pick<User, "firstName" | "lastName">;
```

### 17 function types
> 文章參考 : [Function Type Expressions](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions)

17 是非常實用的一題，很常在參數傳入 callback function 來達成非同步的操作。
```js
const dosomething = (cb) =>{
  cb() 
  //...
}
```
為 function 加上型別最基本的長相 : 
```ts
(param : type) => void 
```
- `void` : 沒有回傳值或 `undefined` 的情況。
- 如果有傳入參數一定要填有參數名，不能只有型別 `(string) => void`，這樣會是指 `string : any`  ， 變數 string 的型別是 any。 

17 題的解法 : 
```ts
const addListener = (onFocusChange:(isFocused : boolean)=>void ) => {
  window.addEventListener("focus", () => {
    onFocusChange(true); // 👉 沒有回傳只有呼叫，傳入一個參數
  });
  //...
};
// 另一種就是把他提出來
type FocusListener = (isFocused : boolean)=>void
const addListener = (onFocusChange : FocusListener) => {}
```

### 18 Promise function
Promise 的泛型已經在 09 題有提過，18 題加了點難度，結合 async/await 。

async 是一個 function 的形式，並且回傳 Promise 物件 : 
```js
async function createThenGetUser(){}
const createThenGetUser = async ()=>{}
```
內部可以用 [await](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/await) 等待 Promise 物件的回傳值，如果把回傳值傳給另一個 promise 會拿到解析過的值。 `createUser` 與 `getUser` 是一個 function 回傳 Promise  
```ts
// 實際上 createUser、getUser 長這樣，幫它加上 type
const createUser = () : Promise<any> =>{
  return new Promise(...)
}
const getUser = (id:string) :Promise<any> =>{
  return new Promise(...)
}
```
放在參數變成 function 的格式再慢慢填回去 : 
```ts
// 由於 userId 是 string 確定了 Promise 的泛型為 string
createUser : ()=> void
createUser : ()=> Promise<string>

// userId 是參數，並且回傳 user 是 User type
getUser : () => void
getUser : (id : string) => Promise<User>
```
- 放回去結果就是 : 
```ts
const createThenGetUser = async (
  createUser: ()=> Promise<string>,
  getUser: (id : string) => Promise<User>
  ): Promise<User> => {
  const userId: string = await createUser();
  const user = await getUser(userId);
  return user;
};
```

## 總結
寫的時候跟拼拼圖一樣，這篇變得非常雜燴，我不認為是好筆記，當作資訊索引吧 🤔。

- TS 定義型別的好處是提早在編譯之前就可以發現錯誤，提高開發時的效率
- 定義型別可以有 3 種方式 : 
  1. **inline** : 在值的後面加上冒號與型別 `(a : number)` 
  2. **type** : Primitive type 、Object type 都可以使用
  3. **interface** : 僅用於物件類型 (Object/Class)，可以使用 extends 繼承
- `?` optional type 用來選擇性的值，`value?: type`
- `|` (OR) 符號是有兩種作用
  1. 如果是型別 (type)，按照排序與變數使用時的邏輯限縮型別。`string | number`
  2. 如果是多個字串，IDE 會提示的字可選擇，避免打錯字。`"rosa"|"john"|"tofu"`
- `&` (AND) 符號是對 types 或 interface 做交集合併，別於 interface 的 extends。
- function 作為參數的型別是基本是 `( ()=> void )`
- `void` 是 function 沒有回傳或是 `undefind` 時使用 

影片以有趣的方式來學習 TS，雖然沒有到很全面🤔，過程透過提問更讓我知道應用上的解決方法，跟著脈絡走對於初步入門是可以嘗試看看的。最後我也沒想過我會寫這麼長篇 ...。

第一次使用 TS 我的心得是 **真的非常的複雜跟麻煩**，光是規則就令人頭疼😵，深刻感覺到 「用的好上天堂，用不好下地獄」，要說跟 JavaScript 有關嗎 ? 真的更像學另一種語言。

