---
title: 筆記 | JavaScript - class 物件導向 (II) 繼承
tags:
  - OOP
categories:
    - JavaScript
author: Rosa Hong
date: 2022-04-19 12:33:24
description:
---


## 前言
上一篇我們提到 class 像是幫我們製作藍圖  
有車子基本構造的藍圖   
是不是能透過藍圖能做出其他車種的藍圖呢 ?  

可以，就是繼承 !
<!-- more -->

## extends
要讓子物件擁有父物件的內容可以透過 `extends`  
 
```javascript
class newClass extends OldClass{
	//...
}
```

**範例 :**
Dog 繼承 Animal    
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}
class Dog extends Animal {
	sit(){
		console.log(`${this.name} sits.`)
	}
}
var d = new Dog('Mitzie');
d.speak();// 'Mitzie barks.'
d.sit(); // 'Mitzie sits.'
```
Dog 繼承 Animal 的方法了，因此在 Dog 呼叫 speak 是可以的。

extends 背後會幫我們連接物件的 prototype  
使我們可以取得父物件的方法或屬性。  

> JavaScript 使用 prototyped-based 不能讓物件一次繼承兩種  
> 但有一個方法叫 `mixin` 利用拷貝的概念達到目的

因為我還不會，先擱著 QQ，待補    
參考 : 
- [Mixin 模式](https://zh.javascript.info/mixins)

## super()   
如果要在一開始就 **呼叫父層的方法**，必須加入`super()`，代表在繼承的子層初始化時，將舊數值蓋過去，要傳進的參數也要帶入。  

> 簡單來說，`super` 就是上一層的 `constructor`  

- 沒有 `super()` 的情況下，想在新物件生成時呼叫原型方法的 `speak()`  

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}
class Dog extends Animal {
	constructor(){
		this.speak() // 建構時在這裡呼叫原型的方法  
	}
	sit(){
		console.log(`${this.name} sits.`)
	}
}
var d = new Dog('Mitzie');
d.speak(); // Error
```
就會跑出 

```
Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```
會提示你要記得加入 super，不然 `this` 使用時會出現問題  

- 加上 super 以及要初始化的值
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}
class Dog extends Animal {
	constructor(name){
		super(name)
		this.speak() // 建構時在這裡呼叫原型的方法  
	}
	sit(){
		console.log(`${this.name} sits.`)
	}
}
var d = new Dog('Mitzie');
d.speak(); // 'Mitzie makes a noise.'
```
如果 super 裡面沒有傳入 `name`  
`this` 是 Dog 本身，但是不具有 `name` 這個值，就會是 `undefined`   

## 應用
繼承可以用在有 **共同屬性** 的時候，想再加一些附加功能，透過繼承不用完全重寫。 

## 參考
- [JS201 進階 JavaScript：那些你一直搞不懂的地方](https://lidemy.com/courses/enrolled/390599)