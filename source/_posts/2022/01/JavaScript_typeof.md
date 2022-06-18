---
title: 筆記 | JavaScript - 資料型態 (II) typeof
tags:
  - JavaScript
categories:
  - JavaScript
description: 用來判斷型態的 typeof
author: Rosa Hong
date: 2022-01-12 20:19:58
---

## 前言
typeof 是檢查類別的好幫手  
一學才知道 typeof 只是小小咖  
甚至在 stackoverflow 上有這麼一道題目  

[Can (a== 1 && a ==2 && a==3) ever evaluate to true?](https://stackoverflow.com/questions/48270127/can-a-1-a-2-a-3-ever-evaluate-to-true)  

這怎麼可能，`1==2==3` !?   
先了解資料型態，再來了解這怎麼實現! 

## typeof
typeof 可以知道值的型態

在 `Object`、`Array`、`Date` 以及  **`null`**
都是 `Object`   
`null` 是唯一的特例，下面會再提到  

![typeof各類型](https://dsm01pap006files.storage.live.com/y4mGp4At_MjbSIvnrU9AEgFCzvUmROBsIV5v1tGQaDaJY9tAVO1bZcprgUpUOG9btna_AAvZABPjZsB6FFu0hfNETi8bKXOole-CacnFbpoEsUE68p4L8pBfY_r0ptOJloSxkvkTjf6OAJsQ-O7HsfCfLUyxel4VPf35BpS5ZgsEhmrvZo3-fw9IwrOHeoFaey9?width=625&height=390&cropmode=none)

- 如何真的判斷是 **真** 陣列 ?  
  Array 會被算在 Object 範疇裡  
  想要知道真的陣列物件可以使用  
  **`Array.isArray(value)`**  

或者更精確的判別類型  
`Object.prototype.toString.call(value)`  
prototype 是 JavaScript 很重要的屬性  
是實作的一種基底  
`toString` 會把印出物件的屬性轉為字串

### null 眾人皆知的漏洞
- **null** 為什麼是 object ?   
	是 javascript 程式設計上的錯誤  
	底層實作的 `type tag` object 是 00  
	但是 `null` 也是指向 0   
	所以 `null` 也會被判別為 object  
	是廣為人知的 bug  

ECMAScript 原本要改規則  
`typeof null===null`  
但是被拒絕掉了 OAO  

### 更確切一點的型態   
`Object.prototype.toString.call(value)`    
不管是哪種型態，都可以更正確的被判斷    
![toString各類型](https://dsm01pap006files.storage.live.com/y4mmkfwiKEgP7WgOuN5z81LDBLH4oukWL2ubilP96ARJyClsALcHwh_PvT7MPCtpr0_7dJdQqrI828TQkxB_PfjkIpYpPT3vtTXQ1wUyiGkYK0-cc3NO7nMuB8BTVjtV-kVkboovg7L3y0yIwoTaC95RrR_Bx9LgK-8N1bcq-fciqoSNozQVeSaJ7z3xgt67CIC?width=772&height=395&cropmode=none)

### 避免出錯的 undefined
JavaScript 是單線程(非同步)的語言    
也就是程式會一行行往下執行    
但如果要印出沒有定義的變數  
必定會錯誤
```javascript
console.log(a)
---
result : error 
```

但如果 typeof 某個定義的變數
會是 undefined
```javascript
console.log(typeof a)
---
result : undefined
```

離奇的是用 var 也是 `undefined`
```javascript
console.log(a)
var a
---
result : undefined
```
因為 var 會做宣告提升
- 宣告提升
	```javascript
	//var a;
	console.log(a)
	var a = 10
	---
	result: undefined
	```
	系統會幫你補上未定義的變數  
	但還是不會賦值

---

避免變數沒有定義的情況下出現錯誤    
可以用 `typeof` 檢測  

> 記住 typeof 回傳的值類別是 **字串**  
> 所以後面要是對比字串

```javascript
if(typeof a !=='undefined'){
	console.log(a)
	//dosomething...
}
``` 
錯誤寫法    
會報錯，因為 a 沒有宣告  

```javascript
	if(a !== undefined){
		console.log(a)
		//dosomething...
	}
```  

---

## 總結
1. `typeof` 回傳的類型是字串
2. `typeof null` 會回傳值會是 `object`  
3. `Object.prototype.toString.call()` 可以取得較正確的資料型態，包含 `null` 也會傳 `null`  

原來如此，typeof 並不是萬能的  
在查找 `Object.prototype.toString` 過程中  
也認識到不同類型進行比較時  
會轉型同類別再比較  
Object type 的轉型會經過兩種規則  
1. valueOf
2. toString

之後要再深入研究這兩種的差別  
以及各類別的比較規則!  
