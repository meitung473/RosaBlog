---
title: CSSZeroToOneSeries | 05 | 超通用版面
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
  - - Frontend
    - CSS
author: RosaHong
date: 2022-03-25 12:31:10
description: CSS切版練習 - 超通用版面
---

## 本篇成果
[Codepen](https://codepen.io/shan473/pen/yLPqLWg)
![超通用版面](https://dsm01pap006files.storage.live.com/y4mHj3lx_2ZCP6jUJJdmg3J0yQ1okzs2onLtZoKl8Xl9-SHWo5R76rhJJOxB0CCcCpsr4mjLPVhk5vDB68y-tAOu5tf-ZNbKOE3h4Sre1TfJSvHP0v2J8P8TvUahMIXlTHuDmVXPLF8B_iY-H2YRC15q7MtFqTN40Pi1Q79x-NpaPicKK8MhjlUTMAusYM6_kFp?width=660&height=377&cropmode=none)

## object-fit  
讓置換元素 (Replaced element) 的內容如何塞到已知的父層寬度與高度的框  

Replaced element 指的是內容呈現不在 CSS 的控制範圍   
像以下這些元素  
1. `<img>`
2. `<object>` 
3. `<video>` 
4. `<textarea>` 和 `<input>` 表單元素。

簡單來說還未設定 CSS 寬高之前，是由內容去撐開的  

object-fit 有 5 個屬性   
- fill : 填滿，超出會進行拉伸
- cover : 照片超出版面，可以讓圖片等比例縮到塞滿框，多餘的裁切。或是照原圖片裁掉不符合框的範圍
- contain : 等比例縮放，直到看見整張完整的圖。可能會距離框有距離  
- none : 不做縮放，直接塞滿框
- scale-down : 會是 none 跟 contain 其中一個值，看誰會拿到最小值

參考 : [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)  

## align-self  
當父容器為 flex 
單一個子元素可以擺脫整體的 align-items 約束    
自己排在想要的次軸位置  

\* align-items 是在父層控制所有子元素的次軸位置，預設是 flex-start       

以本篇為例，`flex-direction : column` 來說次軸是 X 軸  
align-self 會控制子元素在 X 軸的排列  
我想只讓 more button 往最右邊靠攏只要設定  
```css
.more{
  align-self: flex-end;
}
```

## margin-top : auto  
子元素會在父層剩餘的 margin 被分配掉  

那 **auto** 的值何來 ?  
我們必須要告訴瀏覽器有參考值邊界才能算出剩餘的空間  

以本篇的按鈕想要往下面對齊  
父層使用 `display: flex` 跟 `flex-direction : column`  
子層會被撐開，佔滿空間  
這時候子層就可以算出距離邊界的剩餘的空間(也就是子元素內容本身跟父層的邊界)  
要全部往下推就要把 top 所有空間都分配掉 

```css
.item .txt .btn{
  margin-top: auto;
}
```

所以如果想往哪邊推，就是把反向的空間給分掉   
```css
margin-top : auto ; // 擠到下方
margin-bottom : auto ; // 擠到上方
margin-left : auto ; // 擠到右方
margin-right : auto ; // 擠到左方
```

### 常見的 margin : 0 auto 置中技巧也是
把 box 置中
```html
<div class="box"></div>
```
```css
.box{
  width: 100px;
  height: 100px;
  background-color: red;
  margin: 0 auto;
}
```
margin 針對左右邊都分配掉，也就是平均，所以元素才會置中  

- 此時的邊界剩餘空間 ?    
  預設 box 的 display 是 block 占據整行    
  由於內容只有 100px，剩餘的空間就會是 viewport - box 內容再去分配    

## flex-wrap
有兩個值
- wrap  : 總體寬度超出螢幕寬，會換行
- nowrap : flex 預設，打死不換行

當複數個元素擠在同一個容器  
會發現他們會平均壓縮(預設 flex-shrink : 1)    
而且打死不換行  
即使你縮到最小，也不會有內容超出容器導致 X 向的捲軸出現  
因為 flex 都幫你壓好好的  

當然這樣的視覺是 NG 的，內容都擠一塊了  
這時候 `wrap` 就很好用了  
當這一行的寬度容不下多的子容器寬度就會往下排   

flex 可以說是能屈能伸，你說是不是很棒呢 QQ  


