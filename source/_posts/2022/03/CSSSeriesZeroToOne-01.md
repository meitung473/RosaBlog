---
title: CSSSeriesZeroToOne | 01 | 圖文滿版區塊
tags:
  - CSS
  - CSSSeriesZeroToOne
categories:
  - - Frontend
    - CSS
description: CSS切版練習 - 圖文滿版區塊
author: RosaHong
date: 2022-03-18 09:53:05
---

這個系列是從鐵人賽[金魚都能懂的這個網頁畫面怎麼切 - 金魚都能懂了你還怕學不會嗎](https://ithelp.ithome.com.tw/users/20112550/ironman/2623)的筆記與實作   
原本要叫 Zreo to Hero，從迪士尼大力士的歌曲想到的  
但完成金魚系列好像撐不上 Hero XD  
就改成 Zero to One 了  
代表從零到入門的  

起因是覺得自己的 CSS 結構跟用法沒有很妥善  
一些性質莫名亂用，簡單來說就是不懂 CSS  
透過一天天跟著實作了解 HTML 建置結構與 CSS 乾淨的寫法  

> 這個系列不做 RWD  

## 本篇成果
[Codepen](https://codepen.io/shan473/pen/oNoEjNV?editors=0100)  
![圖文滿版區塊](https://dsm01pap006files.storage.live.com/y4mFal1-hjaKzBYO0ceMmC3QyeuTEau2VqzDJF9KrNlLlaJqh1_6IA96aYDhEfXLD8hxMLGT-e2HeoUSEuxZzdB9J6Avk0LArKj0fgN4pP4drg_Qdza2-44tROHeK-PkxW5KrMWNXsxRYHNQIlD6Kw6MfCSVx-zj_uT7j_yf072F9X-qDfe2ro6EJNp59rN5m-z?width=1024&height=585&cropmode=none)


## Reset 一下
刻板面之前要先 reset，這樣我們才能掌控間距大小   
最常見的是對這三者進行重置  
```css
*{
	margin: 0;
	padding: 0;
	list-style:none;
}
```

### 什麼是 Reset ?
每個瀏覽器會預先有 CSS 樣式，但是規格是不一樣，像是 padding 或 margin 究竟是加在 `html` 還是 `body` 呢 ?     
各個瀏覽器各自有自己的規範，因此在製作上需要先把 CSS Reset 一下，把所有標籤都規定成一樣，再去設計。  

像是 li tag 會預設距離 `margin-left : 8px`，body 還沒 reset 情況下也會有 margin   

### CSS Reset  :  我把你全家變一樣
把所有預設外觀都變一樣  
所有標籤都必須自己手動加，可以自己掌控元素  
不論在哪一個瀏覽器都會把 CSS 歸零。  
最常見的是 meyer 的 reset.css  

所有標籤的樣式都變一樣，好像有點太超過了，因此出現了 **Normalize CSS**。  

=> [CSS Tools: Reset CSS (meyerweb.com)](https://meyerweb.com/eric/tools/css/reset/)   

###  Normalize CSS : 差很大的修一下
不用到每個都 reset ，針對一些瀏覽器差異性較大屬性進行微調  
最大優點是既保留原有 html 標籤的情況下，做修改  
很多主流 CSS 框架也是採用 Normalize CSS

## 萬年問題 : inine v.s block 
- block : 佔據一整行
- inline : 本身元素的寬度

### inline
理論上元素跟別人排在一起，但也要看周遭的元素排列。  
> 最重要的是 **設定寬高是沒用的**，是依照內容去撐高

具有 inline 屬性的標籤     
a 、span   

如果加上 padding 跟 margin，並不會影響其他元素的排版狀況，只會把單純的背景撐開。  

float 屬性會讓 block 排排站，可以想成是 3D 浮起來。  

### block 
不管多寬都會佔掉一整列，跟 inline 最大區別是 **可以設定寬高**

具有 block 屬性的標籤  
h(1~6)、p、div ...等等  

### 混亂中立 : inline-block 
解決 inline 不能設定寬高的，但是又可以跟別人排在一起 
繼承 inline 排在同一排，又繼承 block 可以設寬高。

#### 範例一
```html
<style>
	h1{
		display： inline；
	}
</style>

<h1>hello</h1>
<p>world</p>
```
h(1~6) 用 inline 還是沒有被排在一起，因為 p也是 block。   
如果 p 也是 inline，就會並排  

#### 範例二
a 變成 block ，會一整行都可以按，即使有寬度元素還是會佔好佔滿


### ul : 預設是 block
edge => 預設有 `padding : 16px;` `margin : 16px 0;`

- 如果是 **inline** => 底下的 li 照排，只是沒有包裹在 ul 容器裡，edge 預設會有 `padding-left : 40px`，margin 會歸零。  
- 如果是 **inline-block** => 保有 block 元素
	
	
### li  : 預設是 list-item
不屬於兩大派別，而是 list-item

- 如果是 inline ，`list-style-type`，會不見
- 如果是 block ，`list-style-type` 也會不見
- 如果是 inline-block ，`list-style-type` 也會不見

所以這個 list-item 會包含 list-style-type 這個屬性  
可以用 div 跟 span 模仿 ul & li   

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/shan473/embed/ZEarWRK?default-tab=html%2Cresult&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shan473/pen/ZEarWRK">
  Untitled</a> by YanShanHong (<a href="https://codepen.io/shan473">@shan473</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
	
### 應用 : 導覽列
把 a 設成 inline-block，這樣可以把高度撐開  
但是 HTML 空白字元會佔據 px ，只要把 HTML 擠在一起就不會有問題了    
[Codepen](https://codepen.io/shan473/pen/JjOpWab)

## vh 
viewport 的高度，看到的頁面視窗高度  
最常看到 100vh，會佔據整個視窗高度  

## flex-direction : flex 排序的方向
轉向的同時主軸線的 justify-content 跟次軸 align-items 也要跟著轉哦 !  

- row : 橫向 
- column : 直向

## background
> `background:`   
> linear-gradient(115deg,#9198e5 50%,transparent 50%) center center/100% 100% ,   
> url('https://picsum.photos/1200/600?random=10') right center/100% 100%;

1. 多個背景疊層用 `,` 隔開
2. `linear-gradient(<角度>, $顏色1 $濃度,$顏色1 $濃度)`   
	可以擺放多個顏色跟濃度，角度不只 `deg` 也可以用 360 算的 `turn`  
3. 後面擺放的順序是 `poition / size`   
	- `size` :   
		1. contain => 把大小等比例放大跟容器其中一邊等大
		2. cover => 圖片真實的大小，不夠的會 repeat 到塞滿
		3. \% 數 => 相對容器的多少 \%
		4. 直接設定 px
		5. auto : 這個蠻複雜的先不討論 QQ


