---
title: ⟬ 筆記 ⟭ JavaScript - 箭頭函式
tags:
  - JavaScript
categories:
  - [Frontend,JavaScript]
author: Rosa Hong
---
## 前言


## function 箭頭函式 ()=>
箭頭函式可以把內容變得更易讀  
函式有好幾種寫法  
> 普通函式跟箭頭函式區別還有 **`this`**  
> 之後在補充  
 
### 函式
 1. 純功能
```javascript
function test(n){
	return n
}
```
2. 變數型態的函式
```javascript
let testFunction = function test(n){
	return n
}
```

#### 哪些型態不能省略
( 待補充 )

### 範例一
第二種型態的函式可以一步步簡化
1.  簡化 `function`
```javascript
let testFunction = (n)=>{
	return n
}
```
2. 簡化後面的 `{ }` block
	- 第二個的 `(n)` 是指回傳的東西
```javascript
let testFunction = (n)=>(n)
console.log(testFunction(1))
// 答案是 1
```
3. 更加簡化，如果傳入參數只有 **1** 個
	前面的 **\( \)** 括號也可以省略
```javascript
let testFunction = n =>(n)
console.log(testFunction(1))
// 答案是 1
```
這個例子有點廢，只是輸入 n 會回傳 n 
拿之前的範例當練習  
### 範例二
1. 在陣列中求比 n 小的數
- 原本我的寫法
```javascript
	function findAllSmall(arr,n){
		var numberArray=[]
		arr.filter(function(item){
			if(item<n){
	 			numberArray.push(item)
			}
		})
		return numberArray;
	}
```
- 換成 ES6
```javascript
	let smaller = (arr,n) => {
	 var numberArray=[]
	 arr
	 	.filter( item => {
	 		if(item<n){
	 			numberArray.push(item)
	 		}
		})
	 return numberArray;
	}
```
2. 印出大於 1 且乘以 3 倍
- 一般寫法
```javascript
let triple = function(n){
 return(n
	 .filter(function(item){
		 return item>1
	 })
	 .map(function(item){
		 return item*3
	 })
 )
}
console.log(triple([1,2,3]));
// [6,9]
```
- ES6 簡寫
```javascript
let triple = n =>(
	 	n
		 .filter(item =>(item>1))
		 .map(item =>(item*3))
	 )
console.log(triple([1,2,3]));
// [6,9]
```