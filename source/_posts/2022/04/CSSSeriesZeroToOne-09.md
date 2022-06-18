---
title: CSSZeroToOneSeries | 09 | 方塊酥版
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
	- Front-end
author: Rosa Hong
date: 2022-04-10 12:36:49
---

## 本篇成果
[Codepen](https://codepen.io/shan473/pen/wvPYowG?editors=0100)
![方塊酥版](https://dsm01pap006files.storage.live.com/y4mRHJR5nKjd7Mry0fH-Eevw_EuUBALAe_xSDwFAsLc-jhOf9MVukfDscCyR0aOVgn_lXXMo0TTA9P005lZ17bfeeA1u1cH1pUKDVEDHN8e9zgJptSKT1iav8eWY0i6YhYCS8uM0UuTvFQpSWlDK4sLzuIjHGVDA8aLixITKrKveAHX73wjxjTY1VgK64Xx19fM?width=1024&height=585&cropmode=none)

<!-- more -->

### float
子層設定 float 的時候，會脫離原本的排版序，會導致父層的高度錯誤或抓不到，就要清除浮動 (clearfix)，以免後面的元素不照順序擠上來。

#### 清除浮動 : overflow
> 父層消除 float 

父層 `overflow:hidden` ，讓父層可以抓到子層的高度。
overflow 是處理多餘的內容，hidden 隱藏起來

```html
<div class="box">
	<div>左邊</div>
	<div>右邊</div>
</div>
<div>我要在下面</div>
```

```css
.box{
  width:100%;
  overflow:hidden;
  background-color: #fa0;
}
.left{
  width:80%;
  float:left;
}
.right{
  width:20%;
  float:right;
}
```
#### 清除浮動 : 多一個 clearfix 元素
> 重點在於子元素，如果下一個想要按照自己的流向排，可以在前面加上 `clearfix` 斬斷 float 的排版

在想要正常排版在子元素屁股後面，設定 `clear : both`
```html
<p class="left">float 左邊</p>
<p class="right">float 右邊</p>
<div class="clearfix"></div> 
<p>按照老方法往下排</p>
```

```css
.left{
 float: left;
}
.right{
 float: right;
}
.clearfix{
	clear: both;
}
```
按下開關可以看有無 float 的效果   
<iframe height="300" style="width: 100%;" scrolling="no" title="float clearfix" src="https://codepen.io/shan473/embed/NWwObjj?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shan473/pen/NWwObjj">
  float clearfix</a> by YanShanHong (<a href="https://codepen.io/shan473">@shan473</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

#### 清除浮動 : 父層 :after 
```html
<div class="box">
	<div>左邊</div>
	<div>右邊</div>
</div>
<div>我要在下面</div>
```

```css
.box{
  width:100%;
  overflow:hidden;
  background-color: #fa0;
}
.box >div{
	float: left;
}
.box:after{
	content :'';
	display:block;
	clear:both;
}
```

> 偽元素一定要設定 `block`，讓寬度撐開  

### ~ 波浪號選擇器
波浪號是兄弟選擇器，在同一層的後面兄弟都選起來

常用 **第一個  ~  到底的元素** 都選起來，[08 篇](../CSSSeriesZeroToOne-08.md) 的麵包屑除了 `(p + p)`，波浪號也可以使用
```html
<p>no.1</p>
<p>no.2</p>
<p>no.3</p>
<p>no.4</p>
```

```css
p:first-child ~p{
	color:red;
}
```

另一種是想選到同一層的某個東西(們)，除了直接選取外，也可以透過 波浪號
```html
<p>我是一段文字</p>
<span>我是 span</span>
<span>我是 span</span>
<a>我是連結</a>
<a>我是連結</a>
<span>我是 span</span>
```

```css
p~a{
	color:red;
}
```

### :not : 排擠你
屬於逆向思考，如果要選取除了第一個以外的其他方框，除了用波浪號

- 一般波浪號排擠  

```html
<p>波浪號式排擠</p>
<p>一號走開</p>
<p>一號走開</p>
<p>一號走開</p>
```

```css
p~p{
	color:red;
}
```

- `:not` : 排擠，麻瓜翻譯機，要選到 **非第一個的 p**

```css
p:not(:first-child){
	color:red;
}
```

## 試著用 Grid  
同樣的架構，把 float 去除，利用軌道線進行排版。  
[Codepen](https://codepen.io/shan473/pen/ZEvRByL?editors=0100)
```css
.wrapper{
  width: 100%;
  display:grid;
  grid-template: repeat(3,1fr) / repeat(4,1fr);
}
.item:first-child{
  grid-area: 1 / 1 / 3 / 3;
}
```

## 參考
1. [解除 float 屬性的方法. 使用 float 屬性一定要清除浮動，否則會有版面錯置或失去高度的情況](https://medium.com/ui-ux%E7%B7%B4%E5%8A%9F%E5%9D%8A/%E8%A7%A3%E9%99%A4-float-%E5%B1%AC%E6%80%A7%E7%9A%84%E6%96%B9%E6%B3%95-5e29cc30777d)