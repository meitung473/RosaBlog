---
title: 筆記 | Sass 小技巧
tags:
  - Sass
categories:
  - Front-end
author: Rosa Hong
date: 2022-03-19 23:15:57
description:
---

根據鐵人賽[《30天掌握Sass語法》](https://ithelp.ithome.com.tw/users/20040221/ironman/562) 各篇筆記總結  
在最後也建立一個屬於自己的 Sass template  
當然我的 Sass 旅途還沒結束 !   
<!-- more -->

## sass 可以幫你算數
可以讓 sass 算數學，編譯後自動幫我們算好，可以包含 px、%、em
pure css 雖然也可以算數 (calc) 但是對效能不好。

> sass 的 px 跟 em 不能混算

## 檔案編譯規則
加 `_` 底線是不轉換成 css 檔的引入檔，可以放`_variable` 等等檔案
引入的時候不用加底線。  

也可以把各頁獨立開來，或是各部件分開引入
```css
@import reset
@import layout
@import index
@import page
```
最上方就是放 reset ，其餘樣式往後覆蓋  

## @extend v.s @mixin
@extend 就是模板，不能帶參數，但可以把相同的樣式給群組起來，對檔案體積較小
@mixin 就像 copy paste ，把同樣的東西複製貼上

如果有個別客製化的參數可以使用 @mixin

## 節省寫前綴 prefix
很多人是使用 plugin compass 產生，但是這套好像太久沒更新  
後來直接搭上 PostCSS 的順風車，幫你內建好
不過也是可以自己寫

用 @mixin 與 @each 產生
1. 有 property name
2. value
3. prefix : 是一個 list，可以插入想要的 prefix


前面兩者是 css 表達式，可以寫成 map 的形式，讓 prefix 可以一次寫多個  

```scss
$property : (key:value,key,value)
```

MDN 列出常見的 prefix
```css
-webkit-transition: all 4s ease;
-moz-transition: all 4s ease;
-ms-transition: all 4s ease;
-o-transition: all 4s ease;
transition: all 4s ease;
```

改成 @mixin ，單個 property
```scss
@mixin vendor-prefix($property,$value,$prefixes:())
	@each $prefix in $prefixes
		#{'-'+$prefix+'-'+$property} : $value

	// 補上原本的
	#{$property} : $value 
```
一次寫多個 property，把前面的 property 跟 value 合併起來
```scss
@mixin vendor-prefix($declarations,$prefixes:())
	@each $property,$value in $declarations
		@each $prefix in $prefixes
			#{'-'+$prefix+'-'+$property} : $value
	
	#{$property} : $value
```

參考 :   
[Mixin to Prefix Properties | CSS-Tricks - CSS-Tricks](https://css-tricks.com/snippets/sass/mixin-prefix-properties/)


## RWD 寫法
寫法有兩種
1. 傳統 : 寫在最上方分成不同的 breakpoint 檔案
2. @content : 用 @include 方式插在元件上繼續寫

### 寫一個 media 就好，元素屬性都另外再寫
@media query 只有一個，一次都寫在裡面
- pc.sass
```scss
@media screen and (max-width: 1024px)
	.box
		~~~~~~~
```
- pad.sass
```scss
@media screen and (max-width: 768px)
	.box
		~~~~~~~
```

### 統一生成斷點，插在元素裡面寫
mixin
```scss
@mixin breakpoint($point)
	@if $point == pc
		@media screen and (max-width: 1024px)
			@content
	@else if $point == pad
		@media screen and (max-width: 768px)
			@content
	@else if $point == mobile
		@media screen and (max-width: 320px)
			@content
```
使用
```scss
.box
	width: 500px
	height: 500px
	@include breakpoint(pc)
		width: 1000px
		height: 1000px
	@include breakpoint(pad)
		width: 300px
		height: 300px
```
- 優點 : 撰寫上比較方便，因為是寫在元素裡面
- 缺點 : 會一直重複生成 @media 對檔案大小不是很友善，大專案如果有追求效能不太適合

## sass 檔案結構
```scss
@import mixin 
@import reset
@import layout
```
mixin 放一些主要要引入的變數，mixin 沒呼叫就不會產生任何東西  
可以在一開始引入

參考這份結構 [Sass Architecture Structure](https://gist.github.com/AdamMarsden/7b85e8d5bdb5bef969a0)
- vendor : 其他的 plugin。boostrap 等等的第三方套件。  
- utils : 基本的 `__variable`、`__mixin`、`__function`
- base : css reset 或是 文字規範 (h1~h6)
- component : 小零件，像是按鈕、
- layout : 每一頁面共同元素。導覽列、網頁底部、
- pages : css 組裝，不同頁面有用到的元素透過 layout 、 component 組合  
```scss
@import 'utils/variable'
@import 'utils/mixin'
@import 'base/reset'
@import 'component/button'
@import 'layout/navbar'
@import 'pages/index'
```

## color 好幫手 draken & lignten  
有時候需要建置顏色資料庫  
相同色系但有不同深淺或是些微變化  
不用一直複製新的色票  
可以透過 sass 內建函式來幫我們達成  

sass 內建可以調整 **明暗、飽和(saturate) 或 色象環 (hue)** 等等的功能  
而且可以用組合式的  
如果很熟悉 hsl 的方法就知道運作模式 `hsl(<hue 色相環>,飽和度,亮度)`

- darken & lignten : 值 0 ~ 50，想降低亮度就用 darken
- desaturate & saturate :  根據原本色彩的飽和去做疊加，如果原本色彩的飽和本身就很高，再增加飽和也沒意義  
- adjust_hue  : 以目前色環的顏色方向再去疊加
```scss
.box{
	width: 100px;
	height: 100px;
	background : adjust_hue(desaturate(lighten(blue,10),10),120)
}
```
根據步驟來說  
1. 被調整的是 藍色，亮度調整 10 %
2. 降低飽和 10%
3. 色相環轉動 120 度，藍色是 240 ，再轉 120 就到紅色

最後結果會是 hsl(0,90%,60%)
想快速產生也可以用 [SassMe](https://sassme.jim-nielsen.com/)

### 建立色彩資料庫
像 tailwindcss 有很豐富的顏色，透過不同數值調整參數   
我們也可以使用 @for 迴圈來變化，並且使用在 html 加上 class 直接套用    
使用上很方便，但檔案就會越來越肥 QQ   
這時候就會選擇 boostrap 或是 tailwindcss :D...  
```scss
$primary : blue
@for $i from 1 through 4
  .primary-d-#{$i*10}
    background : darken($primary ,$i * 10)
  .primary-l-#{$i*10}
    background : lighten($primary ,$i * 10)
```

## sass 合作問題
- 如果合作人不會寫 sass ?  
	用 scss 寫，scss 跟一般 css 檔案沒什麼差別，把 .css 改成 .scss。  
	要使用檔案 import 進來就 ok 的。
- 共用樣式或測試
	做成 @extend 引入做測試

## 設計網站版本
如果網站中不同頁面有不同的樣式，傳統上會準備兩分 .css 檔，透過後者覆蓋前者的特性，把預設的蓋掉。  

比如說不同的電商網站根據不同種類的網頁套用不同樣式顏色。  
`food.css`、`clothes.css` 等等  

- 優點 : 分檔案好管理
- 缺點 : 
	1. 多發出 request
	2. CSS 結構很胖

### nth & index
index 找到第幾位，對應 nth 來應用

這邊以四季為例
```scss
$season: spring , summer , fall , winter
$primary-color : green , yellow , orange , grey
$secondary-color: #fff , #05f , #00f , #000
$now-season : index($season,spring)

//-------------
.navbar
  width: 100%
  height: 100px
  font-size: 60px
  background: nth($primary-color,$now-season)
  color: nth($secondary-color,$now-season)
```

## 使用 @if 提升 @Mixin 靈活度
產生簡單圖案，降低 request 請求數量  
不用再另外做圖，避免不同尺寸的裝置造成失真  

- 生成圓形
```scss
%border-radius
  border-radius: 50%

@mixin circle($size,$color)
  width: $size
  height: $size
  background-color: $color
  @extend %border-radius

.box
	+circle(50px,red)
```

- 生成三角形
```scss
@mixin triangle($size,$pos,$color,$ratio :1)
  width: 0
  height: 0
  @if $pos == top
    border-bottom: $size*$ratio solid $color
    border-left: $size/2 solid transparent
    border-right: $size/2 solid transparent
  @else if $pos == top-left
    border-top: $size solid $color
    border-left: $size solid transparent
  @else if $pos == top-right
    border-top: $size solid $color
    border-right: $size solid transparent
  @else if $pos == bottom
    border-top: $size*$ratio solid $color
    border-left: $size/2 solid transparent
    border-right: $size/2 solid transparent
  @else if $pos == bottom-left
    border-bottom: $size solid $color
    border-right: $size solid transparent
  @else if $pos == bottom-right
    border-bottom: $size solid $color
    border-left: $size solid transparent
  @else if $pos == right
    border-top: $size/2 solid transparent 
    border-left: $size*$ratio solid $color
    border-bottom: $size/2 solid transparent
  @else if $pos == left
    border-top: $size/2 solid transparent 
    border-right: $size*$ratio solid $color
    border-bottom: $size/2 solid transparent
// ------------------------
    
.box
  +triangle(100px,top-left,red)
```
- 參考 : [CSS Triangle | CSS-Tricks - CSS-Tricks](https://css-tricks.com/snippets/css/css-triangle/)  

### 應用 
1. [對話框](https://codepen.io/shan473/pen/YzYwjZR?editors=0100)，搭配上面的三角形 @mixin  
	```scss
	.box
  width: 100px
  height: 100px
  background-color: #ccc
  position: relative
  border-radius: 10px
  &:before
    content: ''
    position: absolute
    top:100%
    left:30%
    +triangle(20px,bottom,#ccc)
	```
2. [麵包屑 (breadcrumb)](https://codepen.io/shan473/pen/YzYwjZR?editors=0100) : 
```scss
body
  background-color: #000
.breadcrumb
  display: flex
  justify-content: center
  align-items: center
  flex-wrap: wrap
  padding: 20px
  li
    list-style: none
    background-color: #054
    padding: 10px 20px 10px 40px 
    position: relative
    & + li
      margin-left: 40px
    &:before
        left: 0%
        +triangle(40px,right,#000)
    &:after
        left: 100%
        +triangle(40px,right,#054)
    &:first-child:before
      all: initial
    &:last-child:after
      all: initial
    a
      text-decoration: none
      margin-left: 20px
      color: #fff
      font-weight: bold
    &:before,&:after
      content: ''
      position: absolute
      top: 0
      bottom: 0
      margin: auto
    &:first-child
      border-radius: 10px 0px 0 10px 
      padding-left: 10px
    &:last-child
      border-radius: 0 10px 10px 0
      padding-right: 20px
```


## @for+random()
[balls](https://codepen.io/shan473/pen/WNdrLWy?editors=0100)
利用 shadow 來產生分身，有點像 texture  把東西蓋上去做整體位移
用 function 生成隨機的變數，在疊加上去做 box-shadow 的位移
```scss
@function randoms($n)
  $value: #{random(2000)}+px #{random(2000)}+px #fff
  @for $i from 1 through $n
    $value :  #{$value} , #{random(2000)}+px #{random(2000)}+px #fff
  @return $value

body
  background-color: #000
.ball
  position: absolute
  border-radius: 50%
.ball-big
  height: 10px
  width: 10px
  box-shadow: randoms(300)
  animation : drop 50s infinite linear
.ball-medium
  height: 5px
  width: 5px
  box-shadow: randoms(500)
  animation : drop 15s infinite linear
.ball-small
  height: 2px
  width: 2px
  box-shadow: randoms(700)
  animation : drop 10s infinite linear

@keyframes drop
  0%
  100%
    transform: translate(0,-2000px)

```

## Sass開發流程設計
### 切圖、規劃Layout
美術 
1. 互動部分是否有設計出來 (hover、dropdown 等等)
2. 背景圖要切透明 (避免不規則形狀)
3. 字體字型，如果不是預設 web font 有無替代的

事先規劃 : 
- layout 如何合作設計 ? 共同的元素 ?
- 預先規劃 html 架構
- 畫面手寫輔助思考
- 圖片可以分成 png & jpg (或者 svg)

### 結構規劃、全域變數設定
變數名稱 跟 內容不要有關  
像是顏色的變數，不要以顏色種類命名  
一般來說有設計稿有主色、次級色或是顏色的用途  
- $red : `#ff0000` ------(👎)
- $primary-color : `#ff0000` ------(👍)
- $highlight-color: `#ff0000` ------(👍)

### 網頁排版流程
- reset css
- clearfix 預先寫好
	```scss
	%clearfix
	  &::after
	    content: ''
	    clear: both
	    display: block
	```
- background 使用 @mixin 節省路徑的寫法
	預防還有複合路徑，我把額外的 path 寫在最後面  
	還有不同的格式，所以就多寫 format，沒有把檔名寫死    
	根路徑就可以按照想要的圖庫來放
	```scss
	$root : '../img/'
	@mixin img-url($name,$format,$path: null)
	  $file : #{$name+'.'+$format}
	  $fullpath : null
	  @if $path
	    $fullpath : #{$root+$path+ '/'+$file}
	  @else
	    $fullpath :#{$root+$file}
	  background-image: url(#{$fullpath})
	```
- prefix :  瀏覽器前綴[[#節省寫前綴 prefix]]，用套件或是自己用 @mixin 寫  
	postcss 具有 autoprefix，或是 compass

大部分共用的變數
```scss
$text-color : 主體文字色彩
$link-color : 連結字顏色
$link-hover-color : 連結字 hover 顏色
$line-hiehgt : 字距航高
$container-width : 區塊寬度
$font-style : 字體
```
在切版中把重複性高的獨立出來  

### 整合自己的 Sass 資料夾
[我的 sass 資料夾](https://github.com/meitung473/Sass-template)
資料夾結構  
```
|- src
    |- img
    |- sass
        |- base : css reset、typography
        |- component : button、link...
        |- layout : 通用版面，header 、 navgation、footer
        |- pages : 個別頁
        |- utils : variable、mixin、extend 等等
        |- vendors : 放 sass-plugin
        |- section (目前沒有) :  頁面區塊，hero、cta
    - app.sass
    - index.html
```
每個資料夾都有 all.sass 整合資料夾內的 @import 
- base 
    裡面已有 meyer 版本的 reset.css
- utils/mixin
  1. media query breakpoint  
  2. img-url background-image 快速匯入  
    參數 `(<檔案名>,<副檔名>,<複合路徑>(optional))`  
    裡面的 `$root` 可以更換圖片根目錄路徑  
  3. prefix 手動添加瀏覽器前綴  
    參數 `(<css-property>,<value>,<prefix list>)`  
  4. 基礎形狀圓形、三角形  
    圓形參數 `(<size>,<color>)`  
    三角形參數 `(<size>,<三角形位置>,<color>,<預設 1 是等腰，86.6% 為正三角>)` 

## 總結 
Sass 當然還有更多東西可以去研究  
在文章裡還包含常用的 sass plugin  
compass、susy 等等  
考量到這系列文章的年份     
發現這兩者已經停止維護  
這部分我就沒有去特別著墨了   
不過依然讓我學到不少東西  

