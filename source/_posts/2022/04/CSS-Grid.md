---
title: 筆記 | 初探 CSS Grid
tags:
  - CSS
  - grid
categories:
	- Front-end
author: Rosa Hong
date: 2022-04-09 18:55:08
description:
---

## 前言
眾所皆知 flex 是排版神器，尤其在一維的排版非常好用  
那在二維的排版呢 ?  
就不得提到 grid，雖然 grid 在舊的瀏覽器支援性沒到很高，現代瀏覽器是幾乎都有支援。([caniuse](https://caniuse.com/css-grid))   

<!-- more -->  

## grid-container 容器布局
要建立網格，起手式先建造一個容器，準備讓子項網格排列    
```html
<div class="container">
	<div class="item item1">item1</div>
	<div class="item item2">item2</div>
	<div class="item item3">item3</div>
	<div class="item item4">item4</div>
	<div class="item item5">item5</div>
</div>
```

### display : grid
grid 是二維的版面排版，透過 columns 跟 rows 來安排，直接 加上 grid 不會有變化。  

display 有關 grid 的有 2 個值，就像 `inline-flex` 跟 `flex`    
1. `inline-grid`  
2. `grid` : 2D 布局  

```css
.container{
	display: grid | inline-grid;
}
```

### 格線軌道（Grid Track）  
在 grid 中有不同的布局方式，來決定網格的架構     
1. 軌道   
3. fr 分塊，利用百分比算格數，具有彈性

### 明式格線（explicit grid）
明式是自定義軌道，有明就會有暗，暗式是 CSS 幫我們建立的線。  

#### grid-template-columns : 橫向軌道
橫向網格的寬度。    
合法的絕對單位 :   
- % 
- px
- em
- rem  


```css
.container{
	grid-template-columns : 100px 100px 200px;
}
```
橫向放入三個元素，各別有寬度。  

- `fr` : 可用空間的分塊（fraction）。全都 `fr` 的單位就像切分成幾分之幾，但是類似帶有 flex-grow 、flex-shrink 的功能。  
	```css
	.container{
		grid-template-columns: 2fr 3fr;
	}
	```
	橫向呈現兩個元素，前者占 2/5，後者 3/5

- `auto` : 如果是搭配 fr 單位，會是子元素分配剩餘的空間

如果有重複的版面，除了一個個手打，也可以利用 repeat 快速重複
- `repeat(<次數>,<單位>)`
	```css
	.container{
		display:grid;
		grid-template-columns : repeat(5,1fr);
	}
	```
	容器會被橫向切成五塊。  
#### gird-template-rows
直排間的大小，跟 columns 很像
```css
.container{
  display:grid;
  height: 100vh;
  grid-template-columns : repeat(5,1fr); 
  grid-template-rows: repeat(5,1fr);
}
.item:nth-child(2n){
  background-color: #000;
}
.item:nth-child(2n+1){
  background-color: #ccc;
}
```
延伸上一個 columns 的例子，這樣就完成 5X5 的網格版面。
做個簡單的就是黑白棋盤格  
![軌道式布局](https://dsm01pap006files.storage.live.com/y4mWjsi1VFCz1a4Y4PYgBdGH4nr_koMsXMKau9gYdZw6NHUWT6BZTF5VZzybgEZeTgEWRW7yShbHrosym0pS8SwRMoz8afSelU59UktSX_elpmKmC2GyvE1HQY_PVkefILEXPrnQoaOVZqP-h3mlpRPRv7Ma6NWNF8bWxiFgg0LCDBQ5pAgdUJKSyhR__iTjKM-?width=1024&height=558&cropmode=none)

#### grid-template : 混合式布局 
> 先 row 再 column

- grid-template : `<rows-template> / <columns-template>`
```css
/* 軌道式 */
.container{
	/* ...略 */
  grid-template: repeat(5,1fr) / repeat(5,1fr); 
}
```
除了軌道也可以用命名式的，上面的例子可以改成，下面會再提到命名式的寫法    
```css
/* 軌道式 */
.container{
  display:grid;
  width: 600px;
  margin: auto;
  height: 100vh;
  grid-template: 
    ". . . . ."
    ". . . . ."
    ". . . . ."
    ". . . . ."
    ". . . . .";
}
```
![命名式布局](https://dsm01pap006files.storage.live.com/y4munCQNLVYAOI_NYCgXrtU1bv1eLPQS8Nb_33cNyi0-DhiHRAeXzLCZYZi73nysSdYiALn5Ht-_Hoj0uD1VBw3tiLw5HE95LAuvmENJX9hSx2GnjRXwx_yHe8D5LthivgCGVNW_EuGXFJ8I3fJAtqTZVAbSFx8Zxvx_1Av9IqqrTFpH78MQSYy0dVnBEuy4Eeo?width=1024&height=558&cropmode=none)
### 暗式格線（implicit grid）
瀏覽器將剩餘的空間自行運用產生的  
設定剩下沒有指定 template 的 rows
> **implicit grid 預設的寬度會根據內容的大小來改變**  
> 如果 定格到超出的 track ，CSS 會自動補上 implicit grid
#### grid-auto-rows &  grid-auto-columns
容器預設寬高。  

-  `minmax` 可以設定最小和最大值  
```css
.container{
	grid-auto-rows : minmax(`<min>,<max>`);
}
```

### 網格間距
#### grid-gap
- `grid-gap-row` : 直向元素的間距
- `grid-gap-column` : 橫向元素的間距

兩個合併設定 grid-gap :  `<row> <column>`
一樣是 **先 row 再 column**
```css
.container{
	grid-gap : <row-gap> <column-gap>;
}
```

## 另一種布局 : 命名式
### grid-template-areas : 命名式布局 
透過命名的方式給空間
在父層 `grid-template-areas` 定義版面 
子層元素透過 `grid-area` 設定別名 

常見的範例，快速排出 **三欄式布局**
```css
body{
	display: grid;
	grid-template-areas : 
	"header header"
	"sidebar content"
	"footer footer";
}
```
### grid-area : 定格之命名式定格 
上面有提到軌道式的合併寫法也可以 `grid-area` 起點 & 終點，而在命名式布局可以對想要的元素命名，再到布局進行排列。  

延續上面的三欄式布局，對個別的區塊 **命名**   
再個別設定區塊大小。  [Codepen 三欄式](https://codepen.io/shan473/pen/yLpjwaK)
```css
body{
	display: grid;
  height: 100vh;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 200px 1fr 64px;
	grid-template-areas : 
	"header header"
	"sidebar content"
	"footer footer";
}
.header{
	grid-area : header;
  background-color: #ccc;
}
.sidebar{
	grid-area : sidebar;
  background-color: #fa0;
}
.content{
	grid-area : content ; 
  background-color: #0fa;
}
.footer{
	grid-area : footer; 
  background-color: violet;
}
```
個人覺得這種方式很直覺，做常規版面規劃就可以很快速😃  
 
## grid-item 子項定格
### grid-row/column start & end 個別設定定格
有兩種方式來讓格子被佔據
1. 軌道範圍
2. 佔據格數 

#### 透過軸線起終點來指定佔據的範圍
- `grid-column-start` :  column 的佔據軌道起點
- `grid-column-end` : column 的佔據軌道終點

打開 Devtools 按下 grid 的格線視覺工具就可以看見  
![Devtools grid](https://dsm01pap006files.storage.live.com/y4mFIFKSjXekpoog3xRQ2ne9NlGlppe2cMmpEyFJah7PMyNkDaFqG3BIrKWtESIgciPHiZw_qqYVFJRFYWO0OHTqvcyjR_0APRrrlZb7mVrKDkTDLsBclQunblwKtk4aoAwiGEk-E8u68pOAqaRSyu6NQ2Cb69euzI-d_02dR7VNk2rk15g-bDZqscdaCPFbDn0?width=1024&height=588&cropmode=none)

合併寫法
- `grid-column` : <起點> /  <終點>

如果想要 **占據整行**，除了從 **第一行 / 末行** 這樣寫，也可以利用負數來達成。
```css
.item-1{
	grid-column : 1/-1;
}
```

#### span : 數格數
預設 grid-column 是 `span 1`，就是按照 flow 占據一格  
```css
.item-2{
	grid-colum : span 2;
}
```

### grid-area : 軌道混合式定格
grid-area : `<row-start> / <column-start> / <row-end> / <column-end>`。

按照老規矩 **先 row 開始再 column**
```css
.item{
	grid-area : 1 / 2 / 3 / 4 ;
}
```

## order 順序
跟 `flex` 一樣 grid 是可以改變順序的。  
- `order : 0` 照原本的排序
- `order : -1` : order 也可以是負值，屬於往前排。    

order 的起始點是從 **整體的排列** 後面開始算起。
首先要知道 grid 的排列順序，預設是 row ，也就是從 row 的尾巴開始，如果有兩列，就是從第二列的尾巴開始。  

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/shan473/embed/vYpjMZW?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shan473/pen/vYpjMZW">
  Untitled</a> by YanShanHong (<a href="https://codepen.io/shan473">@shan473</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 對齊
### 整體垂直與水平對齊
設定在父層，控制 **整個網格** 的位置
- `justify-content` : 所有的子項水平位置。
- `align-content` :  所有的子項垂直位置

>	flex-end(start) 這是給 flexbox 用的，gird 寫法是 start 跟 end

設定在父層，控制 **所有網格中的內容對齊**
- `justify-items` : 預設是 stretch，個別設定會按照子項內容的 **寬** 再去水平對齊。
- `align-items` : 預設是 stretch，個別設定會按照子項內容的 **高** 再去垂直對齊。

### 個別設定子項內容對齊
設定在子層，控制 **個別網格中的內容對齊**
子項的內容物想要客製化的對齊，複寫 justify-items & align-items 的控制。  
 
- `align-self` : 預設是 stretch，使用跟 align-items 差不多。
- `justufy-self` :  預設是 stretch，使用跟 justify-items 差不多。

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/shan473/embed/PoEevZg?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shan473/pen/PoEevZg">
  Untitled</a> by YanShanHong (<a href="https://codepen.io/shan473">@shan473</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


## z-index 圖層
以往我們要用到 `z-index` 都會是在絕對定位的時候，在 grid 中是可以把項目堆疊的，透過 `z-index` 來前後順序。  

預設的圖層順序是 html 結構 **後面的會覆蓋前面的**，可以直接透過 `z-index` 改變順序。  

這個例子兩個有重疊的部分，item-5 寫上後蓋住了 item-1，為了讓 item-1 被看見，圖層寫得比 item-5 高就行了。  
```css
.item-1{
  grid-area: 1 / 2 / 1 / 2;
  background-color: blue;
  z-index: 1;
}
.item-5{
  grid-area: 1 / 1 / 1 / 3;
  background-color: red;
}
```

## 總結
本篇還有很多 grid 的應用還沒研究到，未來再專研 !  
很推 **CSS-tricks** 上的文章，很多寫法都很實用

## 練習
- 以 **[皮特·蒙德里安](https://zh.wikipedia.org/wiki/%E7%9A%AE%E7%89%B9%C2%B7%E8%92%99%E5%BE%B7%E9%87%8C%E5%AE%89)** 的《紅、藍、黃的構成》做為練習，說到網格自然就想到這幅畫  XD。    
	 [Codepen](https://codepen.io/shan473/pen/KKZRmRm)
	 ![CSS 版-紅、藍、黃的構成](https://dsm01pap006files.storage.live.com/y4meQohOpsPirn8FgIW6-32dz_PV_9ldr3h7XdfuoLRBgBMVuweq_tSNsV7Osnk8yDBjyZhV4cVT0RuzJnF4Mf5bLcYc5KKVnVXBuu0bOvra6l8WSV33Yu6krcT-r8yl7TlqLB1ir3IPN2crKR6HWWWwN7avpOZB6UabLXjVNMBVnGxMiRl_8PrB3Gs8xKtehAv?width=1022&height=1024&cropmode=none)
- 額外來自 Frontend Mentor 的練習題，利用 grid 進行排版 
  [Frontend Mentor | Rosa Hong](https://meitung473.github.io/testimonials-grid-section-main/)
- grid-graden (已破關) : [Grid Garden - A game for learning CSS grid ](https://cssgridgarden.com/)  
	> 心得 :    
	> 遊戲式的 grid 很容易理解， 
	> template 除了正數以外，也可以使用 **負數**。  
	> 個人遇到 26 關卡了一下，其他掌握住如何算軌道跟知道格數怎麼應用就沒什麼障礙。對齊的部份，都在另一個 flexbox frog。
	
## 參考
- 快速查表 :  [GRID: A simple visual cheatsheet for CSS Grid Layout (malven.co)](https://grid.malven.co/)
- 好筆記 : [[CSS] Grid Layout | PJCHENder 未整理筆記](https://pjchender.dev/css/css-grid-layout/)
- 非常詳盡的圖文並茂解說 : [A Complete Guide to Grid | CSS-Tricks - CSS-Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/) 。我也很推 flexbox 的教學  