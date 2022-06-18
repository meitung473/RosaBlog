---
title: 紀錄 | UnityWebGL 輸出問題
tags:
  - WebGL
  - Unity
categories:
  - Unity
author: Rosa Hong
date: 2021-08-03 19:46:32
---


## 前言 ##
很不容易終於把案子的遊戲做出來了  
輸出 WebGL ，遇上不少問題  
<!-- more -->
在與對方對接時都是使用 Github Pages 來呈現  
運行的很順利  

沒想到遇到對方外包的網頁公司 `伺服器` 就不行了 QQ  
因為我也是第一次碰到這問題  
網頁不是我的專長，這下我也不知道怎麼辦

這篇稍微紀錄一下問題跟解決方式  
> 主要是 `MIME type` 的問題  


## 遇到問題 ##  

![](https://chi01pap001files.storage.live.com/y4m8Z81Ua_QFAxCDEHu3CXVZNDlALhmbNSwT1XhMY0TSA9BscdtnomNnmQX5RP5WzdtaqXy5zYX0EiR8PJZJo03_Hk1LATCyDhLQ2vJkpbP4baeuDQB14elPoHRI061wVNDT9sZenz_5g-hWYGapBGfsv4Z60gWmUUXM_2oPLIcg1Bsij5JfL7Z5PpgMspsQO4F?width=660&height=180&cropmode=none)  

 
console 顯示的是這兩個問題  
1. Invoking error handler due to   
    **`Uncaught SyntaxError: Unexpected token '<'`**


2. **`UnityModule is not defined`**  
    at UnityLoader.loadCode.Module (UnityLoader.js:4)
    at HTMLScriptElement.i.onload (UnityLoader.js:4)

  > **Uncaught SyntaxError: Unexpected token '<'**  
      根據 [JavaScript 開發中常見錯誤解決辦法](https://wcc723.github.io/development/2020/09/16/chrome-js-alert/)  
      是指 `結構錯誤` 或者 `類型錯誤`  
      我想應該下面 not defined 問題造成的  

  > **UnityModule is not defined**  
      可以知道 unity 相關檔案好像沒被定義到  
      導致 Unity 內容無法被呈現出來    
      所以語法上關於 Unity 是會報錯的   

## **剖析問題** ##
這是目前有看到的[解決方針](https://answers.unity.com/questions/1397472/webgl-build-when-uploaded-gives-me-this-error-unca.html)  
針對 Undefined 的問題  

### **為何沒被定義** ###  
  仔細拜讀一下文章提及的 **MIME TYPE**  
  關於伺服器端沒有包含這類的 `媒體類別`  
  也就是在後端中傳送出來認不得這個媒體是什麼  
  所以才會出現 `UnityModule is not defined`  
  檔案中 **`.unityweb`** 是無法被讀取內容  
  > Github Pages 可以好好運行的原因    
    [官方有說 Pages 在這部分有支援 750 種](https://docs.github.com/en/enterprise-server@2.22/pages/getting-started-with-github-pages/about-github-pages#mime-types-on-github-pages)  
    因此普遍在開發上才不會特別有問題  
    真的是太甘心了 QQ  

### 何謂 MIME TYPE (媒體類別) ### 
  常見的就是 `text/css` 或 `text/plain`  

  根據 [MDN 說明](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Basics_of_HTTP/MIME_types)  
  基本形式是長這個樣子  `type/subtype`  
  也可以加參數  
  `type/subtype;parameter=value`  
  EX : `text/plain;charset=UTF-8`  
    
  很熟悉吧  
  就是常常在 head 裡面寫的 `link` 或 `script` 格式  
  有些特殊的媒體檔案一樣也可以透過這樣的方式加入  

#### 有哪些媒體類型? ####  
  這邊我還不是很清楚  
  但好像有分很多種樣式  
  總之有分 `標準` 與 `非標準`  
  非標準前面會有 `x-` 開頭  
  區分的是 IANA 是否經過認證而定  

  > [很詳細的網站](https://www.freeformatter.com/mime-types-list.html)  

  透過搜尋就可以找到 `.unityweb`    
  接著就想辦法安插進去    

## 解決問題 ##  
  根據 [解決方針](https://answers.unity.com/questions/1397472/webgl-build-when-uploaded-gives-me-this-error-unca.html)  
  
  1. 開啟一個新 txt 檔  
  2. 把檔案另存成 **`web.config`**  
  3. 用 IDE 打開，貼上下面那串  
  4. 讓 `index.html` 更新一次  
    
簡單來說，要讓專案初始化的時候知道 `.unityweb` 是誰就好了    
  > 得解 : 新增關於 Unity 的 **MIME TYPE**

  ```XML
   <configuration>
        <system.webServer>
           <staticContent>
              <mimeMap fileExtension=".unityweb" mimeType ="TYPE/SUBTYPE" />
           </staticContent>
        </system.webServer> 
     </configuration>
  ```  

### 了解其運作 ###  

#### **什麼是 `web.config` 檔？** ####  

我以為是自訂義檔名，結果這個檔很特別哦 !  

根據 [MS 官方開發說明](https://docs.microsoft.com/zh-tw/aspnet/core/host-and-deploy/iis/web-config?view=aspnetcore-5.0)   
- 是 IIS 所讀取的檔案， `web.config` 以及用來設定以 iis 託管之應用程式的 ASP.NET Core 模組 。   

這個檔案在建置 ASP.NET 的時候就會建置了  
而且是每一層都會有  
如果 `子層` 沒有，就會吃 `父層` 的  
再沒有就 `祖父層` ...
  
很好，跨謀 :D ...  
查了一下別人怎麼解釋  

`web.config` 是對網站的設定檔，包含很多像是  
- 設定 `application` 中的各種 settings (裝置)  
- `settings` 包含如何呈現網頁  
- 如何 `compile` 網頁程式  
- `session state` 的管理  
- `security` 的控管、…等等。

我的理解是網頁一打開幫你設定端口、讀取型態之類  
`congfig` 就是對整體專案在初始化時的設定。   

在 `html檔` 最前面其實就有設定這些東西  
我也不太清楚    

> 直接來看，如何設定一個 MIME TYPE  

- **`mimeMap`** [MS 官方文件](https://docs.microsoft.com/zh-tw/iis/configuration/system.webServer/staticcontent/mimemap)
   ```html
   <mimeMap fileExtension=".unityweb" mimeType ="TYPE/SUBTYPE" />
   ```  

    - `fileExtension` 寫檔案類型
    - `mimeType` 這邊好像是因為 `.unityweb` 是標準寫法  
        只要套個形式就可以吃到值  
        應該可以寫 `application/vnd.unity`  

  > \* 為什麼說應該，因為我無法測試，伺服器是客戶的  
  我並不知道結果與過程  

#### 關於 **<system.webServer>**  ####    
[Web.config设置system.webServer](https://www.cnblogs.com/xcsn/p/6939628.html)  
這篇提到一般在 web 上是不用特定去設定的  
有時候會遇到一些需要複雜的情況需要去特別設定  

  > 需要修改 `system.webServer` 節的三個常見配置任務：
  > 1. 添加默認檔，以便在請求 URL 未包含特定的檔時，提供該默認檔。  
  > 2. 註冊託管代碼模組。  
  > 3. 添加自訂回應標頭。 

本次的問題看起來比較偏  ~~1~~。

本篇下面還有提到文件要加入 **`remove`**  
避免檔案 **`已存在`** 的情況下導致錯誤訊息  
變這樣  
  ```XML
  <remove fileExtension=".unityweb" />  
    <mimeMap fileExtension=".unityweb" mimeType ="TYPE/SUBTYPE" />
  ```  

## 補充 ##  
放在不同的伺服器好像有不同的寫法  
看到 `Azure` 跟 `Aapche Server` 好像有點不太一樣  
可能之後才能理解 QQ  
> 參考  
> [[SOLVED] Unity 2020 WebGL Doesn't work Uncaught SyntaxError: Invalid or unexpected token](https://forum.unity.com/threads/solved-unity-2020-webgl-doesnt-work-uncaught-syntaxerror-invalid-or-unexpected-token.872581/)  

一方面好像跟 Unity 輸出時的檔案壓縮方式有關  
官方在解說關於 [輸出的部分](http://docs.unity3d.com/2019.3/Documentation/Manual/webgl-deploying.html) 非常詳細  
也包含這次 IIS 組態的問題  


## 結論 ##  
今天算急件  
所以有不少細節忽略過去  
要再找時間吸收一下了 QQ  
怕下一個專案也有同問題   
極速的做個紀錄 

將 config 弄好後，沒多久對方說 「沒問題了~」   
我也看不到結果，對方說沒問題就 OK 了吧  

就在懵懵懂懂之間解決掉，我心想  

<center>

**「奇怪的知識又增加了」**  

![](https://chi01pap001files.storage.live.com/y4myqjbK3Roj7WjrEv-CzkHhAcpNzI46qzCFneGbIYW8EydJa7kmtireeyC3ojmny-WWeh3T9f71khS4CDv15xeGvn7aZbKcq_-hznr8KZbFlmDi433AFKO4jB4hHeD1r27bKNSEtsqXyh9Tn9m4WYkkMxLN0EGWallC22EW4DCRK4RwRt6H9Fl1QKTBfWg1Zxp?width=584&height=421&cropmode=none)  

</center>  

> 參考資料 :  
  1. [維基百科_Http表頭](https://zh.wikipedia.org/wiki/HTTP%E5%A4%B4%E5%AD%97%E6%AE%B5)  
  2. [WebGL: Deploying compressed builds](http://docs.unity3d.com/2019.3/Documentation/Manual/webgl-deploying.html)  
  3. [ASP.NET不可或缺的組態檔→Web.config](https://blog.xuite.net/ghel0915/nblog/21685755)  
  4. [WebGL build error :Uncaught SyntaxError: Unexpected token < || UnityLoader.js is not a function (SOLVED)](https://answers.unity.com/questions/1397472/webgl-build-when-uploaded-gives-me-this-error-unca.html)  
  5. [Web.config设置system.webServer](https://www.cnblogs.com/xcsn/p/6939628.html)  
  6. [很不錯的解釋文_What is a MIME type?](https://stackoverflow.com/questions/3828352/what-is-a-mime-type)  
