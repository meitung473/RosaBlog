---
title: 筆記 | JavaScript - Closure 閉包(I) 基礎概念
tags:
  - JavaScript
categories:
  - '2022'
  - '04'
author: Rosa Hong
date: 2022-04-13 21:51:39
description:
---

## 前言
Closure 是 JavaScript 很重要的基礎  
藉由本篇幫助自己釐清 Closure 的概念  

<!-- more -->

## 先認識 Scope Chain
[Scope](https://blog.rosa.tw/Frontend/JavaScript/JavaScript-Hoisting-II/?highlight=scope#%E4%BD%9C%E7%94%A8%E5%9F%9F-Scope) 是變數生存的範圍，如果在自己層級找不到就會一層一層往外找，直到 Global 為止。  

這種行為就稱為「**範圍鏈**」(Scope Chain)。

> 範圍鏈是在函式**被定義的當下決定** (lexical scope 來決定)的，不是在被呼叫的時候決定。

### 範例
```javascript
var a = 'global'
function change(){
	var a  = 'change'
	test()
	console.log(a) // change
}
function test(){
	console.log(a) //global
}
change()
```
一開始會以為 `test()` 在 change 裡面呼叫，取得的變數 a 是 change 對不對 ? 

NO NO NO,再重複一次 !      
> 範圍鏈是在函式**被定義的當下決定** 的，不是在被呼叫的時候決定。

`test` 函式在 Lexical Environments 是 gloabal 的下一層，Scope Chain 是根據 Lexical scope 決定，往上找是 gloabl 那層，所以結果才會是 `'global'`


## 為什麼要有 Closure ? 
> 反問 👉 **沒有 Closure 會怎樣 ?**
 
我們知道 Execution Context 執行環境在執行完 function 後，Stack 會抽掉，有關這個 function 的一切變數也會被回收而且不可再使用。
	
- 如果要使用 function 裡的變數呢 ? (`private variable` 的概念)

直覺可能會丟到 `global` 進行宣告，但當專案結構逐漸龐大，久而久之會造成 **全域變數汙染**  

**那閉包的出現解決了...** :
- 自由變數 (free variable)，只有在 function 內部可讀取變數，在外部則無法讀取。
- 變數暫存，減少重複的複雜計算

## Closure 的優缺點
- 優點 : 
  1. 避免 **全域變數汙染**
  2. 提供 **自由變數**，讓該 function 執行完後，變數的作用域不會因 function 結束被回收，而是會繼續存在。
  3. 避免重複執行龐大的計算  
  	可以記錄前一次計算的狀態，下一次再呼叫不用重算一次 (cache 的概念)。  
  4. 在多人協作的時候，有些隱密的資訊不想讓人去修改，可以使用封裝閉包的方式。
  	別人必須依照固定的寫法來取得資料，且不能修改到內部的資訊。
  	在開源資料或 API 的方法常使用這樣的方式，以免改動到內部數值。

- 缺點 :
  1. 可能保留到一些不必要的變數或資訊，造成資源多餘消耗。
  2. 只能使用涵式提供的方法，因為內部的資訊被隱蔽，在更動上較不彈性。  
   	(但是相反如果不想要被改動會是優點)  

## 什麼是閉包 ?
除了自己本身的程式碼外，也可以取得了**內部函式「當時環境」的變數值**，記住了執行當時的環境，這就是「閉包」。 

## 簡單的 Closure 範例
- 沒有使用閉包  
```javascript
var rate = .75
function itmePrice(price){
 return price >= 100 ? price*rate : price
}
rate = .1 
let bag = itmePrice(150)
console.log(bag)
```
> 可以透過直接修改數值 (👎)  
> 任何人都可以在外部進行修改

- 使用閉包
```javascript
function itmePrice(price){
	// 把 rate 變成私有變數
	var rate = .75
	return function (){
	return price >= 100 ? price*rate : price
	}
}
let bag = itmePrice(150)
console.log(bag())
```
> 只要呼叫需要的東西即可 (👍)  
> 不會被外部修改


## 參考 
1. [所有的函式都是閉包：談 JS 中的作用域與 Closure - Huli](https://blog.huli.tw/2018/12/08/javascript-closure/)
2. [Variable scope, closure](https://javascript.info/closure#lexical-environment)
3. [重新認識 JavaScript: Day 19 閉包 Closure](https://ithelp.ithome.com.tw/articles/10193009)

