---
title: CSSZeroToOneSeries | 12 | 側邊選單 + 收合式 + 多層
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

## 側邊選單
### form submit 圖案
input 想要放圖示，可以用 button，不要用 input submit，這樣可以更客製化
因為在 form 中按鈕會有 submit 的效果，更正確一點需要加上 `type=submit` 或是 `type=button`
```html
<form>
	<input type="text"/>
	<button> 這裡可以插 icon font</button>
</form>
```

### border 不想全滿
position 可以讓 top、bottom、left、right 這些屬性起作用  
可以讓空間離邊界多少距離，來控制 border 的範圍。

border 預設是容器的大小
```css
.box{
	position:absolute;
	right: 10px;
	left : 10px;
	border-bottom : 1px solid red;
}
```

### box-sizing
根據區塊元素來計算，如果想要 width 按照想要的出現，可以使用 box-sizing，來控制確實的範圍。

### box-shadow
做陰影可以帶背景色，才不會太突兀

### ::placeholder  提示字偽元素
```html
	<input type="text" placeholder="請打字"/>
```
可以控制提示字的一些屬性
```css
input::placeholder{
	color: #fff;
}
```


## 一點變化 : 收合式
### :checked
radio 跟 checkbox 都可以使用，可以 input 搭配 label 更靈活
[[Day 16 - checked 表單狀態選取器]]

### 垂直置中 : 字單行
```css
{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  text-align: center;
  margin: auto;
  line-height: 100vh;
}

```
## 再一點變化 : 多層次
### 改變 html 結構
每個節點也變成同一個結構，在撰寫時要把 **下一層** 給定義好，並免全部一次套用。
![[Pasted image 20220305142725.png]]
### top 加一點偏移
延伸出來的欄位盡量不用到全部對齊，會造成閱讀層級混亂，可以加一些偏移。
![[Pasted image 20220305141604.png]]