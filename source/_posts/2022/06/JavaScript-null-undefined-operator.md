---
title: 筆記 | JavaScript - 運算子 ?. 與 ??
tags:
  - JavaScript
categories:
  - '2022'
  - '06'
author: Rosa Hong
date: 2022-06-15 14:31:13
---

## 前言
對於 undefined 或是 null 的處理，我比較常使用 `||` (OR) 或是 `&&` (AND) 的寫法，找資料的時候很常看見 `??` 以及 `?.` 的寫法。實在是太好奇了，於是找了資料學習並且記錄下來 。  

<!-- more -->
## Optional chaining (?.)
如果要查找 **Object 的某項是否存在**。我們可能會遍歷整個物件，但不用這麼麻煩，可以使用 `obj?.` ，如果物件是 null 或是 undefined 就做別的處理，在判斷值存在與否就很好用。

例 : 
```js
const obj = {a: 1}
console.log(obj?.b) // undefined
console.log(obj.a + (obj?.b || 2)) // 3
```

那在巢狀的結構中如果不用 `?.` ，必須先判斷前面的是不是存在  
```js
console.log(obj.a && obj.a.b) // obj.a 存在才往下一步
console.log(obj.a?.b) // 使用 ?.
```
透過 (?.) 的方式 JavaScript 內部會透過隱式 (implicitly) 去確認 obj.a 是不是 null 或是 undefined，而不用顯式 (explicitly) 確認 obj.a 存不存在再去判斷下一個。   

### 為什麼要有 (?.)
從一般的判斷來說，我們可以用 `||`  來決定值存不存在，因而來設定 **預設值**
```js
const product ={
	name : 'Rosa',
	cost : 0
}
let total = product.cost || 50 // ?
console.log(total)
```
雖然 `||` 很好用，但是 `||` 會強制轉型，也就是 falsy 。數字 0 在判斷中會被轉為 false ，因此在上面的例子，數字 0 也會被判斷成 false 而預設成 50。  

可能會想說那判斷 `>=0` 不就可以了 ? 
```js
let total = product.cost >= 0 ? product.cost : 50 
```
是可以，但會重複寫兩次 `product.cost`🥴。  
BUT !!! 如果有 **負數** 呢 ? 總不能判斷不是 0 吧。
邏輯寫法就更綁手綁腳，但我們實際只確認是不是空值或是為賦值而已。
```js
let total = (product.cost === null || product.cost === undefined) ? 50 : product.cost
```
因此 short-hand 的 `?.` 誕生，讓我們可以更快判斷。  
> IE 並不支援 `?.` ，如果要使用就是 **依序判斷是否為 null 或是 undefined**

### fuction call 的 (?.)
MDN 有提到是如果使用套件的 API，可以使用這種方式，可以確認 function 是否存在再執行，以免發生錯誤。
```js
let sayhello = {
	hello(){
		return 'hello'
	}
}
console.log(sayhello.hi?.()) // undefined ，不會發生錯誤
console.log(sayhello?.hello()) // hello
```

但是如果 hi 本身並不是 function 就會發生 `is not a function`
```js
sayhello.hi = '123'
console.log(sayhello.hi?.()) // hi is not a function
console.log(sayhello?.hello()) // 不會執行，因為上面出現錯誤
```

手動矯正 : 
```js
sayhello.hi = '123'
console.log(typeof sayhello.hi=== 'function' ? sayhello.hi() : sayhello.hi ) // '123'
console.log(sayhello?.hello())  // hello
```

### 什麼時候不應該用 (?.)
1. 沒有被 **宣告** 的變數 : 對變數使用，會發生錯誤，因為 a 並不存在 (is not defined)，並不能這樣判斷。
	```js
	console.log(a?.b) // a is not defined
	```
2. 重新賦值 (left-hand side) : 不能這樣使用 
	```js
	let obj = {a: 2}
	obj?.a  = 1  // Invalid left-hand side in assignment
	```
3. 本身是 null 
	```js
	let a = null
	let x = 0
	let prop = a?.[x++]
	console.log(x) // 0 並不會增加
	console.log(a) // null
	```
	這邊我有點不太了解，因此我試了空物件，x 遞增是  1 🤔，a 依然是空物件。後來我找到 [運算子優先序 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)，簡單來說 **越高階的運算子會按照規則先執行**。
	`?.` 是 18 ,判斷是從左至右。a 已經是 null 了，所以不會執行。但是如果是空物件 `{}`，?. 會執行，不是 null 也不是 undefined。而`[ ]` 跟 `?.` 的層級相同，`[x]` 存在所以也會執行 ， `++` 也會執行。(這邊有點不太確定，待補)
	
另一個有關優先序的常見例子是 `(function(){var a = b = 5})()`，在非嚴格模式下， global 依序印出 b 跟 a ，b 是 5 ，a 是 is not defined。因為 `=` 是 right-to-left，也就是 b 在未宣告下賦值，`var  a` 因作用域的關係，自然在 global 是 not defined。

> MDN 也提到不應該過度使用 (?.)
```js
console.log(obj?.['Rosa']?.number ? obj.['Rosa'].number : obj?.['Rosa']) // 👎，因為在 obj.['Rosa'] 不存在就可以停止了，不用串串樂來確認

console.log(obj?.['Rosa'] ? obj.['Rosa'].number : undefined) // V
```

## Nullish coalescing operator (??)
可用來判斷 **某個值是 null 或是 undefined**

### 為什麼要有 (??)
跟上面提到 `||` 的判斷是一樣的，如果是數字 0 會被強制轉型比較成 false，如果只是想檢查 null 或是 undefined，?? 就會比較方便 。

**舉例來說**
1. 先讓 input 有 0 或是有值
2. 手動把 input 的值完全清空， `e.target.value` 會是 **空字串**，但是我不想讓空字串也通過
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ZErwEBe" data-user="shan473" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/shan473/pen/ZErwEBe">
  練習 ?? &amp; ?.</a> by YanShanHong (<a href="https://codepen.io/shan473">@shan473</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### function call 的 (??) 
來自 MDN 的範例
```js
function A() { console.log('A was called'); return undefined;}
function B() { console.log('B was called'); return false;}
function C() { console.log('C was called'); return "foo";}

console.log( A() ?? C() );
console.log( B() ?? C() );
```
根據 [運算子優先序](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) 
> `??` 是 `left-hand side` ，也就是 **從左邊判斷開始**。

其結果是  
```js
"A was called"
"C was called"
"foo"

"B was called"
false
```

跟著跑一次 :  
1. A() 執行，印出 "A was called"
2. ?? 的左邊是 undefined 所以決定執行 C()
3. C() 執行，印出 "C was called"
4. ?? 左邊是 undefined 所以是 C() 回傳的結果 'foo'
5. B() 執行，印出 "B was called"
6. ?? 的左邊是 false ，不符合 null 或是 undefined，C() 並不會執行
7. 回傳 B() 的結果

### 不要直接用 OR (||) 或 AND (&&) 一起使用 (??)
OR 跟 AND 運算子的優先度比 **??** 還低，因此一起使用會發生錯誤，即使前面的結果是 null 或是 undefined
```js
console.log(null || undefined ?? "foo") // 錯誤
console.log(true || undefined ?? "foo") // 錯誤
```
想讓前面先判斷可以用 `()` grouping 包起來，grouping 的優先度是最高的，所以會先執行。

```js
console.log((null || undefined) ?? "foo") // 'foo'
console.log((true || undefined) ?? "foo") // true
```

## Polyfills
如果瀏覽器不支援 (如 : IE)，可以使用 Polyfills，只要判斷 null 以及 undefined。
```js
let result = (somevalue !== null || somevalue !== undefined) ? somevalue ? DefaultValue
```

## 總結
1.  `?.` 是中找尋 Object 類型 (object 、array 、function 等等)的值如果是 null 或是 undefined，結果是右邊的值。亦可用在 function call (**object.method?.()**) 上
2. `?.` 不管存不存在，不能用來重新賦值
3. `??` 是判斷任何值如果是 null 或是 undefined，結果是右邊的值
4. `??` 不要直接跟 OR 或是 AND 一起使用，要用先把 ?? 左邊的括號起來先執行
5. 兩種 IE 不支援 QQ

## 參考
1. [Optional chaining (?.) - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
2. [Nullish coalescing operator (??) - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_Coalescing_Operator)
3. [Optional chaining '?.' (javascript.info)](https://javascript.info/optional-chaining)
4. [Nullish coalescing operator '??' (javascript.info)](https://javascript.info/nullish-coalescing-operator)
5. [運算子優先序 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
