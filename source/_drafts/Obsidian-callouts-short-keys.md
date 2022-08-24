---
title: 紀錄 | Obsidian 自製 callouts 快捷鍵
tags:
categories: 
author: Rosa Hong
description:
date: 
---
## 摘要
Obsidian 有一個 callouts 方塊的功能，可以加入特殊的方塊凸顯文章段落，擁有的種類也很多元。

但有個惱人的地方，就是預設跳出的 callouts 只有一種，我每次都還要挖官方文件查看想要的種類，不如來寫一個腳本幫助自己快速建立 callouts 吧。

<!-- more -->

## 好用的 templater 模板套件
templater 可以讓使用者在 obsidian 裡面寫 JS 或者加上 bash 等功能直接對 file system 或 database 操作 ，幫助自己在建立或是寫文章快速套用編譯過的內容模板。

官方雖然有提供 template 內建功能，透過寫好的 markdown 模板，按添加後就產生相同內容，而且在近來的版本可以使用多個模板，文章種類的擴展性就更高，但可惜的是官方只提供 2 種變數可以添加 : 
1. 時間類別 :  日期 `{{date}}` 時間 `{{time}}`
2. 標題 : `{{title}}`

如果沒有特別要用的版面或功能，其實官方都蠻夠用。但每次添加 callouts 的動作，簡直太麻煩了，而且預設跳出的種類只有 `NOTE` 還得花費時間找其他特殊字，才能找到對應的 callouts 種類，為了解決這個問題，既然會 JS 就用程式來解決吧 !

###  我要達成的效果
1. 選取起來的地方要變成 callouts 的段落，首行是標題，次行以後是內容
2. 按下快捷鍵呼叫 **下拉式選單** 選擇的要添加的種類
3. 選取以後決定折不折疊 ? 折疊式展開或收合狀態 ?
4. 成功建立

當然還有些 edge case 要處理，例如 : 
1. 在已存在 callouts 的段落，替換不同類型的 callouts (已做)
2. 空內容情況添加 callouts 不應該成立 (但我覺得這暫不考慮，因為就是有內容想添加 callouts，感覺多此一舉了，所以暫時沒這問題)

### 寫程式碼


### 實際使用


## 延伸應用在 Hexo 中的套件
Hexo 的 callouts 跟 Obsidian 完全長得不一樣，但核心上他們都只是一串字串，所以只要改寫掉模板種類與內容就好了，由於我是使用 Obsidian 撰寫 Hexo 的 markdown 內容，也是可以用 templater 幫助我減少打這些樣板字的時間。 ( 可以參考我怎麼使用 Obsidian + Hexo 打造舒適的寫作環境 )

## 總結