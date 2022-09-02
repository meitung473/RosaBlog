---
title: 筆記 | Web - 初探前端效能優化
tags:
  - Web
  - Web-optimize
categories: [Web]
author: Rosa Hong
date: 2022-09-02 04:40:43
description:
---
> 參考文章連結 : [今晚，我想來點 Web 前端效能優化大補帖！. 效能是工程師在維護專案時非常重視的要點，不論是 Web 還是…](https://medium.com/starbugs/%E4%BB%8A%E6%99%9A-%E6%88%91%E6%83%B3%E4%BE%86%E9%BB%9E-web-%E5%89%8D%E7%AB%AF%E6%95%88%E8%83%BD%E5%84%AA%E5%8C%96%E5%A4%A7%E8%A3%9C%E5%B8%96-e1a5805c1ca2)

## 摘要
收集常見的前端優化的方式及例子。主要了解常見名詞上的解釋，沒有深入其實作方法，幫助自己吸收了解。

<!-- more -->
## 一定要做效能優化嗎 ? 
效能的優化是選擇性的，非必要性。並不是所有的應用都需要追求效能，很有可能優化的效益不大，但花的時間過多，造成成本上的浪費。

## 為什麼要做效能優化 ? 
優化目的是 : 
- SEO
- 使用者體驗 : 著重於 Core Web Vital 指標，包含 LCP、FID 以及 CLS
- 影響營收的重要指標  

## 如何分析效能 ?
使用工具幫我們找到導致效能瓶頸來源，使用 performance analyzer 找出問題，常見有 :
  1. [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=zh-tw) : 多用於開發階段的測試，因為其 FID 沒有使用者可以根據來評測，會使用 TBT 來測量。
  2. [PageSpeed Insights](https://pagespeed.web.dev/?hl=zh_TW) : 發布版本測試。
 
## 衡量網頁的指標 : Core Web Vitals 
網頁常用的衡量指標有 3 個
![](https://i.imgur.com/WmPuRSn.png)

1. LCP : 載入最大區塊元素 渲染的時間
2. FID : 從載入到與網頁元素互動的時間
3. CLS : 視覺上布局的偏移量

### LCP ─ Largest Contentful Paint 
顯示 **最大內容元素** 所需時間 (速度)，通常最大內容元素通常是圖片或影片，不然節點大的文字區塊。

LCP 是計算網頁可視區 (viewport) 中 **最大元件的載入時間**，也就是頁面的主要內容被使用者看到的時間，是速度的指標。

> 可視區內最大的元素並不是固定不變的 。會隨使用者滑動而找尋下一個最大的區塊元素。

#### 如何優化 LCP ? 
1. 減少伺服器回應時間
    - 針對主機效能優化 : 硬體上優化 
    - **提早載入第三方資源** 
    - **使用較近的 CDN Cache** 
2. 盡量避免 Blocking Time
    - 降低 JavaScript blocking time。
    - 降低 CSS blocking time。 
3. 加快資源載入的時間
    - **圖片大小優化** 
    - **預先載入重要資源**
    - 將文字檔案進行壓縮
    - 根據使用者的網路狀態提供不同的內容 (可以分成 離線 . 線上)
    - 使用 service worker
4. 避免使用客戶端渲染(CSR)
    - 若必須使用 CSR ，建議優化 JavaScript ，避免渲染時使用太多資源。
    - 盡量在伺服器端完成頁面渲染，讓用戶端取得已渲染好的內容 。  
      原因是 CSR 把後端要做的渲染頁面工作給承攬到由前端執行，第一次載入時要花更多時間處理 JavaScript 的渲染內容。**CSR 使 FP 到 FCP 這段時間畫面都是空白的**😥，導致東西出現的時間被延後。
    ![圖源來自 : https://www.patterns.dev/posts/client-side-rendering/](https://i.imgur.com/lZqUiRq.png)


### FID — First Input Delay 
首次輸入延遲/封鎖時間總計 (互動性)

輸入延遲 (Input Delay) 通常發生於瀏覽器的主執行序過度繁忙，而導致頁面內容無法正確地與使用者進行互動。

#### 如何優化 FID 
  - 減少 JavaScript 運作的時間。
  - 降低網站的 request 數並降低檔案大小。
  - 減少主執行序的工作
  - 降低第三方程式碼的影響

### CLS — Cumulative Layout Shift 
累計版面配置轉移 (穩定性)。雖然畫面被渲染，但隔一下下又被重排 (reflow) 導致畫面明顯抖動，使用者會看到畫面不是很穩定的被重新繪製。這跟使用者體驗有較大的關係。

實際的場景可以參考 : [Cumulative Layout Shift (CLS)](https://web.dev/cls/)。範例中當使用者進行互動後導致布局改變太大，導致下一個互動誤觸。

#### 如何避免 CLS
- 給予會比較慢載入的元素一個預設的寬度與高度 ，減少版面的偏移。


## 優化手段
### Code Minimize & Uglify
通常利用如 webpack 、gulp 等打包工具替我們做這些事情。

#### Minimize
變數跟 code 寫的越短，或是刪除不必要的空白，可以省掉不少瀏覽器 Parse 的時間，也就是提升前端程式的效能。

白話來說 : 佔據物理的空間越少，跑越快

#### Uglify
通常會使用較短的變數名稱作為代替，打亂程式的邏輯，避免源代碼外流。

### 圖片優化 : 壓縮、圖片的種類選擇
> 補充文章 : [Optimize Images](https://ithelp.ithome.com.tw/articles/10252501)  

圖片佔網站載入資源的很大一部分，對網站效能有顯著的影響。在考慮 Image Lazy Load 等技巧以前，我們可以先將圖片壓縮，透過減少檔案大小來加快載入時間。

優化步驟 : 
  1. 選擇正確的圖片類型
  2. 進行壓縮 (svg 等檔案可以再壓縮)
  3. 進一步做 lazy load

#### 避免使用點陣圖
使用前考慮 : 
  - 避免以圖片內嵌文字的方式顯示文字
  - 能用 CSS 達到類似的效果？(例如 : 圓形、三角形等幾何圖案)
  - 可以轉換成 SVG 嗎？

圖片類型的壓縮 :
1. 有損壓縮：如 JPG，使用只取部分像素資料的方式來壓縮圖片大小，並且 **壓縮後是不可逆** 的。
2. 無損壓縮：如 PNG，壓縮後不影響圖片品質。

#### 使用 SVG
SVG 為優先考量，其優點 : 
1. 向量檔不失真
2. SVG 相對體積較小
3. 傳輸可用 `Gzip`、`Brotli` 等壓縮格式

#### 另一種選擇 : WebP
> 說明連結 : [An image format for the Web](https://developers.google.com/speed/webp)

- 相較其他點陣圖，WebP 小很多，大概縮小 25% 左右
- 支援動圖，GIF 轉 WebP（但還有更小的 `WebM`）
- 支援透明

### Critical Render Path 關鍵渲染路徑
效能最佳化其實就是 **渲染步驟中所有的活動，再經過最佳化**，這就是所謂的關鍵渲染路徑 Critical Render Path 。

> 使用者首要互動與看見的先去處理。

#### 網頁是如何渲染到頁面上 ?
從收到 HTML、CSS 和 JavaScript，再對程式碼進行必需的處理，到最後轉變為顯示像素的過程中還有許多中間步驟。
![](https://miro.medium.com/max/1400/1*HUNT1RjFy_LONbmR4DpNeg.png)

根據上圖，網頁渲染的流程為：
1. 讀取 HTML 後生成 DOM Tree
2. 讀取 HTML 中的 CSS Link Tag 生成 CSSOM Tree
3. DOM Tree 與 CSSOM Tree 共同生成 Render Tree
4. 根據 Render Tree 生成 Layout
5. 最後 Paint 畫面

JavaScript 可以查詢及修改 DOM 和 CSSOM，在 CSSOM 執行完畢後，JavaScript 才會執行 。

> CSS file 盡快引入，JS 在 CSS 後引入，因為 JS的執行會導致網頁載入的暫停

#### JavaScript 載入時間差別
> 參考圖片來源 : [async vs defer attributes - Growing with the Web](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html#script)

`<script>` tag 除了一般的引入，還有 **async** 跟 **defer** 這兩種方式：  
![來源自上面的圖片](https://i.imgur.com/MQAQvPt.png)

- async : 非同步去請求外部腳本，回應後停止解析執行腳本內容。用於載入第三方函式庫等**不需要動到 DOM 結構的狀況**。
- defer : 也會非同步請求外部腳本，但是 **等待瀏覽器解析完才執行**。適合整個頁面都下載及分析完成後才會執行，非常**類似於把 JS 放在頁尾的情況**  。

> 兩種都是非同步下載，不同的是 **執行的時間點**

#### 最佳化 CRP 
[MDN 提供幾項參考](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path#optimizing_for_crp) : 
1. 最小化主要資源，並且使用 **非同步** 的方式或是減少下載的次要資源 (non-critical)。
2. 優化資源請求的數量，或是請求資源的體積大小
3. 優化下載主要資源的優先順序 (priority)，縮短主要渲染路徑。

實際上這是一個很大的主題😵，可以參考 [Patterns.dev](https://www.patterns.dev/) 的詳細說明 : [Optimize your loading sequence](https://www.patterns.dev/posts/loading-sequence/)，裡面還包含各項怎麼去影響 Core Web Vitals。

### Code Splitting
現代網頁程式漸漸走向使用框架以模組化方式來開發。程式 bundle size 仍然會變得過於肥大，導致 client side 的網頁載入時間變長，嚴重影響使用者體驗。

> Code Splitting 就是為了要解決單一 JS Bundle 過於肥大的問題。

將原本單一的 bundle 切分成數個小 chunk，可以搭配平行載入，或者是有需要時才載入某些特定的 chink，又或是對一些不常變動的 chunk 個別做快取，來達到載入效能的優化。

較常見的 Code Splitting 又分為兩種方式 :
  1. 抽離第三方套件 Bundle Splitting
  2. 動態載入功能模組 Dynamic Import  

在 Webpack 5 可以透過設定 `SplitChunksPlugin` 來幫助 chunk 上的設定。  

註 : 文中是寫 `CommonsChunkPlugin`，但在 Webpack 4 已經把 [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)抽離掉設定了，改成 [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)。其使用方法可以參考 : [Webpack 前端打包工具 - 使用 SplitChunksPlugin 抽離公用模組](https://awdr74100.github.io/2020-04-06-webpack-splitchunksplugin/)

事實上，Webpack 5 在打包時會自動預設 default 的選項，幫我們處理打包，官方稱預設就能獲得不錯的效能，可以參考 [chunk 的規則](https://webpack.js.org/plugins/split-chunks-plugin/#defaults) 

#### 抽離第三方套件 
細分兩種方式：
  1. 將所有第三方套件打包為單一檔案
  2. 將第三方套件打包為多個檔案  

##### 將所有第三方套件打包為單一檔案
> 參考 : [你的 JS 該減肥了！5 個提升網⾴載入速度的技巧](https://s.itho.me/modernweb/2020/Slides/d502.pdf)

可以先做一個最大的拆分：
  1. `Application Bundle` ：UI 與商業邏輯，跟我們寫的程式有關，是經常變動的部分。
  2. `Vendor Bundle` ：第三⽅套件 / node_modules，不太會變動。

拆分出 Vendor Bundle 變動的頻率相對較低，因此比較適合被 cache。
Vendor Bundle 被 cache 的狀況下由於減少了 Application Bundle 的⼤⼩，因此加快了再訪者的載入速度。採用這樣的方式的優點為邏輯簡單。

> 缺點為更新任何第三方套件都會使快取失效 😟。  

##### 將第三方套件打包為多個檔案
> 參考 : [淺談大型 React 專案的 Code Splitting. 如何透過快取和動態載入加速你的網路應用](https://medium.com/frochu/%E6%B7%BA%E8%AB%87%E5%A4%A7%E5%9E%8B-react-%E5%B0%88%E6%A1%88%E7%9A%84-code-splitting-8a258a13ac67)  

**根據套件關聯性打包**，減少套件更新時造成的延遲。
缺點則是相較前面打包成單一檔案的方式，這種方式需要處理的邏輯複雜許多。

以 Webpack5 為例 : 
```js
config.optimization = {
  splitChunks: {
      chunks: "all",
      cacheGroups: {
          reactLib: {
              test: /[\\/]node_modules[\\/](react|react-dom|styled-components[\\/]dist)[\\/]/,
              name: "react-lib",
              priority: 40,
              reuseExistingChunk: true,
          },
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: 10,
              enforce: true,
              reuseExistingChunk: true,
          },
      },
  },
};
```
利用 Regex 把 `react` 跟 `react-dom`  抽離出來，因為 window 字元的問題只要有關 `/` 都要前面加 `\\` 跳脫，官方有提及這個問題，mac 好像不用。

我第一次使用 chunk ，所以我把能切的都切出來了🤔，但那個 `concatenated` 我不太知道是什麼...，翻譯是說關聯的資源，參考 : [caused by the ModuleConcatenationPlugin](https://twitter.com/olore/status/937523005407813632)
![拿其中一個專案實作](https://i.imgur.com/3syl3x4.png)
這個頁面的左上角有拉頁，拉開來可以看到打包的幾之程式碼名稱、要不要顯示 module 的全名還有 chunk + 壓縮、chunk + 沒壓縮 以及完全原始的大小。

在 build 並壓縮之後顯示的 chunk 的大小，WOW 😲!
![](https://i.imgur.com/kZjmg5G.png)

#### 要怎麼知道哪些一起打包 ?
可以透過 **webpack-bundle-analyzer**，視覺化分析專案有哪些 bundle chunk，各個 bundle chunk 的組成又為何，再針對可以改進的 bundle 進行優化。  
類似工具 : `WebpackVisualizerPlugin`
![還沒 chunk 之前，webpack 會做 default 照規則 chunk](https://i.imgur.com/mIBd788.png)  

之後再針對比較肥大的套件再進行不同的打包優化方式。

#### 動態載入功能模組 Dynamic Import
在檔案的開頭引入需要用到的模組，通常在網頁載入時就被引入進來，稱為 static import。

- static import 不能滿足這兩種狀況的需求 :
    - 模組名稱為動態變數時
    - 需依照特定邏輯或特定時機引入時  
- Dynamic Import 的使用情境 : 
    - 根據路徑做 Dynamic Import
    - 針對肥大套件做 Dynamic Import  

#### 根據路徑做 Dynamic Import
有些路由 (router) 少被造訪，CSR 建站的方式會使沒有對 bundle 做額外處理的狀況下會在一開始載入 JS bundle 時就載入許多頁面的資源，這樣會導致許多不太會被使用者瀏覽的頁面是很有機會被載入卻又沒被使用的。

選擇針對路徑做 Dynamic Import，當切換到特定路徑時再載入該路徑會用到的資源。 

#### 針對肥大套件做 Dynamic Import
「肥大卻又不會馬上用到」的模組做 Dynamic Import， 透過 `webpack-bundle-analyzer` 分析較大的套件，並且做動態載入，減少了一開始載入的 bundle size。

### 懶加載 : Lazy Load Image
圖片佔了網站資源相當大的比例，避免在網頁載入的瞬間就想把所有圖片都載入下來，是對效能是一個硬傷。

可以採用 lazy load 的方法去載入圖片，**一開始只需載入部分的圖片**，待現有圖片快要接觸到 viewport 的底部時再去動態載入新的圖片。
1. 搭配 Intersection Observer web API : 偵測目標元素是不是與特定位置交會，交會時再去載入新的資源。
2. 瀏覽器原生支援，html 加上 `loading=lazy`

無限卷軸 (Infinite Scrolling) 的分頁載入 API data 也會使用 lazy load 的技巧。

### Virtualized List
> 額外閱讀 : [List Virtualization (patterns.dev)](https://www.patterns.dev/posts/virtual-lists/)  

`virtualized list` 是優化長列表的一種技巧。同時渲染數量大的元素會有幾個缺點：
1. 載入時白屏時間會比較長
2. 渲染了大量的 dom 節點的狀況下，在滾動事件觸發時會大大增加記憶體的用量
3. 容易失幀，因為渲染很慢，所以無法維持瀏覽器的幀率，頁面會顯得卡頓
4. 最慘的話網頁會失去響應

#### Virtualized List 概念
用陣列 **儲存所有列表元素的位置**，只渲染可視區 (viewport)內的列表元素。當可視區滾動時，根據滾動的 offset 大小以及所有列表元素的位置，計算在可視區應該渲染哪些元素。

當原本被渲染的 item 移出可視區後，就會被 unmount 掉，避免前面說的同時生成一堆 dom 節點的狀況。

這種方式也稱做 **windowing**，在 react 有現成的 library : [react-window](https://github.com/bvaughn/react-window)、[react-virtualized](https://github.com/bvaughn/react-virtualized)，兩個都是同一個作者，window 算是輕量版的。

Brian Vaughn 也就是作者，有一場演講說明他怎麼用 windowing 來優化 rendering。[Creating More Efficient React Views with Windowin](https://www.youtube.com/watch?v=t4tuhg7b50I)。

#### 為什麼說 DOM 很昂貴
常常在 React 上看見說直接操作 DOM 很昂貴，為什麼說昂貴呢 ?  

從 [[#Critical Render Path 關鍵渲染路徑]] 裡面的網頁解析來說，直接操作到 DOM 可能會導致 UI 的變化。以上面大量的節點例子來說，僅僅只是刪除一個節點，被改變的節點都要進行重排 (reflow)，就會重複網頁從 DOM 解析 ~ 到渲染的過程，這才會說 DOM 很昂貴，貴的不是 DOM (DOM 也只是一個物件罷了) 而是操作過後的 re-render 步驟😵。

所以才會有框架利用 Virtual DOM 來改善這部分的問題🤔

### Tree Shaking
> 補充連結 : [Reduce JavaScript payloads with tree shaking](https://web.dev/reduce-javascript-payloads-with-tree-shaking/#what-is-tree-shaking)

意象上就是把枯葉從樹上搖落下來。

在程式碼之中有些 code 在某些階段是不需要被載入的，透過打包工具在打包階段就可以分析哪些 code 或哪些 function 是用不到的，而把它們從最終的 bundle 中剔除。 

> 確保最後的 bundle 不會包含無用或多餘的程式碼與資源，減少 bundle size。

#### 如何做到 Tree Shaking ?
得透過 ES6 的 `import/export` 的幫忙。所幸 `@babel/preset-env` 幫我們處理間榮幸的問題。
```js
// 一般我們會全部載入
import arrayUtils from "array-utils";
```

假設我們要使用 array-utils 中的某幾個函式，應該避免上面的引入方式（把整個 array-utils 引入進來，再去使用特定的 property），而改為下面這種引入方式：
```js
// 引入特定使用到的方法
import { unique, implode, explode } from "array-utils";

// ❌ 不用 property
import arrayUtils from "array-utils";
arrayUtils.explode() ...
```

- 為什麼只能用 ES6 的 module `import/export` 呢?  
  因為 CommonJS 使得打包時不知道哪些會被使用，模組的對象/方法暴露於全域當中。而 ES6 的 import/export 採用 static 方法，在編譯時期就已經決定哪些會被包進去。詳細可以看這篇 : [聊聊 package.json 文件中的 module 字段](https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/)

### link tag 各種的預加載
> 文章參考 : [教學 - Preload, Prefetch 和 Preconnect 的差異 - Shubo 的程式開發筆記](https://shubo.io/preload-prefetch-preconnect/)

\* 粗體是很常見的
1. prefetch
2. **preload**
3. **preconnect**
4. dns-preconnect
5. prerender

其共同的效能優化目標：   
對將來會用到的資源預先處理，可能是載入資源，或是建立連線，因此在真的要使用到該資源時可以省去不少時間。    

#### Preload VS Prefetch
都是在提早取得將來會用到的資源。
1. Preload：先取得當前頁面的資源（例如 [字體 font](https://web.dev/i18n/en/preload-optional-fonts/)）。
2. Prefetch：告訴瀏覽器「這些資源我待會會用到，先幫我下載吧！」

prefetch 抓取的資源不限於當前頁面使用，也就是可以跨越 navigation。很確定使用者會點擊下一頁，就可以使用 prefetch 預先抓取下一頁的資源。

瀏覽器對於資源的載入順序是有規則的，是以 **檔案類型** 來決定下載的優先順序，以 chrome 舉例來說，參考文章 : [Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
  - High priority : style /font / XHR (sync)
  - Medium priority : 位於可視區域的圖片 / Preload without as/ XHR (async)
  - Low priority : favicon、`script async / defer / block`、不在可視區域的圖片、媒體檔、SVG 等 。

preload 與 prefetch 也是以屬性來分辨檔案類型。

註 : 瀏覽器 devtool 的 network tab 也可以看到各資源的 priority 。

#### Preconnect
cross-origin 的資源要被使用，先建立好連線

瀏覽器在實際傳輸資源前，實際上的步驟 : 
1. 向 DNS 請求解析網域名
2. TCP Handshake
3. (HTTPS connection) SSL Negotiation
4. 建立連線完成，等待拿到資料的第一個byte

每一步都會需要一個 RTT (Round Trip Time) 的來回時間。所以在實際傳輸資料之前，已經花了3個 RTT 的時間。

在網路狀況很差的狀況下，會讓獲取資源的速度大大降低。

`preconnect` 提早建立好與特定 domain 之間的連線，省去了一次完整的  **DNS Lookup + TCP Handshake + SSL Negotiation**，共三個 Round Trip Time 的時間。

##### Preconnect 使用例子
通常只會對確定短時間內就會用到的 domain 做 preconnect，因為如果 10 秒內沒有使用的話瀏覽器會自動把連線 close 掉 (HTTP/1.1 的連線機制)
  1. CDN：如果網站中有很多資源要從 CDN 拿取，可以 `preconnect CDN` 的域名，這在不能預先知道有哪些資源要抓取的情況。
  2. Streaming 串流媒體。範例 : [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed)

#### DNS Preconnect
> 參考連結 : [Using dns-prefetch - Web Performance | MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch#why_use_dns-prefetch)

跟 `preconnect` 類似，差別在於只 **提示瀏覽器預先處理第一步 DNS lookup** 而已。
  - `dns-preconnect` = DNS look up
  - `preconnect` = DNS look up + TCP Handshake + SSL Negotiation

`dns-preconnet` 對於第三方資源請求可以節省很多時間，因為每個資源都得跑一次解析網址到回應的過程。
參考 : [dns 是什麼？如何運作解析懶人包 | Cloudflare](https://www.cloudflare.com/zh-tw/learning/dns/what-is-dns/) 。
![cloudflare 解釋 DNS 怎麼從網址被解析到回應](https://i.imgur.com/fquZlQp.png)

#### Prerender
prerender 比 prefetch 更進一步。

> 不僅僅會下載對應的資源，還會對資源進行解析。

解析過程中，如果需要其他的資源，**可能**會直接下載這些資源。
基本上就是 **盡可能預先渲染下個頁面**，這樣一來當用戶在從當前頁面跳轉到目標頁面時，瀏覽器可以快速的響應。

> 適合用在用戶很高機率會轉到另一個頁面的狀況下使用。  

### CDN & Cache
CDN 的全名為 **Content Delivery Network** 內容傳遞網路。物理上的距離也是影響 response time 的重大因素。CDN 就是透過在各個地理位置建立 edge server 來避免取資源時都要跟距離遙遠的 server 溝通，造成效能的低落。

當使用者對被 CDN 加速過的域名發出 request 時，CDN 會自動將 request 導到地理位置離使用者較近或是流量較不吃緊的 edge server。

儘管第一次取資源時因為 CDN 還沒有快取的資料，所以仍然需要跟 original server 要資料，不過之後的 request 就可以透過地理位置離使用者較近的 CDN cache 取得，加快 client 端資源載入的速度。

除了 cache 機制以外，CDN 某方面也算是增強了服務的可用性、負載功能、安全性（降低 DDOS 對網站的影響）。  

**在物理位置上變近，使得伺服器請求時間縮短**。透過 cache ，下一次使用者使用其資源就可以對物理位置上比較近的主機進行索取。

### Write Good Code
平常在寫 code 就該多注意自己寫的 code 是否會對效能造成影響
  1. 會不會造成不必要的重新渲染 (Re-render)？
  2. 事件監聽器 (Event Listener) 在用不到時是否正確被移除？
  3. 撰寫的 Function 應該注意一下是否有時間複雜度更低的解法 (演算法)
  4. 會不會造成不必要的 memory 浪費？
  5. 擅用適合情境的 Design Pattern，除了提高程式碼可讀性與可維護性外，也有優化效能的機會。  

## 總結
**優化的目的 :** 
  1. SEO
  2. **提升使用者體驗** (最為重要)
  3. 影響營收的重要指標  

**現代網頁優化的指標 :** 
  1. LCP : 載入最大區塊元素渲染的時間
  2. FID : 從載入到與網頁元素互動的時間
  3. CLS : 視覺上布局的偏移量

**優化的實際手段 :** 
  1. Minimize & Uglify : 不影響運作的情況，壓縮並減少內容與空白。
  2. 圖片優化 : 壓縮與不同種類的選擇
  3. Critical Render Path 關鍵渲染路徑 : 找出一開始必要的東西
  4. Code Splitting : 重點是不要一次就下載一大包，等待時間太久
      - 抽離第三方套件 : 分割 (chunk) 大法，把資源切小載入。
      - 動態載入功能模組 Dynamic Import : 讓資源有用到再載入
  5. 懶加載 : lazy loading : 避免首次發出太多資源請求，隨時間的交互作用再載入。
  6. Virtualized List : 只選擇渲染可視區域的元素。
  7. Tree Shaking : 把不需要的 dead code 移除掉。
  8. link tag 各種的預加載 : 加快外部資源載入的方法。
  9. CDN & cache : 代理伺服器與暫存。使得物理上的距離縮短，減少資源請求時間。只有首次造訪較花時間，後續的造訪則會選擇較近的伺服器並且使用 cache。
  10. 寫好 code : 應用不同的 Design Pattern ，以及注意重複渲染的問題。

優化是一個很大的主題，第一次讀好吃力😵，因為很多方法我都沒有使用過，導致吸收覺得好抽象，邊查資料越覺得陷越深，決定在這裡先暫停，回到以認識為主的目的，之後再把各個優化獨立出來研究。

莫大後來有針對他的文章出一系列的鐵人賽文章 [今晚，我想來點 Web 前端效能優化大補帖！ ](https://ithelp.ithome.com.tw/users/20113277/ironman/3877) ，我已經放進我的 later reading 名單了。此外，除了正宗的 [web.dev](https://web.dev/tags/performance/)網站，我也非常推薦 [Patterns.dev](https://www.patterns.dev/posts/#performance-patterns) ，提供現代網頁的 Design Pattern 以及網頁優化的方針，目前打算近期把 `Pattern.dev` 好好讀一讀了💪