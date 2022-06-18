---
title: CSSZeroToOneSeries | 15 | 對話框
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


### 照片圓角
不用對著照片進行圓角，利用父層做 `overflow : hidden`
```css
.pic {
  border-radius:50%;
  overflow:hidden;
}
.pic img{
	width: 100%;
}
```

### html 結構
可以分成本地跟遠端，裡面的結構差不多，只有在一些地方進行微調
```html
    <div class="user remote">
      <div class="avatar">
        <div class="pic">
          <img src="https://reqres.in/img/faces/7-image.jpg" alt="">
        </div>
        <div class="name">Michael</div>
      </div>
      <div class="txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique mattis lectus, at convallis est.</div>
    </div>
    
    <div class="user local">
      <div class="avatar">
        <div class="pic">
          <img src="https://reqres.in/img/faces/8-image.jpg" alt="">
        </div>
        <div class="name">Lindsay</div>
      </div>
      <div class="txt">山話情老約院到又，廣紀你布廣溫告看中空不：家你運向是電中數達地動，目樹們以不其始體小飛速？</div>
    </div>
```

### order
flex 特性，因為要將本地端的對話框跟使用者圖片往右推，而且照片要在最右邊。  
根據結構要麼調換，不然就是利用 flex 的 order ，把對話框往前推。

`order : -1`

### flex-shirnk
flex 的壓縮值。flex 在預設況下是會不會換行的，因此裡面的內容會被壓縮，如果不想被壓，在子元素補上 `flex-shrink : 0`。

實作是因為圖片會被長文字給擠壓，避免圖片便陀圓型，可以加上。

### bouns : 英文長文破格 - word-break
word-break 可以處理過長文字，word-break 有幾種屬性  
1. normal : 按照預設的斷句，通常如果掛上 flex ，就永不斷
2. break-word : 根據單字來斷句
3. break-all : 根據容器來斷句，不管單字的完整性，超出就斷

但是這個屬性未來會被棄用 :O