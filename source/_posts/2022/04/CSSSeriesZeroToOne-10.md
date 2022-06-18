---
title: CSSZeroToOneSeries  | 10 | 破格式設計
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
	- Front-end
author: Rosa Hong
date: 2022-04-10 12:36:53
---

## 本篇成果
[Codepen](https://codepen.io/shan473/pen/QWOZgzP)
![破格式設計](https://dsm01pap006files.storage.live.com/y4mc1SNrsZu-Jd9u35WNRJfQgL79lh5rKUE-T708KZoUgmfj1e0iFbqwtXItGPmNayXFew5OcaISpno8uR1h5a0KOuWpfs9NvwytLMedU4ijzl-h2mJT3AKapQU7kA5rNBSPp_QOV-6viFwczOvlSgU65TDbCQlby6ccQSZ4Rvcith2HND8fQOqhBUHkD3FrJAo?width=1024&height=586&cropmode=none)

<!-- more -->
### margin 值的數量
- 兩個數值  
	margin : <上下>  <左右>
- 四個數值  
	margin : <上> <右> <下> <左>
- 三個數值  
	margin : <上> <左右> <下>

比較常用到置中 `margin : 0 auto`，auto 是把剩餘的空間分配給左右，因此才會置中。
實際上 margin : auto ，雖然是寫全部自動分配，但是 [上下並沒有作用](https://www.zhihu.com/question/21644198)。  


css 的預設 [write-mode (書寫模式)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/writing-mode) 的方向是 **水平** 的，當我們用 margin-top : auto 或 margin-bottom : auto ，因為高度並無固定值，無法參照，剩餘空間也是 0 。

### line-height 單行垂直居中
如果是文字單行居中容器，可以把 `line-height` 設定跟容器高一樣  

```css
.box{
	height: 100px;
	line-height: 100px;
}
```

### border 區塊位置計算 : 要記得扣掉
實作是 icon 的利用 `:before` 的 border 做圓框，粗度是 10 px。      
`top : 0、left : 0`，把版面定位到父層起始左上角一樣，此時 border 粗度上下左右都會增長 10px，如果要置中，必須把 border 多出來的在 top、left 扣掉，元素才能擺到中間填滿。  

```css
.icon:before{
	position : absolute;
	border: 10px solid red;
	top: -10px;
	left: -10px;
	height: 100%;
	width : 100%;
}
```

### border 上下左右的呈現方式
以半圓框為例，我們知道 border 的切齊點是對角線 (下圖)，變成圓形的話，上下左右並不是剛好從 0 切齊到 90 度  
如果想要得到半圓，必須是鄰近兩個 border 再做旋轉 45 度。   
- width、height 為 0 ，單純的 border  

![純 border 圓形](https://dsm01pap006files.storage.live.com/y4mVu7eeg2awMupFoD5T_nq55dVmzodISxqWR8paqvV46NhzCf4-VPLWZ0Xlm_JLUFsOCEGTcqVb6SoH4icdXFX9V3ZLR39nFB5YYYyNr-ENP529_4MNud_lE-ksXUdUOblMf7y8cah3KcaOjNIgJr_9l8o-fXeE4FZotOCa1CSDMl5pHcz4tP-0UtZeuurM5DG?width=496&height=488&cropmode=none)  

> 正確的半圓是相鄰兩邊的 border 組合出來的  
> 像是 [03 篇](../CSSSeriesZeroToOne-03/#補充-三角形的陰影)能出現陰影的三角形一樣的概念
### 子層物件整體高度超出父層 : padding 擠回去
因為 icon margin-top 是 -75 px，比原本父層凸出 75 px ，必須在整體的 padding 把多的補回去，把子容器的元素都包含在內。


## 參考
1. [为什么「margin:auto」可以让块级元素水平居中？](https://www.zhihu.com/question/21644198)