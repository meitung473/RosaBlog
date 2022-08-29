---
title: Obsidian-Excalidraw-image-url
tags: [Obsidian-Plugin-Excalidraw]
categories: [Obsidian]
author: Rosa Hong
description:
date: 2022-08-29 10:58:31
---
> 影片連結 : [Block reference parts of images just like text with Obsidian Excalidraw - YouTube](https://www.youtube.com/watch?v=yZQoJg2RCKI)

## 摘要
解決我怎麼在同一個大張 Excalidraw 把不同的圖片匯出到 markdown 上。一開始我都是靠多個檔案連結，因為我以為只能 1 個檔案全部匯出成 PNG 或者 SVG ，才能在其他 markdown 匯入，但其實是可以 **直接取需要的區塊** 就好，把 Excalidraw 畫板對待成一般的 markdown 文件，把圖像可標記、可連結，是 markdown 文件的加強版工具。
<!-- more -->

## 區塊/圖片嵌入的 3 種方法
Excalidraw  區塊/圖片嵌入的方法有 3 種
```plaintext
text : [[file#^elementID]]
area : [[file#area=Section heading]]
group : [[file#^group=elementID]] 
```

1. `text` : 純粹文字，等同於 Obsidian 裡面的 block ID `(^elementID)`。
2. `area` : 區塊性圖片，被截出來 (cutout) 的那一塊。有點抽象，泛指被覆蓋疊到區塊都算，至於區塊的計算我目前看不出所以然🤔，因為有時候某些元素也會被截掉，應該是對應 Excalidraw 偵測文字的邊圍之類的。
3. `group` : 有被群組  `(ctrl + G)` 起來的才會抓到，個人最常用。

# 快捷產生區塊/圖片連結
工具列最旁邊的小 obsidian 標誌 + 搭配連結圖片圖示
![小黑曜石 + 視窗按鈕](https://i.imgur.com/JCnnStN.png)

對應 3 種區塊圖片的方式 : 
1. `text` : 直接按下按鈕
2. `area` :  <kbd>shift</kbd> + 按鈕
3. `group` :  <kbd>ctrl</kbd> + 按鈕

## 實際範例
針對畫板內容來實作不同的截圖方式。  
![|400x320](https://i.imgur.com/9mau5Ph.png)

### text : 橘色區塊
結果是找不到該區塊 😵  
  ![出現找不到的錯誤訊息](https://i.imgur.com/RVloCQU.png)  
  ```plaintext
  連結顯示的文字 : 
   ![[Excalidraw/區域、群組與文字圖片的使用方式.md#^zUw1QSHwfxMypXDbPBNBJ]]
  ```
對應實際被標註的 element id 物件，把  Excalidraw 轉成 markdown 就能看見。   
![|300x200](https://i.imgur.com/Qt2nIkW.png)    
會發現實際被標註 id 的是 rectangle ，也就是 group 最外層的橘色方框，理所當然這裡不會有文字，會出現找不到的錯誤訊息。

> 不可對圖形包裹的 group 取 text， 等同取非文字區域的文字，就是沒文字🤔 

如果是 **多個文字框** 被 group 起來 (只有文字組成)，並使用 text 的方式取圖片，是可以的，但只會取到第一個文字框。

### text : 藍色區塊
結果只有最後的文字被標註   
  ![|200x60](https://i.imgur.com/Izkkgqi.png)  

```plaintext
 ![[Excalidraw/區域、群組與文字圖片的使用方式.md#^P94rSxUw]]
```

- markdown 文件標示  
找回 markdown 標註的目標，會發現只有「顆顆」被標註到🤔  
![|300x310](https://i.imgur.com/ELtkPBQ.png)  

如果我們想要整個藍色區塊為圖片怎麼辦 ? 

### area : 藍色區塊
確實取到藍色區塊，但是包含疊在畫面上的東西🤔    
![|300x350](https://i.imgur.com/dkS6rqh.png)  

```plaintext
 ![[Excalidraw/區域、群組與文字圖片的使用方式.md#^area=P94rSxUw]]
```

markdown 文件標示的跟 [[#text 針對藍色區塊]] markdown 一樣，因為後面的 element id 跟 text 截取藍色區塊是一樣的，但是 area 很明顯連大區塊 (heading) 都包含了。後面也會凸顯了為什麼 area 是 `cutout`  (畫面截出來的區域)，並且跟 group 有非常不同的地方。

### area : 橘色區塊
一樣涵蓋了被覆蓋到的部分。  
![|300x350](https://i.imgur.com/tRv7yrj.png)  

```plaintext
![[Excalidraw/區域、群組與文字圖片的使用方式.md#^area=zUw1QSHwfxMypXDbPBNBJ]]
```

注意這裡的 element id，跟上面 [[#text 橘色區塊]] 一樣，但也會跟底下的 group 一樣，都是對 rectangle 標註 id。 

### group : 橘色區塊
確實取到橘色區塊，含一點白色邊框，但範圍不包含覆蓋的綠色圓圈。    
![300|280](https://i.imgur.com/gTT38aq.png)  

```plaintext
連結顯示的文字 : 
 ![[Excalidraw/區域、群組與文字圖片的使用方式.md#^group=zUw1QSHwfxMypXDbPBNBJ]]
```

好，這邊 area 跟 group 的差別就很明顯了，對於 Obsidian 來說 `area` 是類似直接對視窗截圖 (說法不是到很精確)，而 group 只計算被群組的範圍，只要不包含都不會被算在內。

具體來說從 markdown 文件來看，group 的一起的文字與圖案，在 `json` 上的 `groupIds` 都會被標上一樣的 id，以辨識他們是渲染圖層上的同一組。 

area 在 markdown 上可以看做找該區塊的 section heading 視為範圍，至於怎麼計算，應該是文字區塊的 `width x height` 加上 padding 範圍內的都截圖進去。

padding 的部分只支援 SVG ，可以在該 Excalidraw   的 markdown 文件加上  `excalidraw-export-svgpadding` 的 metadata，會覆寫預設設定，預設是 10。

## SVG v.s PNG
在 group 與 area 不同的圖片格式會有不同的表現。  
![來源自影片的 1:57 ](https://i.imgur.com/1qYAhUj.png)

上面的範例都只有用 SVG 解釋，但其實可以匯出 PNG，只要在設定把預設匯出 SVG 的按鈕關掉就可以了。    
![SVG 預設匯出設定](https://i.imgur.com/N5auj8H.png)  

根據圖表 text 無論對非文字的取文字是都不行的。但此時如果用 `area` 去針對橘色區塊截圖，會發現截到 *整個畫版* 的圖，更簡單來說 `area` 辨別不出哪裡是個別區塊，只好整張截了。  

可以說 PNG 把 markdown 文字標註的 id  `(^ids)` 忽略了，PNG 不認識字，只認 **物件**，此時對 area 來說整張圖就是一個物件。而 group 還是能截到正確區塊的原因，因為它是透過 json 的 id (別忘了 json 也是一種物件)，所以不會被影響。

## 圖片原始尺寸
影片最後作者提到應用 Excalidraw 插件 ─ `Set Dimensions` ，校正圖片正確的圖片尺寸，使黏貼在上面的元素能完好符合圖片本身。插件的功能是重新計算區塊大小，讓文字符合其比例。

以 威力在哪裡 為例😄，透過 `Set Dimensions` 把原始圖片尺寸復原回去，新增的元素就能以比較正確的比例出現。  
![圖源自網路](https://i.imgur.com/krH1Hcy.png)  
會覺得好像沒什麼差別，但我在打字時小圖片的藍色圖塊會被撐大，因為預設文字的比例關係，無法壓縮在壓縮。而原始圖片就沒這問題，在大圖上進行註解不用一直微調其他元素的尺寸。

## 注意 : 貼上的圖片 + 連結圖片的 group 
當我用截圖複製進來的圖片，再用 Excalidraw 的 `group` 連結圖片，會出現的是截圖的圖片本身，而不是實際上 Excalidraw group 上的區塊。這時候要用 area 先把圖片區塊匯進去再手動改成 group ，才不會被判定成是截圖的單張圖片。

我出問題的步驟 : 
1. 用 window 內建截圖並且複製圖片到 Excalidraw  貼上
2. 含所有的內容一起群組
3. 用 `group` 連結的方式貼上
4. 😵 跳出截圖本身的本地文件連結，然後按 back 還回不去

先改用 area 再改 group   
![area 的範圍會被削到](https://i.imgur.com/x83ulO7.png)  

我在想是不是一張外部載入的圖片應該也是算一個 id ，所以再辨識時 id 應該是被貼到圖片上，而不是我圈起來的 group。至於 area 則是以區塊來截取，包含圖片與其他文字元素，當範圍確立之後，換成定義的 group 就能更精確的定到... 🤔。

## 總結
圖片截圖有 3 種 : 
1. `text` : 純文字截圖，但不能對非文字截。快捷 : 直接按下按鈕。
2. `area` : 鄰近區塊截圖，只要看到的都截。快捷 :  <kbd>shift</kbd> + 按鈕。
3. `group` :  只有被群組 (group) 的才截。 快捷 : <kbd>ctrl</kbd> + 按鈕

Excalidraw Plugin 有更多好用的技巧與小工具，我之前都只是為了製造圖片並且匯出 SVG 來附在 markdown 上，直到我看了這部影片，才了解到這 Plugin 的強大。

圖片一直以來是 Obsidian 的硬傷，這麼說是因為無法 **好好用文字來管理圖像**，我們只能把他附加於某個資料夾底下，並且嵌入使用，沒用到的圖片就會放著長灰，也不能對圖片進行其他附加屬性。但 Excalidraw  使圖片具有可被標記的 tag 與 aliases 的方式，跟引入其他的 markdown 筆記段落一樣，更加彈性，重點是可以用搜尋以及 tag 來管理，另外也可以把一整個相關的筆記圖片都放在同一個檔案，變得非常方便。 

不過這樣的便利只能留在 Obsidian 本身，像是我如果要搬運到 hexo 上發布， wikilinks 是無法被辨識的，圖片的效果也只能另外匯出來處理😵，只好期許有批量匯出圖片的插件誕生。

另外這部也是來自 Excalidraw-Plugin 作者的影片，他對視覺化的筆記方式有很多想法，甚至可以說是狂熱🤓 的地步，他的頻道與部落格上有很多 PKM 的技巧與再思考。近期我也很好奇 PKM 以及 GTD 這類的東西，YT 上都被推薦類似影片，未來會再來研究研究。