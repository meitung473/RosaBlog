---
title: CSSZeroToOneSeries | 08 | 網站麵包屑
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
	- Front-end
author: Rosa Hong
date: 2022-04-10 12:36:38
---

## 本篇成果
[Codepen](https://codepen.io/shan473/pen/MWOqRoJ)
![麵包屑](https://dsm01pap006files.storage.live.com/y4m2Ut7v52DvB4HXKmhJiPfdh0fC0SYoIg5T6XnWySFOIDNRpNgeG6BkVMmRRZ1qoFlUYVdtq9et8hdrrwbuKF_IqtJFFUTFY2ZI0HDP4tw4ma1Jx9JaMbE6WmvD7YYOv32FJlbpmUwIGLUMzWi1CyKgXyGm598Nl1TZPipEnVfdXC5t8p5GdEi7KevsBdw7Zou?width=1024&height=585&cropmode=none)

<!-- more -->
## ::before 偽元素
`::before` 或是 `:before` 寫法都可以  
利用 `content` 內容產生的箭頭，可以隨時替換  
箭頭也屬裝飾性，不用再特別寫 html tag  
```css
.breadcrumb li + li:before{
	content: '>';
	padding-left: 0;
}
```
content 覺得圖案太少，也可以利用網頁編碼 UTF-8 的特殊字元來顯示
```css
.breadcrumb li + li:before{
	content: '\003E';
	padding-left: 0;
}
```
這兩者是一樣的，但前提是要在 html 加入 `<meta charset="utf-8">` 設定編碼   
參考 : [快速編碼箭頭](https://www.toptal.com/designers/htmlarrows/)
## 再深入偽元素
### 偽元素出現的位置 ?
偽元素需要經過瀏覽器的運算跟渲染之後才會出現，所以 **檢視原始碼** 是看不到的

### content
偽元素一定要有 `content` ，不然就不會出現了  
其中 content 包含各式各樣的屬性  
1.  none
2.  normal
3.  `string`
4.  url
5.  `counter`
6.  `attr`
7.  open-quote
8.  close-quote
9.  no-open-quote
10.  no-close-quote

這邊舉例常見的幾個樣式  

### string
一般的文字或是空內容，拿來裝飾元素    
像本篇的箭頭就是 string   

### counter : 讓 css 數數
在父層新建一個 reset 計時器  
`counter-reset : <計時器名稱> <起始值>`，如果沒有寫起始值是從 0 開始  
```css
body{
	counter-reset: Section 0;
}
``` 

其實也可以多層  
```css
body{
	counter-reset: Section 0;
}
section{
  counter-reset: P 0;
}
section:before{
	content: 'Section' counter(Section)' .';
	counter-increment: Section 1; 
}
p:before{
	content: 'P' counter(Section)'-'counter(P)' .';
	counter-increment: P 1;  
}
```

子層的偽元素可以使用 counter 進行計數
- content : counter(`<計數器名稱>`)
- counter-increment : `<計數器名稱> <要增加的數字>` 也可以是負數       

```css
body{
	counter-reset: Title;
}
h1:before{
  content: 'Title 'counter(Title)' .';
  counter-increment: Title 1; 
}
```
### attr
可以拿到 `data-` 屬性的值，如果跟資料有關的不要放在偽元素，瀏覽器在解析時是讀取不到的。  

```html
  <span data-title="商店">1</span>
  <span data-title="品項">2</span>
  <span data-title="貨物">3</span>
```

```css
span:before{
  content: attr(data-title);
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title="css counter" src="https://codepen.io/shan473/embed/podGNON?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shan473/pen/podGNON">
  css counter</a> by YanShanHong (<a href="https://codepen.io/shan473">@shan473</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


### url 沒作用的圖片
content 中的 [url 圖片雖然能被列印出來](http://csscoke.com/2013/09/22/%E4%BD%BF%E7%94%A8before-%E8%88%87-after%E4%BE%86%E8%A3%BD%E4%BD%9C%E5%8F%AF%E5%88%97%E5%8D%B0%E7%9A%84logo%E5%9C%96%E7%89%87/)，但不能調整寬高尺寸，只能利用 scale 來縮放。

根據 [這篇文](https://segmentfault.com/q/1010000004569689)，偽元素預設是 inline 的一種，就算調成 block，因為 content 並不是實際計算範圍，block 算的是匿名元素的 `width` 跟 `height`  

真的想放圖片可以使用 background-imge，再透過 background-size 調整大小，但是就不能被影印


### 注意
為了 SEO 著想，偽元素出現在裝飾性上就好，資訊類就不建議了







## 兄弟選擇器 (+) ，我的隔壁
```html
<a href="#">排擠我</a>
<a href="#">我有</a>
<a href="#">我有</a>
<div>我是防守員</div>
<a href="#">排擠我</a>
<a href="#">我有</a>
```
```css
a + a{
	color: red;
}
```
在 sass 會寫 `& + &`，通常是排除第一個，因為第一個的前面並沒有元素  

或者寫 `:not` 把第一個給排除掉  
```css
a:not(:first-child)
	color: red;
}
```

## 網頁色彩 HSL
`hsl (色相角度<0~360> , 色彩飽和度 , 色彩的明度 )`   
色彩是 RGB，分別各佔 120 度    

[![HSL 色相環圖片](https://dsm01pap006files.storage.live.com/y4mzaFTHqTQKFWQ2sQ_sISqYOCtvikOQA4Dmli4z7vpaNjUQ7Nirr4UbVRGbiS9uCI9vba3kPgs7-_xx4wqwjkXxMs-VnajXcBBhswICqcXV54qi9lLN5lSAO_A-G5MdHISuaULUSfhoHKbgA1KFfLD6bcojrfSyoJJqCwIodr7i0AGpp8ainTKi0Fl7MV7y3XO?width=500&height=424&cropmode=none) 來自《RGB、HSL、Hex 網頁色彩碼，看完這篇全懂了 | CSS可樂》](http://csscoke.com/2015/01/01/rgb-hsl-hex/)  


- `Hue` : 色相
- `Saturation` : 飽和度。 預設是 100%，越低越接近灰黑
- `Lightness` : 亮度。 預設是 50%。 有點像相機的曝光度，增加白色或黑色的量

例 :  綠色  `hsl (120,100%,50%)`

## 參考 
1. [伪类before/after中的图片大小是不是不能设置的? - SegmentFault 思否](https://segmentfault.com/q/1010000004569689)   
2. [使用::before 與 ::after來製作可列印的logo圖片](http://csscoke.com/2013/09/22/%E4%BD%BF%E7%94%A8before-%E8%88%87-after%E4%BE%86%E8%A3%BD%E4%BD%9C%E5%8F%AF%E5%88%97%E5%8D%B0%E7%9A%84logo%E5%9C%96%E7%89%87/)  
