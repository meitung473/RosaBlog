---
title: 筆記 | CSS 選擇器
tags:
  - CSS
categories:
  - '2021'
  - 08
author: RosaHong
date: 2021-08-11 11:02:04
---

## 前言 ##
複習常見用法與了解選擇器權重的問題   

<!-- more -->  
## 條件使用 ##
舉 class 的例子  
選擇器還有 `Universal(*) 、pseudo-classes(偽類別)、id、tag(標籤)`等等的選擇器  
除了 **id** 外基本都以此類推。

### 範例 ###
```html
	<!-- 省略 Html 架構-->
	<div class="wrapper">
		<div class="A">
			<!-- 範例 4 開始 -->
			<div class="B"> 1 </div>
			<div class="B"> 2 </div>
			<div class="C"> 3 </div>
			<div class="C"> 4 </div>
		</div>
		<div class="A item">item</div>
		<div class="box">
			<div class="A">P</div>
		</div>
	</div>
```
來套上CSS   
1. 同時符合條件才套用
- `.A.item` : 連續的，並無空格
	> 是 A 又有 item 的才會被選，其他 A 不套用
2. 父層以下的所有叫 OO **都**  套用 
- `.wrapper .A` : 中間空一格
	> 這邊通通有 class `A` 的都會被套用
3.  父層的下一層要叫 OO 才套用
-  `.wrapper>.A` : 下一層的 A 都會套用    
	> box 裡面的 A 是屬於 下下層，因此不套用
4.  同一層的旁邊叫 OO 的才套用  
- `.B+.C` : 兩個都同一層  
	> 只有 B-2 旁邊的 `C-3` 會套用
5.  同一層的右邊只要叫 OO 的都套用
-   `.B~.C` : 兩個都同一層 
    >  B-2 旁邊的 `C-3` 與 `C-4` 皆會套用  

> [練習](https://codepen.io/shan473/pen/BaRMyrz)  
  
#### 快速複習 ####
| 符號  | 說明               |
| :---: | ------------------ |
|  \>   | 下一層             |
|  \+   | 同一層的旁邊一個   |
|  \~   | 同一層的旁邊所有的 |

## 常用的選擇器 ##
- pseudo-classes (偽類別)
	以 `:` 表示
	- 關於動作的 (Dynamic)
		像是 `:hover`、`:active` ... 等等  
		
		以往在開發時可能都要實際操作再看效果      
		在 Dev tool 中可以手動直接控制    
		瀏覽器顯示 style 有個 `:hov`   
		![](https://chi01pap001files.storage.live.com/y4mXniSc9YQknILFFtKip8TAQ82En47NCTww_UljZH2WPpwqvQD9hnkcwXYNUQu4BrLI_6xTabbid29wewJsyt3Kj522mgEJaTDHjoN0PzHXFUSvUP8ZTj3OBzQEs91uitM5P80iFV083PpDcTt6BzOsT4yaDtMYgcVgBNAKvX0bnj3LL0-BoayHXrZxslbKj8r?width=660&height=236&cropmode=none)  
		
	- 選擇器  
		`:nth-child(n)` : 選擇子層的第 n 個    
		`:first-child`  :  指第一個  
		`:first-child`  :  指最後一個  
		
		快速一點  
		1. `:nth-child(odd)` : 只選奇數位
		2. `:nth-child(even)` : 只選偶數位
		3. `:nth-child(an+b)` : 等差選  
   
        > nth-child 是從後面解讀  
        > 例 : .wrapper .A:nth-child(3)
        > XX層的第 n 個元素是 OO 再動作

> 參考資料  
> [虛擬類別 - CSS | MDN (mozilla.org)](https://developer.mozilla.org/zh-TW/docs/Web/CSS/Pseudo-classes)

- pseudo-elements (偽元素)  
	以 `::` 表示  
	最常用的是 `::before` 跟 `::after`  
	使用上可以用 **共同想加入的東西**  
	例如 金錢符號  
	<iframe height="300" style="width: 100%;" scrolling="no" title="" src="https://codepen.io/shan473/embed/OJmdPvN?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shan473/pen/OJmdPvN">
  </a> by YanShanHong (<a href="https://codepen.io/shan473">@shan473</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>  
	
	這樣只要改 ::before 的內容就可以統一修改      
	
> content 一定要有，沒有內容也可以空的

\*`content : attr( class or tag )`  
可以抓到 html 的資料 

> 參考資料  
> [content - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content)

## 選擇器權重 ##
常常會因為套用很多 CSS 而眼花撩亂   
誰被套用了 ? 誰套了又沒效果了 ?   
透過權重就能清楚知道

- 把握基本原則
	> **id > class > tag**   
	> 越詳細越先套用
	> 重複寫到一樣的，以後面的為重


網路上會以 `100 : 10 : 1`  來說明比重  
但我更喜歡 Huli 大講的 `0,0,0` 越前面的越重  
誰佔的比較前面就吃那個樣式   

假如都使用 class 那第二個就是看 `數量`  
數字並不會十進位  

有神人測試過 256 個 class 可以超過 id  
不過應該不會有人會寫到這麼多 class ...  
應該是測試極限用而已  
> 參考資料  
> [你对CSS权重真的足够了解吗？ (juejin.cn)](https://juejin.cn/post/6844903608199151630)

### 進階原則 ###  
也就是 `!important` 與 `inline style` 
1. inline style : 寫在 html 同一行元素裡的 style   
```html
	<p style="background:red;"></p>
```
2. !important
```CSS
	.class{
		background:red !important;
	}
```
綜合排一下
> !important > inline style > id > class > tag  

看成 `0 , 0 , 0 , 0 , 0`   
越後面樣式越容易被覆蓋

因此套上 `!important` 是奧義  
並不會很常使用   
不然其他寫的都沒意義了   

最常使用的是 class 而非 id

## 結語 ##
以前使用 CSS 重點在其他設定  
老是一直層層疊上去  
透過整理可以更清楚知道選擇器的權重  
與選擇器正確的使用  