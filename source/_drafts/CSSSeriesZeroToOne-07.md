---
title: CSSSeriesZeroToOne | 07 | 導覽列 & 變化導覽列
tags:
  - CSS
  - CSSSeriesZeroToOne
categories:
  - [Frontend,CSS]
author: RosaHong
description:
---
## 本篇成果
[Codepen](https://codepen.io/shan473/pen/abVaLWx)
![導覽列](https://dsm01pap006files.storage.live.com/y4m9T4H16Ta75kDzYcQq5DvDiixK4mUT7-zgyeMbwFltHZbFafI5uejyNEI2PKXuVsHwbitph6KpHB-W1twOqWHvFYJXV0ZHqpaK31pEbAbsnH7ffzVJrY4jCn-DQT8BuQlWSI7mhiwxpMOte8vgXL82SlBMc9CDVnRs4GQaX5zSfAIPFEVdD6wo429FOHMt4kh?width=1024&height=133&cropmode=none)

四種不同寫法的導覽列
[Codepen](https://codepen.io/shan473/pen/NWwLwmZ)
![變化導覽列](https://dsm01pap006files.storage.live.com/y4mxh2kVWQGz5Y5blS98ignQpvNJzpOWFoegrfNdnwioXN37pRMs_UAXWIjV38dGFgg2z4HSQGInRsfJzwzxhUc1-TL4o4jsjhWV_PINth18C_qZ2JEo-KuJm3UAaU8ePorHvVKZABYHV6LJ9mgFTP4YdVPGUP2DmOSCmHehmX01KVzjrVlFs-xp9IVKe_3hKWO?width=660&height=444&cropmode=none)

### max-width : 最大寬度
避免現代螢幕過寬導致元素被擠在邊邊，如果原本是 width 是填滿的情況，使用 display : flex，justify-content : space-between，就會顯得很醜。

### input:focus 
input 在打字時會有醜醜的外框 (outline)，是因為 focus 預設有框線，可以把框線消失，讓視覺體驗更加。


### 不能 transform 的原因
inline 屬性的元素並不支援，所以修改 display 屬性就可以了。

參考 : 
- [CSS transform doesn't work on inline elements - Stack Overflow](https://stackoverflow.com/questions/14883250/css-transform-doesnt-work-on-inline-elements)

根據 CSS 規格書，有提到區塊元素或者 inline-auto 這類才可以 transform。 

### border - left : 50% ,right : 50%
border 會被收斂到看不見，width 

## 導覽列變化手法
1. 把 LOGO 擺中間  
2. flex order (V)
3. 直接換結構
4. absolute 