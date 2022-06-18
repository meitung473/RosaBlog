---
title: 筆記 | JavaScript - Closure 閉包(II) 常見陷阱題
tags:
  - JavaScript
categories:
    - JavaScript
author: Rosa Hong
date: 2022-04-13 21:51:51
description:
---

## 前言
之前學習閉包沒辦法很容易連結到  
尤其 Function 有一堆名詞變異體  
總會好奇實際的應用情境   

那發生什麼問題才會使用到 Closure 呢?   
又怎麼在真正的專案解決問題 ?   

<!-- more -->
## 問題 : 在迴圈中呼叫函式
```javascript
var arr = []; 
for (var i = 0; i < 5; i++) { 
  arr[i] = function() {
	  console.log(i); 
	}
} 
arr[0]();
arr[1]();
```
複習一下 :
> `var` 的切分單位是 `function`  
 
直覺來說會覺得 `i` 是會按順序列出  
結果是 `5 5`  
因為 for 設立的 `i` 會存在 global 中  

**試著把運作拆開來** 
```javascript
arr[0] = function (){
	console.log(i)
}
arr[1] = function (){
	console.log(i)
}
arr[2] = function (){
	console.log(i)
}
...
```

當迴圈跑完時， `i` 是 5，`var i  = 5`  
因為 5 不符合迴圈條件跳出  
所以不管 `arr[?]()`，直接印出 `i` 是 5    

### 解決方法
#### 閉包
把 function 獨立出來  
```javascript
var arr = [];
for (var i = 0; i < 5; i++) {
 arr[i] = logN(i)
}
//閉包，記住當下的 i
function logN(num){
 return function(){
  console.log(num)
 }
}
arr[0]() //0
arr[1]() //1
```

#### IIFE
IIFE(Immediately Invoked Function Expression) 定義完就回傳的 function
```javascript
var arr = [];
for (var i = 0; i < 5; i++) {
  //拿到當下的 i
  arr[i] = (function (num){
	 return function(){
	 console.log(num)
	 }
	})(i);
}
arr[0]() //0
arr[1]() //1
```
把原本有名的函式改為匿名函式，用`()`包裹 function，尾巴是帶入參數`(參數)`，沒有的話為空

#### ES6 的 let
上面出現的原因都是 `var` 的 scope 問題  
ES6 的 let 將作用域限制在 block `{}`  

```javascript
var arr = []; 
for (let i = 0; i < 5; i++) { arr[i] = function() {
	console.log(i); 
	}
} 
arr[0](); // 0
arr[1](); // 1
```
> 只要 `var -> let` ， 就解決問題了，離開之後就不會保留。

## Closure 應用
### Cache 暫存
計算量大的時候避免重新計算，預先把已算好的值存起來  
```javascript
function complex(num){
  // 複雜計算
  console.log('calculate')
  return num*num*num
}
function cache(func){
  // 查看是不是有算過
  var ans ={}
  return function(num){
    //有的話回傳索引裡的值
    if(ans[num]){
      return ans[num]
    }
    // 沒有的話才做重新計算
    ans[num] = func(num)
    return ans[num]
  }
}
const cacheComplex = cahe(complex)
console.log(cacheComplex(20)) // 第一次計算
console.log(cacheComplex(20)) // 從 cache 拿到的值
console.log(cacheComplex(20)) // 從 cache 拿到的值
```
用 `console.time` 計時執行的時間  
比起直接用 complex 算再重新算  
會發現第二次的計算的時間明顯縮短很多  

### 隱匿資訊
想隱匿一些資訊，讓別人不可以直接更改。
把方法以及變數封裝在內部，別人要調用只能呼叫你規定好的方法。  

- 以簡易計算機為例
```javascript
function calculate(initNum){
 var sum = initNum
 return {
	 add:function(num){
	    return sum +=num
		},
	 minus:function(num){
	    return sum -=num
		},
	 mutiply:function(num){
		    return sum *=num
		},
	 divided:function(num){
		    return sum/=num
		},
	 getresult: function(){
		    return sum
		}
 	}
}
let counter1 = calculate(0)
let counter2 = calculate(10)
counter1.add(5)
counter2.mutiply(20)
console.log(counter1.getresult()) // 5
console.log(counter2.getresult()) // 200
```
一個簡單的計算機 (?)🤔  
counter1 跟 counter2 並不會影響到彼此  
我們只能透過現有的方法來修改 sum 的值  

## 總結  
閉包讓我感覺是很神奇的東西  
看起來不熟悉，但實際上我們都用到了🤔     


## 參考
- [ [JS201] 進階 JavaScript：那些你一直搞不懂的地方 ](https://lidemy.com/courses/enrolled/390599)