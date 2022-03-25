---
title: ⟬ 筆記 ⟭ JavaScript - 淺拷貝 & 深拷貝 
tags:
  - JavaScript
categories:
  - [Frontend,JavaScript]
author: Rosa Hong
description:
---

## 淺拷貝 (shallow copy)
淺拷貝，複製值，記憶體位址仍然指向同一處

拷貝一個 obj

```javascript
let obj1 = {a: 1}
let obj2 = obj1
obj1.a = 2
console.log(obj2.a)  // 2
```
JavaScript 對 object 的操作是 call by reference，複製值但是指向同一個記憶體位址

### 看似深拷貝的淺拷貝
- 偽深拷貝
```javascript
let obj1 = {a: {a: 1}}
let obj2 = {a: obj1.a}
obj1.a = 2
console.log(obj2.a)  // 1
```
雖然 obj2 如預期跟 obj1 指向的 a 不同，但是骨子裡還是同一個位置  
`obj1.a.a = 2`，依然會改動到 obj1 的值  

> 只要超過一層，object 複製過去的都只是表層

### 解構 (...) (必知)
-   … operator (解構式)， 也是超過一層就變淺拷貝
	```javascript
	let obj1 = {a : {a : 1}}
	let obj2 = {...obj1}
	obj1.a.a = 2
	console.log(obj2.a.a)
	```

### Object.assign
- 利用 `Object.assign(<target>,<source>)`，跟展開差不多
	將來源 object 分配給指定的 object
	```javascript
	let obj1 = {a : 1}
	let obj2 = Object.assign({},obj1)
	obj1.a = 2
	console.log(obj2.a)
	```
	> MDN 有提到這絕對不是深拷貝 
	> [Object.assign() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	> Object.assign 的 source 也可以好幾個，也可以拿來做合併使用  

### 手動式拷貝
遍歷所有 key 跟 value 裝到新的容器中  
```javascript
function copy(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }

  var newObj = obj.constructor === Array ? [] : {}
  for (var key in obj) {
    newObj[key] = obj[key]
  }
  return newObj
}
var a = {b: 'bb', c: 'cc',  d: {e: 'ee'}}
var b = copy(a)
console.log(b) // { b: 'bb', c: 'cc', d: { e: 'ee' } }
```
1. 先檢查類型是不是 obj
2. 再進一步檢查建構子是 Array 還是真的 object
3. 有 key 的是 obj，做迴圈把值給取出來

跟深拷貝差在沒有把多層的結構拆解

## 深拷貝 (deep copy)
深拷貝，複製值，但是記憶體位址不同處  

- 手動複製
- 只有一層結構，可以使用 ES6 的展開 (...) 以及 Object.assign()

### 轉成 JSON 再轉回來 (常用)
- `JSON.parse(JSON.stringify(obj))`
	把物件先轉成字串再轉成物件，能保證指向不同的記憶體位址  
	```javascript
	let obj1 = {a : {a : 1}}
	let obj2 = JSON.parse(JSON.stringify(obj1))
	obj2.a.a = 3
	console.log(obj1.a.a) // 1
	console.log(obj1.a === obj2.a) // false
	```
- 封裝成 function 
	```javascript
	var cloneObj = function(obj){
	var str, newobj = obj.constructor === Array ? [] : {};
		if(typeof obj !== 'object'){
				return;
		} else if(window.JSON){
				str = JSON.stringify(obj), 
				newobj = JSON.parse(str); 
		} else {
				for(var i in obj){
						newobj[i] = typeof obj[i] === 'object' ? 
						cloneObj(obj[i]) : obj[i]; 
				}
		}
		return newobj;
	};
	```
	1. 檢查 obj 的建構子是陣列或物件，如果是陣列就回傳空陣列，不是的話就是空物件。因為 typeof array 依然是 object。
	2. 如果不是物件類型的就 return
	3. 確定瀏覽器是不是有支援 JSON 格式，如果有就可以使用深拷貝的 **轉字串再轉物件的方法**
	4. 如果沒有，就是丟進遞迴內把多層 obj 給重複執行 cloneObj ，直到剩下一層回傳 obj 本身

#### 缺點
但是這個方法並非天衣無縫，遇到 `undefined` 、`function` 或是 `Symbol` 物件會被忽略   
null 不會被忽略，因為 `typeof null` 是 object  

### 加強版深拷貝 (待研究)
避免 JSON 轉物件的缺陷，不包含 undefined 、 function 和 Symbol 等等的
1. 完整拷貝，包含 undefined、key 為 symbol
2. 考慮物件循環引用，物件包物件這類的

```javascript
function deepCopy(obj, cache = new WeakMap()) {
  // 基本型別 & function
  if (obj === null || typeof obj !== 'object') return obj
  // Date 及 RegExp
  if (obj instanceof Date || obj instanceof RegExp) return obj.constructor(obj)
  // 檢查快取
  if (cache.has(obj)) return cache.get(obj)

  // 使用原物件的 constructor
  const copy = new obj.constructor()

  // 先放入 cache 中
  cache.set(obj, copy);
  // 取出所有一般屬性 & 所有 key 為 symbol 的屬性
  [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)].forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })
  return copy
}
```

#### 為什麼使用 WeakMap ?  
object 的 key 只能是 string ，WeakMap 是的 key 是一個 object (null 除外)，值可以是任一 javascript 型別，( Symbol 不能當 key )    

key 所指向的 object 不會被垃圾回收機制 (garbage collection) 計入參考，這也就是 weak 的意思 - 弱引用 (weakly reference)。

參考 : 
- [ES6 Map/WeakMap 物件 - JavaScript (JS) 教學 Tutorial (fooish.com)](https://www.fooish.com/javascript/ES6/Map-and-WeakMap.html)
- [JS WeakMap应该什么时候使用 « 张鑫旭-鑫空间-鑫生活 (zhangxinxu.com)](https://www.zhangxinxu.com/wordpress/2021/08/js-weakmap-es6/#comments)  


### loadsh 的 _.cloneDeep
```javascript
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f); // false
```

### Object.create() (待研究)
```javascript
function deepClone(initalObj, finalObj) {    
  var obj = finalObj || {};    
  for (var i in initalObj) {        
    var prop = initalObj[i];        
    // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if(prop === obj) {            
      continue;
    }        
    if (typeof prop === 'object') {
      obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
    } else {
      obj[i] = prop;
    }
  }    
  return obj;
}
```
1. 參數有 source 跟 target
2. target 如果本身有東西就往上加，沒東西就是空物件  
3. (不太清楚) 避免出現相同的 key ，導致後面的 key 覆蓋前者  
4. 如果 prop === obj 不做任何事
5. 如果 prop 類型是 object，要檢查是 Array 還是一般的 object，不是的話建立一個新的記憶體位置放 object

這跟 [轉成 json 再轉回來](#轉成-json-再轉回來) 的 封裝 function 很像 

#### 缺點
當有 null 的時候不會運行  

### JQuery 的 $.extend
```javascript
var $ = require('jquery');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = $.extend(true, {}, obj1);
console.log(obj1.b.f === obj2.b.f);
```
`$.extend(<deep?>,<target>,<source>)`

當值是 null & undefined 會被忽略  

[jQuery.extend() | jQuery API Documentation](https://api.jquery.com/jquery.extend/)

---

- 概念 : [關於JS中的淺拷貝(shallow copy)以及深拷貝(deep copy) | by Andy Chen | Andy的技術分享blog | Medium](https://medium.com/andy-blog/%E9%97%9C%E6%96%BCjs%E4%B8%AD%E7%9A%84%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E4%BB%A5%E5%8F%8A%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-5f5bbe96c122)
- 實作 : [js深拷贝和浅拷贝及其实现方式 - SegmentFault 思否](https://segmentfault.com/a/1190000039310119)
- 實作 : [浅探js深拷贝和浅拷贝 - SegmentFault 思否](https://segmentfault.com/a/1190000016970483?utm_source=sf-similar-article)
- [14. [JS] 深拷貝是什麼？如何實現？ - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天 (ithome.com.tw)](https://ithelp.ithome.com.tw/articles/10223178)