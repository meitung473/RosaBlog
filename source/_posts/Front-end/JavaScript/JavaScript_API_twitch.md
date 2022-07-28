---
title: 紀錄 | 串接 Twitch API 實戰
tags:
  - AJAX
categories: [Front-end,JavaScript]
author: Rosa Hong
description: 學習 twitch api 如何使用
date: 2021-12-23 11:32:09
---
## 概要  
紀錄串接 API 的過程以及想法  
事不宜遲，直接上手吧 !  

## 實作
### 事前預備
1. 創建帳號進入 twitch dev  
	[Home | Twitch Developers](https://dev.twitch.tv/)
2. 建立 app    
	![](https://dsm01pap006files.storage.live.com/y4mh-F93GYryYifP-KaHhsLHMLdlRFmH8aH0JC7-ViFhkXZ5hSaibFN5NpsXMprq0qqLd3X4czumdP1D_dKDvbv0iFjtMYWWZl9eMO0DiXLs5wRAU5e7hJUIx6Xnmc0p5DIOWbB31h37gq-deaq9Dx8edWnlXXdJhLmSyCq-x6YqkUiWEg2sngSnn3iCMw3gj5r?width=660&height=379&cropmode=none)    
	填上 app 名稱以及 app 應用地方  
- `OAuth` 開發階段可設為本機  
	![](https://dsm01pap006files.storage.live.com/y4mt-abtC6iaRNJOcL06xmknc_DuRdRzrfQP2uyGOYGjVMCT5wTWo3kaaohr9CSO-oX8ttudhoCYPVByDWhMDc8dHS_PZD4hYBs2CD7OH4V0y5oVSc5oSNMdiSsLbkZQEoNIcc-GR-LNEFZvcA_5KGnrrt-CIBYGsk5X5RbIou1jXLAeUUlSx6rXFsnr5ifXMBd?width=660&height=637&cropmode=none)    
	設定完按儲存    

### 認證
API 文件 : [Twitch API | Twitch Developers](https://dev.twitch.tv/docs/api)  
Step 1 已經做完了所以直接跳 Step 2  
1. 透過 twitch cli 認證 app  
	- 下載 cli 之前，先看自己的電腦系統  
		因為我是 window 所以用 [Scoop](https://scoop.sh/)  
	```powershell
		iwr -useb get.scoop.sh | iex
	```
	再透過 Scoop 下載 twitch cli    
	→  [官方操作](https://github.com/twitchdev/twitch-cli#scoop)
	
	```bash
	scoop bucket add twitch https://github.com/twitchdev/scoop-bucket.git
	scoop install twitch-cli
	```

- 再來拿取 **app-token** 認證  
	以防自己 cli 沒裝成功    
	可以用 **twitch version** 來確認一下        
	```bash
	twitch token
	```
	如果是第一次拿取 token   
	會要求 `client-id` 跟 `client-secret`  
	![](https://dsm01pap006files.storage.live.com/y4mG2G8j3XoHH9PQKBsVEt5iN7jDGaTfj4edFSEWc_5e3SGLo-eeXErIS_YuC8KAMtJp7d6sJa_kWfn6pTP08n5BnHC60oUFk2DC1V87ozkdR9uI-Fr60OnFBfgXIfJPZpm9D75EyIIz1L8aikwhZ0GT_AMWASyBv5q819n69I53hmp9ekGl3L2C4g0VyIckD4S?width=660&height=121&cropmode=none)   
    來源是這裡  
    ![](https://dsm01pap006files.storage.live.com/y4mdi7Nh5dMfPQ5xzSVtxSdnByfMY4LZWnKeCPaCfw-h2GWDXkXiq5bviTNls30NA8ACNG0Zq1NDiNEmeP9hwTLueF-GZtj13QR0eLFHiovrg6mXTjaapiuXFN9OGw0kcqywuRIlUr1UrgveD-uJYIryaNqV83W3toFb157Hko6Hhry98S5ucLULH5XcA2gOpkV?width=660&height=657&cropmode=none)   
	輸入進去就會獲得一組 token  
	先複製起來，待會會用到 !  
	
> twitch token 出現錯誤怎辦 ?   
> `responded with an error while generating token`  
>**莫驚莫慌莫害怕**  
> 透過 `twitch configure`   
> 刷新設定再索取一次  
![](https://dsm01pap006files.storage.live.com/y4m5G8UcXoxPKOlkwNHqQT_XMLTpCR-o0mZ-MukKd3rYsfZIlReY4a4r0spvs413G12ssJf-JcSZLBdDxs1m4WL5m9K6uIhj6Tyf1-iLOSi1QcHl25_27HYeUav6X_yU0uWUx9Rmbp6jGFUTIcpb5PhCNHQBMn1gRvHWabo9pZsm5XqZ80ufADj_rexSeDSxtjh?width=660&height=145&cropmode=none)   

官方有提到認證時效性的問題   
過 60 天會失效  
過期之後再重新設定一次 ~  

### 拿資料
使用資料前先有辦法**拿到資料**  
所以必須了解 twitch api 的規則  
→ [Guide | Twitch Developers](https://dev.twitch.tv/docs/api/guide)  
→ [Reference | Twitch Developers](https://dev.twitch.tv/docs/api/reference#get-streams)    

規則 :   
1. 要加入請求 2 個標頭  
	- **client-id**  
	- **Authorization**  
2. 傳參數用 `&` 串  
    像這樣   
	`&login=twitch&login=twitchgaming`  
	
接著來串目前正在串流的遊戲 LOL   
動手之前先想好如何架構    

#### 個人想法與流程
透過 game_name 來知道 game_id  
再找 streams  

1. 拿到 Game id (data1)  
2. 拿到 data1.id   
	找正在串流資料符合的遊戲之 data2  
3. data2 中要用到的  
	 - user_id  
	 - live_titile   
	 - thumbnail_img_url  
4. 拿到 符合 data2.user_id 的 data3  
5. data3 中  
	 - 找 data3_user_id 和 data2_user_id 一樣的  
		 - data3_user_name  
		 - data3_user_profile_img_url  
6. 把資料展現在畫面  
	data中的 3-2,3-3，5-1-1,5-1-2  
    最後出現在畫面上  

### javascript 實際操作  
官方文件有範例知道取的資料格式  
→ [Reference-streams | Twitch Developers](https://dev.twitch.tv/docs/api/reference#get-streams)  

使用 HTTP method 的 `GET` 來取得我們想要的資料    

看一下 reference 可以查到什麼    
query string 的參數有 `game`     
要的遊戲名稱是 `League of Legends`  
網址會轉成 `League%20of%20Legends`  

因此在找的時候 api 的 url 是  
`https://api.twitch.tv/helix/streams?game=League%20of%20Legends`  

直接輸入在網址會沒有回應  
是因為 CORS 的問題  
要加上 `標頭`  
並且透過 ajax 來存取  

#### 前置設定  
把 id 跟 Authorization 設定成變數  
jquery 的 ajax 為`$.ajax("網址",設定)`      
把設定內容寫在一起  

```javascript
const clientID = "i9vpv94xpthipcxeo902aunlhw9940"
const token = "Bearer 1wcbnczsqjzp3675p5dngbxq19hh5d"
const url = "https://api.twitch.tv/helix/"

const XhrSetting = {
 method:"GET",
 beforeSend: function(xhr)
 {
 	xhr.setRequestHeader('Client-ID', clientID);
	xhr.setRequestHeader('Authorization', token);
 }
}
```

- `setRequestHeader` : 用來設定 HTTP 的表頭請求，`XMLHttpRequest` 物件中的方法。   
  
參考 :  
[XMLHttpRequest.setRequestHeader() - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest/setRequestHeader)

#### 函式  
根據上面的架構先存取遊戲 id  
以下都是使用 jquery    
- GetGames

```javascript
function GetGames(gamename,callback){
 	$.ajax(url+"games/?name="+gamename,XhrSetting)
 	.done(function(response){
 	callback(response.data[0].id)
 })
}
```

> 為什麼用 callback function ?   
> callback function 是可以把 B 函式  
> 作為 A 函式的參數  
> 
> 這樣可以拿 GetGame 拿到的 response裡的 id 再去拿下一個資料  

再來就是取得串流資料    
- GetStreams
```javascript
function GetStreams(data){
 $.ajax(url+`streams/?game_id=${data}&first=${limit}&${language}`,XhrSetting)
 .done(function(streams){
	 /*
	 	拿 userId 取頭貼
		以及顯示在 html 
	 */
 })
}
```

- GetUser : 串流的 userId 再去得個別資訊  

```javascript
function GetUser(data,callback){
 $.ajax(url+"users?id="+data,XhrSetting)
 .done(function(response){
 callback(response);
 })
}
```
> 這裡的 response 是要顯示在 html 資訊的  
> 所以這邊的函式是 `渲染畫面`  

- GetColumn : 顯示  
```javascript
function GetColumn(stream,data){
 const userProfileImg = data.data[0].profile_image_url;
 const stremsThumbnail = stream.thumbnail_url.replace("-{width}x{height}","")
 return `
 <div class="card">
	 <div class="card_video">
	 <img src="${stremsThumbnail}" alt="">
	 </div>
	 <div class="card_profile">
		 <div class="card_profile_img">
		 <img src="${userProfileImg}" alt="">
		 </div>
		 <div class="card_profile_content">
			 <div class="card_profile_content_title">${stream.title}</div>
			 <div class="card_profile_content_name">${stream.user_name}</div>
		 </div>
	 </div>
 </div>
 `
}
```

- 利用` ‵‵ ` 包裹字串是 ES6 的語法  
	可以塞多行文字，其帶入值用 `${value}`    

接著合補完 `GetGames`  
```javascript
function GetStreams(data){

 $.ajax(url+`streams/?game_id=${data}&first=${limit}&${language}`,XhrSetting)
 .done(function(streams){
	 streams.data.forEach(stream => {
		GetUser(stream.user_id,function(data){
			 if(data.data[0].id === stream.user_id)
				 $('.row').append( GetColumn(stream,data))
		 })
	 });
 })

}
```

最後在補上  

```javascript
const limit = 20 // 資料數量
const language = "&language=zh" //語言系
const gameName = "League%20of%20Legends"
GetGames(gameName,GetStreams)
```

- 結果 :   
![](https://dsm01pap006files.storage.live.com/y4mzBThzpbO12L6GrjUQzYhQb-bPJf086nDiPhzZnbGQHRhXmro10FMYN4kHIfrwUCxHuwNb8L7ZqW8_1xhj5Uw7k7KLJG7TqHWnrginQRlFeMxpjarZfQgYkzfEqjEKHdyz7oYhvsftONoZ4e-e9sYzZL-E7-E02dOG6GfGV-HBOCrvsfYGTTIRlW6I-Xo9Wdx?width=1024&height=593&cropmode=none)    


## 結語 
透過實戰一次串接  
就比較知道 API 內容在做什麼  
從中也認識 RESTful API 的意義  
還有 HTTP Method、StatusCode  

實作時覺得結構上可以再更精簡  
有些重複性的東西盡可能省略    
