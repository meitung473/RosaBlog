---
title: 心得 | Foresea畢業專題(II) ─《菜雞在 Unity 裡的漫長旅程》
tags:
  - 畢業專題
  - Unity
categories:
  - '2021'
  - '05'
author: Rosa Hong
date: 2021-05-24 14:58:08
---


## **前言** ##
若你在專題團隊裡擔任 **遊戲程式設計**，可以留步  
若你在專題團隊裡擔任 **美術設計** 負責遊戲素材  
可以直達 **問題大雜燴** 
我將會分享 製作畢業專題一年學習程式的資源  
希望這些資訊可以幫助任何人的專題運作更順利  
<!-- more -->  

## **正式開始前的準備** ##  
我不會講到遊戲企劃架構等等的，網路上文章大神非常多
可以用Google大神找到參考。
這篇著重在一個程式菜雞(非理工背景)從短期學習程式到完成一個專題的經驗分享。
在我的畢業專題 《Foresea》中，我是擔任遊戲程式設計
如果你/妳和我一樣，是程式小白(程式基礎薄弱)，可以參考我的經驗。  

### **與時間賽跑** ###
#### **正在做專題的人** ####

又剛好只有在課堂上碰過Unity，沒有更多的接觸  
但你的程式理解力 ~~看到程式碼不會頭痛~~ 是組內還不錯的人🤟  
**我會建議:**  
專題主題想好後，類型會決定「以什麼方式呈現」  
進而決定你要有什麼樣的「功能」  
並且透過重新組合排列來完成專題。  

你可以試著... :  
1. **拆解功能**  
例如 : 我想做 <font color=teal>**3D 第一人稱 射擊遊戲**</font>，那你會要有
   - 瞄準
   - 子彈庫
   - 敵人 ...等等功能
  
  > 功能詳細分解，以 **瞄準** 為例    
  >  1. 啟動準心要透過**按鍵**來觸發  
  >  2. 透過**射線**來偵測物體的位置  
  >  3. **確定**你瞄準到的是**目標**   
  
   - 綜合起來你這個功能裡會需要的技術  
      - 按鍵偵測  
      - 物理射線  
      - 碰撞  

很多教學其實都有一次到位，但如果你在某些功能想要追加時，拆解就可以清楚需要的技術  
2. **做穩定功能的延伸**  
   例如: 拼圖 + 抽卡系統...等等  
   創意不一定要全部無中生有，結合也是種創意  

#### **準備做專題的人** ####  

1. 可以動手做小project ，如果你有idea可以先規劃遊戲框架、基礎功能等等。  
   - **試著練習小專案**  
    之前花了一天隨興做的劇情小遊戲    
    主要練習 **整合應用**與**滑順換場** 
    當中對話框是用Assest store的資源後來就忙畢業專題，就沒繼續了...🥴    
    - 要是懶的製作美術素材，可以使用Unity 商店提供的一堆素材包來組合成自己的遊戲。  
    可參考這位youtuber **[Miziziziz](https://www.youtube.com/channel/UCaoqVlqPTH78_xjTjTOMcmQ)**  
    四人以同一包資源，做出四種不同玩法的遊戲    
2. 多看Devlog(開發日誌)，作者製作中會記錄心得與技巧  
像是這位靠遊戲製作起家的[**Dani**](https://www.youtube.com/channel/UCIabPXjvT5BVTxRDPCBBOOQ)  
創作的遊戲也有在steam上，也有將製作與心得做成影片。  

### 認清自己  ###
學習基礎的開始，你將會碰到大量的英文跟一些數學(?)  
   1. 如果你本身超討厭英文，那很可惜，你的學習資源將會被侷限   
   2. 如果你本身超討厭數學，那更可惜，程式運用邏輯判斷與數學相輔相成，做起來更快速    
    **Q:**  我怎麼知道自己英文好到可以看國外的教學學習?    
    **A:**  如果你聽1分鐘的英文非常很吃力了，我就建議你就用中文資源學習  
    不然你會變**練英文聽力**，而不是學習程式。  
   - Try it ! 試試看   
  看這支[影片](https://youtu.be/1aGjMIUgVTU)，如果你能聽得懂大多語句，就代表你還OK啦!  
  不能接受兩點，其實你還是能做遊戲，目前中文教學資源越來越多了  
   - 若遇到問題，可以發問到
     1. 👍 **[Unity 應用領域](https://www.facebook.com/groups/UnityFrontier/)**
     2. **[巴哈Unity3D引擎版](https://forum.gamer.com.tw/B.php?bsn=60602)**  
   最近網路上也出現很多新興論壇與討論群也可以加入
   - 寫程式超級苦手    
    可以用視覺化程式工具來打造整個專案，這邊列舉三個常見的  

|                                                                                                                                         **Fungus**                                                                                                                                         |                                                                                                                                           PlayMaker                                                                                                                                           |                                                                                                                                           bolt                                                                                                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![Fungus](https://chi01pap001files.storage.live.com/y4mkfhN24Lbc49rFFaLHFFlzmnSh8Zuv_hBQBnX5bhf6ZoUfuBitk2LWvZUjoddAfWinO0xPJYmKcHxLLGjdv2G4Xj5P7vCeelxUtd8_RKjbOnPqi9VBJ08QPkF-1kA-8Oc46pNIWtvN8hmOtUvc9BXtvDG3w1z00ZouUJeOYgIfV_7oqXYzX4LcWlDHyi5Rrpf?width=64&height=128&cropmode=none) | ![PlayMaker](https://chi01pap001files.storage.live.com/y4mpgpEnb_uv7folt3ZpcsTYMtqqqo_T-YoEybEGKP-ksmMLfyqSVXZH9O9Cd-2p63exqjtaF2SZLiNfMoXubHQj2J1rtZ3dL50WWsfF_noVQBHUYv8vqGRddYj38E2e34HdSNFHpuS7QWnihbJpD9gsWrzymekydAhcbJhQeTOlsaXYugV_4-RpTR0BA70KTD-?width=64&height=128&cropmode=none) | ![bolt](https://chi01pap001files.storage.live.com/y4m7J5a0UmNmKPGIrzwNoo0oWBDVkMBy2o939beWfQ_ap7zSKutxnKgq8T0qFZ52LDHmBzGOp8LCLQ_gOGS0-X-yEDv8_40WWvDM3k191Jm5AVXLSohQQOkwNyvqT2bUidkRnAeL_MWXGFBaeFW4ch-JzZbTZ49Q4Dhv5jNgYJN6zXvlgr6Agn6iX8AISstt0F8?width=64&height=128&cropmode=none) |
|                                                                                                                                   **不需要撰寫任何程式**                                                                                                                                   |                                                                                                                                      不需要撰寫任何程式                                                                                                                                       |                                                                                                                              不須撰寫程式，但也可以混著C#寫                                                                                                                              |
|                                                                                                                                          **免費**                                                                                                                                          |                                                                                                                                         必須**氪金**💵                                                                                                                                         |                                                                                                                                         **免費**                                                                                                                                         |
|                                                                                                                                      **⭐歷屆最常用**                                                                                                                                       |                                                                                                                                         教學資源豐富                                                                                                                                          |                                                                                                                                      教學資源算豐富                                                                                                                                      |
|                                                                                                                                      很方便的對話系統                                                                                                                                      |                                                                                                                                       中文學習資源不少                                                                                                                                        |                                                                                                                                       近年發展快速                                                                                                                                       |
|                                                                                                                                       缺點是有點制式                                                                                                                                       |                                                                                                                    **[用過都說讚](https://hutonggames.com/showcase.html)**                                                                                                                    |                                                                                                                                     Unity官方有教學                                                                                                                                      |

- **`至於我推不推視覺化工具呢?`**  
    其中 **[<PlayMaker?bolt?>](https://www.youtube.com/watch?v=OqHM0ZNtZ_4)** 影片留言區提到，我覺得非常中肯。      
    > If you are an artist without coding experience, visual scripting is a bliss but if you are a coder, visual scripting could be a curse.  

    我有試用過bolt，對我來說簡直災難，直接用C#寫舒服多了。  
    如果寫腳本算順，建議就不要載bolt，會適應不良🤢。

### 其他製作引擎的選擇 ###  
如果你是大三以下，上過課覺得 Unity 介面超難懂很複雜  
可以試著使用Godot或Construct 2(3)等引擎  
如果你是要做純RPG遊戲，也可以使用 RPG製作大師  

| 應用程式                                                               | 說明                                                            |
| ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| [Godot](https://godotengine.org/)                                      | 近年興起的開源遊戲引擎， 也有不少人從Unity 跳槽到這裡           |
| [Construct 2 (3)](https://www.construct.net/en)                        | 可以線上編輯。據我所知有些國內大學是使用這個。                  |
| [RPG製作大師](https://store.steampowered.com/app/363890/RPG_Maker_MV/) | 下載要`$$`，發展悠久網路上資源很豐富，但就是只能做純正的RPG啦。 |

## 正篇 ## 

我進步的不二法門，**多看 多學 多實作**。

### **第一步 : 大問題拆解小問題** ###

很廢話I Know~，不論是哪個領域，拆解都是遇到問題的第一步  
網路上通常不會有現成剛好你要的功能，你要達成的功能就要自己組合運用。  
功能拆好後，做不出來的就是 **學習觀摩 ⇒ 實作 ⇒ 修改**

#### 推薦我常學習的管道 ####
網路上學習資源非常多，這邊稍微列舉我常看的  


| **Youtube**                                                                                                  | 中/英 | 說明                                                              |
| :----------------------------------------------------------------------------------------------------------- | :---: | ----------------------------------------------------------------- |
| [阿空的遊戲部屋](https://www.youtube.com/channel/UCzmz_uFDw73m0JDI5ILmA3A)                                   |  中   | 多為2D，概念從頭講起，非常清楚                                    |
| [yasuHs](https://www.youtube.com/channel/UCbZ34gnooSIHXAZUW1_wvgQ)                                           |  中   | 功能重點教學，操作非常清楚                                        |
| [陳間時光](https://www.youtube.com/c/%E9%99%B3%E9%96%93%E6%99%82%E5%85%89%E5%B7%A5%E4%BD%9C%E5%AE%A4/videos) |  中   | 有教學Fungus，C#基礎概念等等，講解非常清楚，影片略長              |
| [白米飯](https://www.youtube.com/c/%E7%99%BD%E7%B1%B3%E9%A3%AF/videos)                                       |  中   | 有bolt教學以及應用教學                                            |
| [M Studio](https://www.youtube.com/c/MStudioUnity/featured)                                                  |  中   | 教學種類繁多，講解清楚                                            |
| [Brackeys](https://www.youtube.com/user/Brackeys)                                                            |  英   | 內容含 2D&3D、Unity功能，講解非常詳細，首推! ~~可惜他不做影片了~~ |
| [Code Monkey](https://www.youtube.com/c/CodeMonkeyUnity/featured)                                            |  英   | 很多功能性教學，非常推薦，講解非常詳細                            |
| [Alexander Zotov](https://www.youtube.com/c/AlexanderZotov/featured)                                         |  英   | 功能重點教學，操作清楚，省時間學習大推👍                           |
| [Blackthornprod](https://www.youtube.com/channel/UC9Z1XWw1kmnvOOFsj6Bzy2g)                                   |  英   | 2D為主，單功能性教學，講解詳細，也有很多Devlog                    |
| [samyam](https://www.youtube.com/c/samyam/videos)                                                            |  英   | 以單功能教學為主，講解非常清楚。                                  |  |

| **論壇**                                                                  | 說明                                         |
| ------------------------------------------------------------------------- | -------------------------------------------- |
| [Stack Overflow](https://stackoverflow.com/)                              | 所有難題都在這裡解決，踏入程式圈一定要知道的 |
| [Unity官方論壇](https://forum.unity.com/)                                 | 可以更精準找到跟你有一樣問題的串。           |
| [巴哈 Unity3D 遊戲引擎哈拉版](https://forum.gamer.com.tw/B.php?bsn=60602) | 你懂得。                                     |

| **網頁**                                                                                                             |
| :------------------------------------------------------------------------------------------------------------------- |
| [胡亂說‧隨便寫](https://godstamps.blogspot.com/)                                                                     |
| [【Unity遊戲製作】勇者拉德小酒館](https://jerrard-liu.blogspot.com/)                                                 |
| [山姆遊戲](http://sammaru.blogspot.com/search?updated-max=2017-11-25T21%3A14%3A00%2B08%3A00&max-results=10#PageNo=2) |
| [鴨仔開發日記](https://www.douduck08.com/)                                                                           |

| FB社團                                                                      |
| :-------------------------------------------------------------------------- |
| [Unity 應用領域](https://www.facebook.com/groups/UnityFrontier/)            |
| [Indie Game Developers IGD](https://www.facebook.com/groups/IndieGameDevs/) |

> **C#基礎加強**  

|                                                                                     |                                      |
| :---------------------------------------------------------------------------------- | ------------------------------------ |
| [小山的教學平台](https://www.youtube.com/channel/UCmumrs_hb9s6eoVI29gLBgA/featured) | C#好幫手，對於基礎加強可以從這裡開始 |

#### 加強搜尋力 ####

若剛好都沒你要的，請發揮強大的搜尋力，尤其是用「英文」，破英文也可以👌

- **我怎麼搜尋**  
  有時候不太知道正確的關鍵字，但可以從搜尋出來的字眼`**找連結詞**`，幫助增加搜尋速度    
  **例如** :   
  > 我想讓`角色滑順地移動`，可能會在搜尋列打 *`"How to move smoothly in Unity?"`*  

  ![](https://chi01pap001files.storage.live.com/y4mC4TPIW5ABZI0G8jx_cv7O63vukxuNZ1UUvYIU4WD1iT2BD2YT7V_rwCMWbzaYJg4KO22LTIs5xieCtIllnDhceGNTzC5Ecquhvi9dM0pjOE9oClra7APf8e-zPcyR_m5xwOrCuERV34OMhdsSeJNCj1eQWcuVH5E4s_Wi7TE6F371Q1UiogCuVmmphND0CAF?width=660&height=516&cropmode=none)  
  
- 你會發現有人不少人跟你問一樣的問題，**關鍵字你有發現什麼嗎?**
  - **解析搜尋到的關鍵字**
    移動的主體**是誰**?例如 : Player、Enemy 或是 UI物件。下方圖片出現 
   - using Vector Lerp `**看起來是種"方法"**`    
    沒錯!這正是要的答案，恭喜你找到**Lerp**這個重要的關鍵字，接著就能更精準的搜尋  
    > Player move using lerp in Unity  

    會找到相關Unity Scripting API 的說明，以及 lerp的相關應用教學  
    推回用中文找 **Unity lerp 教學** 也是可以  
            
### **第二步 : 讓程式昇華** ###

程式基礎都修過，最基礎的`Array` 、`if-else` 、`for`、`foreach` 、`while-do` 、 `switch(case break)` 等等的都很夠用  
在Unity裡遇到看不懂的東西，除了直接google，也可到[官方文件](https://docs.unity3d.com/ScriptReference/)搜尋  
很推薦官方給的範例，清楚明瞭。    
> Unity版本的差異會影響一些方式的寫法，記得先找到自己開發的版本

#### **程式基礎&Unity功能 快速補帖** ####  

一些我覺得能加速製作的好概念 ，下面我提的都只是冰山一角，有興趣可以再自己Google  

>  **C#**
- **List**
  1. 📄 [**List<T> 類別**](https://docs.microsoft.com/zh-tw/dotnet/api/system.collections.generic.list-1?view=net-5.0)
  2. 📺 [**Unity C# 程式 教學 情場教戰手冊 (Array + List + Foreach)**](https://www.youtube.com/watch?v=EOnWTaN472g)
  3. 📺 [**C# Lists and Dictionaries in Unity! - Intermediate Scripting Tutorial**](https://www.youtube.com/watch?v=0WdWiF_Si4I)  
    > 📕**延伸閱讀**  
    > 📄 [**Array與List**](http://sharecoder.blogspot.com/2012/10/arraylist.html) ⇒非常清楚解釋兩者差異     
    > 📺 [**Data Structures For Game Devs: Arrays vs. Lists | Unity Tutorial (Part 1)**](https://www.youtube.com/watch?v=uWI3JEBRMiA)⇒泛型類別解說  
- **Dictionary**  
  1. 📄[**Dictionary<TKey,TValue> 類別**](https://docs.microsoft.com/zh-tw/dotnet/api/system.collections.generic.dictionary-2?view=net-5.0)  
  2. 📺 [**2020輕鬆學Unity做遊戲: Dictionary & List — 11**](https://www.youtube.com/watch?v=3wbDx90A9T4)  
- **Singleton (單例模式)**
    1. 📄 [Unity學習筆記：如何實現Singleton](https://kendevlog.wordpress.com/2018/08/14/unity%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98%EF%BC%9A%E5%A6%82%E4%BD%95%E5%AF%A6%E7%8F%BEsingleton/) ⇒非常詳細👍  
    2. 📄 [**[C#/Unity] 回顧所使用過的 Singleton 實作方式**](https://douduck08.wordpress.com/2017/05/08/difference-of-four-singleton-practicing/)  
        > 📕**延伸閱讀**  
        > 📺[**Unity 切換場景 保留物件不被刪掉 DontDestroyOnLoad + SceneManager 教學 場景切換**](https://www.youtube.com/watch?v=SpuqhqoiheM&t)  

> **Unity**  
  - **Coroutine (協程) (必知👍)**
    - **教學資源**
    1. 📄 [淺談 Unity Coroutine 的運行方式](https://medium.com/feis-studio/%E6%B7%BA%E8%AB%87-unity-coroutine-%E7%9A%84%E9%81%8B%E8%A1%8C%E6%96%B9%E5%BC%8F-c3d5b52e1a0d)
    2. 📄 [**Unity Coroutine 使用筆記**](https://dev.twsiyuan.com/2017/05/unity-coroutine.html)
    3. 📺 [**【阿空】Unity 協程Coroutine！？大解析！**](https://www.youtube.com/watch?v=z1myiS1z7Ek)
    4. 📺 [C# Coroutines in Unity! - Intermediate Scripting Tutorial](https://www.youtube.com/watch?v=5L9ksCs6MbE)  
        > 📕**延伸閱讀**  
        > 📄 [**在 Unity 該用 Coroutine 還是 Update() ?**](https://medium.com/feis-studio/%E5%9C%A8-unity-%E8%A9%B2%E7%94%A8-coroutine-%E9%82%84%E6%98%AF-update-654cce35737e)  
        > 📺 [**Unity3D - 2 Ways to Start & Stop Coroutines (the good & bad ways)**](https://www.youtube.com/watch?v=O_rya8qmQkw)  

    > **`你可能會覺得`**   
       - 😯**阿移動為什麼不用動畫呢? 不是比較快嗎?**    
        如果是`複雜性`高的動作就使用動畫，相對來的簡單可以用程式來達成    
        如果今天有上百個東西需要動畫，動畫就會讓效能會降低，更白話來講就是會掉楨  

  - **ScriptableObject (必知👍)**
    - **教學資源**  
    ScriptableObject的用途非常廣，網路非常多例子，也有些缺點  
    1. 📄 [**【Unity】ScriptableObject的介绍**](https://blog.csdn.net/candycat1992/article/details/52181814)
    2. 📄  [**Unity學習筆記#8 : Scriptable Object使用須知](https://kendevlog.wordpress.com/2017/11/10/unity%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%988-scriptable-object%E4%BD%BF%E7%94%A8%E9%A0%88%E7%9F%A5/)** 
    3. 📺 **[【阿空】Unity的可編程物件：ScriptableObject！](https://www.youtube.com/watch?v=0nW5PhQTWbQ)**  
    4. 📺  **[SCRIPTABLE OBJECTS in Unity](https://www.youtube.com/watch?v=aPXvoWVabPY)**  

- **ObjectPool (物件池) (需要複製多物件必知👍)**
    - **教學資源**
    1. 📄 [Introduction to Object Pooling](https://learn.unity.com/tutorial/introduction-to-object-pooling#)
    2. 📄 [**[Unity] 物件池的實現 – Practicing of Object Pool**](https://douduck08.wordpress.com/2017/08/01/practicing-of-object-pool/)
    3. 📺 [**OBJECT POOLING in Unity**](https://www.youtube.com/watch?v=tdSmKaJvCoA)
    4. 📺 [**Unity3D Object Pooling - How to use them & why you should**](https://www.youtube.com/watch?v=7UswSdevSpw)  
        > 📕**延伸閱讀**  
        > 📄 [Object Pooling in Unity](https://www.raywenderlich.com/847-object-pooling-in-unity)   
        > 📄 [Object pooling - 基本物件池與應用](https://harrison-dev.github.io/2018/08/17/Game%20Programming/Object%20pooling/)  

    > **`你可能會覺得`**    
    - 😯**使用生成(Instantiate)不好嗎 ?**  
    ⇒生成一個物件再摧毀，Destory 並不代表完全刪除，依然會占用記憶體  
    當你生成越多，效能會更卡頓 ⇒ 可以參考上方延伸閱讀的地方  

- **Lerp (線性插值)**
    - **教學資源**  
    1. 📄 **[線性插值，維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E7%BA%BF%E6%80%A7%E6%8F%92%E5%80%BC)**  
    2. 📄 [**Unity官方api Vector3.Lerp](https://docs.unity3d.com/ScriptReference/Vector3.Lerp.html)**   
    3. 📄 **[Unity腳本：使用Lerp 線性插值製作滑順效果](http://www.victsao.com/blog/97-unity/426-unity-script-lerp)**   
    4. 📺 [**Modulating values with Lerp - Unity Official Tutorials**](https://www.youtube.com/watch?v=cD-mXwSCvWc)  
    5. 📺 [**[Unity] The Essence of Lerp**](https://www.youtube.com/watch?v=WNoizdtEPA4)  
        > 📕**延伸閱讀**  
        > 📄 [**The right way to Lerp in Unity (with examples)**](https://gamedevbeginner.com/the-right-way-to-lerp-in-unity-with-examples/)  

### **問題大雜燴** ###
製作中我也磕磕撞撞的，遇到不少問題，分享一下    

#### **美術素材** ####
- **圖片規則 (For 美術)** 
  1. **命名好習慣**  
   讓開發者更好去搜尋需要的東西，不要 **`"圖層1"、"圖層2"`**  
    設計者快速方便，但對於輸出應用的人**簡直是悲劇**。(甚至是做動畫的)  
  2. **整合**  
   如果是要做動畫，會建議製成連續圖，丟到Unity 去切  
   如果是很多相同大小的物件或UI，也可以這麼做，減少GPU耗能的問題    
   給程式之前，要想好哪些要切，哪些不切。  
    >  **`跟買雞排一樣，先講`**   

- **保持乾淨**      
  1. **減少多餘空白**  
    刪除多餘的空白，減少體積。  
    開發時Unity也會算入渲染裡，甚至會遮蔽其他東西，如果有射線問題，可能會無法偵測到  
    > 參考  
    📕 [**Unity輸出後檔案過大的問題**](https://forum.gamer.com.tw/C.php?bsn=60602&snA=2268)   

  2. **建立管理的資料夾**  
   在程式製作時，常常會為了方便而塞入Assest最外層資料夾  
   別怕因為要一直好幾層而懶得建資料夾  
   合宜的管理，在找素材替換時就會很方便  

- **善用工具 (For 程式)**   
  - [**Psd Importer**](https://youtu.be/b2bIh8WPsi4)  
  最近整合到Unity插件中，可以直接使用PS檔案  偶爾需要微調圖檔可以快速使用，避免跳出視窗一張張抓到PS修改而浪費時間
> 📕**關於美術&程式的延伸閱讀**  
>  1.[Unity專案中UI同學需知的程式相關要點](https://www.itread01.com/content/1547481793.html)  
> 2.[[Unity] 停止摧毀你家美術的像素風素材 - 巴哈姆特](https://home.gamer.com.tw/creationDetail.php?sn=4469955)

#### **腳本執行序** ####  

- **編輯時沒有Bug，執行時一堆Null** 😵  
    ⇒ 腳本執行順序，導致某些腳本順序被排在後，結果沒有吃到值
    可以先了解 Unity 基本的執行順序 [**Order of execution for event functions**](https://docs.unity3d.com/Manual/ExecutionOrder.html)
    對於在寫判斷時也非常有幫助。
    > **延伸閱讀**  
    > 📕 [**Unity開發筆記：腳本的順序 (Execution Order)**](https://kendevlog.wordpress.com/2018/09/26/unity%E9%96%8B%E7%99%BC%E7%AD%86%E8%A8%98%EF%BC%9A%E8%85%B3%E6%9C%AC%E7%9A%84%E9%A0%86%E5%BA%8F-execution-order/)   

  - `解決方式`  
    **功能列 : `Edit`  > `Project Setting` >  `Script Execution Order`**  
    [![Quick Tip: Script Execution Order (Unity Tutorial)](https://res.cloudinary.com/marcomontalbano/image/upload/v1627186371/video_to_markdown/images/youtube--JyxqvaUeXeQ-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://www.youtube.com/watch?v=JyxqvaUeXeQ "Quick Tip: Script Execution Order (Unity Tutorial)")  

#### **程式耦合** ####
新手最常犯的錯，不外乎我也犯了😢。~~(展覽前我幾乎將所有腳本重寫過)~~  
`腳本之間依賴性過高`，出Bug簡直悲劇  
因此在下手打程式前你可以思考一下這個問題，`**不要踏上我的路了**`  

> **延伸閱讀**  
> 📕[Unity 解耦合設計 - 事件驅動架構](https://rstargames.com/2021/04/19/unity-%E8%A7%A3%E8%80%A6%E5%90%88%E8%A8%AD%E8%A8%88-%E4%BA%8B%E4%BB%B6%E9%A9%85%E5%8B%95%E6%9E%B6%E6%A7%8B/)

#### **輸出 & 編輯 差異** ####  

- 編輯執行OK，但執行正式應用程式時沒有跑出預期的效果
  - **關於Bug**
  > **延伸閱讀**   
  > 📕 [**Unity開發筆記：如何使用日誌"Logging"**](https://kendevlog.wordpress.com/2018/10/19/unity%E9%96%8B%E7%99%BC%E7%AD%86%E8%A8%98%EF%BC%9A%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E6%97%A5%E8%AA%8Clogging/)  
  
    輸出的時候，可能是`執行序`的問題導致物件是null值或是...  
    我也不知道的問題，但如果有Bug執行檔是不會出現...  

  - **我的解決方式**  
    
    我們需要透過log找出到問題點，把**Development Bulid**按下去
    ![](https://chi01pap001files.storage.live.com/y4mz9QW-N4NHpMk3cbWWor8rYraRJueHkzgvQcuUkdgkx8iCsvk4sLTOY7xVWa2wV1tg8QS6qcVa3g9yvM3ZFKmh_-0FJoHRT7fnnn5wNcekYF8VrFU3VCu6sfMUMk753P4qacEoupSeR0rPGjupEPnZzWWSosqIP2cukIA-3KJTqEP2AguAcWDhgmFvVMqh-FO?width=660&height=638&cropmode=none)
    ⇒接著在遊戲視窗內如果有bug就會出現在**左下角訊息視窗`Open Log file`下去，就會看到報告，接著就是跟在editor一樣了
    ![](https://chi01pap001files.storage.live.com/y4m9CANqW-2u-0M4-EPZJl5B1gBEZ0loUt27RU1fCzqw8QhyQAQGWQyaJNzPWFbpbjQCCBZsT1S07DyhKnx-8br6ZfJUKYZ4bUB509-BFQ7q7VQbqN12Xkh4EJTw-D7WlnHp9iwCKl8vPPvNvcnwmrV7sQgFl1MCSMio7fMsnA3uEbOMxy9gZ1Q3odwUXtDt9nb?width=256&height=202&cropmode=none)  
    **接著開始歡樂的修Bug~** 🤧  

- **Editor與輸出顯示差異**  
尤其是Canvas裡的UI，如果你是開發手機遊戲
你就得考慮不同比例下的UI顯示問題，所幸Unity官方有一個解方
[![Creating adaptive UI in Unity with Device Simulator! | Unite Now 2020](https://res.cloudinary.com/marcomontalbano/image/upload/v1627187330/video_to_markdown/images/youtube--PLQ4ywB13eg-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://www.youtube.com/watch?v=PLQ4ywB13eg "Creating adaptive UI in Unity with Device Simulator! | Unite Now 2020")

### **知識補充** ###

> **Design Patterns (設計模式)**  

可以探索一下，[設計模式](https://zh.wikipedia.org/wiki/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F_(%E8%AE%A1%E7%AE%97%E6%9C%BA)) 並非只有在開發遊戲，在軟體設計上是非常重要的概念
google上有非常多資源，有興趣的話可以多搜尋一下  
1. 📕[初探 23種 設計模式 - when I first time use design pattern](https://douduck08.wordpress.com/2016/08/10/when-i-first-time-use-design-pattern/)  
2. 📺[The 6 Design Patterns game devs need?](https://www.youtube.com/watch?v=hQE8lQk9ikE)  

## 結語 ##  
每當寫一篇分享，時間，咻! 一下子就過了😌  
本來的篇幅只有短短學習管道的部分  
但一寫起來回想起這一年好多事，就都寫上了🥴  
謝謝你閱讀完  
如果有幫助到你，那我會很開心的  
一年下來，我依舊覺得自己是菜雞  
越學越覺得自己不懂的太多  
雖然好幾次很想放棄  
但坎跨過之後，收穫都是自己的了🎉 

> 題外  

還記得我大二的時候，一位大四學長來分享VR的製作技術  
隨後我問起他怎麼學的，那麼厲害  
他淡淡地回答 : `**時間到你就會了**`  
~~大四的我，是悟出那句話了~~  
