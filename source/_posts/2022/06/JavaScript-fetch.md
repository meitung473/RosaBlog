---
title: 筆記 | JavaScript - fetch 獲取遠端資料
tags:
  - JavaScript
categories:
  - '2022'
  - '06'
author: Rosa Hong
date: 2022-06-22 12:45:11
description:
---

## 前言
想要獲取遠端的資料可以使用 AJAX ，在 ES6 之前大多會使用 JQuery 的 `$.ajax`  或者原生的 XHR，而在 HTML5 則提供 fetch 使用，更多時候會使用 axios 套件。  
本篇記錄 fetch 的使用方式與常見的使用誤區。
<!-- more -->

## fetch
fetch 是 HTML5 原生獲取遠端的方式，其操作也十分簡單
```javascript
fetch(url)
fetch(url,{obj}) // 第二個參數為 options
```
沒有 options 的物件，只有網址的話是 `GET`。
fetch 回傳的是一個 Promise 物件，Promise 簡單來說是 **處理非同步操作的特殊物件**，有關於 Promise 之後會再補充。

### then & catch
如果要拿到回傳的 response ，可以透過 `then`。要接 .then 前面的物件必要類型為 Promise，而 `fetch()` 回傳的就是一個 Promise 物件。  
```javascript
let endPoint = 'https://restcountries.com/v3.1/name/Taiwan'
fetch(endPoint).then(response =>{
	console.log(response)
})
```

>是 `fetch().then` 而不是 **fetch.then**，是 fetch 這個函式裡面回傳 Promise
 
then 接收的參數是 Promise 中 resolve 或是 reject 的函式運行的結果，通常是 resolve，如果是 reject 則會用 `.catch` 來作錯誤處理。

```javascript
fetch(endPoint).then(response =>{
	console.log(response)
}).catch(err=>{
	console.log(err)
})
``` 
會被丟進 catch 處理的 err 並不是像 XHR status 404 或 500 這類的，而是可能網路連線錯誤或者網址有誤導致不能發出 request 。

### HTTP 狀態碼處理 Response.status &  Response.ok
只要是 HTTP 狀態碼 400 以上的我們通常會在 XHR 做錯誤處理
```js
xhr.onerror = function(err){...}
```
但是 fetch 不管狀態碼多少，只要有正確的發出請求後回傳的 response 都會進入 resolve ，如果要處理像 onerror 的錯誤可以透過 .then 中 response 的 status 或 ok。
- response.status : 回傳結果的 HTTP code
```js
fetch(endPoint).then(response =>{
	console.log(response.status) // 200 代表成功
})
```
- response.ok : 回傳 boolean ，如果 HTTP code 在 200~299 就回傳 true
```js
fetch(endPoint).then(response =>{
		if(response.ok){
			console.log('success')
		} 
})
```

### Response.text() & .json()
可以將 response 解析成想要的形式
```javascript
fetch(endPoint).then(response =>{
	return response.text()
	// return response.json() 兩者擇一
})
```
- `.text()` : 直接印出文字
- `.json()` : 自動幫我們解析 json 格式的資料

其他種類的格式 : 
- `.blob()`：把資料轉成Blob物件
-  `.formData()`：把資料轉成FormData物件
-  `.arrayBuffer()`：把資料轉成二進制數組

> 這些方法 **只能擇一**，一但被解析過就不能重複再使用其他的函式解析了。
 
## POST
POST 也很簡單，跟 `$.ajax()` 的操作很像
```js
// 第二個參數可以攜帶 header 、body 或 Http 等資訊
const data = {name:'Rosa'}
fetch(endPoint,{
	method: 'POST',
  body: JSON.stringify(data),
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then((response)=>{
	console.log(response)
})
```
fetch 的 options 還有包含其他常見的 HTTP 處理，
在 body 中如果我們要上傳的格式是 JSON 檔，記得要將內容轉換成 JSON 格式。
> **GET 與 HEAD 是沒有 body 的**

## fetch 的 Headers
以往在 XHR 要加上 Header 
```js
XMLHttpRequest.setRequestHeader(header, value);
```
在 fetch 要加上 Header，可以直接加，或者 new 出一個 Header 容器來放置所需的內容。

```js
// 直接使用 headers
fetch(url,{
	headers:{
		//...
	}
})
//透過實例出一個 Headers
fetch(url,{
	headers: new Headers({
		//...
	}),
})
```

### Content Type
表單 或是 JSON 格式資料
```json
//JSON
'Content-Type': 'application/json'
// 表單
'Content-Type': 'application/x-www-form-urlencoded' 
```

### credentials
預設上不會自動帶上或接收任何 cookies，如果網站依賴 session 會導致請求回傳未經認證，想把 cookies 一起帶上，要加 
```js
fetch(url,{
	credentials: 'include'
})
```

## 對 mode 的誤解
發送 request 可能會遇到 CORS 的限制，fetch 中mode 提供 `'no-cors'` 的方法，乍看之下會以為能突破 CORS 限制，既不會跳出錯誤 (不會跳到 .catch)，也能發出 request ，但 **response 的 status 是 0 ，body 是空的**
```js
fetch(url,{
	method:'POST',
	headers: new Headers({
		'Content-Type':'application/json'
	}),
	body: JSON.stringify({name: 'Rosa'}),
	mode : 'no-cors'
})
.then((res)=>{
	console.log(res.json())
})
.catch(err => console.log(err))
```
> 麻瓜翻譯機 :   
> 不會回傳錯誤，也不會突破 CORS 的限制
> 避免發生錯誤，硬要丟出一個 request ，還你一個安心 response，裡面包含沒東西的 body 以及 status 為 0 。

CORS 的限制是後端要解決，前端無法直接實現掛跨 CORS。


## 為什麼 XMLHttpRequest 還是存在 ?
我們都知道 XHR 寫起來有點囉嗦，在 fetch 問世之後，除了支援舊的瀏覽器會使用到 XHR，現代開發大多還是使用 fetch，但是 XMLHttpRequest 並沒有被廢棄，因為 fetch 還是有些功能是無法做到的。

**fetch 做不到 : ** 
1. 上傳進度追蹤，fetch 必須搭配其他的 API 才能做到，
2. 錯誤的回應處理    
	fetch 不管 HTTP 404 還是 500 ，也還是會 resolve，代表 **你確實有送出 request**，`.catch` 會抓到的錯誤只會是 **網路錯誤或其他會中斷 request 的情況**。對於錯誤的處理不是那麼直覺。
3. 中斷  (absort) fetch  
	目前沒有直接中斷 fetch (Promise) 的方法，不像 XHR 提供 `.absort()`，但是 WebAPIs 有提供 [AbortController](https://developer.mozilla.org/zh-TW/docs/Web/API/AbortController#browser_compatibility) 可以讓 fetch 做到中斷，目前為實驗性(?)
	[MDN 提供的範例](https://mdn.github.io/dom-examples/abort-api/)，讓你突然不想看影片的時候，停止發出 request。
4. 逾時處理 (timeout)
	XHR 逾期的時候可以暫停發出請求，第三點也提到 fetch 因為沒有中斷的功能，無法做到。


## 補充 : 幾種發 request 的方法
以下都會使用 GET 為例
1. XHR
	```js
	var xhr = new XMLHttpRequest();
	xhr.open(url)
	xhr.onload = function(response){
		if(response.state>=200 && response.state <=400){
			console.log('success')
		}
	}
	xhr.onerror = function(err){
		console.log(err)
	}
	xhr.send()
	```
2. JQuery
	```js
	$.ajax({
		method : 'GET',
		url : url
	})
	.done(function(response){
		console.log(response)
	})
	.fail(function(error){
		console.log(error)
	})
	```
3. fetch
	```js
	fetch(url).then((response)=>{
		console.log(response)
	}).catch((error)=>{
		console.log(error)
	})
	```
4. axios
	```js
	axios.get(url)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
	```


## 結語
在我學習 JavaScript 這段期間，講到遠端取資料，很多教學並不會提到 fetch 或是 XMLHttpRequest，反而是叫你直接使用 axios，畢竟重新造輪子是很麻煩的 🥴，不過 fetch 無疑的是會越來越完善，不論是用何者工具或手法必有一定誕生的理由，了解原理後開發都可以更得心應手。 

我蠻喜歡[良葛格 下的這番結論](https://www.ithome.com.tw/voice/121435)
> 舊東西誕生在舊的時代，適時地解決了當時的問題，而後從中累積了不少的使用經驗，因而誕生了新的技術、概念或規範，急著預言舊東西將會逝去，並不會讓開發者看起來更為耀眼，只會讓開發者看不清楚新東西的本質罷了。

## 參考
1. 從 fetch 解決什麼問題來看 : [從XHR到Fetch | iThome](https://www.ithome.com.tw/voice/121435)
2. Huli 大的 fetch 系列影片  
	- [Fetch 與 Promise 補充系列（一）：初探 Fetch](https://youtu.be/_8cLWMAQe3A)  
	- [Fetch 與 Promise 補充系列（二）：fetch 的 POST 與錯誤處理](https://youtu.be/Ovv9tPhiW_0)  
	- [Fetch 與 Promise 補充系列（三）：fetch 的使用注意事項](https://youtu.be/5A9ogWY7J7w)  
3. XHR v.s fetch，單純只是好奇查詢 XD [Ajax Battle: XMLHttpRequest vs the Fetch API ](https://blog.openreplay.com/ajax-battle-xmlhttprequest-vs-the-fetch-api)
4. [Fetch](https://zh.javascript.info/fetch)
5. 很推的詳細文字版學習 : [AJAX與Fetch API · 從ES6開始的JavaScript學習生活 (gitbooks.io)](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/ajax_fetch.html)