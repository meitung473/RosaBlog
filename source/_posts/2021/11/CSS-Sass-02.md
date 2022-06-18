---
title: 筆記 | CSS 預處理器 Sass 結構化&模組化
tags:
  - CSS
  - Sass
categories:
  - Front-end
author: Rosa Hong
description: 學習 CSS 預處理器 Sass 結構化&模組化
date: 2021-11-15 14:54:24
---

## 前言  
上篇了解 CSS 預處理器的運作  
跟 Sass 的安裝  
接下來要認識 Sass 的使用了！  
一樣根據 [[FE201] 前端中階：那些前端會用到的工具們](https://lidemy.com/p/fe201)  
這堂課的隨堂筆記  
若有誤請指教  

接下來會提到幾個常用的功能  

## 結構化
想一下如果每次都要抓色票  
都要複製 6 碼  
是一件蠻麻煩的事  
呈上篇介紹&安裝所講的  
預處理器是套用程式的概念來寫樣式  
在程式邏輯中如果重複出現的東西  
最好想辦法簡單化     
因此結構化地處理可以使的維修更快速  
就必須講到兩個東西  
1. 自訂義變數  
2. 巢狀結構  

### 變數 ( variable )
>`$variable` : `css value`

用 `$` 符號來表示定義變數  
當然別跟 `JQuery` 的 `$` 搞混了  
兩個沒什麼關係  
  
在 Sass 中可以自訂義多組變數
使用上 :  
```scss
$color-primary: #eee
$h1: 1.6rem
```

不過最近的 CSS 已經可以自訂義變數了  
只是是用 `var` 也就是全域變數  
```css
:root{
  --text-color: #eee;
}
.box{
  color: var(--text-color);
}
```
有興趣可以讀一下 MDN 的文件  
目前我還沒有研究這部分 [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)  
但不代表可以完全替代 Sass   
泛用 `var` 全域變數其實是不太方便的     

### 巢狀 ( nesting )  
`HTML` 也是一層層像洋蔥皮  
`Sass` 也可以堆疊  
整體來說沒有 CSS 那麼囉嗦  

- 以往 css 寫要這樣
  ```css
  .menu{
    color: red;
  }
  .menu__listgroup{
    background-color:blue;
  }
  .menu__listgroup:hover{
    color:white;
  }
  ```

- Sass
  ```scss
  .menu
    color: red
    &.listgroup
      background-color:blue
    &.listgroup:hover
      color:white
  ```

  - `&` 是指 上一層的本身元素  
  這樣可以不用重複撰寫  
  - 如果是寫`:hover`、`::before` 這些也可以  
    例 : `&:hover` `&::before`  

噹噹！這樣不用重複罰寫多棒 QQ  

### 小結  
1. 自訂義變數用 `$`  
2. 重複提起自己用 `&`  

## 模組化  
就像 javascript 一樣可以 `import` 

### @import  & @use
這兩者都是可以引入  
 - @import
引入其他檔案的 sass
```scss
// style.sass
@import __variables(.sass)
```
> `__variables` 是變數檔案命名習慣  
	> `__mixins` 以此類推  
	> 這樣可以直接使用裡面的內容  

- @use
跟 import 很像，但可以另外訂 namespace
```scss
// style.sass
@use __variables(.sass) as variable
```
引用就像 object 一樣  
例 : `variable.color`  

### @extend
利用 `%` 百分比符號來表示 **模板**
```css
%btn
	width:50px
	height:50px
	background:$btn-color
```
- 使用的時候用 `@extend` 
```scss
div
	@extend %btn
```
	
### @mixin  & +  
把想要的元件內容包裝起來  
可以 **帶變數**
```css
// 不帶變數
@mixin hover-btn
	&:hover
		transition : .3s
	
// 帶變數 ($Value:default value)
@mixin btntemp ($bg-color:grey)
	width:50px
	height:50px
	background:$bg-color
		
```
	
- 使用的時候
	
```scss
div
	btn
	+hover-btn
	+btntemp(red) //如果沒有填的話就是預設 grey
```

### @function & @return
可以寫一個函式回傳值
```css
@function btn-size($size)
	@return $size * .1rem
	
.btn
	font-size: btn-size(2)  
// 結果就是 0.2rem
```

### 小結  
1. `@import`、`@use` 都是拿來引入的，`@use` 可以自訂義名稱  
2. `%` 是寫模板用的。`@extend` 是在 className 裡引入模板用。
3. `@mixin` 可以加入參數，但不會回傳    
   使用時用 `@include`  或 `+`  
4. `@function` 可以加入參數，使用 `@return` 回傳  

## 個別差別  
有些功能會讓人混淆  
有一些小小差別  
不過用的 OK 其實都行   

### @import v.s @use

|      | @import    | @use                 |
| ---- | ---------- | -------------------- |
| 差別 | 純引入位址 | 引入可以加 namespace |

`@use` 比較客製化  
在命名上比較不會混亂    

### @extend v.s @mixin
兩者都可以模組化需要的東西

|          | @extend                    | @mixin                   |
| -------- | -------------------------- | ------------------------ |
| 使用用處 | 純模板                     | 可以帶參數微調的模板     |
| 用法     | 固定的部件(按鈕的外觀形狀) | 附加的屬性(按鈕客製顏色) |
| 產出差別 | 同樣的東西以逗號隔開       | 個別獨立出來             |

- 可以這樣用
```css
%btn
	height: 50px
	width: 50px
	padding : 5px

@mixin btn_color($color:#eee)
		background-color:$color  
```
```css
.btn
	@extend %btn
	&:nth-child(odd)
		+btn_color(red)
	&:nth-child(even)
		+btn_color(blue)		
```

範例 : 產出的差別  
![針對不同的按鈕](https://i.imgur.com/ndmDRQY.png)
1. `@extend` : 產生同樣模板的東西會以逗號隔開  
	![extend產出](https://i.imgur.com/RMcBMOl.png)
2. `@mixin` 則是會個別獨立，重新複製貼上  
	![mixin產出](https://i.imgur.com/tkgByt1.png) 
		
以效能上來說  
重複性值的屬性 `@extend` 比較好    
因為用字數較少  
容量自然就小一點  
		
### @mixin v.s @function

|        | @mixin         | @function                               |
| ------ | -------------- | --------------------------------------- |
| 常使用 | 多項同個元件   | 單個屬性回傳值                          |
| 用法   | 一塊跨頁的部件 | 一些特定狀況時回傳，通常會在 mixin 裡面 |

因為我比較少用到 `@function` 的用法  
不過可以拿 boostrap 的檔案來看   
![boostrap 圓角](https://i.imgur.com/6bnQPlz.png)   
boostrap 也是使用 sass  
針對條件來寫判斷以及迴圈更快產生樣式  
簡單來說  
> boostrap 已經幫你寫好一堆 css  

以常見的 `h1~h6` `mt-1~-4(margin-top)`  
當然不會一個個寫   
而是利用 Sass 的 `loop` 以及 `mixin` 寫響應  
來產生一系列的功能  
有興趣的可以下載 boostrap 官方文件看看  
也能更知道實際這些功能的應用何在   

## 結語  
知道基本的功能在撰寫 CSS 時  
可以更加簡潔！  
Sass 還有 `loop` 以及 `if-else` 判斷式     
`loop` 在動畫上的搭配就可以更加靈活     
我覺得可能要多看一些例子才知道怎麼應用在專案上 QQ  
雖然官方寫得算清楚  
但我看倒像是綠豆糕 QQ   

---

參考資料 :   
[Sass Documentation](https://sass-lang.com/documentation)


  






