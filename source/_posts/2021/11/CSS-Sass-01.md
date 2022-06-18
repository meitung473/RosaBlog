---
title: 筆記 | CSS 預處理器 Sass 介紹&安裝
tags:
  - CSS
  - Sass
categories:
  - Front-end
author: Rosa Hong
description: 學習 CSS 預處理器 Sass 介紹&安裝
date: 2021-11-09 20:22:43
---

## 前言  
CSS 寫到一個程度後  
有點難以去維修  
大量的大括號以及分號  
使得架構越來越龐大  
在我苦惱 CSS 跟我一樣肥的時候  
剛好認識了 **CSS 預處理器**  
<!-- more -->
簡單來說的話就是可以 **用程式的方式** 來寫 CSS
於是來紀錄關於學習 Sass 的事  
根據 [[FE201] 前端中階：那些前端會用到的工具們](https://lidemy.com/p/fe201) 學習的雜記   

---

## CSS 預處理器
學習新工具時了解工具的誕生  
更能知道使用時機   

### 預處理器的誕生  
現在網站的樣式越來越華麗  
CSS 越寫越龐大  
甚至會有重複寫的情形  
導致在 debug 上變得不易  
於是出現各種 CSS 預處理器    
像是 `Sass` 、 `LESS` 、 `Stylus`  

是使用程式的邏輯在寫樣式    
簡單來說更快速  
畢竟沒人想要重複罰寫吧 QQ
當然不同的預處理器各有自己的優點  
但如果學會一套  
基本上都可以無痛跳轉別的  
只差在一些符號上的差異  

### 預處理器的處理方式
我們知道瀏覽器只看得懂三個東西
1. HTML
2. CSS
3. Javascript  

蛤！你說這樣我寫 Sass 有什麼用嗎？

NO NO , 所以寫完 `Sass` 後  
還要經過 Compiler ( 編譯器 ) 成 CSS 檔
瀏覽器才知道這個樣式長圓的還扁的  
大概是這樣子  
![CSS 變身過程](https://i.imgur.com/E9vfSTE.png)

### 小結
> 預處理器提供程式化的方法來寫 CSS  
> 使 CSS 更有結構的來管理 


## Sass 、 Scss 傻傻搞不清楚  
[Sass](https://sass-lang.com/) 是蠻多人在用的一款 CSS 預處理器   
但在講 Sass 之前  
可能還聽過 Scss   
而且通常會一起講  
所以 Scss 跟 Sass 是什麼關係？

### Sass v.s Scss
在 [官方的文件](https://sass-lang.com/guide) 中  
可以看到 Sass 跟 Scss 是差不多的  
`Sass` 比 `Scss` 少了 **大括號** 跟 **分號**  
相容性上 Scss 可以無痛跨 CSS
檔名 `.scss` 改成 `.css` 沒什麼太大問題   
因為結構相同   
Sass 直接轉換成 css 就打妹了  

讓我想起大學時期學網頁為什麼不先學 Sass  
而是用 Scss 的原因了  
不然初學者的成就感就會被磨光光 XD  


## Sass 基本指令
### 安裝 Sass 
```powershell
    npm install -g sass 
    sass --version // 查看版本是否有安裝成功
```
看到版本之後就對了！  
在使用 Sass 的 cli 就好  
### 把 Sass 檔轉換成 CSS 檔
```powershell
    sass [input].sass [output].css
```
- `input.sass` 是指要轉換的 sass 檔
- `output.css` 是轉換出來的 css 檔

> 也可以加上 `--watch` 隨時監聽檔案變化  

Like this ！
```powershell
    sass --watch [input].sass [output].css
```
按下 save 後 ，檔案會自動轉換
![有點像自動儲存再轉換](https://i.imgur.com/Yc6zMa4.png)

### 最小化 (minify) 檔案
最小化是讓檔案的體積更小  
會將不必要的空白刪除  
只留下精華 :D  
```powershell
sass --style compressed [input].sass [output].css
```
會發現檔案都被壓縮成一排  

### 小結
指令複習一遍
1. `npm install -g sass` : 安裝
2. `sass --watch [input].sass [output].css` : 轉換
3. `sass --style compressed [input].sass [output].css` : 壓縮

sass 跟 scss 一樣  
所以以此類推把 sass 的部分換成 scss 就可以了  

## Sass 做了什麼 ? 
我們知道預處理器的作用  
會發現把 `.sass` 轉換成 `.css` 時  
還會出現一個叫 `.map` 的檔案
就是 source map 

### 什麼是 source map ？
`source map` 就是儲存了原始碼與編譯後程式碼 **對應關係之檔案**   
一般 devtool 會用來除錯用  

> Wait！ Wait！ What？

阿不是說瀏覽器只能看得懂一般的 CSS？  
那你有想過萬一你是 `sass` 樣式想改  
不會是要一行行回推到 CSS 吧！  

所以這時候就得靠 `source map`      
簡單來說需要透過 map 去引導檔案 sass 的行數  
在 devtool 上就可以除錯  
哇嗚這我還真不知道...  
那我想如果其他 library 也是出現map  
也是為了導向原始的編輯檔去  
蠻聰明的    

另一個小知識就是 : 
> source map 不會影響網站載入速度與一般使用者的體驗

不過這部分因為暫時不會涉及到很深  
所以我沒有研究  
有興趣的人可以到下面這篇文章  

- 關於 `sourceMap` 的文章 :  
[Source map 運作原理 (techbridge.cc)](https://blog.techbridge.cc/2021/03/28/how-source-map-works/#post-comment-wrapper)

## 總結  
sass 的優點還有實戰使用還沒提及  
將在下一篇文章說明  
目前正在嘗試每個小作品都使用 sass  
讓自己的熟練度更加提升  
GOGO！  




