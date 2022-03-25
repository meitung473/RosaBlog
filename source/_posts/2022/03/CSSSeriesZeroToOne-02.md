---
title: CSSZeroToOneSeries | 02 | 互動卡片
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
  - - Frontend
    - CSS
description: CSS切版練習 - 互動卡片
author: RosaHong
date: 2022-03-18 09:53:19
---


## 本篇成果
[Codepen](https://codepen.io/shan473/pen/LYOdJjV)
![互動圖卡](https://dsm01pap006files.storage.live.com/y4mBJbcOCZ4CF8WqJt5NbdIirs1thioqss6qbUqW3ReiXiJK9hPjNOthclckHXTZPXb1Y7DFw_kR-UQQmMYqzIWBfGLog7LogLdEVu4TEuI-iaz_91LgvrZteMyvlcB3mxOq4RxeHRiFqrz0JlQOD0O3tLstdIvdeXoDZD7l2saSLi84O8Vhu92m_J2Fd4O1rgh?width=1024&height=585&cropmode=none)


## 圖片間距問題 
img 是 inline 元素，但又可以按照圖片大小來設定寬高，所以又很像 inline-block。  
而且圖片是沒有 baseline 的，距離下方有會 1 px 的問題。   

可以有 2 種情境
1. 文字 + 圖片
2. 純圖片(s)

### vertical-align 垂直對齊
設定 `vertical-align`。vertical-align 是對 **inline** 屬性的元素做垂直對齊的方式。  
```css
img{
  vertical-align : middle;
}
```
middle 或 bottom 都可以，只是把圖片往容器下面靠攏，而且不修改圖片的 display 屬性。  
在後面有文字的元素我覺得這個方法最適合。  

### display: block 
1 px 是來自 inline 的問題，那把 display 修改成 block 就沒毛病了   
但如果是好幾張圖並排加上文字，這方法就不適用了。  
```css
img{
  display: block;
}
```

### font-size : 0 & line-height : 0
如果在沒有文字的情況下，在 **父層** 去除空白文字的空間  
```css
.image-father{
  font-size: 0; || line-height: 0 ;
}
```
### 改動 html 結構，讓 inline 擠在一起  
不過在多張圖並排也可以利用 html 排列來解決問題，inline 屬性似乎會吃進 1 個 html 空格，這空格也不是 margin...  
- img 元素間有空白
```html
<div class="box">
  <img src="" alt="">
  <img src="" alt="">
</div>
```
- 擺在一起，空白會消失
```html
<div class="box">
  <img src="" alt=""><img src="" alt="">
</div>
```
我覺得蠻神奇的，平時在做導覽列 (navbar) 使用 a 標籤來排，也是同一概念  
因為 a 也是 inline 屬性，如果想讓 a 無縫隙並排擠在一起寫就行了  
上一篇的 `應用 : 導覽列` 就有示範到囉  

### 超級偷吃步 margin-top : -1px
大部分在網路上看到的解決方案是把圖片往上挪 1 px 來解決
起因是很多網頁有超大張 DM 海報要放在網頁，並且切成兩段  
造成中間銜接處有 1 px 空白   

由於瀏覽器相容性問題，上面的招數只在 chrome 跟 Edge 試過  
像是 safiri 、firefox 或 opera 就沒試過了  
margin 是都可以用的，應該是最保險的    


## position 迷思
子層用 absolute ，父層不一定用 relative
> 只是找上面不是 static (預設) 定位的元素  


### 補充 : 常見技巧 蓋滿全版 
有時候想蓋滿容器，不一定要用 100% 來使用  
如果遇到 inline 屬性既不能設高度也不能設寬度  
這時候就可以透過 position 加上定位值來撐開  
```css
.box{
  position: relative;
}
.box a{
  position: absolute;
  top: 0;
  bottom:0;
  left:0;
  right:0;
}
```