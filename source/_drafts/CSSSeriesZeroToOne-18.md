---
title: CSSZeroToOneSeries | 18 | 不規則邊緣
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

### box-shadow 疊疊樂
box-shadow 可以堆疊很多層，利用位移的技巧產出很多個一樣的圖案

### 用另一個偽元素來遮住
`:after` 用完陰影後，下方半圓凸出來要用 `:before` 產出長方形遮住  
但是長方塊就會遮住下方的內容，因此透過 z-index 來處理

### z-index
z-index 一定要使用 position 定位屬性，才能知道誰在哪一層
類似 PS 的圖層概念。

### border 的陰影還是正方塊
原本想說用三角形做小山丘之類的，但是發現 border 做 box-shadow 有點小技巧
border 原型還是方塊，因此需要透過其中的兩邊來拼出半個三角，在透過旋轉來達成三角

通通常會用 上 左 右 下 的 `下右` 來做， transform-origin 就要重新訂個旋轉點，才會比較好 rotate

[triangle shadow](https://codepen.io/shan473/pen/NWXKxYG?editors=0100)