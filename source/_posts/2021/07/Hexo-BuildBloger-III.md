---
title: ⟬ 紀錄 ⟭ HEXO 一起來做部落格(III)
tags:
  - Hexo
  - 部落格
categories:
  - Blog
author: Rosa Hong
date: 2021-07-18 20:51:58  
description: 一邊建置Blog，一邊紀錄。 ─ Day03
---  


## 前言 ##  


呼!建置的差不多了   
原本要總結研究 Hexo 三天的成果  
寫成比較順暢的建構過程    
結果一弄又更新好多東西...  
一樣先來補齊概念吧!  
月底再來一個大總結><    

 

--- 
## 資料結構 ##  

```  
+Blogger 
|- .github
|- .vscode
|- .node_modules  
|- .scaffolds
    |- draft.md
    |- page.md
    |- post.md
|- .source
    |- _drafts
    |- _posts
    |- 其他頁面(略)
|- .themes
    |- next
        |- (略)
        |- languages
        |- layout
        |- (略)
|- _config.next.yml
|- _config.yml
|- package.json
+  

```  


這邊我僅有挑我有用到的幾個  

>  最外層  

| **資料夾名稱** | **用途** |
| --- | --- |  
| .node_modules  | npm原始設定(不常用)  |  
| .scaffolds  | 文章狀態模板 (可以修訂統一模板)  |
| .public | 發布自動後生成的資料夾 (不用動) |  
| .source  | 部落格編輯(文字都在這編輯)  | 
| .themes  | 編輯主題樣式(相關 css )  |  
| ._config.next.yml  | next 安裝設定檔，多是插件  | 
| ._config.yml  | hexo 安裝設定檔  | 
| .package.json  | 專案的設定檔，會寫安裝什麼東西(基本上不用動)  | 

>> . scaffolds

| **資料夾名稱** | **用途** |
| --- | --- |  
| _drafts  | 草稿模板  |  
| page .md  | 頁面模板  |
| post .md | 文章模板 |  


- 指令快速記!   
    
    ``` cmd 
    hexo new draft 文章名稱  //建立一篇草稿  
    hexo new post 文章名稱  //建立一篇新文章  
    hexo new page 頁面名稱 //建立一篇新頁面，同時source 會建立新的資料夾  
    hexo publish 版面 檔案名稱 // 發布(草稿)  
    ```  

>> . source

| **資料夾名稱** | **用途** |
| --- | --- |  
| _drafts  | 草稿會在這  |  
| _posts  | 發布的貼文都會在這  |
| 其他頁面資料夾 | 像是About、tags、categroies.. |  


因為一開始沒有About等等的基礎頁面，自己要新增  
  ``` cmd
    hexo new page About  
    hexo new page tags 
    hexo new page categroies 
  ```  
然後新頁面新增 `type` 來做頁面記號  
![categroies_type](https://chi01pap001files.storage.live.com/y4mUs5S3stfFRMyDXC2wenjxmYnUyrrWZLN195KoJDuBNbjDIUXcIHbvzGlPGiUiyTgjwNaoLwYAM6i881mLxbBrFsfqBSUm0CSwtIWpIcZ8psQgmom42pugcn98p5OsSHq8t7JU1GKO7NotQ-nqR1teCP-h9lS_J3AZkoZWgJ-o7187LBZXhCtg7x2BWH8ou9t?width=865&height=303&cropmode=none)  
這頁是分類，跟設定檔的地方對應哦! 頁面 - 路徑      
![路徑](https://chi01pap001files.storage.live.com/y4mSHJlXGuxGrOywWFqkyu391Exl7Z_yJrwNUwZTN56tV5LPXobIEudNoPFKamiALfWJe9NbCEJmdI2PLekXQ5b67LgUGmQurJ8LEta7IHg3crrFvX8YfLeVZ-zTllPrB9b88o6RngYO2tbAoyjmtBFF1Fq5YxN-BnGO1Q-4DaX4Lt8H4X_apXvACFiKuR515oO?width=715&height=1510&cropmode=none)  


>> . themes - .next (依照主題去分資料夾)  

如果 theme 沒有跑出 next 的資料夾，可以用git 的方式 clone 一下  
<u>[官方教學 底加](https://github.com/theme-next/hexo-theme-next)</u>  
``` cmd   
    git clone https://github.com/theme-next/hexo-theme-next themes/next  
```  
之後我就GG了，因為 NEXT 主題更新蠻快的，導致一些語法或函式沒統一更新到，最近的是8.0版  
網路上layout檔是 `.swig` ，我的是`.njk`  
我問號了起來，不過還好語法上差不了多少  
但在 `hexo g` 會報錯，主要是`load`的函式要更新用法 

會顯示 `yml.safeload` 用法過時，必須改成 `yml.load`  
最快速的方法就是  

``` js
1. 專案的搜尋欄打 safeload  
2. 找到 `vendors.js` 
3. 尋找 `yml.safeload`
4. const dependencies = yaml.safeLoad(vendorsFile); //這行改成下面這個
5. const dependencies = yaml.load(vendorsFile);
```  

這樣就能重構，在 `hexo s` 一下看看是不是有跑出頁面  
當然嫌麻煩還可以裝指定版本 
[官方教學](https://github.com/theme-next/hexo-theme-next/blob/master/docs/INSTALLATION.md)    

| **資料夾名稱** | **用途** |  
| --- | --- |  
| languages  | 語言對應字  |  
| layout  | 調整看到的版面 基底  | 
| source  | 一些css js image 設定在這(跟外層的source不一樣) |  
- theme 中的 source 主要掌管 next 主題的樣式而已 
- 外層的 source 是 hexo 架構的編輯地方  
兩者有差哦!  

### 語言設定 ###  

languages 預設原本是 `en`，從 `_config_yml` 就可以更改語系  
![lang-setting](https://chi01pap001files.storage.live.com/y4mGt3P_ahV1z8j1pRbpVUp8wSl6nBkqs_kpfNhZB32cMMkamaJhe70pZkqoosmLUiVaElphRPcWkvde5dQfOYASoAYIJbirgBTXzcpY8xkx7ARrrtFFRjvMQarZpJv2ANNm-XSosQEGoq0d6s9n9kv55XqPeEOrHtWGChQkJAL-o4AMO-xc_Z-p5a2MWic6Gow?width=1223&height=410&cropmode=none)  

當然網頁可以寫成多國語，待研究XDD，可以的話想寫成英文  
有些翻譯過來的文字可能不太喜歡，或是想 自訂義  
就可以到 theme 字料夾中的 languages 找 zh-TW  
把想要的文字替代上去哦!  
![lang-word](https://chi01pap001files.storage.live.com/y4ma1tCvNxVMoUCdcaPYcIjlNvLRelGj3E1tbBnrI3EAXwnLvIoNp4JrjYMC7GYuWjeVhYRVFf6f0sNhPWNlDqWsTsGS8HvaqjBDyLj49cWpdfBJ9Bl0GiCJOfmCwBAxlbVdIawagjcA9XlFdu2B43oKb_6ZveVwqdQsVsKjjtjd9zUQRkYqJIBu7AIpFGaQKnd?width=1004&height=1512&cropmode=none)  

### 版面設定 ### 
layout 有很多頁面設定，包含第三方外掛都可以設定外觀等等的  
當然也有 css或js 可以設定，在 source 資料夾裡，基本的換色、背景圖片都可以自訂。  


---  

## 調整樣式&外觀 ##  
next 的 `config.yml` 可以開啟 comment 的功能
因為我裝了disqus留言版，結果發現 next 主題在tags、categroies等等頁面都是套 post 的板  
也就是 post 每一則下方有留言區是正常的  
但誰會在`標籤`跟`分類`或是`關於我` 底下讓人留言啦!  

就要修改 `theme > next > layout > _layout.njk`  
其實可以發現 page 的版面 都用同一個 layout  
所以在 `new page` 或`new post` 下方都會有comment(如果妳有打開的話)  

打開 `_layout.njk`，找到下面這行 
```  
  {% include '_partials/comments.njk' %}
```  
來把它加上if-else條件，判斷哪一頁加入comment  
改成 : 
``` js
{% set page_type = page.type === 'tags' or page.type === 'categories' %}
<div style="{%if page_type %} visibility:hidden; height:0px;{% endif %}">
{% include '_partials/comments.njk' %}  
```  
原本我是看這篇[文章教學](https://hsiangfeng.github.io/hexo/20190516/2710757554/)  
結果不行，因為版本問題，layout檔再也不是`.swig`  
還好語法上還能通，只有平常在寫得 `||` 要改成 `or`   

---  

## 好用的寫文插件 ##  
上一篇有提到 hexo 有的後台頁面  
哦~我的天，markdown 雖然能馬上看見效果  
但實際版面跟輸出後的差異蠻多的  
後來我還是在 VS 上做編輯了  
當然是來安裝個插件XD  

1. VS 的插件商店搜尋 `Markdown Preview Enhanced`
2. 安裝
3. 新增一個 post 看看 `hexo new post a123`
4. 開啟檔案對著它按右鍵，選 `Reopen Editor with ...`   
   ![圖示](https://chi01pap001files.storage.live.com/y4m5e44Li2JyNG7g5TuAltJILiqeBueOK15DFGll5OZ4uHTS58Bu68ngUQGhBM_987DVWt6su774wdyt-a-BiUKqHX0W9AC1ohAq2SoRQRPnZBSqs-T4-xq8aQCr4Zc48fQWmdmhOYZJ_t9SIJbtk8GUHPxwB5cqSpBiWpbVmYtnbZp2Epk5FhS_pFPi9yikSaA?width=2736&height=1824&cropmode=none) 
5. 上面會跳出選擇器，選`markdown preview`  
6. 在點這個開啟內分頁    
   ![內分頁](https://chi01pap001files.storage.live.com/y4mD3vUlN6kw2OxydnmAU1ZhFwb8pUd-ya_RTwIDBiggyqM-HXup_763uqZsG3yDfqWMcjYw2GStohPK4f88s0gSmDTD8yK5vvJVV2gO2cat_AzjyjpL_m4XutuM6hXy4AmQq1cjGdYQZkGEDo161pc8Ir8UZhMMlx4ZSdMyNLyRmRp98rCHT1QNNQIXq9-Y2S1?width=1423&height=401&cropmode=none)    
7. 在開一次原檔案在分頁中，就可以準備來編輯囉!

燈愣! 就變這樣，邊寫可以邊看到效果 :happy:  
![寫文好幫手](https://chi01pap001files.storage.live.com/y4mRvRQYFuUfq-zmPn2p99ZdGCFN6dBqQaGcm4gMBtYN-O6M9Oz01zGE_OL_KFQ3aG14pD7aiNcIAFH4JOi61XP8uoGLyxx5Jo0Ux7VLu8umfff5TIp1v-P7lriTZcDEOGO39yKM195CeZwH6ApqOLjfWRZ2zskQSp8ZOUZRT6qM5k6DS_UOMGa8hze41xI1iKh?width=2600&height=1615&cropmode=none)  
  

## 結語 ##  

網站建置的差不多了   
短時間應該沒有要再美化 
要多努力寫文章  
markdown 還在學習中...

經過三日連發  
這類實作文章應該就沒有每天產了  
改成2-3天發布一篇  
不然感覺每天都再搭特快車  
再抓一下什麼樣的寫法才好吸收  

最近有看到一種寫文章的方式  
是時候來增強寫作技巧  XD  

