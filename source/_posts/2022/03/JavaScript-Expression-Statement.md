---
title: 筆記 | JavaScript - 表達式 & 陳述式
tags:
	- JavaScript
categories:
	- JavaScript
description: 認識 JavaScript 中的表達式 & 陳述式
author: Rosa Hong
date: 2022-03-25 11:24:20
---

## 表達式 (Expressions)
執行完程式能直接 **有回傳值**，通常會存成變數，但不一定要存成變數  

- 這都是表達式
```javascript
2 + 3
a = 3
const b = 5
const c ={
	"hi" : 'hello'
}
```

## 陳述式 (Statements | Declaration) 
沒有回傳值，也不能當作變數的值  

```javascript
if(a===3){
	//... dosomething
}
```
- `a===3` : 是表達式
- `if(...)` : 陳述式，並沒有回傳值

所以不會寫成這樣
```javascript
const b = if(a===3){
	//... dosomething
}
```

## Function Expressions & Function Statements

JavaScript 中 Function 是物件的一種    
由這個例子可知，Function 在 Object 的原型鍊上
```javascript
function a(){
	console.log('hello')
}
// a 是不是 Object 的實作
console.log(a instanceof Object) // true
```
不過如果去查型態 (typeof) function 會是 function 
```javascript
console.log(typeof a) // 'function'
```

### Function Statements (declaration)
```javascript
mutiply(3,5)
function mutiply(a,b){
	return a*b
}
```
不會直接回傳任何的值。  
該函式就會透過 hoisting 先被儲存在記憶體中，在程式碼出現之前去呼叫，就不會發出錯誤。
```javascript

a() // 執行函式
console.log(a) // 印出函式的內容

function a(){
	console.log('hello')
}
```

### Function Expressions
```javascript
cross(3,5) 
const cross = function(a,b){
	return a*b
}
```
提前呼叫的話會報錯
> Uncaught ReferenceError: Cannot access 'cross' before initialization

在 let、const 定義了但沒賦值之前是不能叫它的。  
如果是 var 宣告則會是 `Uncaught TypeError: cross is not a function`

以 cross 來說，我們先建立了函式，但是沒有命名，這樣的函式叫 **匿名函式（anonymous function 或 function literal）**。  

1. 為什麼可以不命名 ?   
	在 function expression 之前已經指定給 cross，這個變數名就用來指稱函式
2. 可以命名嗎 ?  
	```javascript
	const greet = function hi(){
		console.log('hello')
	}
	greet() // hello
	hi() // hi is not defined
	``` 
	可以，而且依然可以運行。  
	在 Huli 大[這篇文章](https://blog.huli.tw/2020/04/18/javascript-function-is-awesome/)有提到，在 function expression 中函式給予名稱有些有趣的問題
	- 所以叫 greet 還是叫 hi ?  
		是 hi，在外部呼叫必須用變數名，使用 function 名稱是 `is not defined`
	- 匿名的部份命名有什麼用處 ?
		1.  想呼叫自己的時候可以使用
		2. stacktrace 會出現這個名字

- stacktrace 匿名函式的名稱會出現
```javascript
const a = function foo() {
  function bar() {
    console.trace();
  }
  bar();
}
a();
```
![stacktrace](https://dsm01pap006files.storage.live.com/y4mBgzq2siu2WVu3eDN1OJz6Q8rPxMAKMf84yK2Z4Nw0PN6M8qYYBgOftVQ6BlFQwNEshSk-LjimjWZhNGvTzxLNNibhzJd03yNiG0zmDOJxVi2jjpGG1lqkTvEbr3v8a9GwI0IfOmnF3CwKa__lZB8T2uoXbF8PEQDU6-rLnuAFvLRk1ZIp8_QOjTJEX6AJ6AM?width=370&height=232&cropmode=none)


## 函式中的函式
在函式中放入 function expression 而且是 anonymous function
```javascript
function log(fn) {
	console.log(fn)
}
log(function(){
	console.log('hi')
})
//--- 等同
const anonymousfunction = function(){
	console.log('hi')
}
log(anonymousfunction)
```
會印出 funtion 的結構
```
function(){
	console.log('hi')
}
```

要執行在 log 裡面的 fn 加入 `()` 就可以了
```javascript
function log(fn){
	fn()
}
```
### Callback function 
如果要確保程式執行的順序，會使用到 callback function，做法就是把函式傳入另一個函式裡面去呼叫   

```javascript
const hello = function(callback){
  console.log('hello')
	callback()
}
const bye = function(){
	console.log('bye')
}
function hi(callback){
	console.log('start')
	callback(bye)
}

hi(hello)
```
依序印出 `'start'、'hello'、'bye'`

## 參考
1. [[筆記] 進一步談JavaScript中函式的建立─function statements and function expressions](https://pjchender.blogspot.com/2016/03/javascriptfunction-statements-and.html)
2. [覺得 JavaScript function 很有趣的我是不是很奇怪 - Huli](https://blog.huli.tw/2020/04/18/javascript-function-is-awesome/)