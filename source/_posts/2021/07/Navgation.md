---
title: 紀錄 | Unity ─ UI Navigation 尋找不見的按鈕
tags:
  - Unity
  - Event System
categories:
  - '2021'
  - '07'
author: Rosa Hong
date: 2021-07-24 20:27:43
---

![](https://i.imgur.com/Vz6RmrN.png)  
<!-- more -->
## 前言 ##  
最近在做Unity + Fungus 小遊戲  
發現 Fungus 裡的 Menu 選項不斷的亂跳  
一直找不到問題，還找去原始碼...  
想說是不是 Fungus 腳本有衝突
才知道自己連 Unity 的介面功能沒有到很熟   
紀錄一下:D    

## 控制 Fungus Menu 選項 ##  
Fungus 內建的Menu 可以新增很多個選項  
並且有不同的分支可以讓對話更加多元    
在控制時可以使用滑鼠與鍵盤上下左右鍵操作  
能使用鍵盤控制是來自UI物件上的Navigation(導航)  
![](https://chi01pap001files.storage.live.com/y4mYWPYxomKMTvK8NkXSc7wGnefboAs8DPi3XzwVpZlIO3b-Rndt8PKkmqQuDSmVqQnyv6XgAlkRyy2Tiasz_D_rZlIFtDQtyjAwOr31k2Ye_2_2tN8zBbZcSpagvbipBpnPJqTEe_lUHlsti2r_hIdylS477eT9LurYr1TNFzZi2KUjf0JaPHb7Kx0Tfap5j1z?width=660&height=477&cropmode=none)

更往前想一點  
那腳本是如何跟物件來互動的呢?    
UI 能進行互動是來自 Unity 的 Event System  
很常時候會看到腳本最上層掛這一個  
- `using UnityEngine.EventSystem`   

使我們可以在腳本中控制UI物件的事件  
可以偵測`誰被按了?`、`誰被選擇了?` 等等的。

## Event System ##  
一開始新增Canvas 或 UI 物件時  
Unity 會幫我們自動生成 Event System 這個物件  
![](https://chi01pap001files.storage.live.com/y4mKFqurQ2X7h0jJ3Frd1kPO8ipgXgBIIrqYrRtGiNY4C1piCm1NuKKjM9AO3Nqagj6DyNOs6GXStvOutfie-uffMZUMLR4sDoJwm6q3zlfz6vEnl3N1xhZKZe8dvH-Fib6_OG9Qi1OBKnIYbGVpmIIZV5P8YyjuQRw0gVeTucDuK2rV5AV6EOYeUHRjTagVWbr?width=256&height=166&cropmode=none)  

仔細看一下有兩個腳本附在上面  
![](https://chi01pap001files.storage.live.com/y4mST6rqopQUEi6t6yz5eNJ6zUrND4Ljt8vOQMFh1c984h-H30bdnD4CLygkpxsGyfEOF1XORmpkFiplC5dVAk41QD3LsU7qGOsXDTdEDu65Ao_zDfCBb2QBIZoWzLProM1iVsYgR6ber8xbKpLo4wXY9oZg6JRTbUGa9J5cW3tJajUOJi7Bef-3ZGLu7IVozQa?width=468&height=660&cropmode=none)  
分別是 `Event system` 與 `Standalone Input Moudle`  

| 腳本名稱                | 說明                                                      |
| ----------------------- | --------------------------------------------------------- |
| Event system            | 處理UI物件狀態，像是button 中的滑入、滑出、點擊、拖曳等等 |
| Standalone Input Moudle | 像是鍵盤或搖桿的輸入控制                                  |

這次先專注於 Event system 腳本上  
以下的三個設定 

| 功能                  | 說明               |
| --------------------- | ------------------ |
| First Selected        | 預設被選定的UI物件 |
| Send Navigation Event | 是否開啟UI導航功能 |
| Drag Threshold        | 拖曳事件靈敏度     |

在我的專案中，遊戲操作皆來自鍵盤  
因此需要使用到UI導航功能  

## 遇到的問題 ## 
只有三個選項，卻會超出選項格外  
![](https://i.imgur.com/v0hC0wV.gif)
甚至按不回來，由動圖可知選項超出後  
不知道選到了誰    

### 問題解決 ### 
提到 Navigation，一般設定為 `auto`
也就是按上下左右鍵會分別對應按鈕的位置
如果有多個按鈕都是設`auto`就會發生我這樣的事情
除了auto外，也有其他的方式
- none 不被導航影響
- Horizontal
- Vertical
- Explicit 則是可以指定選擇跳選的對象  

![](https://i.imgur.com/Lubtgid.png)

#### **注意** ####
當然如果其他的Button是Deactivate狀態下，是不被影響的  
物件停用狀態腳本自然也不會被執行  
不過物件`Set Active`開開關關會使效能產生一個臨時高峰  
會突然LAG一下，因此我是使用`Canvas Group`的alpha值控制按鈕的出現，但實際上功能還是運行的狀態  
所以還是吃的到Navigation事件  

#### **我選到了誰?** ####
這時候可以打開`Visualize`來看這些UI物件是怎麼連結的  
![](https://chi01pap001files.storage.live.com/y4mOdcNws2PW6q_sxLe5GYT3fa1Ty342iMadi9U1sHLMtA2Z1VHwPBP_iIFDhBznNzBEHBVHgsVFQSC2ut_euANWxu-otOVWFt1wlbQN1KoBFtmd2ORx930-8vW8JeH_81zE-5WLmpi2Jg8LVIFxOoDeL33Yp0UXJNk5tEW5UgX6dLcIlBbK8tMQCPUI9MYwe2U?width=660&height=421&cropmode=none)  
我先把alpha值打開，看一下按鈕位置  
搭啦!凌亂的連連看 (注意黃色線) 
![](https://chi01pap001files.storage.live.com/y4mxQaNp1uNlJFSzfiusdX7iG1ZaWaLCiKJ2l6WiLBBRVB_NEzB9pVX1nOvW-XeEqGIgScY1Dn54xIeBJTO84UeBaIfXDErzZ-QzjS22pFpLWwEfQQaHj-bhxCGpsDBH4obPA87l31JCD7-V4QR3A0GnuchQQBIvy3XwN5QOXSQxjYy8eTeTA8O5OwBHQVLBHAu?width=660&height=372&cropmode=none) 
知道原因後，斷開連結就行了，把其他無關緊要的按鈕都選擇`none`就好了。  
> 如果不選擇none的效果就可以知道navigation怎麼運作  
  
![](https://i.imgur.com/8IRNaIr.gif)  
>選擇none的效果後  

![](https://i.imgur.com/D5mGljJ.gif)  

看看這連連看都鎖在中間了(很糊!沒辦法Unity就這麼糊)  
![](https://i.imgur.com/CQwmNFb.png)
## 延伸思考 ##
當然不只Fungus的Menu可以使用  
可以搭配出更多的UI複合式選單  
尤其是使用搖桿的玩家  
在操作上可以更加靈活  

## 結語 ##  
總之這種情形還真得要多多注意  
當時找這個問題找了一個小時多  
沒想到就這麼小問題QQ


