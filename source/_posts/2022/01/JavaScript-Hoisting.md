---
title: 筆記 | JavaScript - 宣告提升(I) - 我以為的以為
tags:
  - JavaScript
categories:
  - '2022'
  - '01'
description: 從簡單例子看何謂宣告提升
author: Rosa Hong
date: 2022-01-13 21:43:50
---


## 前言
宣告提升 (Hoisting) 在 JavaScript 中不得不知     
究竟 JavaScript 搞了什麼鬼  
導致你認為的值不是那個值捏 !  
其實這跟 JavaScript 如何運作也有關係   
不過先從最簡單的概念開始吧 ! :O

## 何謂宣告提升？
其實我覺得很抽象  
如果單看程式碼會不知道哪裡被提升  
以及怎麼被提升？  

所謂的提升  
其實是 JavaScript 底層運作的機制  
必須了解執行環境 (Execution contexts) 跟 作用域 (Scope)   
再根據作用域鏈 (Scope Chain) 來看的   
不過關於這些東西慢慢地來說     
可以先透過幾個例子來了解宣告提升    

### 變數的宣告提升
這邊暫不討論 ES6 中的 `let` 與 `const`  
以 ES5 的宣告變數 `var` 為例

基礎題
```javascript
console.log(a)
var a = 10
---
result : undefined
```
可以看成 : 
```javascript
var a 
console.log(a)
a = 10
```
JavaScript 幫我們在最上層補上了一個定義變數 a  
又因為 JavaScript 是一行行往下讀  
所以當執行到 console.log(a)  
a 是定義了但沒有值  
所以是 `undefined`  

那有宣告跟沒宣告的差別？  

這樣什麼都沒有就會出錯
```javascript
console.log(a)
---
result : a is not defined
```
所以通常變數的宣告會在最上面  
除了版面不會太凌亂以外  
也是避免說忘記宣告  
尤其是在 function 裡頭  

### 常見問題 
function 裡的變數如果未宣告會如何？  
可以看下面的例子  

```javascript
test()
console.log(a)
function test(){
	a = 30
}
---
result : 30
```
起初我以為 a 會是 `is not defined`  
或是 `undefined`   
但是 test 執行時先把變數 a 給提升  
並在函式內把 a 賦值 30  
也就是這個 a 提升已經到 global 了   

> 在 function 裡都沒有宣告  
> 但有賦值，就會在 global 的地方宣告該變數    
> 並且 `根據 Scope Chain` 往上找  
> 不過一般來說不會建議沒有宣告就賦值。
	
### `function` 的宣告提升
除了變數的提升  
其實還有 function 也會提升  
 
函式陳述式
```javascript
test()
function test(){		
    console.log(123)
}
---
result : 123
```
一般來說要 **使用之前要先宣告**  
但 function 可以先使用再宣告  
因為會宣告提升    

可以看成把 `function` 放到呼叫之前    
其他程式語言是沒這樣的  
在 JavaScript 想呼叫隨時都可以呼叫 👌  
我是覺得很奇妙  
但一方面覺得這樣的設計在版面上可以更易讀   

函式表達式  
```javascript
var test = function(){
	console.log(123)
}
test()
---
result : 123
```
透過表達式宣告一個變數將 function 存起來  
這邊的 function 是一個沒有名字的匿名函式   
一般來說會這樣執行  

如果是宣告變數把函式存起來  
提早先呼叫函式
```javascript
test()
var test = function(){
	console.log(123)
}
---
result : test is not a function
```
咦！不是 function 隨 call 隨用嗎？  
如果是函式表達式可以把整個分為兩塊  
```javascript 
var test;
test()
test = function(){
    console.log(123)
}
```
也就是先宣告 test 再賦值  
由此可知宣告提升並不會連賦值都一起提升  

再來看看有參數的函式呢？
```javascript 
function test(a){
    console.log(a)
    var a = 1
}
test(2)
```
我知道！是 `undefined`  
因為 a 會做宣告提升   
可以看成這樣 

```javascript 
function test(a){
    var a; //undefined
    console.log(a)
    a = 1
}
test(1)
```
結果不對，其實是 `1`  
這個 1 並不是來自函式的 `a=1`  
而是參數的 `1`
由此可以知道函式裡有參數的話    
其實參數也會做宣告提升    

至於提升的順序為何？  
如何提升？  
後面會再提到 :D
   
## 小結
1. `var` 會做宣告提升  
2. `函式陳述式` 會做宣告提升  
3. `函式表達式` 是屬於賦值 (等號右邊)，不會做宣告提升  
4. 函式的 `參數` 也會做宣告提升

這篇了解哪些會做宣告提升  
並且知道賦值的值並不會一起提升  
  

---
參考:
- [我知道你懂 hoisting，可是你了解到多深？](https://blog.techbridge.cc/2018/11/10/javascript-hoisting)
 
  


