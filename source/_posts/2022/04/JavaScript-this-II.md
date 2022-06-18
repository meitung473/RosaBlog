---
title: 筆記 | JavaScript - this (II) call、appaly、bind
tags:
  - JavaScript
categories:
    - JavaScript
author: Rosa Hong
date: 2022-04-15 11:07:53
description:
---

## 前言  
除了透過執行環境與上下文來綁定之外  
this 是可以改變的  
改變 this 有三種方式  
<!-- more -->

## call & apply
上一篇有簡略提過 `.call()`  
等同於 function 直接執行  
而且是有帶 `this`  
第一個參數是指定 `this`，後面及是 `arguments`

```javascript
// 這樣是一樣的
test() === test.call()
test() === test.apply()
```
這兩個執行是差不多的   
差在後面的參數類型
```javascript
const test ={
	a : 1,
	log(num){
		console.log(this.a,num)
	}
}
const obj ={
	a: 5
}
test.log(5) // 1 , 5
// 改變 this 
test.log.apply(obj,[5]) // 5 , 5
test.log.call(obj,5) // 5 , 5
```
- `call` : 後面都用逗號隔開
	 `.call(thisValue,args[0],args[1])` 
- `apply` : 前面為 this，後面參數為類陣列。
	`.apply(thisValue,[args[0],args[1]])`

### call 跟 apply 為什麼同時存在 ? 
例子是來自 [覺得 JavaScript function 很有趣的我是不是很奇怪](https://blog.huli.tw/2020/04/18/javascript-function-is-awesome/)   
這篇也探討很有趣的 JS 問題  

- Math.max 的參數可以吃隨意數值

```javascript
console.log(Math.max(1,2,3,4,5,6)) // 6
```
如果我們要從陣列中找出最大值呢 ?   
直接呼叫會導致錯誤   
可以運用 apply 的參數是 **陣列** 的方式帶入   
或者用 ES6 展開  

```javascript
let arr = [1,2,3,4,5,6]
console.log(Math.max.apply(null,arr)) // 6
console.log(Math.max(...arr)) // 6 , 展開 
```

總是會有不同的情境可以使用

## bind
把 this 的值先綁死，不管後面怎麼 call
都不會變動。
> bind 回傳的是一個 **function**

```javascript
var o = {
	a:10
}
var obj = {
	a:1,
	test: function(){
		console.log(this.a)
	}
}
var b = obj.test.bind(o) // function
b() // 10
b.call(obj) // 依舊是 10
```

非嚴格模式底下，無論是用 call、apply 還是 bind   
傳進去的如果是 primitive 都會被轉成 **object**  

```javascript
function hello() {
  console.log(this)
}
  
hello.call(123) // [Number: 123]
const myHello = hello.bind('my')
myHello() // [String: 'my']
```

## 箭頭函式 v.s bind
初學時會認為 arrow funciton 有指向自己，綁定的意味    
但兩者有很大的區別    
- `.bind(this)` : 呼叫之前就先綁定，讓被呼叫的都有固定的 `this`。  
- arrow function this : 箭頭函式沒有建立任何的 this，簡單來說是根本沒有自己的 this。  
  在箭頭函式使用 this，會像變數一樣，往外部尋找。   

## 參考
1. [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂 - Huli](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)
2. [覺得 JavaScript function 很有趣的我是不是很奇怪](https://blog.huli.tw/2020/04/18/javascript-function-is-awesome/)
3. [深入理解箭头函数](https://zh.javascript.info/arrow-functions)  