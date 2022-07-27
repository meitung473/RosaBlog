---
title: 筆記 | JavaScript - 事件機制原理 & 事件代理
tags:
  - JavaScript
categories:
  - '2022'
  - '04'
author: Rosa Hong
date: 2022-04-12 10:24:14
description:
---

## 前言  
事件是什麼 ? 為什麼要用事件代理呢 ?  
在不了解事件的流程與運作機制，是不是遇過點一下元素  
結果跑出兩次以上的結果  
透過本篇幫自己釐清事件各種大小事
<!-- more -->  

## EventFlow : 網頁元素接收事件的順序  
![EventFlow](https://dsm01pap006files.storage.live.com/y4m9V74R0Rbxh2VocqOo5K1vnxJNiyqAL1pr2Vw2o2yxenGxG5Uq3iMSm5n1bXDNs7hubkxY7rtnZfQtgz3tSNPDcX22k_WWBKKto5w_fnALPe1MSGDNDjlF11Yr7svwp8O0b8PmsLyMikVMa0Be3EWrsugI0ZsfWzkq9aYgX7R48Jm2YL0dJs6VWHvl3tqxowk?width=1208&height=1160&cropmode=none)

- `Capture phase` : 捕獲階段指由 **上到下** 傳下去的
- `Target phase` : 目標階段，本身被作用的目標才會在這個階段
- `Bubbling phase` : 冒泡階段 指由 **下往上** 傳去的

透過 `e.eventPhase` 可以看見事件的階段  
當我點下 link  
```javascript
link.addEventListener('click',function(e){
  console.log('link capturing',e.eventPhase);
},true)
link.addEventListener('click',function(e){
  console.log('link bubbling',e.eventPhase);
})
box.addEventListener('click',function(e){
  console.log('box capturing',e.eventPhase);
},true)
box.addEventListener('click',(e)=>{
  console.log('box bubbling',e.eventPhase);
})
```

```javascript
box capturing 1  // CAPTURING_PHASE
link capturing 2 // AT_TARGET 
link bubbling 2 // AT_TARGET 
box bubbling 3 // BUBBLING_PHASE
```
出現的代碼就是事件的不同階段  

### 事件冒泡 (Event Bubbling)
啟動事件的元素往上傳遞到 **根節點** (document)  
```html
<!DOCTYPE html>
<html>
<head>
  <title>TITLE</title>
</head>
<body>
  <div>CLICK</div>
</body>
</html>
```
冒泡傳遞方向 :    
CLICK 事件本身元素 👉 body 👉 html 👉 document   

### 事件捕獲 (Event Capturing)
```html
<!DOCTYPE html>
<html>
<head>
  <title>TITLE</title>
</head>
<body>
  <div>CLICK</div>
</body>
</html>
```

捕獲傳遞方向 :  
document 👉html 👉 body 👉CLICK 事件本身元素  

### 事件是哪種機制 ? 
兩種都會，當我按下按鈕，如果外層元素也有綁定 **事件**，同時也會被觸發

```html
<div class="outer">
	<div class="inner">
	</div>
</div>
```

```javascript
document.querySelector('.outer').addEventListener('click',function(){
    console.log('hi')
  })
document.querySelector('.inner').addEventListener('click',function(){
    console.log('hello')
})
```
結果
```javascript
hello
hi // 冒泡而觸發
```

點擊 `inner` 時，同時出現 hello 跟 hi  
因為冒泡的關係，outer 也被觸發。  

### 事件的捕獲 & 冒泡順序 ?
- 對於 **非觸發事件** 本身的元素
> 先捕獲後冒泡

- 事件本身   
  在以往的文章中都是 **按照程式碼執行的順序**  
  當我試著執行後卻發現即使把冒泡放在前面，捕獲放後    
  一樣都是 **先捕獲再冒泡**   
  仔細一查，才發現原來是 Chorme 89 以後的版本都會先捕獲再冒泡    
  89 之前的版本就會是看程式碼執行的順序    
  > 出現這樣的狀況是因為 shadow DOM 引起的，詳細原因請參考 [這篇](https://juejin.cn/post/6965682915141386254#heading-2)  

所以，新版的瀏覽器不管是哪個都是 **先捕獲再冒泡**  

## 事件的註冊綁定
1. `on-event` : 有 HTML 中 inline on-event；JS on-event 接 function
2. `EventListener` : addEventListener、removeEventListener...等  

### on-event  
1. Html
	```html
	<div 
	onclick="console.log('click')">click 
	me</div>
	```
	目前很少這樣寫，其一原因是不好維護  
2. 非 Html
	```javascript
	let btn = document.querySelector('.btn')
	btn.onclick = function(){
		console.log('click')
	}
	```

我們最常看見 `window.onload` 也是事件的 on-event

### EventListener
#### addEventListener
有三個參數
1. 事件名稱
2. 事件處理器 (觸發時執行的 function)
3. Boolen ，以 「捕獲」 或「冒泡」 機制執行， `false` (不指定) 為 冒泡
	
> 第三個布林值，不是改變事件傳遞的方式，而是在 **哪裡進行監聽**

```javascript
// 冒泡
btn.addEventListener('click', function(){ console.log('HI'); });
btn.addEventListener('click', function(){ console.log('HI'); }, false);
// 捕獲 
btn.addEventListener('click', function(){ console.log('HELLO'); }, true);
```

#### removeListener
跟 addEventListener 一樣，如果要解除的話 handler 的 function 必須是同一個實體才行  
> **為什麼說是同一實體 ?**   
> 回想這個例子 `{} === {} // false`
> function 也是 Object 的一種  
> 匿名函式沒有指定給變數時，都是屬於不同的記憶體位址    

事件監聽使用匿名函式的寫法，就像潑出去的水，回不來了 🤔  
```javascript
var btn = document.getElementById('btn');

btn.addEventListener('click', function(){
  console.log('HI');
}, false);

// 移除事件，但是沒用
btn.removeEventListener('click', function(){
  console.log('HI');
}, false);
```

解決此問題，把 handler 的 function **獨立出來**  
```javascript
var btn = document.getElementById('btn');
var clickhandler = function(){
	console.log('HI');
}
btn.addEventListener('click',clickhandler}, false);
// 移除事件，ok!
btn.removeEventListener('click',clickhandler, false);
```

### on-event v.s EventListener
- `EventListener` : 可以重複指定多個「處理器」(handler) 給同一個元素的同一個事件
- `on-event` : 只認一個，後面多寫的會覆蓋前面的事件

- on-event
```javascript
var btn = document.getElementById('btn');
btn.onclick = function(){
    console.log('hi!') // 不會出現
};
btn.onclick= function(){
    console.log('hello!') // 會出現 hello
}; 
```
- EventListener
```javascript
var btn = document.getElementById('btn');
btn.addEventListener('click',function(){
    console.log('hi!') // 出現 hi
}});
btn.addEventListener('click',function(){
    console.log('hello!') // 再出現 hello
}});
```

## EventHandler 中的 "event"
事件物件會依照 **觸發的事件**(click、change) ，內容會有稍微不同  
通常看到 `event` 寫成 `e` 、`evt` 是為了方便，也可以自訂譯名稱  
只是大家會選擇有意義的名稱且好記    

可以試著在事件觸發印出 `e`   
```javascript
btn.addEventListener('click',function(e){
    console.log(e)
})
```  
常見的屬性   
-   `type` : 表示事件的名稱
-   `target` : 表示觸發事件的元素
-   `bubbles` : 表示這事件是否是在「冒泡」階段觸發 (`true` / `false`)
-   `pageX` / `pageY` : 表示事件觸發時，滑鼠座標在網頁的相對位置  

### 阻擋預設行為 event.preventDefault()
>並不會阻止事件向上傳遞 (事件冒泡) 

```javascript
let link = document.querySelector('.link');
let box = document.querySelector('.box');

link.addEventListener('click',function(e){
  e.preventDefault();
  console.log('我')
})
box.addEventListener('click',function(){
  console.log('box') // 依然會出現
})
```

`on-event` 在 eventhandler function 的**最後**加上 `return false;` 也會有 `event.preventDefault()` 的效果  

```javascript
let link = document.querySelector('.link');

// 等於 e.preventDefault()
link.onclick=()=>{
    console.log('我')
  return false;
}
```

#### 應用範例一 : 表單 submit 前的檢查  
```html
<form method="POST" action="url">
    <label>
        帳號
        <input type="text" name="username"/>
    </label>
    <label>
        密碼
        <input type="password" name="password"/>
    </label>
    <input type="submit"/>
</form>
```
使用者按下 submit 按鈕會送出表單  
前端可以先做驗證，確認使用者的輸入是不是符合   

```javascript
let form = document.querySelector("form")
form.addEventListener('submit',function(e){
    //先阻止送出
    e.preventDefault();
    let username = document.querySelector("[name='username']").value
    let password = document.querySelector("[name='password']").value
    // 檢查欄位
    if(!username) return alert('請輸入使用者帳號')
    if(!password) return alert('請輸入密碼')
    // 都有輸入就送出
    form.submit();
})
```

#### 應用範例二 : 避免超連結造成網頁跳轉    
按下 `a` 的時候會找網頁的錨點，如果沒有的話會跳 `#` 井字號  
如果不想要出現井字號呢 ?  
有些是對外連結，有些是內連結使用，總不能阻擋每個吧 !

這邊用我使用 `class` 分開外部連結
```html
<a class="link" href="www.example.com">我是普通超連結</a>
<a href="#">gotoTop</a>
```

```javascript
// 選沒有 link class 的 a 標籤
let actionLink = document.querySelectorAll('a:not(.link)')
actionLink.forEach( a => {
    a.addEventListener('click',function(e){
        e.preventDefault();
        // 判斷各個 actionLink 要做的事
    })
})
```
這樣就可以分出哪些是外部連結，哪些是內網頁連結，而且不會出現 `#` 井字號 😃

### 阻擋事件冒泡傳遞 event.stopPropagation()
> 阻止的動作，加在冒泡發生的元素上

如果不要讓 box 出現，加在想停止冒泡的地方 `event.stopPropagation()`
```html
<div class="box">
    <a href="#" class="link">link</a>
</div>
```

```javascript
let link = document.querySelector('.link');
let box = document.querySelector('.box');

// 這裡會發生冒泡，要阻止上傳
link.addEventListener('click',function(e){
  e.stopPropagation();
  console.log('hi')
})
box.addEventListener('click',function(e){
  console.log('box') // 不會出現
})
```
你可以試著註解 `e.stopPropagation();` 會發現當你按下 link  
因為 link 冒泡機制導致 box 的事件也觸發而印出 `'box'`

#### 阻止任何的傳遞 event.stopImmediatePropagation()
如果同一個元素有掛兩個 `addEventListener`  
點擊時兩個都會在 `Target phase`   
A 跟 B 事件一樣會觸發
在 A 加入 `stopImmediatePropagation()` 會把 B 停掉  

以上面的例子來說，link 掛兩個事件
```javascript
// A 事件
link.addEventListener('click',function(e){
  e.stopImmediatePropagation();
  console.log('i am A')
})
// B 事件
link.addEventListener('click',function(e){
  console.log('i am B') //不會出現，在 A target pharse 阻止 B 冒泡階段發生
})
box.addEventListener('click',function(e){
  console.log('box') // 不會出現，因為阻止了冒泡
})
```

#### 應用範例 : label & input  
label 跟 input 的組合需要多一個 id  
為了不浪費 id，我們常常會用 label 把 input 包起來。  

```html
<label>
	<input type="checkbox"/>
	開關
</label>
```

在 `label` 綁上監聽事件
```javascript
let labelone= document.querySelector('label');

labelone.addEventListener('click',function(e){
  console.log('hi')
})
```
神奇的是，hi 會出現兩次    
checkbox 也會接收到 click 事件，改變了狀態    
發生冒泡到 label 元素，再次觸發 label 的事件    

**重點複習**  
> **阻止的動作，加在冒泡發生的元素上**

冒泡發生的是 **input** ，所以 `stopPropagation` 是要加在 input 而非 label
```javascript
let labelone= document.querySelector('label');
let inputone= document.querySelector('input');

labelone.addEventListener('click',function(e){
  console.log('hi')
})
inputone.addEventListener('click',function(e){
  e.stopPropagation();
})
```

### 事件 "本身" 指的是 ? target v.s currentTarget (this)  
我們知道在 function 當中是可以使用 `this`    
那這邊的 `this` 是指什麼呢 ?   
```javascript
let labelone= document.querySelector('label');

labelone.addEventListener('click',function(e){
  console.log(this.tagName) // LABEL
})
```
>`this` 代表的會是「觸發事件的**目標**」元素  
> 也就是 `event.currentTarget` 而不是 `e.target`。

那 `e.target` 指的是 ?
```javascript
let labelone= document.querySelector('label');
labelone.addEventListener('click',function(e){
  console.log(e.target.tagName, 1);
  console.log(this.tagName, 1);
})
let inputone= document.querySelector('input');
inputone.addEventListener('click',function(e){
  console.log(e.target.tagName, 2);
  console.log(this.tagName, 2);
})
```
點擊 label
```javascript
"LABEL" 1 // e.target
"LABEL" 1 // this
"INPUT" 2 // e.target
"INPUT" 2 // this
"INPUT" 1 // checkbox 冒泡上來的而觸發 labelone，e.target
"LABEL" 1 // checkbox 冒泡上來的而觸發 labelone， this
```

> `e.target` 其實是「觸發事件的元素」

如果不考慮事件傳遞的情況下，`this` 實質上就等同於 `e.target` 了。

## 事件指派 (Event Delegation)
用 JavaScript 新增的元素並不會綁到事件  
```javascript
const list = document.querySelectorAll('.list');
const items = document.querySelectorAll('.list-item');
// 一個個手動加入
items.forEach(item => {
	item.addEventListener('click',function()
	{
		console.log(e.target.textContent);
	})
})

let newItem = document.createElement('LI');
let txt = document.creatTextNode('new');
newIten.appendChild(txt)
list.appendChild(newItem)
```
`newItem` 不會有 click 事件  
為避免每次新增要重新綁定事件，又要移除監聽，造成 memory leak 的嚴重問題  
**事件指派** 是比較好的做法。

**事件代理人** 透過判斷 **目標節點**，再執行動作

```javascript
const list = document.querySelectorAll('.list');
// list 直接看底下的子元素
list.addEventListener('click',function(e){
	if(e.target.tagName.toLowerCase()==='li'){
		console.log(e.target.textContent);
	}
})

let newItem = document.createElement('LI');
let txt = document.creatTextNode('new');

newIten.appendChild(txt)
list.appendChild(newItem)
```
搭拉 ! `newItem` 就有點擊的效果

## 總結
事件是 JavaScript 的基本，當我們了解機制的運作  
遇到奇怪的觸發多次時，記得想起事件的流程  
> 先捕獲再冒泡  

還有相關的  
- 阻止預設行為 `preventDefault` 
- 阻擋冒泡行為 `stopPropagtion`

## 參考
1. [重新認識 JavaScript: Day 14 事件機制的原理](https://ithelp.ithome.com.tw/articles/10191970)
2. [重新認識 JavaScript: Day 15 隱藏在 "事件" 之中的秘密](https://ithelp.ithome.com.tw/articles/10192015)
3. [DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)
4. [Chrome 89 更新事件触发顺序，导致99%的文章都错了（包括MDN）](https://juejin.cn/post/6965682915141386254#heading-2)