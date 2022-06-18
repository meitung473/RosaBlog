---
title: CSSZeroToOneSeries | 11 | 表格
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
	- Front-end
author: Rosa Hong
---
## 本篇成果
[Codepen](https://codepen.io/shan473/pen/dyZQqKm?editors=0100)
![導覽列](https://dsm01pap006files.storage.live.com/y4m9T4H16Ta75kDzYcQq5DvDiixK4mUT7-zgyeMbwFltHZbFafI5uejyNEI2PKXuVsHwbitph6KpHB-W1twOqWHvFYJXV0ZHqpaK31pEbAbsnH7ffzVJrY4jCn-DQT8BuQlWSI7mhiwxpMOte8vgXL82SlBMc9CDVnRs4GQaX5zSfAIPFEVdD6wo429FOHMt4kh?width=1024&height=133&cropmode=none)

## 表格基本結構
**表格元素**
- `tr` : 表格列 (table row)
- `td` : 表格資料 (table data)，表格儲存格
- `th` : 標題頭部 

**表格結構**
- `thead` : 表格的最頂端標題欄
- `tbody` : 中間的表格資料所在區
- `tfooter` : 表格最底，通常放置一些備註等等的

## scope : 表格的讀取
告訴電腦要怎麼去定義標題，是 row 還是 column
畫面上不會有任何區別，如果是螢幕閱讀器，就會知道標題是要讀行還是列
```html
<th scope="col">1</th>
<th scope="col">2</th>
<th scope="col">3</th>
<th scope="col">4</th>
```

## colspan : 跨欄
td 會有跨欄的時候，在屬性加上要跨的數量
```html
<td colspan="2">我要跨兩欄</td>
```
有 colspan 當然有 rowspan

## caption : 表格標題
表格如果有標題，對 **無障礙網站** 很重要

### css - caption side : 把標題放...
caption 可以寫在 html 結構的一開始，再透過 caption side 來放置 caption 的位置
```css
caption side: bottom;
```

## 結構選擇器
- `:nth-child` : 只看元素的順序，也可以 奇數偶數 (odd、even)
- `:first-chid` : 第一個元素
- `:last-child` : 最後一個元素

## Table RWD 的幾種方法
1. 加入橫向捲軸
2. 破壞框線
3. `:before` conent 
4. 用 `flex` 排版

## 補充 : 利用 grid 做表格