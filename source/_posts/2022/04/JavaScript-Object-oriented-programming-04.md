---
title: 筆記 | JavaScript - Prototype 物件導向 (IV) 原型的繼承
tags:
  - JavaScript
categories:
    - JavaScript
author: Rosa Hong
date: 2022-04-19 12:33:33
description:
---

## 前言
上一篇知道原型與原型鏈的內容  
如果我們要讓東西繼承，除了透過 new 建立物件直接幫我們繼承之外  
還有 `Object.setPrototypeOf` 以及 `Object.create()`  
<!-- more -->  

## 原型如何繼承 ? 
1. `Object.setPrototypeOf(<繼承者>,<被繼承者>)`
	```javascript
	Object.setPrototypeOf(person1, person2);
	```
2. `Object.create(proto,屬性物件)`
	```javascript
	// Person 物件
	var Person = {
	  name: 'Default_Name',
	  sayHello: function(){
	    return "Hi, I'm " + this.name;
	  }
	};
	
	// 透過 Object.create() 將 Person 作為原型物件來建立一個新的物件
	var p = Object.create(Person);
	// 沒有 this.name
	p.sayHello();   // "Hi, I'm Default_Name"
	
	p.name = 'Rosa';
	p.sayHello();   // "Hi, I'm Rosa"
	```

## Object.setPrototypeOf()
上一篇我們提到 `[[Prototype]]` 是隱藏屬性  
ES5 之前是使用 `__proto__`，ES6 新增 `getPrototypeOf()` 與 `setPrototypeOf()` 讓我們可以直接改變物件的 prototype    

### in  : 某屬性是否可以透過這個物件存取
我們知道物件的屬性或方法不一定是本身物件的  
而是來自原型鏈往上找到的  
如此一來，建構物件就能使用原型鏈上的屬性  
那怎麼確定能存取到呢 ?   
沒錯，就是透過 `in` !  

> 屬性名稱必須是「字串」   
 
```javascript
var person1 = {
	a : 1,
}
var person2 ={
	b : 2 ,
}
console.log( "a" in person1) // true
console.log( "b" in person1) // false
```

如果要讓 person1 也能讀取到 b 就必須改變其原型   
可以透過 `Object.setPrototypeOf()` 直接改變 
不過建議非必要不要直接改變物件的 prototype  

### Object.setPrototypeOf()
`Object.setPrototypeOf(<繼承者>,<被繼承者原型>)`
```javascript
Object.setPrototypeOf(person1,person2)
```
JavaScript 的原型物件是物件內部屬性，**無法直接存取** (通常標示為 `[[Prototype]]`)，但是可以透過 setPrototypeOf 指定物件之間的原型關係

>原型繼承的規則裡，**同一個物件無法指定兩種原型物件**。

試著去存取「不存在」的屬性時，那麼 JavaScript 就會往它的 `[[Prototype]]` 原型物件去尋找 (prototype chain)

讓 `person1` 同時有 b 也有 c 屬性
> 讓 b 去繼承 c，a 再繼承 b，就能同時擁有 b 與 c

```javascript
var person1 = {
	a : 1,
}
var person2 ={
	b : 2 ,
}
var person3 = {
	c : 5
}
Object.setPrototypeOf(person2,person3)
Object.setPrototypeOf(person1,person2)

console.log(person1.c) // 5
console.log("c" in person1) // true
```
### hasOwnProperty() 是否為物件本身的方法或屬性
有些屬性與方法是來自 prototype 繼承的   
要確定是不是屬於自己本身用 `hasOwnProperty`
`objself.hasOwnProperty(<property>)`

```javascript
var person1 = {
	a : 1,
}
var person2 ={
	b : 2 ,
}
Object.setPrototypeOf(person1,person2)
console.log(person1.b) // 2
// 屬性 b 並非建立於 person1 物件中，而是透過繼承的方式取得的 
console.log(person1.hasOwnProperty('b')) //false
```

## Object.create()
新建物件後的 `[[Prototype]]` 就會是我們所指定的那個原型物件。
```javascript
function Person(){}
let rosa = Object.creat(Person)
console.log(rosa.prototype) // constructor 的 prototype
```

也可以是 `null`，這樣就會變成非常一般的物件 ("Very plain" objects)  
不帶有任何 prototype 甚至是 `Object.prototype` 
```javascript
let obj = Object.create(null)
console.log(obj.toString()) //Error
console.log(obj instanceof Object) // false
conosle.log(obj) //非常空的物件
obj.a = 2 // 還是可以給予屬性
console.log(obj) // {a:2}
console.log(Object.keys(obj)) // ['a']
```
但並不代表 Object 有關的方法都不能呼叫  
而是要看方法是否在 prototype 裡   
像是 Object.keys 依然可以使用

### 造一個 Object.create()
`Object.create()` 簡單實作
```javascript
Object.create = function (proto){
	function F() {}
	F.prototype = proto;
	return new F();
}
```
透過一個封裝過的建構式建構出來的物件，並把 `prototype` 指向作為參數的 `proto`。

## Object.create() v.s new ? 
兩個都是建立物件，哪裡不一樣 ?   
> `new` operator 跟 `Object.create` 的差別在於會不會執行 constructor

```javascript
function Person(){
	console.log('hi')
}
let a = new Person(); // 建立的時候，也印出 hi
let b = Object.create(Person) // 指是建立了而已
```

## 參考
1. [原型方法，没有 __proto__ 的对象](https://zh.javascript.info/prototype-methods#very-plain)
2. [重新認識 JavaScript: Day 25 原型與繼承](https://ithelp.ithome.com.tw/articles/10194356)
3. [new operator — JavaScript | 為了瞭解原理，那就來實作一個 new 吧！](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/javascript-new-operator-implementation-8c0d15f2b899)
4. [你不知道的javascript之Object.create 和new区别](https://blog.csdn.net/blueblueskyhua/article/details/73135938) 