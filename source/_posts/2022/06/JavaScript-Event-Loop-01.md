---
title: 筆記 | JavaScript - Event Loop 事件循環 (I)
tags:
  - JavaScript
categories:
  - '2022'
  - '06'
author: Rosa Hong
date: 2022-06-18 00:54:45
---

## 前言
在 JavaScript 中，非同步的操作是很常見的，舉凡滑鼠事件、發出請求獲取資料...等，反過來問，如果這些操作是 **同步** 的，你可能操作後，畫面就像被卡住了，要等到目前的程式執行完畢才能繼續瀏覽。

Event Loop 的概念如何幫我們了解這件事，具體怎麼做呢 ? 本篇主要是幫助我自己釐清 Event Loop 的概念。

<!-- more -->
## 為什麼會有 Event Loop ? 
JS 的語言特性是
1. Single Thread (單線程)
2. Synchronous (同步)

有時候語意上很令人誤解，同步 **並不是同時做很多事**，而是你只能一次做一件事。那為什麼我們可以在 **瀏覽器** 中操作按鈕獲取資料的同時又能做別的事 ?    

沒錯，特別指出 **瀏覽器**，因為在不同的執行環境下，才能讓我們執行非同步的操作。(node 也是一種 JavaScript 執行環境，其中也有提供非同步的 API 來操作)

JavaScript 在 Runtime (執行環境) 是同步的，而是瀏覽器提供 Web APIs 讓我們透過 Event Loop 搭配非同步操作，才能"同時"處理很多事。

### 關於 Event Loop 的名詞
#### Stack (堆疊)
Stack 是資料結構的一種，遵守 LIFO (Last In,First Out)。

JavaScript 中的 Call Stack 會記錄目前執行到程式的部分，因為 JavaScript 是 Single Thread (單線程) ，只會有一個 Call Stack。

**那 Call Stack 怎麼運作呢 ?**
當執行某個函式，會將目前執行的函式放在 Stack 的最上層，如果函式執行 `return` 就會從 Stack 最上方抽離。

**範例**  
```js
function a(){
	console.log('a')
}
function b(){
	console.log('b')
	a()
}
function c(){
	console.log('c')
	b()
}
c();
```
跟著程式走 :  
1. 執行 c() ，把 c() 放入 Call Stack 中 1

 | order | stack          |
 | ----- | -------------- |
 | 1     | c () **(now)** |


2. 印出 'c'，接著執行 b()，把 b() 放入 Call Stack 中   

 | order | stack         |
 | ----- | ------------- |
 | 2     | b() **(now)** |
 | 1     | c ()          |

3. 印出 'b'，接著執行 a()，把 a() 放入 Call Stack 中   
	
 | order | stack         |
 | ----- | ------------- |
 | 3     | a() **(now)** |
 | 2     | b()           |
 | 1     | c ()          |

4. 印出 'a'，a() 後面沒有程式碼，代表執行完畢，抽離 Stack 中  
	
 | order | stack              |
 | ----- | ------------------ |
 | ~~3~~ | ~~a() ----> 抽離~~ |
 | 2     | b()                |
 | 1     | c ()               |

5. 後面跟步驟 4 一樣，依序抽離，直到 c() 執行完畢，後面也沒有程式碼，最後 Call Stack 為空

解釋了上面提及的 Stack **Last In,First Out** 的原因。  

#### Task Queue (任務佇列)
又稱作 Callback Queue，在 Web APIs 的 function 執行完後，把 callback (接著要執行的 function) 放到 Task Queue 等待。

👉[參考 Loupe 視覺化工具](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

在這個例子中，有 setTimeout 與 click 事件。當程式執行時 : 
1. Button 事件並沒有觸發，callback function 並不會執行，先放置到 Web APIs 等待
2. 第 7 行排進 Call Stack ，印出 'Hi !'，執行完畢移出 Call Stack 外
3. setTimeOut 放置到 Web APIs 等待，並且開始算 5 秒鐘
5. 第 13 行排進 Call Stack ，印出 'Welcome to loupe.'，執行完畢移出 Call Stack 外，到這邊靜態的程式碼都執行完畢，Call Stack 變成空的 。(同一時間 setTimeOut 還在跑秒數)
6. 過了大概 5 秒鐘， 把第 9 行 setTimeOut 的 callback `timeout()` 放到 Callback Queue。
7. **此時 Call Stack 為空的，把 Task Queue 第一順位的 timeout() 搬到 Call Stack 執行** (此時會看見橘色的旋轉鈕轉動，代表 Event Loop)
8. 第 10 行排進 Call Stack ，印出 'Click the button'，timeout() 執行完畢，移出 Call Stack 外，Stack 又變成空的。

**如果這時候按下按鈕呢 ?**     
1. 按下後，onClick 事件執行，排進 Call Stack
2. 執行第 2 行 setTimeout ，把 setTimeout 放置到 Web APIs 等待，並且開始算 2 秒鐘，onClick 事件執行完畢，移出 Call Stack 外，Stack 又變成空的
3. 過了大概 2 秒鐘， 把 setTimeOut 的 callback `timer()` 放到 Callback Queue。
4. **此時 Call Stack 為空的，把 Task Queue 第一順位的 timer() 搬到 Call Stack 執行**
5. 第 3 行排進 Call Stack，印出 'You click the button !'，執行完畢，移出 Call Stack 外，Stack 又變成空的。

以上是一步步跟著的 Event Loop 的基本運作

#### Blocking (阻塞)
> 那如果一直按按鈕呢 ? 

會發現一個個 onClick 事件的 callback 會被排進 Callback Queue 正在排隊等待，setTimeout 同時也在排隊，也要等待 onClick 事件結束，移出 Call Stack 外，透過 Event Loop 檢查 Call Stack 是否為空...(略)，重複一直執行。

這時候畫面就好像靜止了，setTimeout 的 2 秒也不是很精準，這就是發生了 Blocking 。

如果會以為同時印出，要回想 **JavaScript 是同步的** 這句話，執行的結果會是依序出現，不會一下子 "啪!" 全部出來。

##### 阻塞常見的例子 : 無限滾動載入資料
如果直接 : 
```js
window.addEventListener('scroll',function fetchData(){
	// Ajax 獲取資料
})
```
發現每一滑，都會觸發 callback 。就像你一直按按鈕，然後發出請求資料，排進 Web APIs 並且等待資料的 response ，再排進 Callback Queue，這時候會造成 Blocking。為避免一直觸發 scroll 事件，通常會搭配 lodash 的 debounce。
### 小結 : Event Loop 是...
一種機制，讓 JavaScript 可以同時做很多事
> 當 Call Stack 為空時，把 Callback Queue 等待的 callback function 放進 Call Stack 來執行

## 幾個 Event Loop 的例子 
來自 [What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) 提到的範例  

### 沒那麼精準的 setTimeout 與 setInterval 
setTimeout 與 setInterval 都是 Web APIs ，會排進 Callback Queue 並且等到 Call Stack 為空的時候才執行。所以不能保證一定精準 x 秒後執行，但至少執行間距的最小秒數是 x 秒。

**常見的 0 秒 setTimeout**  
乍看之下會以為 0 秒是立即執行，其實不然。  
```js
setTimeout(function(){
	console.log('hello')
},0)
console.log('hi')
```
結果是 `hi` 先印出，再印出 `hello`。

跟著步驟走 : 
1. setTimeout 放入 Web APIs 等待 0 秒後，放入 Task Queue 等待
2. `console.log('hi')` 排進 Call Stack，並且執行
3. 印出 'hi' ，執行結束，移出 Stack 外
4. 此時的 Call Stack 是空的，而且 Task Queue 的第一位是 setTimeout 的 callback ，排進 Call Stack
5. 執行 `console.log('hello')` 
6. 印出 'hello'，執行結束，移出 Stack 外
7. 程式碼執行結束

這也是為什麼 setTimeout  沒那麼 精準的原因，因為必須等到  Call Stack 為空才會執行，導致中間可能會有誤差。

### 多個 setTimeout
遇到 setTimeout 常會問 console.log 的結果是 ?
```js
setTimeout(function timeout() {
console.log('hi')
}, 1000)

setTimeout(function timeout() {
console.log('hi')
}, 1000)

setTimeout(function timeout() {
console.log('hi')
}, 1000)

setTimeout(function timeout() {
console.log('hi')
}, 1000)
```

1. 每間隔 1 秒後，依序印出 'hi' (1 秒 'hi'，隔 1 秒 'hi'...)
2. 在 4 秒後，同時印出
	```
	4 (hi)
	```
3. 至少間距 1 秒以後，一次印出 4 次的 
	```js
	hi
	hi
	hi
	hi
	```
.  
.  
.  
.  
.  
.  
.  
結果是**至少間距 1 秒以後，一次印出 4 次的 hi** 。經過 1 秒後即使已經排定到 Callback Queue，但是如果這時候 Call Stack 還不是空的，Queue 就會發生 Blocking 塞車在這裡等待，等到 Stack 空再依序印出 hi。如果 1 秒短到看不見，可以調成更久的時間。

### 同步與非同步的 callback
我覺得這個例子很有意思，我們知道頻繁的呼叫 callback function 會造成 Blocking 的情形，但是 **Call Stack 塞車或是 Callback Queue 塞車有什麼差別呢 ?**  

透過這個例子我自己覺得更清楚知道有了 Event Loop 到底幫助在哪。 

在這裡的 callback function 有兩種
1. 在函式中呼叫另一個函式 (同步的 callback，都在 Call Stack 執行完畢)
	```js
	[1,2,3,4].forEach(function(i){
			console.log(i)
	})
	```
2. 像是跟 Web APIs 有關的，例 : click 事件後的 callback function 不會馬上執行，而是等到 Event Loop 後才會。
	(非同步的 callback  差別在於，有排隊到 Callback Queue 再到 Call Stack)
	```js
		[1,2,3,4].forEach(function(i){
				setTimeout(()=>{
					console.log(i)
				},1000)
		})
	```

#### 同步的 callback 發生了什麼事
如上面的第一個 callback 範例，我們必須等到 forEach 印完所有元素，才能做其他的事。這段時間造成 Call Stack 的 Blocking，導致畫面不能動作。

一般來說，瀏覽器會在每 16.6 毫秒的時候重新渲染畫面，但這時候 Call Stack 還在處理事情，導致畫面的解析被延遲，在影片中講者有開啟模擬畫面 render 的模擬，render 一直被占據紅線。

#### 改成非同步的 callback 差別在哪 ? 
上面不斷強調 Event Loop 是 Call Stack 為空時，才會把 Callback Queue 推上 Stack 執行。而在 Call Stack 空的期間，提供瀏覽器執行畫面重新渲染的機會，才不會因為忙碌導致卡住。

> 簡單來說 : **畫面渲染的優先度是高於 Callback Queue 的 callback function** 

這也是為什麼在影片講者提到不要造成耗時的程式碼放在 Call Stack ，因為 Call Stack 賽車沒辦法重新渲染畫面。

也可以參考這篇 Jack 大的實作範例二，文章也有提到什麼時候會 rendering，助於瞭解整個流程
👉 [Event Loop 運行機制解析 - 瀏覽器篇 - 技術雜記 Technology Notes - Jack Yu | 傑克](https://yu-jack.github.io/2020/02/03/javascript-runtime-event-loop-browser/#%E7%AF%84%E4%BE%8B%E4%BA%8C)

## 結語
目前提到瀏覽器的 Event Loop ，至於 Node 的 Event Loop 我還沒研究，未來會再研究補充。不過還有 mircoTask 與 macroTask 還沒補完 QQ，才能算是了解 Event Loop。

如果有誤麻煩請寄信告訴我，我會非常感謝


## 參考
1. [[筆記] 理解 JavaScript 中的事件循環、堆疊、佇列和併發模式 | PJCHENder 那些沒告訴你的小細節](https://pjchender.blogspot.com/2017/08/javascript-learn-event-loop-stack-queue.html)
2. 講解 Event Loop 的影片(有中文字幕) : [What the heck is the event loop anyway? | Philip Roberts | JSConf EU - YouTube](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
3. 模擬 Event Loop 的網頁 : [latentflip.com](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
4. [Event Loop 運行機制解析 - 瀏覽器篇 - 技術雜記 Technology Notes - Jack Yu | 傑克](https://yu-jack.github.io/2020/02/03/javascript-runtime-event-loop-browser/#%E7%AF%84%E4%BE%8B%E4%BA%8C)