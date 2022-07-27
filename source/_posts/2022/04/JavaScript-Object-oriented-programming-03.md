---
title: 筆記 | JavaScript - Prototype 物件導向 (III) 原型 & 原型鏈
tags:
  - JavaScript
categories:
  - '2022'
  - '04'
author: Rosa Hong
date: 2022-04-19 12:33:30
description:
---

## 前言
JavaScript 的核心就在原型 !  
原型使得物件都能使用在原型鏈上的屬性及方法     
本身物件也可以再擴充  
透過本篇了解原型的使用方法  
<!-- more -->

## 什麼是 prototype ?  

![prototype](https://dsm01pap006files.storage.live.com/y4mZUP0lakeV0ZyTOBA3FOhGoj0nLq4_-h6RClQix2hTtsj-YL9kg-RwmOfya_emwZ1jekhk9jIrt-JrTQQfyiPEwOfYlVWWxlFZHdaAgkONuvg-kxkJgmo67BaKWfhEePd-7sT21E5ITCGSdla3HTIiK8NillkQBfzy2mTCrs5ZtISAl-h5eV-JiE6ySo075Ow?width=946&height=563&cropmode=none)
參考圖 : [重新認識 JavaScript: Day 25 原型與繼承](https://ithelp.ithome.com.tw/articles/10194356)

從 01 篇知道 prototype 可以讓不同的物件共享原型的同一個方法或屬性  
prototype 就像是從 function 產生的集裝箱    
讓 function 建立出來的物件都可以拿到同樣的東西  
> **函式也是物件**，所以可以透過 prototype 來擴充每一個透過這個函式所建構的物件

好像難以連結，不過我們時時刻刻都在使用 prototype 的概念  
有想過為什麼基本型別的值 (number、string、bool) 可以 **像 object 一樣呼較方法獲取到屬性**呢 ?

```javascript
var str = 'Hello'; 
console.log( str.length );
```

沒錯，就是透過 prototype 原型提供的方法來繼承  
在 JavaScript 呼叫方法或屬性之前，會透過基本型別包裹器 (Primitive Wrapper)    
被轉型為該類別的「物件」，由對應的物件提供的方法是透過原型鏈 (prototype chain)  
讓我們可以對基本型別的值呼叫方法  

- 類似這樣  
```javascript
// str.length 模擬過程
var str = new String('Hello') // 變成物件
str.length // 拿到屬性
str = null // 銷毀
str = 'Hello' // 恢復成基本型別
```

## prototype 怎麼來 ? 
**函式建立時會自動產生 prototype 屬性**。   
產生的物件並"不"代表物件的 prototype 屬性就是這個函式的原型物件  
而是透過 `new` 出來的物件會有 `[[Prototype]]` 的隱藏屬性  
是指 **建構式** 的 prototype    
> `constructor.prototype`  

上面的敘述很令人混亂對吧 ?  
先舉個例子  
```javascript
function Person(name){
	this.name = name;
	this.getName =function(){
		return this.name
	}
}
let rosa = new Person('Rosa')
console.log(rosa.getName()) // Rosa
```

`rosa` 是從 Person 建構出來的物件  
> 所以 rosa 的原型是 Person
   
回到第一句話      
**函式建立時會自動產生 prototype 屬性**

對著 `Person` 函式取 prototype ，確實是有的   
```javascript
console.log(Person.prototype) // Person 本身
```
prototype 讓 rosa 可以直接拿到 `Person` 裡面的方法 (getName)   

那第二句是什麼意思 ?   
試著讓 `rosa` 呼叫 `toString()`，但是 Person 並沒有這個方法呀 ?!  
我們說過 rosa 的原型是 Person  
> 但 **不** 代表建構出來的物件 (rosa) 的 prototype 屬性就是這個函式 (Person) 的原型物件       

```javascript
console.lgo(rosa.toString()) // [object Object]
```
rosa 這裡取來的屬性或方法是來自 `Object.prototype` 傳下來的  

接著第三句 **建構式** 的 prototype 是什麼意思 ?  
試著對 `rosa` 取 prototype   
新手一開始會以為 `rosa` 的 prototype 是等於 `Person` 的 prototype     
特別要搞清楚這裡的 prototype 是指什麼(我一開始也搞混了)   

```javascript
console.log(rosa.prototype === Person.prototype) // false
console.log(rosa.prototype) // undefined
```
回到第一句，回想 `.prototype` 是誰產生的 ?  
對，是 **函式**  
那 rosa 物件是透過建構式的方式而來  
prototype 是隱藏屬性，沒辦法透過建構出來的物件直接取得   

![藏在 contructor](https://dsm01pap006files.storage.live.com/y4mL7f71rE-gVfp4ze955AsP5mGlQNR1PYAJH4jUShpBHgc6U4Wq0pK2oYpDCsmDsGL0r2AxpMx3WXujkLUwZtgTEX_C1HPGIei28YZq0VvVXXwaTb7DT7K2RM-5ywv0SCz41iHsWPYdEp4lRb2YP19GWxtllx_EEBLXmJXO65f5jsuWSyQcLed8gq4Xo3YG0e3?width=692&height=620&cropmode=none)  

## 取得物件的 prototype  
既然不能直接透過 `rosa.prototype` 取得原型
如果我們要知道 rosa 是繼承誰的 prototype 可以透過三種的方式

```javascript
console.log(Object.getPrototypeOf(rosa)) // 現在比較好的拿到的方法
console.log(rosa.constructor.prototype) // 從建構式拿到 [[Prototype]] 的值
console.log(rosa.__proto__) // 原本各家瀏覽器實作，後來 ES6 保留的方法
console.log(Person.prototype === Object.getPrototypeOf(rosa)) // true
console.log(Person.prototype === rosa.constructor.prototype) //true
console.log(Person.prototype === rosa.__proto__) // true
```

## 原型鏈 Prototype Chain
原型可以讓本來 **沒有某屬性的物件去存取其他物件的屬性**    

### \_\_proto\_\_ : 溝通的原則  
如果本身物件沒有屬性或方法使用，可以透過原型鍊 (prototype chain) 來取得    
那是怎麼傳的呢 ?  

原本 JavaScript 沒有提供標準方法直接存取物件的 `[[Prototype]]`。
`__proto__` 是瀏覽器實作的的，並非 EMCAScript 的標準，不是所有的環境都有這個值。  

> ES5 以後的是使用 `Object.getPrototypeOf()`
> ES6 為了向下兼容，`__proto__` 也是承認的，但環境的不同支援度不同，還是用 `getPrototypeOf`  
> `__proto__` 是 `[[Prototype]]` 底下的屬性，屬於 setter/getter

`__proto__` 這個特殊屬性或者是 `Object.getPrototypeOf()` 都是取得某個物件的原型物件 `[[Prototype]]` 的方式。   

官方比較建議使用 `Object.getPrototypeOf()`，因為 `__proto__` 比較耗效能

除了拿到物件原型的 prototype，
還可以透過 `.__proto__` 看原型們如何溝通      

**範例**  
```javascript
function Cat(name){
 this.name = name;
}
Cat.prototype.hello = function(){
 console.log(`${this.name} says meow`)
}
var lily = new Cat('lily')
lily.hello()
let Bob = new Cat('Bob')
Bob.hello()
```

### 模擬溝通  
想執行 `lily.hello()`    
會依照這樣的順序尋找     

1. 找 lily 本身是不是有 hello function ?
	👉 沒有，往上一層找
2. 找 `lily.__proto__` 是不是有 hello ?
	👉 沒有的話，再往上一層找 
	知道 **lily.\__proto\__ = Cat.prototype**
3. 找 `lily.__proto__.__proto__` 是不是有 hello ?
	=> `lily.__proto__.__proto__ = Cat.prototype.__proto__`。
	=> `lily.__proto__.__proto__  = Object.prototype`

```javascript
console.log(Cat.prototype.__proto__ === Object.prototype) // true
```
往上找像是用鏈結的方式，所以才稱 prototype chain   
我們找到 Object.prototype 就停止了
> 那 `Object.prototype.__proto__` 呢?

### 最頂層的原型物件: Object.prototype  
往上找 `__proto__`，什麼時候才會停止 ?   
會發現 `Object.prototype.__proto__` 等於 `null`，代表 Object 是最頂層了。    

在 JavaScript 幾乎所有的物件 (環境宿主物件除外)會順著原型鍊找到最頂層
`Object.prototype` 才停止，因為 `Object.prototype` 是 JavaScript 所有物件的起源。

在 `Object.prototype` 提供的所有方法，在 JavaScript 的所有物件的可以呼叫它。    
- `Object.prototype.hasOwnProperty()` : 是否為自己的屬性或方法
- `Object.prototype.toString()` : 轉型成字串
- `Object.prototype.valueOf()` : 取得 **基本型別** 的值

幾乎所有的值可以使用的。      
即便建立物件時，沒有定義這些方法，但基於原型鏈的繼承，我們還是可以呼叫這些方法。

## instanceof : 是否在物件的原型鏈上
instanceof 除了檢查 `constructor.prototype` 是不是在物件的原型鏈上  
也能檢查 **複合式物件的基本型別**  

- 檢查基本型別
```javascript
var num = new Number(100)
console.log(num) // 100
console.log(typeof num) // 'object'
console.log(num instanceof Number) // true
console.log(num.valueOf()) // 100，基本型別的值
console.log(typeof num.valueOf()) //'number'
```
`valueOf()` 可以拿到基本型別的值   

- 檢查是不是在原型鏈上，同理使用 `class` 的結構也可以檢查    

```javascript
function User() {}
const rosa = new User();
console.log(rosa instanceof User) // true
```

## 物件本身 v.s 原型鏈 : 出現同名屬性物件 ?  
物件實體與原型具有相同的屬性或方法  
> **優先存取自己的屬性或方法**，如果沒有才會再順著原型鏈向上尋找。

```javascript
var Person = function(){
  this.sayHello = function(){
    return "Yo!";
  };
};

Person.prototype.sayHello = function(){
  return "Hi!";
}

var p = new Person();
console.log(p.sayHello()) // Yo!
```  

## 原型的方法擴充
class 級別的擁有 extend 往下擴充  
實例出實體後，會尋找存在的原型，並且一層層往上找。
如果要替原型定義其他的方法可以這樣寫    
```javascript
// 原始
Cat.prototype.hello = function(){
 console.log(`${this.name} says meow`)
}
// 定在最上層，讓往下的都可以使用
Object.prototype.hello =function(){
 console.log(`${this.name} says meow`)
}
```
Object 是最頂層，其實在這邊定義也可以。  
如果不是同一類型都需要使用，這種方法也可以導致奇怪的問題發生    

```javascript
Array.prototype.push('lol')
let arr= []
console.log(arr[0]) // 'lol'
```
每一個 array 產生時已經被加上 `'lol'`  
使用上合法，但不是一個好操作  

  
以上如果有誤，歡迎指教 QQ

## 參考
1. [重新認識 JavaScript: Day 25 原型與繼承](https://ithelp.ithome.com.tw/articles/10194356)
2. [JS201 進階 JavaScript：那些你一直搞不懂的地方](https://lidemy.com/courses/enrolled/390599)