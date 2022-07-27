---
title: CSSZeroToOneSeries | 06 | 網頁頁尾版塊
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
  - '2022'
  - '03'
author: RosaHong
date: 2022-03-25 14:05:44
---

## 本篇成果
[Codepen](https://codepen.io/shan473/pen/oNoMJBQ)
![網頁頁尾版塊](https://dsm01pap006files.storage.live.com/y4mtphMUUk0c1yY9dUb53RF0jkrLI5tF-TSjeeSIBE583SwUq1Uk8UZUm-Z011ZK-Or0KbhFHvVqODwJObSn3ACJf7CuFIuu18jaIEzdPeLEqvFFMAesLSLoetnq0FPAtwi7kCTP7ZscwXBBtdaDMV7GQKnv5kTH_3vY6LSOcOkcg1zvlpCEsth5zYrQJ54RM7r?width=660&height=377&cropmode=none)

<!-- more -->
## flex-grow : 子元素的空間分配
`flex-grow` : 剩餘容器空間分配，運用到 flex-grow : 1，個別分配一樣的，以免內容大小不一導致 container 有大有小。  
> `width : 0` 可以把 width 先設定為 0 ，讓 **主軸** 的 width 都交給 grow 分配。

### flex 裡面的 width : 100% 到底沒有作用 ?  
有，在還沒設定 flex-grow 之前  
子元素的空間是由內容去撐開的  
拔掉本篇的 footer-item 中的 flex-grow 並將 width 設為 100%  
依然會跟 flex-grow 一樣  

在之前的篇章有介紹過 flex-shrink 壓縮值  
原因在於 flex-shrink 預設把空間平均壓縮了  
這也是為什麼撐開到 100% 也單一個子元素占不滿 container   
所以設定 25% (item 總數是 4) 或 100% 也沒差  

個人不太建議這樣寫，因為 width 感覺失去意義了    



