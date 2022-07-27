---
title: 筆記 | JavaScript - class 物件導向 (I) 初探 OOP
tags:
  - OOP
categories:
  - '2022'
  - '04'
author: Rosa Hong
date: 2022-04-19 12:33:15
description:
---

## 前言
JavaScript 是物件導向的語言  
但跟其他的物件導向語言使用 class 有點不同   

恩 ? Javascript 不是也用 class 嗎 ?  
不，`class` 是語法糖，到 ES6 才問世  
真正的 JavaScript 是使用 prototype 來達成物件導向  

本系列將從現代開發用的 `class` 來了解    
再到認識真的原汁原味 `prototype` 的作法  

<!-- more -->
## class 的物件導向
`Object-oriented programming` 簡稱 OOP  
物件導向的優點在於更 **直覺**，更模組化  

ES6 是使用 class  
ES5 以前並沒有 class，而是使用 `prototype` (原型) 的方式。
`class` 像是藍圖，而 `new` 則是把藍圖裡的東西實例出來  

> 類別型的物件都是**大寫開頭**，這是常用的寫法  

```javascript
// 定義貓
class Cat{
	// 每隻貓有名字
	constructor(name){
		this.name = name
	}
	// 每隻貓打招呼會喵喵叫
	hello(){
		console.log(`${this.name} says meow`)
	}
}
// 建立一隻叫 lily 的貓，把它存在 lily 這個變數
let lily = new Cat('lily')
lily.hello() // lily says meow
let bob = new Cat('bob')
bob.hello() // bob says meow
```

1. `class` : 物件的藍圖  
	裡面的涵式不需要寫 `function` 的字，可以使用 [function shorthand](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions#description)  
2. `new` : 把藍圖實做出來，放到自訂義變數中，之後這個變數也擁有藍圖包含的功能。
	用 `.` (dot) 連接，像 `object` 來呼叫。  
3. `new XXX(建構子參數)` : 建構子是 class 內部的涵式，可以加入參數，類似初始化。
	對應 
	```javascript
	//這是建構子
	construtor(arguments){
		this.arguments = arguments
	}
	```
	> `constructor` : 可以看做基本資料(設定檔)，`this.name = name` 
	> 把 new 帶入的引數作為內部建構子參數使用。
4. `this` : 分成 class 內部的 `this` 與外部的 `this`。這邊著重內部的 this。
	`this` 是對應被實體出來的主體。
	lily 被指向叫做 lily 的貓
	反之 bob 也是，並不是指同一個物件   
	但是內部方法是共用同一個   
	```javascript
	console.log(lily.hello === Bob.hello) // true
	```

對於已經建立的物件再修改內部建構的值非常不建議  
```javascript
lily.name = "rosa" (👎)  
```
雖然可以修改掉內部的 `this.name` 的值    
一般來說在建立實體時都會設定好，較少再直接透過個別更改     

## 沒有 class 的物件導向
在 ES5 並沒有 class 的做法  
如果沒有使用 prototype 的寫法  
我們可以透過 function 來建構   
> function 也是物件，所以可以透過 `.` 拿到屬性或方法  

- 改寫上面的 Cat class  
```javascript
function Cat(name) {
// 用 _ (dash) 通常指被封裝在函式內的變數，類似私有變數，一般不會直接修改
  this._name = name;
  return {
	  name: this._name,
    hello: function () {
      console.log(`${this.name} says meow`);
    }
  };
}
var Lily = Cat("Lily");
Lily.hello();
var Bob = Cat("Bob");
Bob.hello();
console.log(Lily.hello === Bob.hello); // false
```
讓物件能呼叫方法用 `function` 回傳 function 的方式   
但是這個方法 **非常消耗記憶體**    
每一個產生的 function 都是不同的 function  

## 對比圖  
![右 : ES5 ，左 : ES6](https://dsm01pap006files.storage.live.com/y4mPsTnRBXXRDKUTn4h4YIRTBAE1Q3K4imjKAv-NaRLxF9KjYvNc3TJj5u-GvDWoZUpm_TBcByzdTcbSFqiAJtRNy43xJRnNoug9RKxYtHqxvCm-JrazXLtBM82gThGBaH8-SjTQbaFr0zZr4tGF2CuwLIl0u7I3soTI3iJ8usyN9oWE1SV6GyXIBp3snhf2Ply?width=1024&height=325&cropmode=none)

右邊因為每一個實體都是重新創建一個新物件方法，明明要呼叫的指向實體是同一個而已。
改善這部分會使用到 `prototype`，讓建構的物件都有共同的方法與屬性  

- 有無使用 prototype 的寫法  
  
![左 : function 直接回傳物件，右 : 透過 prototype](https://dsm01pap006files.storage.live.com/y4meCfDywgqAcUJCJFA07OVsJ4OvfDl-Qu_nPbSoDEocZ_v0aTe19CwejVfn_H2ZHF8PR5mb1xI4pjAwUuAQLb-NdFX5VB-_AmcjbZbIrfTn8wy1Cf5im0Lr8--yFtVkM8wsSdEd-N4TO9cPP64dTTXfH0td0OWI8XuyKow6jmPGLxam61-1dH2JWOpXzMFCDg3?width=1024&height=308&cropmode=none)
 
最大的差別在於產生的物件 **是不是共用同一個方法**   
右邊的透過 prototype 方法是都指向同一個  

建立物件時右邊是使用了 `new`，幫將物件的原型綁在建構函式上  

## new : 藍圖的實作
new 到底做了什麼是呢 ? 

- new 不 new ?  

```javascript
// 等同於 class 的 construtor
function Car(name){
	this.name = name 
}
Car.prototype.buy=function (){
	console.log(`you buy a new ${this.name}`)
}

let toyota = new Car('toyota')
toyota.buy()
let honda = Car('honda') // 錯誤

```
沒 new 會出現 `Class constructor Car cannot be invoked without 'new'` 
代表沒有初始化。

### 複習一下 call
```javascript
function hello(){
	console.log(this)
}
hello() //這邊印出的 this 是全域物件  
hello.call('123') //123，this 變成傳進去的東西
```
`.call` 是呼叫函式的另一種方法  
透過這樣的方式可以將 this 綁在傳入的物件上

### 手動造一個 new 
知道 call 跟 this 的關係，就能了解 `constructor` 的初始化。

- 目標 : 不用 new 做一樣的功能
```javascript
let toyota = newCar('toyota')
toyota.buy()
```
- 用 newCar
```javascript
function Car(name){
	this.name = name 
}
Car.prototype.buy=function (){
	console.log(`you buy a new ${this.name}`)
}
function newCar(name){
	var obj ={}
	Car.call(obj,name)
	obj.__proto__ = Car.prototype
	return obj
}
```
new 其實做了 :  
1. 建立一個 obj
2. `.call(obj,name)`，呼叫建構子。把 obj 當作 `this`，name 作為參數，完成 `constructor` 的初始化。
	> 沒有這一項無法指向實體，`this` 綁定問題  
3. 用 `__proto__` 導向至 prototype，跟原型進行搭橋，才能使用到該原型方法。
4. `return obj` ，實例 (instance) 出來的東西。

## 結語
現代開發大多還是使用 class  
但並非代表 JavaScript 就是用 class(類別) 來建立  
背後依然是 function 與指定 prototype 的實作    

想更了解 JavaScript 認識 prototype 是不可少的    
同時我也查了為什麼 JavaScript 作者使用 prototype 的設計  
而不是用類別 ，是出於什麼考量?     

在[這篇](https://stackoverflow.com/questions/8433459/what-s-the-purpose-of-prototype) 找到的的解釋是 class-based 是要 **重頭設計物件**，而 prototype-based 可以透過現有已建立的物件再建立，總得來說效能上更快。  

## 參考
- [JS201 進階 JavaScript：那些你一直搞不懂的地方](https://lidemy.com/courses/enrolled/390599)
