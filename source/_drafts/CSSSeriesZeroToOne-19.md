---
title: CSSZeroToOneSeries | 19 | 文字排版系列
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
	- Front-end
author: Rosa Hong
---
## 本篇成果
[Codepen](https://codepen.io/shan473/pen/abVaLWx)
![導覽列](https://dsm01pap006files.storage.live.com/y4m9T4H16Ta75kDzYcQq5DvDiixK4mUT7-zgyeMbwFltHZbFafI5uejyNEI2PKXuVsHwbitph6KpHB-W1twOqWHvFYJXV0ZHqpaK31pEbAbsnH7ffzVJrY4jCn-DQT8BuQlWSI7mhiwxpMOte8vgXL82SlBMc9CDVnRs4GQaX5zSfAIPFEVdD6wo429FOHMt4kh?width=1024&height=133&cropmode=none)

### column-count
讓剩下的空間，分成幾格欄位。內容可以是元素，也可以是 p 裡面的文字
文字會依照 **剩餘總空間 / 欄位** 去分配

### column-gap
欄跟欄位之間的空隙

> column 屬性不一定要跟 flex 或是 grid 一起使用

### margin-left : auto
把左邊的剩餘空間分配掉。
因為 right 沒有，就會擠到右邊

### float
可以做到圖繞文，這邊做首字浮起來或是標題向左邊編排

### :first-letter
可以用在 p tag 的首字

---
### 中央排版
準確一點是要算像素的，中間的排版是透過 position : absolute 定位在 container 上，再用 margin 或是 text-align 把字定在中央。

column-count 將文字區分成兩段，算出中間的 column-gap，原本的大小加上 h1 margin 兩邊的大小。

### 用 偽元素來做裝飾
方框是裝飾性的元素，不需要多一個 element 來多擺放，用偽元素達成裝飾性就可以了。  

再用 z-index : -1，讓偽元素不要蓋住文字

---

### 不一定非要定位在上一層，也可以上上層
可以做出更多變化。

### 旋轉的軸心點 transform-origin
預設的旋轉軸心點是元素的中心，可以透過改變軸心點來旋轉。  

第一個版面想要固定左上進行旋轉，再轉 90 度時才不會差距太大。  
可以直接寫位置，也可以寫 %  數。  
```css
.element{
	transform-origin : top,left;
}
```


### 文字陰影 text-shadow
讓文字跟背景同色，再做陰影。  
跟 box-shadow 不一樣的是，沒有第四個擴張值。  
同時也可以多重陰影 !  
```css
.element{
	color: #fff;
	text-shadow : 10px 2px 0px rgba(0,0,0,.4);
}
```

---

### 與其用 border 不如用偽元素
第一個排版兩條線分別擺在標題上下方，雖然可以使用 border-top & bottom，但這兩者會填滿整個容器，因為 block 屬性的關係。  

這兩條線不屬於內容，只是裝飾性，利用偽元素 ::before 跟 ::after 也可以達成。

1. 設定 position : absolute ，h1 本身要設定位 relative 給偽元素定位
2. 控制長短

### flex-grow 分配剩餘的空間
第二個排版是分布在 h1 的前後，透過 h1 display : flex 會並排，但是這邊的長度應該自由分配，讓 h1 文字置中，剩餘空間給剩下的 ::before 跟 :after。
再透過個別設置 margin-left 或 right 讓線條距離隔開。