---
title: 筆記 | JavaScript - first class function (一級函式)
tags:
  - JavaScript
categories:
  - JavaScript
author: Rosa Hong
date: 2022-03-26 13:34:14
description:
---

## 前言
JavaScript 中的 function 是很神奇的東西  
在初學時看到很多名詞  
像 callback function(回呼函式)、First-Class Function(一級函式)、High-Order Function(高階函式)    
還有 Closure(閉包) 等等的，總是會霧撒撒...  
本篇來初步認識 function 中的 First-Class Function 概念   

<!-- more -->

## 一級函式
> 函式可以被視為其他變數一樣，像是 function 可以指定成變數，也可以做為參數傳入別的 funciton。  

JavaScript 的 function 符合 first class function    
- 函式只是物件的一種  
-  function 可以儲存成變數 (function expression)  
	```javascript
	const greet =function (){
		console.log('hi')
	}
	```
- function 可以當作參數傳入別的 function 中，這邊把 function 當作 **值** 來使用。    
	(這樣的方式會稱這個 function 是 callback function)  
	```javascript
	function hello(){
		return 'hello,'
	}
	function greet(message,name){
		console.log(message()+name)
	}
	greet(hello,'rosa!')
	```
- function 裡面又回傳另一個 function。
  	只要接收函式作為參數，或是回傳函式作為輸出的函式
	就稱作高階函式 ( **Higher-Order Function** )    
	像是 Array 中的 `map` function
	```javascript 
	[1,2,3].map((num)=> num * 2 )
	// 實作
	function arrayMap(fn,array){
		let length = array.length
		let newArray = [] 
		for(let i=0 ; i<length ; i++){
			newArray.push(fn(array[i]))
		}
		return newArray
	}
	arrayMap((item)=>{
		return item * 2 	
	},[1,2,3,4])
	```
- function 跟物件一樣有屬性 (property)  
  下面進行說明


## 函式也是物件的一種 ?
範例 : 
```javascript
function hello(){
	console.log('invoke this')
}
hello() // 直接執行
hello.people='rosa'
console.log(hello.people) // output : rosa
```
1. 執行 (invoke) 函式，是透過 `()`
2. 可以直接用 `.` 建立物件中的 key-value  

證明 function 是一種特殊的物件，也可以當作物件來使用。 

## 補充 : 函式回傳一個另一個函式
調用函式與回傳的函式有幾種做法  
1. 存成變數
```javascript
function sayhi(){
	return function(){
		console.log('hello, Rosa!')
	} 
}
const myFunc = sayhi() // myFunc 接收的是一個 function
myFunc() // 呼叫
```
2. 雙括號直接呼叫
```javascript
function sayhi(){
	return function(){
		console.log('hello, Rosa!')
	} 
}
sayhi()()
```
3. IIFE (Immediately Invoked Function Expression): 定義完就回傳的 function
```javascript
function sayhi(){
	return (function(){
		console.log('hello, Rosa!')
	})() 
}
sayhi()
```

IIFE 的例子很常在 JQuery 看見  
```javascript 
(function($) {
    //$ = jQuery
})(jQuery)
```

## 參考
1. [[筆記] JavaScript 中函式就是一種物件 ─ 談談 first class function（一等公民函式） ~ PJCHENder 那些沒告訴你的小細節](https://pjchender.blogspot.com/2016/03/javascriptfunctionobjects.html)
2. [一級函式（First-class Function） - 術語表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-TW/docs/Glossary/First-class_Function)
3. [JS 原力覺醒 Day19 - 一級函式與高階函式](https://ithelp.ithome.com.tw/articles/10224519)