---
title: CSSZeroToOneSeries | 07 | 導覽列 & 變化導覽列
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
	- Front-end
author: Rosa Hong
date: 2022-04-09 22:46:25

---

## 本篇成果
[Codepen](https://codepen.io/shan473/pen/abVaLWx)
![導覽列](https://dsm01pap006files.storage.live.com/y4m9T4H16Ta75kDzYcQq5DvDiixK4mUT7-zgyeMbwFltHZbFafI5uejyNEI2PKXuVsHwbitph6KpHB-W1twOqWHvFYJXV0ZHqpaK31pEbAbsnH7ffzVJrY4jCn-DQT8BuQlWSI7mhiwxpMOte8vgXL82SlBMc9CDVnRs4GQaX5zSfAIPFEVdD6wo429FOHMt4kh?width=1024&height=133&cropmode=none)

LOGO 放中央的四種不同寫法導覽列
[Codepen](https://codepen.io/shan473/pen/NWwLwmZ)
![變化導覽列](https://dsm01pap006files.storage.live.com/y4mxh2kVWQGz5Y5blS98ignQpvNJzpOWFoegrfNdnwioXN37pRMs_UAXWIjV38dGFgg2z4HSQGInRsfJzwzxhUc1-TL4o4jsjhWV_PINth18C_qZ2JEo-KuJm3UAaU8ePorHvVKZABYHV6LJ9mgFTP4YdVPGUP2DmOSCmHehmX01KVzjrVlFs-xp9IVKe_3hKWO?width=660&height=444&cropmode=none)

<!-- more -->

### max-width : 最大寬度
避免現代螢幕過寬(高解析度螢幕)導致元素被擠在邊邊，如果原本是 width 是填滿的情況，使用 `display : flex，justify-content : space-between`，元素會被分散在螢幕的邊邊角角。 
```css
.container{
  max-width: 1200px;
}
```

### input : focus 
input 在打字時會有預設的外框線 **(outline)**，可以把框線消失，讓視覺體驗更加。

```css
input:foucs{
  outline: none;
}
```

### a tag 不能 transform 的原因
幫連結加上浮上去的漸變動畫， a 的預設 display 是 `
inline`，會發現直接加上去 a 並不會有變化。  

實際上 inline 屬性的元素並不支援，修改 display 屬性就可以了。

參考 : 
- [CSS transform doesn't work on inline elements - Stack Overflow](https://stackoverflow.com/questions/14883250/css-transform-doesnt-work-on-inline-elements)

> 根據 CSS 規格書，有提到區塊元素或者 `inline-auto` 這類才可以 transform。 

### border 畫線效果  
position 讓我們可以利用 top、bottom、left、right 四邊進行定位，也可以撐開全版面。  
也可以利用偽元素的 `left`、`right` 來創造線條收縮的效果。  

> 為什麼用偽元素 ? 這邊的底線只是 **裝飾作用** 不具任何資訊，盡量不要創造新的 tag 來裝

```css
.container nav a:after{
  content:'';
  position:absolute;
  left:50%;
  right:50%;
  border-bottom: 1px solid var(--txtColor); 
  height: 0;
  bottom:0;
  transition:left .3s ease,right .3 ease;
}
.container nav a:hover:after{
  left:1em;
  right:1em;
}
```

> 後來想想這樣的寫法不太好，原因在於 [`top`](https://csstriggers.com/top) 這類定位是會 `reflow` (重排)，效能上比較不好，選擇只有 `repaint` (重繪) 的 [transform](https://csstriggers.com/transform)

改成 transform  
```css
.container nav a:after{
  content:'';
  position:absolute;
  bottom:0;
  left:0;
  width: 100%;
  height: 0.1em;
  background-color: #fff;
  transform: scale(0);
  transform-origin: center;
  transition: transform .3s ease;
}
.container nav a:hover:after{
  transform: scale(.8);
}
```
> transition 不要使用 `all`，針對要件漸變的部分設定就好，以免效能上的浪費。
 
## 導覽列變化手法
1. 把 LOGO 擺中間  
2. flexbox 改變 order  
3. 直接改寫 HTML 結構
4. 利用絕對定位   

個人最喜歡 flexbox 的部份，既不修改結構，又保有彈性修改，哪天想讓 LOGO 到最前面只要修改 `order` 即可。 


