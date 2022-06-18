---
title: CSSZeroToOneSeries | 14 | 表單
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

### backdrop-filter : 毛玻璃特效
backdrop-filter 只有背景圖模糊，filter 是整個元素一起模糊  
跟 filter 的屬性很像，都有基本的 `blur`、`contrast` 等等  

在 ios 支援度要用到 webkit 前綴。  

### button 之間的空隙
跟 a 標籤一樣，如果 html 擺放的時候有空隙，實際上畫面會有幾 px 的空格。(好像是空白字元 ?)

可以在父容器使用 `font-size : 0`，讓空白字元消失，inline 屬性的東西就不會有空白了。

### line-height
line-height 可以設定行高，也可以把子容器撐大


### bouns : label + checkbox + custom check
這邊的結構把 input 放在最上面，可以用 ~ 或是 + 來選到下面的 label 以及打勾元素。  

使用 label 包住兩個 span，一個是打勾用，另一個是文字

> 不過應該也可以使用 label 的 before 跟 after 做出打勾框格