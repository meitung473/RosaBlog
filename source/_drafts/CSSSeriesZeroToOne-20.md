---
title: CSSZeroToOneSeries | 20 (完) | 拼板+重構
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
	- Front-end
author: Rosa Hong
---

## 前言
終於來到排版系列的最後一篇，綜合之前所有的練習  
來建構一個完整的 Landing Page  

## 本篇成果
[Codepen](https://codepen.io/shan473/pen/abVaLWx)
![導覽列](https://dsm01pap006files.storage.live.com/y4m9T4H16Ta75kDzYcQq5DvDiixK4mUT7-zgyeMbwFltHZbFafI5uejyNEI2PKXuVsHwbitph6KpHB-W1twOqWHvFYJXV0ZHqpaK31pEbAbsnH7ffzVJrY4jCn-DQT8BuQlWSI7mhiwxpMOte8vgXL82SlBMc9CDVnRs4GQaX5zSfAIPFEVdD6wo429FOHMt4kh?width=1024&height=133&cropmode=none)



### 重構重點
1. 挑出重複的 container，合併相同屬性
2. 挑出重複的 nav
3. h1 重新安排
4. 新增 group ，把內容層級分出來，再個別分不同的層級作背景色

### 讓第三區塊的文字填滿區塊
原本如果字句不同會導致尾巴有空白，透過 flex 屬性的 grow ，讓剩餘空間被分配到 .txt 。原本是內容撐開，改成 flex 幫我撐

```css
// 父層具有 flex
.txt{
	flex-grow : 1;
	//....
}

```


### img 圖片填滿但不超格，而且設定固定高度
第三區塊圖片大小不一的時候，文字內容會被往下擠，這邊把 img 改成固定高度，object-fit : cover，圖片做不變形塞滿整個框框。

```css
img{
	height : 400px;
	object-fit : cover;
}
```