---
title: ⟬ 筆記 ⟭ JavaScript - 宣告提升(II) - 跟著 JavaScript 引擎發動
tags:
  - hoisting
  - JavaScript

categories:
  - - Frontend
    - JavaScript
description: 宣告提升背後的原理以及規則
author: Rosa Hong
date: 2022-01-14 11:23:19
---

## 前言

從上一篇 [⟬ 筆記 ⟭ JavaScript - 宣告提升(I) - 我以為的以為](https://meitung473.github.io/RosaBlog/Frontend/JavaScript/JavaScript-Hoisting/)  
知道有三種東西會做宣告提升   
但是不太清楚如何運作  
為了瞭解如何宣告提升之前  
要問自己為什麼 **需要** 宣告提升？  
如果沒有宣告提升，JavaScript 不能做到那些事？  

## 如果沒有宣告提升 (Hoisting) ？
1. 變數必須先宣告再使用 
2. 函式必須先宣告再使用  
   在設計階段，會希望將預執行函式名先寫出來，再來補齊函式中間的運作，對於執行的脈絡會更加清晰，如果沒有宣告提升，必須先等完成函式再呼叫，版面上可能就會有凌亂。
3. 函式做不到互相呼叫 **(非常重要)**  
   A 要呼叫 B 時 ，B 根本還沒被創造  
   ```javascript
	function average(a,b){
		return add(a,b)/2
	}
	function add(a,b){
		return a+b
	}
    console.log(average(1,2)) //1.5
	```
	若沒有宣告提升，是不能執行的  
	在 `average` 呼叫 `add` 時就會出錯  
   
   

## JavaScript 的宣告提升怎麼運作？
了解宣告提升非常重要  
接下來要了解如何運作？     
可以來看看 ECMAScript 怎麼說 JavaScript 的運作方式    
> ECMAScript 是 JavaScript 的實作守則  
> 可以先參考底層是如何被定義的  

主要跟兩個東西有關連  
一是執行環境 (Execution contexts)  
二是作用域 (Scope)  

## 執行環境 (Execution contexts)  
Execution contexts 執行環境(以下簡稱 EC)    
ECMA 的解釋是:  
>Evaluation of global code or code using the eval function (15.1.2.1) establishes and enters a new execution context. Every invocation of an ECMAScript code function (13.2.1) also establishes and enters a new execution context, even if a function is calling itself recursively.

剛開始執行前也會生成 global 的 EC   
每當呼叫函式時也會生成一個新的 EC  

所以 EC 有兩種  
1. **Global Execution contexts**  
    全域物件會在這邊產生  
    產生的有包含最外層的宣告變數、函式、還有`this`  
    而 this 在不同的環境會有不同的值  
    - 在瀏覽器上，是 `window`
    - 在 node.js 上， 是一種 global 物件   
2. **Function Execution contexts**  
    呼叫 function 時形成，除了內部中宣告變數、函式會產生外，如果有參數的話，**參數** 也會被算進儲存物件中。
    function 中的儲存物件叫 **Arguments Object**，function 執行完後都會消失。 
    
    > 閉包除外，閉包更像是回收的機制，雖然已經執行完畢，但是儲存的物件仍然存在且外部可以使用。   

EC 會層層堆疊 (Execution contexts stack)，最上層的是 **正在執行** 的函式，函式執行結束後就會被 pop 掉。

因為 JavaScript 是單線程(同步)，在執行時會一行行往下跑，跑完的 function 就會釋放記憶體空間。  

- 堆疊 (EC stack)
![function 包 function EC 示意圖](https://i.imgur.com/cUWijRw.gif)  

### EC 儲存的狀態物件
上面不斷提到儲存物件，到底是存在哪裡？  
又存了什麼？   

EC 會包含三種的狀態物件  
1. `Lexical Environment` (詞語環境): 在 **創造** 階段就已經宣告的變數或函式陳述式所存放的環境，看的是程式碼的物理位置。
2. `Variable Environment` (變量環境): 跟 Lexical Environment 很像，已經宣告的變數或函式陳述式在 **執行** 階段所存放的環境，這個環境跟實際在執行程式的物理位置也有關係。
3. ThisBinding : `this` 關鍵字。   

ECMAScript 新版的定義更不一樣 @@ ，這邊先已 ECMAScript 262 5.1 為主。  

可以注意到 
>The LexicalEnvironment and VariableEnvironment components of an execution context are always Lexical Environments.  
When an execution context is created its LexicalEnvironment and VariableEnvironment components initially have the same value.

在最初還沒跑程式碼的時候這兩個是一樣的， `Lexical Environment = Variable Environment`  
這邊其實我有點搞混了，既然是一樣的，那複製母體是誰 ?   
[這篇文章](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/#lexical-environment) 給了很好的解釋  

>Variable Environment 是 Lexical Environment 的複製藍圖。  
這也會解釋到 Scope Chain 的原理

### Lexical Environments
`10.2 Lexical Environments`  
>A Lexical Environment consists of an `Environment Record` and a possibly null reference to an outer Lexical Environment.     

這段可以知道完整的 Lexical Environments 其實還有一個外部參考環境。  
這個外部環境，其實跟 scope 很有關係，後面會提到為什麼有 `scope chain` 的概念，正是因為還有外部參考環境，在內部找不到的值，可以往外部尋找。  
  
根據這段可以來看 **外部參考環境** 的定義  
>The outer environment reference is used to model the logical nesting of Lexical Environment values. The outer reference of a (inner) Lexical Environment is a reference to the Lexical Environment that logically surrounds the inner Lexical Environment.

簡單來說外部參考 (reference) 是 Lexical Environment 指向的鄰近的 Lexical Environment。
對 global 來說是最外層，所以是外部參考環境是 `null`。   

再說一次 Lexical Environment 指的是程式碼物理的位置。`這邊的外部參考環境跟函式在哪裡呼叫無關，跟程式碼放在哪裡關。`

往下繼續看...
>An `Environment Record` records the identifier bindings that are created within the `scope` of its associated Lexical Environment.

從這邊可以知道 Scope 是包含 Environment Record 紀錄宣告的綁定的值，而且跟 Lexical Environments 有相關。
(恕我的破破英文翻譯)    

不過這個 `Environment Record` 是什麼咧？ 

### Environment Records 
`10.2.1 Environment Records`  
>For specification purposes Environment Record values can be thought of as existing in a simple object-oriented hierarchy where Environment Record is an abstract class with two concrete subclasses, `declarative environment record` and `object environment record`. 

在 ECMAScript 262 5.1 是叫  `Environment Record` 可以想像成一般的 object，會記錄不同類型的變數以及函式
。  
`declarative environment record` 是宣告環境紀錄來仔細看一下包含哪些東西。

### Declarative Environment Records 
`10.2.1.1 Declarative Environment Records`
>Each declarative environment record is associated with an ECMAScript program scope containing variable and/or function declarations. A declarative environment record binds the set of identifiers defined by the declarations contained within its `scope`.  

在定義的部分，scope 跟 Declarative Environment Records 紀錄的變數以及函式陳述式有關。    
我們把關係一層層剝開，發現 scope 指的是 EC 中的環境紀錄宣告變數與函式的總和範圍。

我試著描出上面說的架構  

```javascript  
.EC{
	Lexical Environments:{
		Environment Records
	}
	[[ref.outerEnv]]:{
		surroundEC.Lexical Environments:{
			Environment Records
		}
	},
	Variable Environment:{
		Environment Records
	}
}
```

不過新版已經不再是以 Lexical Environments 來說明，而是 Environment Records。(這有待專研 @@)    

## 作用域 (Scope) 
作用域 (Scope) 也就是 **變數生存的範圍**   
外部的不能取內部的值，內部可以取外部的值  
會依循作用域鏈 (Scope Chain) 一層層往上找 

Scope 有兩種
1. Global Level Scope : 全域作用域
   這邊的值在哪裡都可以存取，也是最外層的。
2. Local Level Scope : 區域作用域
   1. Function Level Scope
      `var` 的變數生存範圍就是以 function 為限，如果在 function 以外來取得在 function 宣告的 var 變數，會錯誤。
   2. Block Level Scope  
       在 ES6 中，`let` 跟 `const`
       的生存範圍是以 `{ }`為限，也就是大括號括起來的 block，脫離 block 要取得值就會失敗。  

這邊先不討論 let 跟 const。   
回到 scope chain 上，我們知道跟 `外部參考環境` 有關，上面有提到 `外部參考環境` 其實就是鄰近的 Lexical Environment。  

綜合上面的概念， 在 function 中的外部環境 Lexical Environment 又是從
Variable Environment 複製過來的，所以 function 呼叫時的 scope 其實就是來自正在上一層 EC 傳入的 Variable Environment  

在 `13 Function Definition` 這個定義中可以找到結果    
> Return the result of creating a new Function object as specified in 13.2 with parameters specified by FormalParameterListopt, and body specified by FunctionBody. `Pass in the VariableEnvironment of the running execution context as the Scope.` Pass in true as the Strict flag if the FunctionDeclaration is contained in strict code or if its FunctionBody is strict code.

講起來真的蠻抽象的，來看看例子。

### 範例一 
```javascript
function b(){
	console.log(c) //2.
}
function a(){
	var c=2
	b()
  console.log(c) //3.
}
console.log(c) //1.
var c=3
a()
```
答案是多少呢？

答案是 
1. `undefined`
2. 3
3. 2

```javascript
b.EC{
	Lexical Environments:{
		Environment Records:{}
	}
	[[ref.outerEnv]]: {
		global.EC.Variable Environment
	},
	Variable Environment:{
		Environment Records:{}
	}
}
a.EC{
	Lexical Environments:{
		Environment Records:
		{
			c: undefined
		}
	}
	[[ref.outerEnv]]: {
		global.EC.Variable Environment
	},
	Variable Environment:{
		Environment Records:
		{
			c : 2
		}
	}
}
global.EC{
	Lexical Environments:{
		Environment Records:
		{
			b : func()
			a : func()
			c : undefined
		}
	}
	[[ref.outerEnv]]: {null},
	Variable Environment:{
		Environment Records:
		{
			c : 3 
		}
	}
}
```
第一個 console 是 `undefined`，因為 global EC 建立時，環境 (Lexical Environments) 將變數、函式陳述式的宣告先存放起來，會長這樣   
1. b : func()
2. a : func()
3. c : undefined  

Variable Environment 跟 Lexical Environments 還沒執行時是一樣的，執行後 Variable Environment 就會有變化。
```javascript
global.EC{
	Lexical Environments:{
		Environment Records:
		{
			b : func()
			a : func()
			c : undefined
		}
	}
	[[ref.outerEnv]]: {null},
	Variable Environment:{
		Environment Records:
		{
			b : func()
			a : func()
			c : 3
		}
	}
}
```
當 `var c =3`，Variable Environment 中的 c 才會賦值 3。  

可以看到 b 即使在 a 函式中被呼叫，b 的外部參考環境其實是 global，因為這跟 Lexical Environment 有關。

### 範例二  
```javascript
function a(){
	var c=2
	b()
	function b(){
		console.log(c) //2.
		c = 3
	}
	console.log(c) //3.
}
a()
console.log(c) //1.
```
答案是   
1. `c is not defined`
2. 2
3. 3

a 的外部參考環境 是 global。  
b 的外部參考環境是 a + global，因此 c 是 a 函式中的變數，而`c=3`，沒有重新宣告下，b 函式找不到 c，所以是找 a 函式中的 c，並改變成 `c=3`。

如果把 b 函式中的 c =3 ，改為 `var c=3`，答案會變為  
1. `c is not defined`
2. `undefined`
3. 2  

## 小結
1. Exection Context : 執行上下文，會形成 Exection Context Stack，最下層是 global，呼叫到 function 就會再往上疊加 EC
2. Lexical Environment : **創造** 階段儲存的環境
3. Variable Environment : **執行** 階段儲存的環境
4. Environment Records : 像是一個物件，儲存宣告的變數、函式陳述式，以及函式中的參數。
5. Scope : 作用域，變數生存的範圍。
6. Scope Chain : 作用域鏈，由 EC 的 Lexical Environment，以及其外部的 Lexical Environment 組成，其外部的 Lexical Environment 就是上一層 EC 的 Variable Environment 複製過來的。


## 超級比一比
了解 Scope 後，就要來了解如果有相同名稱的三個變數，Javascript 會如何來判斷順序，像是 function a、變數 a、參數 a ，三個都同名，那誰會被蓋掉誰呢 ?  
重複的宣告又會怎麼處理呢 ?  
可以根據 [10.5 Declaration Binding Instantiation](https://262.ecma-international.org/5.1/#sec-10.5) 規則來看

> 10.5.4 在呼叫的 function 裡面  
1. 如果有同名的 function、參數、變數，function 會先被儲存
2. 如果內部有同名的參數與變數
   1. 引數的數量 > 1，內部變數初始值會變成 undefined，變數如果有重新賦值，可能會是第 n 個參數的值
   2. 如果有傳入引數，那麼傳入的引數就是函式的參數初始值
   3. 如果沒有傳入引數，但有參數，參數的初始值是 undefined，再依照內部執行程式碼賦值

> 10.5.5 函式陳述式    

a~d : 如果有函式被重複宣告，以後面新宣告的函式為主

e : 在 global 會是全域的物件  
   宣告變數跟宣告的函式名同名，如果變數宣告了但沒賦值，同名的就會是先儲存 function 物件

我寫大概的意思而已，文件上定義的很明確。  

>10.5.8 宣告或未宣告的變數
1. 已宣告的變數，後面重複宣告都已第一個為宣告主 (dn -> d)
2. 已宣告且賦值的話，重複宣告又賦值以後面的值為主 (值 = dn)
3. 未宣告變數  
   1. 往上找 Scope Chain 有宣告的變數，新賦值為主
   2. 如果往上找 Scope Chain 沒有宣告的變數，就會直接報錯

這邊只列出幾個，原諒我破破的英文翻譯，大概是這樣   
10.5 列出各種會碰到的情況，只是這邊有很多代名詞，要再往回看一下定義。

## 狀況劇
雖然上面大約了解內部執行與儲存的狀況，試著來驗證常見的狀況是不是這樣

### 重複宣告變數
先來個簡單的重複宣告的問題，有變數以及函式
```javascript
var a =1
var a
var a 
console.log(a)
```
結果應該要等於 1，不會是 undefined  
根據 ECMA 寫的宣告有賦值的話，以 d 為主
執行一下是 `a=1`

### 重複宣告函式
```javascript
function a(){
	console.log('hi!')
}
function a(){
	console.log('hey!')
}
a()
```
結果應該要等於 hey!，不會是 hi!  
函式重複宣告是以 fn 為主  
執行一下是 `hey!`  

跟著引擎發動沒錯吧 :D  
再來 !

### global 同名變數 v.s function 
```javascript
var a =10
function a(){
	console.log(123)
}
a()
console.log(a)
```
可以拆做兩個步驟，第一個是創造之前，因為 var a 一開始是 undefined，但是 a 會被優先儲存成 function 物件
直到執行階段，`a =10`，a 這個物件被賦值為數字 10，a 已經不是 function 物件，被呼叫時會報錯

但是如果是這個情況
```javascript
function a(){
	console.log(123)
}
var a
console.log(a) // 這個結果
a()
``` 
根據上面的步驟跟規則，結果會是 `[function a]`，印出 function 本身

### function 內同名 function v.s 參數
```javascript
function test(a){
  function a(){
    console.log(123)
  }
  console.log(a)
}
test(456)
```
根據規則， function 內部如果同名，宣告的 function 會先優先，所以結果是 `[function a]`，印出 function 本身

### function 內同名 變數 v.s 參數
```javascript
function test(a){
  var a
  a+=2
  console.log(a)
}
test(456)
```
正當你以為 `a = undefined 或是 NaN`，不，結果是 458 ，根據規則，參數有傳入引數就是該值，而且變數 a 已存在，所以 `var a` 並不會覆蓋，由此可知參數的順序比變數來的優先。  

如果沒有傳入參數呢 ?  
```javascript
function test(a){
  	console.log(a)
  	a+=2
	var a
  	console.log(a)
}
test()
```
第一個是 undefined，來自參數 a 已宣告但是為賦值   
第二個 a 是 `NaN`，是因為 undefined +2 ，本來就不是數字

> 由此可知 function 內的提升順序，**function > 參數 > 變數**
> Global 的提升順序，**function > 變數**

## 總結
如果有誤歡迎告訴我，有時候寫到有點茫了...  
整理的過程中也讓我更清楚知道，變數、參數、函式為什麼會宣告提升，以及怎麼被提升，基本上遇到該類型的題目保持一樣的邏輯跟引擎一起動就好 :D  

這篇尚未提及 ES6 的 let 跟 const 宣告提升問題，下一篇會做討論

---

參考 :
1. [ECMAScript 262.5.1](https://262.ecma-international.org/5.1/#sec-10.3)    
2. [JavaScript 全攻略：克服 JS 的奇怪部分](https://www.udemy.com/course/javascriptjs/)
3. [dmitrysoshnikov ES5 關於 EC 的結構細節](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/#structure-of-execution-context)  