---
title: 筆記 | JavaScript - 參數傳遞 call by value or call by reference & call by sharing
tags:
  - JavaScript
categories:
  - '2022'
  - '03'
author: Rosa Hong
date: 2022-03-26 23:12:05
description:
---

## 前言
一直以來 JavaScript 的參數傳遞都蠻有爭議性的  
可能聽過
> 原始型態是 call by value；物件型態是 call by reference 

甚至有人說 JavaScript 只有 `call by sharing` 或是根本只有 `call by value`   
到底是哪種 ? 眾說紛紜，本篇針對這三種名詞進行解釋幫助自己去來理解   

如果有誤再麻煩各路大大指點    
<!-- more -->   

## call by value : 傳值
```javascript
let a = 5
let b = a

a=10
console.log(b) // 5
``` 
- 定義變數 a 並且賦予 5 這個值，假設會被存在記憶體 `00x1` 這個位址

 | 變數 | 記憶體位址 | 值  |
 | ---- | ---------- | --- |
 | a    | 00x1       | 5   |
- 定義變數 b 等於 a ，b 拷貝 a 的值，另外存在新的記憶體位址  `00x3`
	
 | 變數 | 記憶體位址 | 值              |
 | ---- | ---------- | --------------- |
 | a    | 00x1       | 5               |
 | b    | 00x3       | 5 (copy from a) |
- 當你改變 a 的值，因為 b 指向不同記憶體位置，所以跟 b 沒有關係

 | 變數 | 記憶體位址 | 值  |
 | ---- | ---------- | --- |
 | a    | 00x1       | 10  |
 | b    | 00x3       | 5   |

即使修改 a 或 b 其中一項，a 、 b 值互不相干擾，稱作 `call by value`  
而且 JavaScript 對於 Primitive type 的操作都是 `call by value`   
拷貝 「**值**」 但不拷貝 「**址**」

這也為什麼說 Primitive type 是 **immutable** (不可變)  
這邊指的不可變 b 雖然等於 a，但你修改 a 並不會去變動到其他的值   

### Function 中參數的傳遞 : by value
[Huli 大的文章](https://blog.techbridge.cc/2018/06/23/javascript-call-by-value-or-reference/) 中也舉例變數 function 做為參數，並在 funciton 中進行新賦值的問題   
```javascript
let a = 1;
let b = 2;
function revalue(a,b){
	a = 5;
	b = 10;
}
revalue(1,2)
console.log(a) // 1
console.log(b) // 2
```
把變數 a 跟變數 b 都當作參數傳進 `revalue` 這個 function，而參數只是複製傳進來的值，並不會影響到在外面的 a 跟 b。  
> 這邊的參數 a、b 作為傳進來的值的別名 (alias)而已，跟外部定義的 a、b 是無關的  

## call by reference : 傳址
```javascript
let obj1 = {
	a: 1
}
let obj2 = obj1
obj1.a = 5
console.log(obj2.a) // 5
console.log({} === {}) // false
console.log(obj1 === obj2) // true
```
在 object 型態的判斷來看，空物件不會等於空物件，因為記憶體儲存的位址不同    
但這裡 `obj1 === obj2` 是 true 的時候，代表兩個變數是指向同一個地方 ，是一樣的。  

接著看怎麼運作的  
- 定義變數 obj1 並且賦予 `{a : 1}` 這個值，記憶體 `00x1` 這個位址 ，會存有 `{a: 1}` 這個值。而 obj1 的值則引用 (reference) `00x1` 位子的值
	
 | 變數 | 記憶體位址 | 值     |
 | ---- | ---------- | ------ |
 |      | 00x1       | {a: 1} |
 | obj1 | 00x2       | 00x1   |
- 定義變數 obj2 等於 obj1，也就是參照同一個 **位址** 的值

 | 變數 | 記憶體位址 | 值     |
 | ---- | ---------- | ------ |
 |      | 00x1       | {a: 1} |
 | obj1 | 00x2       | 00x1   |
 | obj2 | 00x2       | 00x1   |
- 當 `obj1.a` 改變時，是改動到位在 `00x1` 記憶體的值 `{a : 5}`，因為 obj2 也參照這裡的位址的值，在運作上連同 obj2 也被改動到
	
 | 變數 | 記憶體位址 | 值       |
 | ---- | ---------- | -------- |
 |      | 00x1       | `{a: 5}` |
 | obj1 | 00x2       | 00x1     |
 | obj2 | 00x2       | 00x1     |

由此可知當改動到 obj1.a 的值 obj2.a 也會改變稱作 call by reference   
Object type 通常是 call by reference   
拷貝 「**值**」 **也拷貝址**

跟 Primitive type 相反的是 Object type 是 **mutable** (可變)  
改動 a 的值卻也會變動到 b  
在 [Tommy 大簡報第 12 頁有清楚的流程](https://www.slideshare.net/YiTaiLin/java-script-63031051) 可以參考  

### Function 中參數的傳遞 : by reference
```javascript
let obj1 = {
	a: 1
}
function revalue(obj){
	obj.b = 5
}
revalue(obj1)
console.log(obj1) // {a: 1,b :5 }
```
在 revalue 函式中我們對參數 obj 進行更新  
而外部的 obj1 也會變動到，因為指向的記憶體位址是同一處。  

- obj1 作為引數，帶入 obj 參數時，複製一份 obj1 進去  

 | 變數         | 記憶體位址 | 值                   |
 | ------------ | ---------- | -------------------- |
 |              | 00x1       | {a : 1}              |
 | obj1         | 00x2       | 00x1                 |
 |              | 00x4       | funtion revalue()... |
 | revalue      | 00x5       | 00x4                 |
 | 參數 **obj** | 00x2       | 00x1                 |

- obj.b = 5 (不是變數重新賦值 !)
 
 | 變數         | 記憶體位址 | 值                   |
 | ------------ | ---------- | -------------------- |
 |              | 00x1       | `{a:1,b:5}`          |
 | obj1         | 00x2       | 00x1                 |
 |              | 00x4       | funtion revalue()... |
 | revalue      | 00x5       | 00x4                 |
 | 參數 **obj** | 00x2       | 00x1                 |


### 例外狀況 : 重新賦值 
凡事總有個例外... 

1. Object Literals 重新賦值
	```javascript
	let obj1 = {a: 1}
	let obj2 = obj1

	obj2 = {a : 3}
	console.log(obj1.a) // 1
	console.log(obj2.a) // 3
	console.log(obj1 === obj2) // false
	```
	按照上面來說，參照同一記憶體位址， obj2 變動應該會連同 obj1 也改變，結果沒有。  
	- obj2 = obj1，obj2 複製 obj1

 | 變數 | 記憶體位址 | 值          |
 | ---- | ---------- | ----------- |
 |      | 00x1       | `{a:1,b:5}` |
 | obj1 | 00x2       | 00x1        |
 | obj2 | 00x2       | 00x1        |
	- obj2 新賦值
	 
 | 變數 | 記憶體位址 | 值       |
 | ---- | ---------- | -------- |
 |      | 00x1       | {a:1}    |
 |      | 00x5       | `{a: 3}` |
 | obj1 | 00x2       | 00x1     |
 | obj2 | 00x6       | 00x5     |

	obj2 在新賦值時，物件創造新的記憶體位址賦予值，obj2 也創造一個新的記憶體位址並且複製物件位址到自己的值  
	obj1 跟 obj2 正式分道揚鑣 ~ 成為陌生人  
		
2.  Function 中參數的傳遞 : Object 重新賦值
```javascript
let obj1 = {
	a: 1
}
function revalue(obj){
	obj={ a : 3}
}
revalue(obj1)
console.log(obj1) // {a: 1}
```
在裡面重新賦值，外部的引數並不會改動到原本的值  
跟著跑一遍  
- obj1 作為引數，帶入 obj 參數時，複製一份 obj1 進去  

 | 變數         | 記憶體位址 | 值                   |
 | ------------ | ---------- | -------------------- |
 |              | 00x1       | {a : 1}              |
 | obj1         | 00x2       | 00x1                 |
 |              | 00x4       | funtion revalue()... |
 | revalue      | 00x5       | 00x4                 |
 | 參數 **obj** | 00x2       | `00x1`               |

- obj={ a : 3}  重新賦值
 
 | 變數         | 記憶體位址 | 值                   |
 | ------------ | ---------- | -------------------- |
 |              | 00x1       | { a : 1 }            |
 | obj1         | 00x2       | 00x1                 |
 |              | 00x4       | funtion revalue()... |
 | revalue      | 00x5       | 00x4                 |
 | 參數 **obj** | `00x8`     | `00x6`               |
 |              | 00x6       | {a : 3}              |

- 根據 Scope 作用域，函式的變數作用範圍等函式結束後就會釋放記憶體。
	
 | 變數 | 記憶體位址 | 值                   |
 | ---- | ---------- | -------------------- |
 |      | 00x1       | { a : 1 }            |
 | obj1 | 00x2       | 00x1                 |
 |      | 00x4       | funtion revalue()... |

obj1 依然不會變動到。  

不過你發現了嗎 ?   
Object Type 新賦值的行為是複製值而已，很像 call by value  

## 不是 by value 也不是 by renference 而是 by sharing
哦不，我的頭開始痛了  
那我前面認識的難道是假的嗎 ?  

不，sharing 就像綜合體一樣       
按上面所述，我們可以把情況分成三種  
1. Primitive type 表現行為是 call by value
2. Object type 沒有新賦值的情況，而是對內容操作，表現行為像是 call by reference
3. Object type 重新賦值，表現則是 call by value，會建立一個新的記憶體位置，並且複製其(記憶體位址的)值  

可知 call by sharing 在不同情況下會就會有不同的表現行為

借一下 Huli 大的圖...
![call by sharing](https://dsm01pap006files.storage.live.com/y4mnEy3INPdoo5FZIkuPSKskoOVfwI9iapT5pvdWu6c0BSovTa8z0rEaeST_jxZaxA8prHXyxrT_9IWaaoniKLBb6GJz6tdT60tRupMq7E0LMnDVcO97Oc8H1Rk2WzVxmlnTRFYoLOjzbHqdeFe5cLtaWuG_x4SY9Mt6GLI8HYXkVicjUFYT5QsvmVzYogaIAxS?width=949&height=702&cropmode=none)

文章中有提及其實 JavaScript 嚴格意義上是沒有 call by reference 的，因為函式的引數重新賦值並不會修改到外部變數的值。    
(C++ 能修改到是跟指標有關)
由於我不是很熟 C 跟 C++... 先不做討論     

由上圖可知，JavaScript 可以說    
> Primitive 是 Pass by Value，Object 是 Pass by sharing。

## 全都是 call by value 的觀點 
那全是 call by value 是怎麼回事 ?   
造成爭論的點在於這邊的 value 並未定義說是 **內容的值** 還是 **存放在變數記憶體位址裡的值**  

- 以 **內容的值** 觀點來看        
	
 | 變數 | 記憶體位址 | 值                |
 | ---- | ---------- | ----------------- |
 | a    | 00x1       | **5(被複製到 b)** |
 | b    | 00x3       | 5                 |

- 以 **記憶體位址裡的值** 觀點來看  
	
 | 變數 | 記憶體位址        | 值     |
 | ---- | ----------------- | ------ |
 |      | **00x1 (被複製)** | {a: 1} |
 | obj1 | 00x5              | 00x1   |
 | obj2 | 00x5              | 00x1   |
	

b 複製 a ， a 也是複製記憶體 `(00x1)` 位址這個值，所以也可以說是 **call by value**    
在定義上的不同，導致不同的觀點與結論   

## 參考
1. 帶你跑一次 : [簡單介紹JavaScript參數傳遞 (slideshare.net)](https://www.slideshare.net/YiTaiLin/java-script-63031051)
2. 簡單論述 : [重新認識 JavaScript: Day 05 JavaScript 是「傳值」或「傳址」？](https://ithelp.ithome.com.tw/articles/10191057)
3. 從各方面來看 : [深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？](https://blog.techbridge.cc/2018/06/23/javascript-call-by-value-or-reference/)
4. 好懂得位址概念 : [你不可不知的 JavaScript 二三事#Day26：程式界的哈姆雷特 —— Pass by value, or Pass by reference？](https://ithelp.ithome.com.tw/articles/10209104)