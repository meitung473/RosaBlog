---
title: 筆記 | JavaScript - this (I) 基礎概念
tags:
  - JavaScript
categories:
    - JavaScript
author: Rosa Hong
date: 2022-04-15 11:07:39
description:
---

## 前言
在學習 JavaScript 時很多課程會建議不要急著先用 `this`  
因為 this 會跑出讓新手無法預期的結果  
在某些情況下使用 this 反而更棘手  
藉由本次來初步了解這個奇妙的 **this**! 
<!-- more -->

## 什麼是 this ?
- 關鍵字
- function 執行時，自動生成的內部物件
- 隨 function 執行場合不同，this 指向的值也會不同
- 大多數情況，this 代表的就是呼叫 function 的物件 (Owner Object of the function)。

總得來說 :   
> this 會因 **執行的環境與上下文** (context) 的不同，而有不同的結果  
> 翻譯機 : **跟 function 在哪裡呼叫有關**

空說 this 有點難以了解，this 其實在哪裡都可以使用(非嚴格模式下)    
JavaScript 並沒有特別限制 this 綁定在哪，所以 this 是會變來變去的  
正因如此才顯得有點麻煩    

## 不同情況下的 this
### 物件導向的 this
this 就是 `instance` 本身，被 **實例** 出來的那個。
```javascript
class Car{
	constructor(name){
		this.name = name
	}
	getValue(){
		console.log(this.name)
	}
}
let toyota = new Car('toyota')
toyota.getValue()
```
這個例子就是 `toyota` 物件本身

### 物件導向之外的 this
脫離 `class` 後，可以再細分成  
1. 一般 function 中的 this
2. DOM 事件中的 this
3. `object` 的 this
4. arrow function 的 this **(特別)** ⭐

> 殺手鐧 : 可以用 `.call()` 來知道 this 的意義

`.call()` 是執行 function 另一種方式     
`.call(context,args[0],args[1])`
```javascript
function test(p1,p2){
	console.log(this,p1,p2)
}
test(1,2) // undefined 1 2
test.call(undefined,1,2) // undefined 1 2
```
這兩個是一樣的，會發現原來一般呼叫 function 會少了 this  
而這個 this 就是看執行的環境與上下文 (context) 而來的  

**物件中的 function 呢 ?**     
```javascript
function test(p1,p2){
	console.log(this,p1,p2)
}
var obj = {
	func : test
}
obj.func.call(obj)
```
根據上面說的
> `this` 代表的就是呼叫 function 的物件 

物件呼叫，呼叫的 method 前面是 obj  
所以 call 裡面的 this 位置是 `obj`     
  
#### 一般 function 中的 this
根據環境不同，結果不同  
但是都是 global 的物件  
在 **非嚴格模式** 下
- node.js : `this = global`
![global 物件](https://dsm01pap006files.storage.live.com/y4mBY1X7hZFvUS0mwa7p25amxq2Q5tXcp0SRBAKj7cJNx_37JCdjvCWa0cMAjfVWWbH4a8_YsBV0qOgYrNgcg6zJ5FhgIGuLqLlMT8euJQKJx8Dr9WTfy2FGVzvqh4ES1YzVoXlfdOCNR8Q_ndRIiDSyucw5IxbNHFsKeU5KRB71oZ9e096hhsMhYq6JT-FlHeR?width=1022&height=617&cropmode=none)
- 瀏覽器 : `this = window`
![window 是瀏覽器的全域物件](https://dsm01pap006files.storage.live.com/y4mkwi-WphtCQHHgZoUP5u8Q0AkSyEZZcX6U6ErkFF5AKuF0z1us2zGqqo2w-Ir8auT0FL7AbZxjEfLh3Y4wyVYyLU38xVibSCWD1r70lghQMdlCieK35uGdQSgT5HKX5iStqZw2ekAtQWqgxktoKIFmMjFBf-L3h8PkZ505ii9ON4qS1jF7nRxrEJz42_hQ7AL?width=662&height=300&cropmode=none)

> **嚴格模式** 下的 this 指向全域物件是 `undefined`
> 因為 this 沒有綁定誰，所以會是 `undefined`。

```javascript
'use strict'
function test(){
	console.log(this)
}
test() // undefined
// 轉成 call
test.call() // undefined ,沒有帶入東西，嚴格模式下是 undefined
```

#### DOM 事件中的 this
對應到事件觸發的 **元素**
```javascript
document.querySelector('.btn')
.addEventListener('click',function(e){
	console.log(this)
})
```
以 click 為例， `this` 會導向被按到的 **元素** 本身  

但是在事件裡 **呼叫其他 function** 時就要特別注意了  
由於內部的 function 沒有綁定物件， this 會是全域物件  
```javascript
el.addEventListener('click',function(e){
	// ajax 的 this 是 window 全域物件
	$.ajax('url',function(res){
		console.log(this.textContent,res) 
	})
},false)
```
可以透過其他變數將 `this` 先存起來，直接在內部呼叫的函式替換。 
```javascript
el.addEventListener('click',function(e){
	// 把這邊的 this 存起來，指向的是元素本身
	var that = this;
	// ajax 的 this 是 window
	$.ajax('url',function(res){
		// 把 元素本身的 this 帶進來
		console.log(that.textContent,res) 
	})
},false)
```
下一篇會提到如何用函式的方式綁定 this  

- 轉成 `.call`
`el` 是 document 子結點取得的，這邊也可以看做一個物件
```javascript
el.addEventListener('click',handler,false)
el.addEventListener('type',handler.call(el),false) // 放入的是 元素 本身
```

#### object 的 this
指 obj 本身。
```javascript
var a = 2
var obj = {
	a:1,
	test : function (){
		console.log(this.a) // 1
		console.log(this) // obj
	}
}
obj.test()
// 轉成 call
obj.test.call(obj)
```
#### arrow function 的 this
> arrow function 沒有自己的 this  
> 而是用外部的 this  

箭頭函式之所以在 this 表現奇怪  
跟其他狀況的 this 不同的是 **不是哪裡被呼叫有關**
而是 **在哪定義** 有關
如果前面已定義了，就會用那個值  
來看看例子  

- 一般 function
```javascript
class hello{
 test(){
 	console.log(this)
 	setTimeout(function(){
 		console.log(this)
 	},2000)
 }
}

let a = new hello()
a.test()
```
很明顯的 `new` 建構出來的物件  
前面有提到是 **實例** 本身  
但是裡面呼叫 function 的  this 呢 ?    
是指 **全域物件**  
setTimeout 並沒有透過其他物件呼叫   
就像在外部呼叫 `setTimeout`  

既然是 hello 這個物件的東西  
我們希望 `this` 指向的是 hello 本身建構出來的物件  
`arrow function` 就派上用場了  

- 用 `arrow function`
```javascript
class hello{
 test(){
 	console.log(this) // hello{}
 	setTimeout(()=>{
 	console.log(this) // hello{}
 	},2000)
 }
}

let a = new hello()
a.test()
```
arrow function 本身沒有 this  
而是根據定義在哪，this 就是那個值  
通常也是指箭頭函是外部的 this  

## this 與前後文本 (context) 的綁定基本原則  
this 綁定原則大概可以分四大種  
- **預設綁定** (Default Binding)
- **隱含式綁定** (Implicit Binding)
- **顯式綁定** (Explicit Binding)
- 「**new」關鍵字綁定**  

### 預設綁定
宣告在 global scope 的變數，跟全域物件屬性是相同的。
```javascript
var a = 1;
// 直接讀
console.log(a) // 1 
// 透過全域物件底下的屬性讀取
console.log(window.a)  // 1
```

因為預設綁定，當 function 被呼叫的當下如果沒有值或是在 `func.call(null)` 或 `func.call(undefined)` 此類的情況下，此時裡面的 `this` 會**自動指定至全域物件**。

如果是嚴格模式， this 綁定全域物件是 `undefined`

### 隱含式綁定
function 被宣告的地方是在 global scope 中，只要它 **成為某個物件的參考屬性** (reference property)，在那個 function 被呼叫的當下，該 function 即被那個物件所包含。

```javascript
var a  = 1
function func() {
  console.log( this.a );
}

var obj = {
  a: 2,
  foo: func // 引用 global 的 function
};
obj.foo();  // 2 , this是 obj 本身
var func2 = obj.foo;
func2();    // undefined ， 這邊的 func 是 global 的，this 是 window，a 是找不到的
```

決定 this 的關鍵不在於它屬於哪個物件，而是
> 在於 function「呼叫的時機點」  

透過物件呼叫某個方法 (method) 的時候，此時 this 就是那個物件 (owner object)。

### 顯式綁定
1. `.bind()`  
2. `.call()` 
3. `.apply()` 

這類直接指定 this 的 function 都可被歸類至顯式綁定的類型。

### new 關鍵字綁定
當一個 `function` 前面帶有 `new` 被呼叫時，會發生： 
-  會產生一個新的物件 (物件被建構出來)
-  這個新建構的物件會被設為那個 function 的 `this` 綁定目標，也就是 `this` 會指向新建構的物件。
-  除非這個 function 指定回傳 (return) 了他自己的替代物件，否則這個透過 `new` 產生的物件會被自動回傳。

關於 `new`，參考 : [MDN 對 new 的說明](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new#description)   

```javascript
function foo(a) {
  this.a = a;
}

var obj = new foo( 123 );
console.log( obj.a );      // 123
```

## this 的應用 : Cascade 組合技
Cascade 也有人稱作 **「Fluent Interface」**  
可以讓 method 串串樂   

JavaScript 允許函式 `return undefined`  
那改成 `return this` 呢 ?  

```javascript
var calNum = function(num){
  this.num = num;

  this.add = function(newNum) {
    this.num += newNum;
	return this
  };

  this.sub = function(newNum) {
    this.num -= newNum;
	return this
  };

  this.multi = function(newNum) {
    this.num *= newNum;
	return this
  };

  this.division = function(newNum){
    this.num /= newNum;
	return this
  };
};
// 透過 new 建立實體，this 是 calNum本身
var a = new calNum(100);
// 分開呼叫
a.add(50)
console.log( a.num ); // 150
a.sub(100)
console.log( a.num ); // 50
```
當回傳 this 時，指的是物件本身，可以往後串在一起，  
```javascript
a.add(50).sub(100)
console.log( a.num ); // 50
```

JQuery 中的也是用 method chain (方法鏈) 這樣的方式  
```javascript
$('div').addClass('is-active')
        .removeClass('is-hide')
        .text('Hello World!');
```
或者 `Array` 的內建函式  
是可以串聯不同的方法  
而且回傳的都是 **同類型** 的陣列

```javascript
[1,2,3].map(el => e*2)
	   .filter(el => el >= 4) // [4,6]
```

## 總結  
除了轉成 `.call()` 來判斷 this    
對於 this 也可以朝幾種方向來判斷  
1. function 的呼叫，是透過 `new` 進行的嗎？  
	如果是，那 this 就是被建構出來的物件。
2. function 是以 .call() 或 .apply() 的方式呼叫的嗎？ 或是 function 透過 .bind() 指定？   
	如果是，那 this 就是被指定的物件。
3. function 被呼叫時，是否存在於某個物件？  
	如果是，那 this 就是那個物件。
4. 如果沒有滿足以上條件，此 function 裡的 this 就一定是全域物件  
   在嚴格模式下則是 undefined。


## 參考 
1. [淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂 - Huli](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)
2. [this 的值到底是什么？一次说清楚](https://zhuanlan.zhihu.com/p/23804247)  
3. [重新認識 JavaScript: Day 20 What's "THIS" in JavaScript (鐵人精華版)](https://ithelp.ithome.com.tw/articles/10193193)
4. [对象方法，"this"](https://zh.javascript.info/object-methods)