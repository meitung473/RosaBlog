---
title: 筆記 | JavaScript - 資料型態(I)
tags:
  - JavaScript
categories:
  - JavaScript
author: Rosa Hong
date: 2021-08-31 09:26:15
---


## 前言 ##
這篇 Primaitvie vaule (原始值) 以及 Object 之間差別的說明     
<!-- more -->
### Primitive vaule ###
常見的有六種，另外兩種 symbol 跟 BigInt 先不做討論  
  1. boolean
  2. string
  3. number
  4. null 
  5. undefined
  6. object ( function 函式 、array 陣列 ... )

在 **null** 與  **undefined** 的定義有點微妙    
暫不討論   

### Object ###
像是 Object 或 Array 這類的會被歸類在 object
> 注意 :  主要是記憶體跟純賦值不同  
> function 算是被視為一種 Object 只是被呼叫而已 
 
### typeof ###
查詢數值型態  

```javascript  
  var a = 'abc'
  console.log(typeof a) // string
```
其他的類別以此類推  

> 詳細的型態說明   
> [typeof - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#examples)    

### 可變與不可變 (Immutable) ###

#### 不可變  
```javascript
  1. var a = 'hello'
  2. a = 'yo'
  3. a.toUpperCase()
``` 

(2) `a  = yo` 這是被賦值，並非完全被覆蓋掉
在  **`hello `** 已建立了一個記憶體位置儲存值
而 **`yo`** 只是重新賦值
且又新建立一個新的記憶體位置存放值

(3) 的部分是沒有任何效果的，是不會變動到 a
也不會改變a的值
要麼寫成 `a = a.toUpperCase()`  
	
> 這邊講的不可變是 **`操作值所回傳的結果`**  
> a.toUpperCase() 回傳回來的並沒有被改變  
> 而在 a = a.toUpperCase() 才做改變  

因此 CDN 這邊說明 Primaitive vaule 是不可變的   

#### 可變
舉 object 來看 mutable    
```javascript
1. var obj = { a:1 }
2. var obj2 = obj 
3. obj2.a = 2
4. obj.a = 0
5. obj2.b = 2
```
必須先知道 Object 是儲存記憶體的位置  
並非只有單純的值  
1. (1)新建立一個 obj 實際是建立了一個記憶體  
 例如是 `0x01`
2. (2) 新物件 obj2 =  obj   
    obj 跟 obj2 是指向同一個記憶體位置  
3.  (3) obj2 改變 a 的值， **`obj 的 a 也會一同被改變`**   
	也就是 `obj2 = {a : 2} ,obj = {a : 2}`   
	 > 改變的是同一個記憶體位置  
   obj2 的 記憶體位置也是 `0x01`  
   兩者指向的是同一個，因此改變其中一個就會通通改變  
   
- 列出跟 Primative vaule 差別  
 ```javascript
 var a = 2
 var b = a
 b = 1
 //請問 b = ?
 ```
答案 **`b = 1 ,a = 2`**   
這邊我們可以知道這邊指的是賦值  
並非指向同一個記憶體   

4. 因此到 (4) 再看一次 `obj = {a : 0} ,obj = {a : 0}`    
 5. (5)  obj2 多新增一個 b ，但 obj 並不會新增   
 這邊 obj 已經是另一個新的記憶體 `0x02`   
 代表兩者已經不一樣了   
 `obj = {a : 0} ,obj = {a : 0 ,b : 2}`      
 
關於 **淺拷貝與深拷貝** 參考可以看這篇  
> [深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？ - Huli](https://blog.huli.tw/2018/06/23/javascript-call-by-value-or-reference/)

## 結語 ##
之前在使用物件時  
常常不知道為什麼會突然改到原物件    
我以為的拷貝結果不是拷貝 :O  
接觸更深後才知道    
要複製可以使用展開的方式  
像這樣  

```javascript
  var obj = {
    a:1,
    b:2
  }
  var obj2 = {...obj}
```  
再改動 obj2 值就不會影響 obj 了  

基礎篇章都只是記錄小東西  
更新的不快  
繼續學習 ! GOGO  

---
> 參考資料   
[JavaScript 核心 - 變數與他們的產地 (coderbridge.io)](https://derek.coderbridge.io/2020/09/29/javascript-%E6%A0%B8%E5%BF%83-%E8%AE%8A%E6%95%B8%E8%88%87%E4%BB%96%E7%9A%84%E7%94%A2%E5%9C%B0/)  