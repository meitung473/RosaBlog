---
title: CSSZeroToOneSeries | 04 | 交錯漂浮版
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
  - '2022'
  - '03'
author: RosaHong
date: 2022-03-20 14:11:18
---

## 本篇成果
[Codepen](https://codepen.io/shan473/pen/JjOZEBv)
![交錯漂浮版](https://dsm01pap006files.storage.live.com/y4myrS3n9KEVx68j_Eae0KRrAYX2x2pFSw4IpKeLRuSQUsYqqzoIbIJ_TZHOxs96dBkjq9Or4jrv4cbmLYZJHh8XJf5UwXUa8Fst54z9sV0FCDctxAGmKDM3WK1sB4h8QsOqArz8DIpcZX4fpHELmYZC4xd994q-I2LITANufFsVCXWAneTdCRxsl7eG7xqpK_I?width=1024&height=1016&cropmode=none)
<!-- more -->

## box-sizing 盒子計算方式
box sizing 有兩種屬性  
- `content-box` : 只有內容 (width) 的大小，其他另外算 (padding、border)
- `border-box` : 到 border 之前的都計算在內   

在早期瀏覽器支援度沒那麼高，都會加上前綴 (prefix)  
如果擔心使用的瀏覽器是否有支援也可以到 [caniuse](https://caniuse.com/?search=box-sizing) 查詢  

## flex-shirk : 壓縮值
父層設定 flex 後  
預設內容會進行並排而且壓縮  
壓縮值預設是 flex-shirk : 1  
所有子項會照數目去壓縮寬度    

如果是 0 的話 flex 不會幫你壓內容  
而是解開束縛~  

在這個排版中我們將兩個子元素 `.txt` 跟 `.pic`  width 設定 55%    
整體容器的大小照理來說是 110%  
但實際上預設最大值只有 100%  
在還未設定 flex-shirk 之前，我們可以看到容器實際大小是 600 而不是 660
即使設定兩個子項都設 100% ，flex 還是只會將空間平均分配後縮壓   

這時候只要加上 flex-shirk : 0，把壓縮比取消  
正確的寬度就會是 660 了    

這也是為什麼有人設定完 flex 後，想把剩餘空間平均撐開  
填入 width 把原本內容還大的數值  
因為 flex 自己就會幫你壓完算完    


## nth-child : 選兒子
跟 nth-of-type 很像，但是 nth-child 只認位置      

```css
/* 翻譯 : 是第一個，而且 class 是 box 的 */
.box:nth-child(1){} 
/* 翻譯 : 是第一個，而且在 box 裡 */
.box :nth-child(1){}  
``` 

但如果配上 `>` ，如果有孫子，並不包含在內，因為 `>` 是指下一層而已，只包到兒子。 
```html
<div class="grand">
  <div class="father">
    <div class="child">
    </div>
  </div>
  <div class="father">
    <div class="child">
    </div>
  </div>
</div>
```
```css
/* 被套入樣式的只有 grand 裡面第一個 fater，但是 child 不會有 */
.grand:nth-child(1){
  width: 100px;
  height: 100px;
  background: red;
} 
```
也可以奇數、偶數    
- 奇數 : `nth-child(odd)`  
- 偶數 : `nth-child(even)`  

