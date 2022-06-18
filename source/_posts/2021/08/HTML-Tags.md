---
title: 筆記 | HTML 基本語法
tags:
  - HTML
categories:
  - Front-end
author: RosaHong
date: 2021-08-10 13:38:09
---

### 前言 ###
這邊紀錄常用標籤與標籤用處  
標籤基本都成雙成對  
本篇主要複習跟稍微解析實際網頁的應用部分  
<!-- more -->

### 基本 ###
```html
<!-- !DOCTYPE HTML :告訴瀏覽器這是標準的 html 格式-->
<!DOCTYPE HTML> 
<html>
	<!-- head : 網頁資本資訊-->
	<head>
		(1) title : 網站標題
		<title>網站標題</title>
		(2) charset : 編碼
		<meta charset="utf8"/> 
	</head>
	<!--body : 主要呈現的地方-->
	<body>
		(1) div : 分組，會換行 
		<div></div> 
		(2) span : 分組，不會換行
		<span></span> 
		(3) img : 圖片 
		<img src="放source" 
			 title="滑鼠 Hover 顯示文字"
			 alt="圖片跑不出來的替代文字"/>
		(4) 清單  
		<ul> : 沒有排序的清單，只會出現 dot
		<ol> : 有排序的清單 (order)，會顯示數字
		<li> : 項目
		
		(5) pre : 保留完整格式 
		<pre></pre>
		說明 : 在 html 空多少格都會只有呈現一格
		加入 <pre> 後，html長相都會被「照實呈現」
		
		(6) br : 換行 
		<br/>
		
		(7) 表格
		<table>
			(7-1) 表格標題 (header)
			<th></th>
			說明 : 可以放在首列，標題字會變粗體
			-----
			(7-2) 列(row)
			<tr>
				(7-3) 子項
				<td></td>
			</tr>
		</table>
		
		(8) 錨點 
		(8-1) 連外部網絡
		<a herf="連結網址" 
		   target="_blank" 新分頁開啟
		   				   不加的話預設是直接打開
		>
		(8-2) 連內部段落
		<a herf="#段落ID">
		說明 : 使用 id 來進行連結
	</body>
</html>
```

- `<!DOCTYPE HTML>` 通常可加可不加   
不加偶爾會出 Bug ，所以還是加一下。

### 實用型 ###
```html
	1. iframe  : 嵌入網站。
	說明:通常會看到嵌入 yt 影片、網頁內容等等。
	實際上很多網站會擋，以防資訊被偷竊。
	<iframe src="來源網址"></iframe>
	
	2. form : 表單
	<form>
		2-1. input : 輸入 
		<input type ="輸入類型" 
			   vaule="被輸入的值可以先預設"></input>
		type 常見有 : 
            text、password、email、radio、
            checkbox、date
		有作用的按鈕 :
		    submit (送出)
		注意 : submit 類型的 vaule 是指按鈕文字
	</form>
```
> input 更多類型往這邊   
> [超文本標記語言 | MDN (mozilla.org)](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/input)  

範例
- **radio** 單選  

<iframe height="300" style="width: 100%;" scrolling="no" title="" src="https://codepen.io/shan473/embed/bGWOrWB?default-tab=html%2Cresult&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shan473/pen/bGWOrWB">
  </a> by YanShanHong (<a href="https://codepen.io/shan473">@shan473</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

1. `type`  : 設定種類
2. `name` :  把選項群組。
使用單選時，要確定哪個是同一種單選
如果沒有 **name** 就沒用哦
3. `label` : 可以把內容也變的跟同個 id 有一樣的效果。
如果沒有 label 可以發現 **使用者體驗較差**  
每次點擊必須精準落在圈圈內  
加上之後，讓 label 裡的字串點擊也可以勾選  
以便來 **提升使用者的體驗**

> 關於 vaule 的範例   
> [菜鳥工程師 肉豬: HTML value屬性](https://matthung0807.blogspot.com/2019/08/html-input-value.html)  

### 語意化標籤 ###
英文 _Semantic Elements_

綜觀所有東西確實可以使用 `div` 來包裹  
但在閱讀上其實不太方便  
尤其網頁在爬蟲時，要讓機器方便閱讀  
因此才有語意化標籤來輔助
如果是人，在閱讀上也來的更清楚快速
> 更多的可以參照 W3 說明  
> ([HTML Semantic Elements (w3schools.com)](https://www.w3schools.com/html/html5_semantic_elements.asp))  

提到給機器看，很大一部分跟 SEO (search engine optimization) 也有關連  
比起看 `div` 猜意思，不如直接跟他說這是什麼區塊 

這邊舉幾個是常見的  
1. `<main>` : 放主要內容的
2. `<nav>` : 導覽列
3. `<footer>` : 網頁底部資訊
4. `<section>` : 區塊資訊

總之，功能跟 `div` 包裹沒差別，差在更容易識別。

### 跳脫標籤 ###
有些特殊字元並沒辦法在 html 中呈現
當你打 想顯示 &lt;div&gt; ，怎麼打就是看不見
例如 `div` 前面跟後面的 `< >` 這個標籤
替代符號可以用以下幾個  

| 符號 | 替代使用 |
| ---- | -------- |
| &    | \&amp\;  |
| <    | \&lt\;   |
| >    | \&gt\;   |

範例 : \*markdown 語法也會吃 html 
 <pre>			&lt;div&gt;</pre>
 實際上長這樣 **\&lt\;div\&gt\;**

### SEO 相關東西 ###
這邊我覺得蠻有趣的，所以也記錄一下      

搜尋一打，為什麼有些網站名列前茅?    
SEO 要做得好，其實跟 meta tag 脫不了關係    
因為這部份真的很 **深深深深**  
有些公司是有一個專門團隊在管理這部分的  
僅列出稍微知道的一部分  

#### SEO是給機器看的 ####
也就是為什麼有語意化標籤的產生  
除了內容標籤之外  
又必須在網頁設定告訴機器哪些事?    

常見的有這幾個   
以 [這個網站](https://www.walkerland.com.tw/article/view/186797) 為例   
按出 devtool 打開 head 就可以看見    
記得 head 裡面的東西是 **網頁的資本資訊**  
![](https://chi01pap001files.storage.live.com/y4mJy12jCWqUv8I3m2vELwKn21a1DPZjMIadHGCUzAOxa4X6RW-HfYkEBrWU1KomtH6K40CNew2xpfnfk64KV51Gek1qn-XTbvyr7E65IcIgyyGjosLV9kyNCsyyjQk-1NUgZanO06xoRqbydtD3pRl7nrxCyJC0QUm5UeTudmF47vINqUkYQWoAnzv0wybtQRM?width=660&height=462&cropmode=none)

這邊都是指在搜尋引擎相關的資訊 
1.  `keywords` : 關鍵字
2.  `description`  : 網頁敘述。這蠻重要的，寫得好容易被排的前面
3.  `title` : 網頁的標題。搏人眼球的標題容易點進來
4.  `property` : 屬性。這邊通常會給 `社群媒體` 相關設定用

#####  **property** #####
1. `og` : Open Graph protocol。最常用的是 FB 。
裡面可以設定在 FB 分享時出現的 `圖片、標題、敘述`  
詳細可以到 偵錯工具看  
子屬性分別有對應的功能
> [分享偵錯工具 - Facebook for Developers](https://developers.facebook.com/tools/debug/?locale=zh_TW)

2. `app_id` : 有些網站具有 app ，會挑出訊息告訴使用者可以下載來獲得更加體驗之類的。

##### **JSON-LD** #####
這個是給 google 引擎看的
是在搜尋後呈現的東西  
一樣同個網站，Umm不太好找
主要有找到這個標籤
![](https://chi01pap001files.storage.live.com/y4myYnkBblETyqypt00tVvRJJCVVClV3ueNCz4wZmj6vFMd_cwhAPAFQJLmtm8-TsF-CxnhijUI_n6HF80TxRos9HOO3yWE1n96TzqWQbECYmjCGlLlXiIFfSZJe8FERdC9C8NrXgp9NLSxp8tY1B_3oEaNLMJPQ_I7YEbuNWcJMF1Px7RyrLfK5IpGyQsN-I2E?width=660&height=146&cropmode=none)

> 詳細參考這篇文章有提到各式種類呈現  
[使用 JSON-LD 處理 SEO，並讓 Google 針對不同形式網站做獨特的搜尋結果呈現 | by YY | Medium](https://z3388638.medium.com/%E4%BD%BF%E7%94%A8-json-ld-%E8%99%95%E7%90%86-seo-%E4%B8%A6%E8%AE%93-google-%E9%87%9D%E5%B0%8D%E4%B8%8D%E5%90%8C%E5%BD%A2%E5%BC%8F%E7%B6%B2%E7%AB%99%E5%81%9A%E7%8D%A8%E7%89%B9%E7%9A%84%E6%90%9C%E5%B0%8B%E7%B5%90%E6%9E%9C%E5%91%88%E7%8F%BE-9c74783c017a)

google 的開發者頁面就有提到這部分
>[瞭解結構化資料的運作方式 | Google 搜尋中心  |  Google Developers](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data?hl=zh-tw)

關於 JSON-LD
> [JSON-LD - JSON for Linking Data](https://json-ld.org/)

##### **robot.txt** #####
這個檔案是給爬蟲看的
裡面也明確規範告訴爬蟲
哪些不要看、哪些給你看
> 參考資料  
[robots.txt - 維基百科，自由的百科全書 (wikipedia.org)](https://zh.wikipedia.org/wiki/Robots.txt)  

##### **sitemap.xml** #####
也就是網站地圖 
更快速幫助機器讀懂網站架構  
通常也會規範在 robot.txt 裡

> 參考資料  
> [【Sitemap SEO教學篇】Sitemap是什麼？一次掌握Sitemap網站地圖製作與提交流程！ | Ranking SEO](https://ranking.works/%E6%8A%80%E8%A1%93SEO/sitemap)

### 結語 ###
主要是紀錄 html 的架構說明  
SEO 的部分只是蜻蜓點水  
以後有興趣再往深處寫  
