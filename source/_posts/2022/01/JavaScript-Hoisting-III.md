---
title: ⟬ 筆記 ⟭ JavaScript - 宣告提升(III) - let & const 以及 TDZ
tags:
  - hoisting
  - JavaScript
categories:
  - Frontend
  - JavaScript
description: 了解let & const 的宣告提升以及 TDZ 的意思
author: Rosa Hong
date: 2022-01-15 16:31:51
---
## let & const 有宣告提升嗎?
- 看起來沒有 hoisting
```javascript
console.log(a)
let a = 10
---
result : Cannot access 'a' before initialization
```
意思是 a 還未經初始化。
照 `var` 的宣告提升  
下意識會覺得是 `undefined` 才對  
但怎麼也不是 `undefined` ?  

- 實際上是有提升
```javascript
var a = 10
function test(){
	console.log(a)
	let a =5
}
test()
---
result : Cannot access 'a' before initialization
```
照理來說在 `test` 沒找到 a  
會往 global (Scope Chain) 去找  
應該是 `10`  
但是這邊卻是沒有結果   
代表 `let` 確實是有提升而且卡住了  

換成 const 也一樣  

## TDZ - 暫時性死區
TDZ = Temporal Dead Zone

在 **「提升之後」** 以及 **「賦值之前」** 這段「期間」，如果你存取它就會拋出錯誤，而這段期間就稱做是 `TDZ`

> 所以使用 let 或是 const 一開始就要賦值好，以免拋出錯誤  

TDZ 的開始時間  
進到 function 的那一刻即是 TDZ  
的開始，直到賦值，才是 TDZ 結束。  

---

實例解釋  
- TDZ 的起訖點  
```javascript  
function test(){
	var a = 10 //TDZ 🚩
	var b = 5
	if(a>5){
		console.log(c)
	}
	let c = 1  // TDZ🪦
	console.log(c)
}
test()
```

- 順序上的問題 : 非空間而是時間的順序  
```javascript
fucntion test(){
	hello()  // TDZ 🚩
	let a = 5 // TDZ 🪦
	function hello(){
		console.log(a)
	}
}
test()
---
result : Cannot access 'a' before initialization
```

在執行 hello 的時候雖然有提升，但是仍在 a 的 `TDZ` 裡。

雖然印出值在宣告的下面  
以執行(時間)的順序仍在 TDZ 之內。  


## 總結
let 和 const 提升後並不會初始化成 `undefined`，必須直到賦值之後才跳脫 TDZ 的範圍，在那之前試圖取值都會跳出錯誤。  


