---
title: CSSZeroToOneSeries | 13 | 訂單進度條
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


### ~ 讓後面的都...
ol 有順序的 list，無障礙的網站比較好，有一定的流程順序  
比如說目前(已啟動)的進度以後背景是灰色
```html
<ol>
	<li></li>
	<li class="active"></li>
	<li></li>
</ol>
```
自己以後的兄弟都選起來  
```css
li.active ~li{
	background-color: grey;
}
```

### box-shadow 做邊框
好處是不會算在 box model 裡面
使用 border 要扣除延伸的尺寸，例如上下左右為 4 px ，總共寬跟高各扣 8px

box-shadow 有六個值
1. inset : 內陰影，預設是沒有顯示的
2. offset-x : x 值偏移量，正值往下，負值往上
3. offset-Y : y 值偏移量，正值往右，負值往左
4. blur : 模糊程度
5. 擴散值 : 以圓心往外擴散多少
6. 顏色


### flex-shrink : 壓縮多少 ?
display flex 在縮小 viewport 時，裡面的東西都會一起被壓一壓  
flex-shrink 預設是 1，讓 flex 自動壓縮內容
如果不想被押就 `flex-shrink:0;`

![[Pasted image 20220306100652.png]]