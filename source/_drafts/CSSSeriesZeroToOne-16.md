---
title: CSSZeroToOneSeries | 16 | 時間軸
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

## float 排版


### 問題 : 如果內容大小很小，只需要裝其中一邊，但是內容很多的時候，應該要避免掉讓並排的情形

原因在於 float 左右邊，但是本身的高度太高沒辦法往下推，當內容太多的時候就會被重疊因為比預計的 50%多。

原本是用
```css
li{
	transform : translateY(50%);
}
```
求好看性質可以直接在元素上補 clear : both，讓下一個元素都錯開上一層 float 無法撐開的原因， 但是這邊就要兩邊都加上 中間線。原本只有一側有加，如果沒加中間會像斷掉一樣
