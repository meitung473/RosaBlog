---
title: HEXO 一起來做部落格(I)
tags:
  - Hexo
  - 部落格
categories:
  - 網頁
author: Rosa Hong
description: 一邊建置Blog，一邊紀錄。 ─ Day01
date: 2021-07-16 14:02:24
---


## 前言

每次在學習新的概念，都會忘記零碎的步驟  
想說還是來架個網頁來記錄好了  

雖然我自己有在Notion 紀錄前端、動畫以及Unity等等的學習文  
但很常忘記更新，很多都東西做完文章卻寫到一半  
不得不說寫文章還蠻...累人的，很常想寫成「大家覺得很棒的文」  

這樣不行!寫文章成了有點痛苦的事，寫的時間也加倍，就變教材了  
於是辦了一個專頁「經營」，像跟大家紀錄分享心得這樣  
當然，滑FB我可是不會錯過的，經營也會讓大家像在監督一樣，就決定做了!  

另外也是受到 [**Huli 大大的文章**](https://hulitw.medium.com/blog-e7a23a74ae2b)啟發，才下定決心認真做  

> 對阿，寫文章即使是廢文也沒關係，我的文章又沒有多少人會看，自己看得懂就好  

在那之前有想過用 Blogspot 、Notion、HackMD...等等的  
但想想自己想成為一個 Junior Web Developer  
就還是想自己打指令來架XD  

很常看技術文的時候  
一直看到同個版面的主題，一度讓我以為是X角學院的架網站作業  
結果是Hexo，查一查才知道這東西有多好用  
啊~沒錯就是那個 NEXT 主題，很好看，我也很想架一個  
說來就來吧!  

## 環境建置

我是使用 `Window 10 + Visual Studio Code` 來建置哦!
簡單來說是 使用 `git + Hexo` 來架架構
最後使用 `github pages` 來做網站發布的地方  

> [官方 Hexo 安裝文件](https://hexo.io/zh-tw/)

1. 需要下載 node.js 因為Hexo 是基於Node.js 的網誌框架  
版本選LTS 長期維護的版本就可以了，除非有要用到很新的功能  
   - [Node.js](https://nodejs.org/en/)
2. 下載git，拿來做專案上的版本控制，至於git嘛...還在學
   - [Downloads](https://git-scm.com/downloads)  
  
原本我先創建好資料夾在Visual Studio開始步驟  
確認npm、node 版本  

```powershell
npm -v
node -v
```
- v 是`version`  

官方有說建議使用 Node.js 10.0 及以上版本  

> 安裝Hexo

```
npm install hexo-cli -g
```

挖咧，第一個安裝就遇到問題  
![](https://chi01pap001files.storage.live.com/y4mCxHVbujSFcMehB-U5KPzs--xmlmuYVVZe2pMyTZSft1rncg9MkzMxxEosNX3BuTX2KnWZ9fs3KOT_aS8Gv8d92vR79PvIFdkSQIq8LBBvUSFulofH9OmU8rtEPfEenW5qP1eVPwXf3ij67XR3qSEkl85Kn-iTyrBbx1vCJrrxlcvGY9P-nEUuOQjzGriSrSA?width=660&height=139&cropmode=none)  
爬了一小時的文也無解阿...  
網路上都說 WARN 是沒關係的  
參考[官方issue](https://github.com/hexojs/hexo/issues?q=npm+WARN+optional+SKIPPING+OPTIONAL+DEPENDENCY%3A+fsevents%40%7E2.3.2)這邊的三篇文還是無解  
像是 `fsevents` 是 Mac使用上要注意的點，Window可以忽略  
到這步是已經完成安裝了才對，像是輸入 `hexo -v` 應該能看到hexo的版本  
但當我查詢 Hexo 的版本來確定是否安裝了  
結果還是悲劇QQ  

於是我決定重新安裝node.js，按照巴哈這篇的指示去做  
[【教學】10分鐘內從安裝Hexo到佈署至GitHub Pages - 巴哈姆特](https://home.gamer.com.tw/creationDetail.php?sn=4849277)  
唉呦!蠻成功的哦 ! 不過過程還是有一些奇怪的錯誤QQ  
以下是我的紀錄  

## 安裝 ## 

安裝完環境後在想要建立檔案夾的地方案右鍵  
按 Git Bash here ，要開始長專案的地方了  
接著會打開cmd  

![](https://chi01pap001files.storage.live.com/y4mIK9wCuNQwZ0zJMHkou9hRVyXWh28JoKBA-1bZ6FcLDaKkUPDeGBpyQdYuH7VsvRi8nhD8WVovBSyTOKR2vGocFQviA6ShMudM1SNTyUeWmn4tvzaCQrqA_9XZkZU6RyLDkXxW-xtFuoacHlZydEqGzsdwsosj-3VDki_KfPysUZuSuBYT5f7KiXGRzy4LccO?width=380&height=477&cropmode=none)  

1. 輸入 `npm install hexo-cli -g` 安裝hexo
2. `hexo init **自訂義資料夾名稱**` hexo建置的設定
3. `cd **資料夾名稱**` 移到剛剛指定的資料夾，記得cd前是在資料夾外部，要設定的東西要移到裡面哦!  
4. `npm install` npm檔案建立
5. `hexo g` 建立網頁，這是 `hexo generate` 的縮寫，大致來說就是收集/重構

![](https://chi01pap001files.storage.live.com/y4m7NCCI1fphAc3k5NKaTmP41Iby0YB-h5Cbn-SwSnTImTZZTJAXyCTjmzq_CzVAaFfJLche0TAe2N1b2iDmjbLYdY5oNFGpThho_rkUOhEv6klUo9MtSGnbbFRuvSN4SM8lCcFRK8VgKkLtWDq5ZRCsl80U_tA2pgHfnSP2rcbFDcrqLekv2DOaaWDWdWX_IxP?width=256&height=143&cropmode=none)
有一個大大的NEXT 可以忽略，因為我已經偷去安裝NEXT主題XD  
一開始沒有是正常的哦!  

6. `hexo s` 建立伺服器，這是  `hexo server` 的縮寫，會開啟本機伺服器來測試哦!

![](https://chi01pap001files.storage.live.com/y4mycn74k2IMLb1w2uZqoidTS7ipFDmgX_9nGZ-2GL_7L8jfiX0em-cxLBDOu8YCbDrJVCfYn8Xjk6tHvjv8RV8QM09oQx1kStTjZaxi8lcVmolKGkM-pIN5TcDc3g1oNKLsFuH282XlaWq2rx7xlnBL7Esif-E6eXPZOmDoFXzRslmIlhzdmFzNUJtN_jjV2po?width=256&height=126&cropmode=none)

之後它會寫出 [localhost:4000](http://localhost:4000)   
在網址中輸入`localhost:4000`就可以看到原始設定好的網站  
哈哈我設定的太多看不出來原本的，之後還會設定相關的布局。  
最簡單的長出網站就完成了  
![](https://chi01pap001files.storage.live.com/y4mCBYZSy_5x5ydLOC4xpxPk09WVHkKiY1buv_Qa5pOl3SoFu0g_9VBg6nQ3gc-q53DUu1dE6sSWMz71miCQZX1u0W7M-YoSTICiWD4HEkJvAEcdPq37uv-XwmdrZQz059IYZgPocbyyWRz_JEDLe_qHI9_WcB2M6HDAAZXsOot7S1trnAuWdche5gN_C9DNs5n?width=660&height=425&cropmode=none)  
最後是要發布在github pages 上，這等下一篇在來說明吧!  

## 遇到技術排解ing

中途還是有遇到一些問題，雖然在 git 的cmd裡沒問題  
但在Visual Studio 中的 powershell 輸入指令卻不能用😵  
明明安裝hexo成功了卻不能在VS編輯使用指令....  

![](https://chi01pap001files.storage.live.com/y4mtLrJFmWIviARn_idGlEGScnJlDZW4X9uIenTO3iDKoj9MRUcB73XwcF8mDojM8sQ6Pa-FltKSD9VC7mQM__GWt1acgomR4armP7ink0UX67mCelMg4t79T8z2KRrcyjEneSwGENJ6w87c7CuV5wOkip17Ou_4MLn7XElvmHtpdva7bN1_08VbsMA0WOTrzBV?width=660&height=115&cropmode=none)

原因是Window 因安全性的問題，而開啟的一個機制  
又稱「限制原則」，要打開的話就需要開啟權限來設定  

這邊的解決方法 : `Set-ExecutionPolicy` 更細節的設定資訊可以看參考資料  

![](https://chi01pap001files.storage.live.com/y4m0d30xMqYQ4AGiWx9HRjiCsP3xrKm11lqIZVUC5RgItMt77XCL6eldhygSUot7xrbCC0vLc6cMvQU2qtW2FKUHQ8eFajj_Hg3goYS5BUVrJE1R1v9d-UDbCRV-OZobhz5LNUdA83Yz918yvHotQf4gJgOnZalgXgxfxUEaoigtBMoUOErj92GWozOti0UpPS7?width=1024&height=439&cropmode=none)  

啊...結果權限不夠QQ，因此要用**「系統管理員」**執行哦!  
不過紅字第三行有提到，請執行`Set-ExecutionPolicy -Scope CurrentUser`  
> 我的理解是  
> 如果妳現在登入的使用者是系統管理員的話可以直接使用
基本上我的電腦就是了，不需要再特定開  

![](https://chi01pap001files.storage.live.com/y4mmJ2BZ3aT_LKsge3e5oES5mrHnK_IBEo2o6a7w7lfGGBwmgHWev35sXk7fMuSqvgnQO5F72YihlbeMVTIAuCEX6z6IjCMSO44FW1OGofu2i5wvRPKzNW6eDnVdAYolnEzxtX6I0o-ikpECKfS2LthdXvFg_R5DU6AnzP1GRztpausnBPEegbI6BGqWDhrdc4I?width=660&height=93&cropmode=none)

如果再不行就到 `開始 > 搜尋 > powershell`  
對著應用程式按右鍵使用系統管理員執行    

![](https://chi01pap001files.storage.live.com/y4m-q_Dw7jek9H56ojCPVFlInrzSXG4PNNYgYeHS67nnvUAXn7ehSdBeI0eJmY-ZqlxtVTKkKqWKbGbfyTHJ4yvs-D8r5MJzLeEVsqbIkjYIJXh4AcS6inKRaJR5KOWa1ujEtUOMkLXN2MiQ4CTjVUgE3M3Y3pMMny-qgKkLWm62_Fu3YG_ju2QGOGSOdE9gbJO?width=256&height=103&cropmode=none)

它會請求輸入值，輸入 **`RemoteSigned`**  
意思是  
> 同意本機撰寫的腳本檔案，不需要簽署就可以執行  
> npm install 遠端下載的其它東西經過可信任的發行者簽署後才可以執行。  

-  [Window安全性 解決的辦法參考資料](https://hsiangfeng.github.io/other/20200510/1067127387/)

燈愣!  
沒想到成功了，可以在VS裡盡情的打了  
我想我開啟的方式可能有些錯誤啦...  
繞了不少路，這次就當教訓吧  

明天就架完成吧!
這篇寫得有點急有點亂，會在進行統整在新的部落格中哦!