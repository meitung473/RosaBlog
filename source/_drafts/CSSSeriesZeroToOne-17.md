---
title: CSSZeroToOneSeries | 17 | 旋轉拼接方塊
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

### 計算區塊
1. (960 / 3) - 200 = 120 / 2 = 60 margin 左右相隔 60px
2. 要算第二排位移， 左右相隔 60， 200 - 120 = 80 ，重疊部分 / 2 = 40，200 - 40 = 160 一共要往左 160
3. (margin top + bottom 的算法還沒想出來)

### 不是元素轉而是偽元素轉
元素轉包含裡面的文字也會一起轉動，所以背景是偽元素的背景色
這這樣不用轉文字

### 用 sass 來迴圈來快速寫背景色
List 寫法
```scss
$colorList : #de1a1aff, #304188, #acbed8ff, #f2d398ff, #d78521ff, #403d58ff, #dbd56eff, #2cf6b3ff, #71f79fff;
```
for 迴圈，`@for $i from _min through _max`
```scss
@for $i from 1 through 9{
    .box#{$i}:before{
      background-color: nth($colorList,$i);
  }
}
```
如果要向陣列 `array[index]`，可以使用 List.nth，`nth($list,$index)`