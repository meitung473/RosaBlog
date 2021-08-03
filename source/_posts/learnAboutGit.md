---
title: 初探 Git
tags:
  - Git
  - 指令
categories:
  - 程式基礎
author: Rosa Hong
date: 2021-07-30 21:22:26
---

## 前言 ##
新增一個新檔案的時候  
你會好好命名放進資料夾理嗎?  
還是就`「未命名-1」`先放著在桌面呢?  
<!-- more -->  
檔案或資料夾囤積幾乎是習慣了  
久而久之硬碟容量還不夠用  
即使命名了，也可以透過內建搜尋找到檔案  
所以索性就不整理了  
想想這還真是個壞習慣  

我還在大學時，是設計與程式雙併行的情況下  
每個人的電腦都是從final~final-final...一直下去  
桌面或資料夾在期中、期末不用講就是...
> 塞爆它!  

![](https://i.imgur.com/T5ftLuH.gif)  

然後期末結束才再整理  
想起之前真是可怕  
光是程式專案，複製來複製去 
想呈現在網頁上  
又只會開 github 網頁版把東西先打包丟上去  
感覺非常沒效率   

回到程式，版本控制無所不在  
可以加強團隊合作的問題  
使開發效率更加快速   
這麼好用的東西，不學嗎？   

### 檔案囤積症 ###
來看看常發生的問題：   
- 不想每次都重新打包再上傳  
- 不想覆蓋掉舊版本，之後又瘋狂按ctrl Z
- 產生超多個版本檔案，導致很畫面雜亂    

4 年間，我曾經遇過好幾位同學跟我說  
「為什麼硬碟容量又爆了呢 ?」  

其實繪圖軟體的檔案容量也是不容小覷  
一堆 Final 丟桌面，也沒定時清理磁碟暫存  
休怪程式丟給你 :   
    「安安，這裡裝不下我了，跟你 saygoodbye 了」 
   
既然一直 copy paste ，都只是同個檔案上的小變更  
> 可不可以像多線存檔一樣  
> 在不同時刻存個檔呢?  

彼時我還不知道 git 怎麼用...

## 手動式的版本控制 ##  
發現問題之後，來看看之前是怎麼做的  
這樣才知道用 git 有什麼幫助   
- 個人  
  想要一個新變更又保留之前的舊檔案  
  會這麼操作：  
    1. 複製 `01.txt`
    2. 貼上 `01(copy).txt`，並更改名稱為 `02.txt`
    3. 以此類推  
   
   > 久而久之，檔案流水號編號下去  
- 團隊  
  透過一包一包的傳送檔案  
    1. A同事把所有檔案共同打包成壓縮檔  
    2. 上傳到共同空間  
    3. B 同事下載下來，覆蓋或者手動替換變更的地方  
    4. 以此類推

不管哪種，我們可以看到做法步驟變得蠻多的   
尤其是團隊的處理，非常不俐落     

## 為什麼要用到 Git ? ##  
從個人專案來觀察  
或許使用手動更改版本號好像還好~~(?)~~  
常常也會忘記哪個才是真正要的    
![](https://pbs.twimg.com/media/DOLGOOoUMAA8RRj.jpg)  

但如果是團隊合作呢？
檔案在本地，但在遠端要同步時  
- 誰才是正本呢？  
- 誰修改了檔案？  
- 修改前修改後長怎樣？  
- 臨時想修改，可不可以不要動到原本的檔案？  

Git 就是幫我們解決這些問題  
當然很多都是用在程式上  
多屬文字上的變更  
不過 PS、AI 等等設計軟體最近也有支援  
感覺快到 **`凡是皆可Git`** 的境界了  

## 認識Git ##  
Git 是一個版本控制的軟體  
在 git 中，被儲存的是檔案的 **`狀態`**  
不是被建立新的地方或真的複製一個檔案來存放 
網路上我看了看有不同的說法  
個人覺得 **`狀態`** 我比較理解 XD  
偷懶拿別人的圖 QQ   
![](https://zlargon.gitbooks.io/git-tutorial/content/file/status/git_file_status.jpg)  
圖來自這個[網頁](https://zlargon.gitbooks.io/git-tutorial/content/file/status.html)  
  
簡單來說 : 
- 加入版本追蹤 前後 (untracked)  
  - `新檔案`產生會在這，沒有加入追蹤的。
  - 透過 `git add` 就會到 staged 
- 該版本修改 後  (staged)
  - 已經追蹤過的檔案，修改過後的會出現在這  
  - 這裡等著被推往下一個版本  
- 推往下一個版本   (commit) 
  - 已經是最新的版本狀態

透過 `git status` 查看，介面上 git 會告訴你是什麼樣的狀態  

這個是我理解，如有誤，煩請在留言區指教  

## git常用指令 ##  
一些常用指令，當然指令是要實際看狀況而用  
網路大神常在講 Git 
> 易學難精，有用到再去查就好  

把握基本的指令，在工作上應該綽綽有餘了  

| 指令 | 說明 | 
| --- | --- | 
| [init](#init) | 初始化。告訴這個專案加入git的版控功能 | 
| [status](#status) | 查看狀態。沒事有事可以點一下 |
| [add](#add) | 加入版本控制的行列。新檔案一定要打一下 |
| [commit](#commit) | 建立新的版本。 |
| [log](#log) | 查看歷史紀錄。 | 
| [checkout](#checkout) | 查看指定的檔案版本狀態，或是切到該分支 | 
| [branch](#branch) | 開一個新分支 | 
| merge | 把別的分支 **`合併進來`** 所在的分支  |   
 

## 名詞解釋 ##
會遇到git相關的單詞，這邊由 git 麻瓜(我)來稍稍解釋   
### .gitignore ###
  > a.k.a 不用理的邊緣人  

  可以新增一個`.gitignore`檔案  
  裡面可以放與專案相關性較低的資料。   
  - **`.gitignore`** 是一個文字檔
  - 輸入想被忽略的檔案名稱  

> 看看ignore實際運作 :  
  註 : `vi` 是進入 vim 編輯器  

  <figure class="video_container">
  <video controls="true" allowfullscreen="true" poster="">
    <source src="https://zxbleg.ch.files.1drv.com/y4pcK5d35Bg18fyUs7mGnIELhvWO2MmTFGJX65VNnd0KOUL7wEhZ7t5aLFIJgT4E55iGaKlTvc8APUqKmLuOg7XoR5y_clL2JBJ6jd26vz_9emSQSxlyvhT_m2jIyaxgSmXWY-7BGqQe-gG53lB4LIzylocCKxz57_JzO3-QCpka9qBoE5JZazennqxUpgqLZUimv-aa8LNfjumx25vxOW_H9wpLUGgU-pH9nTlfK_mQsg/ignore.webm?psid=1" type="video/webm">
  </video>
</figure>  

  > 我在做什麼 :   
  >1. 新增一個檔案 `456.txt` 
    >> 這個檔案即將要拿來被忽略  
  >2. `status` 一下，被 git 列入 `Untracked` 行列   
  >3. 新增一個 `.gitignore` 檔
  >4. 打開 ignore 文字檔案中，加入想無視的 `456` 
    >> 跟 git 說 : 「不要理 456 啦」。
  >5. 又 `status` 一下，發現 `456` 不見了  

這就是被忽略的過程(泣)  
想要通通忽略某種檔案  
可以加入 `*.檔名` ，一次就通通忽略掉了。  

### branch (分支) ###
  > a.k.a 平行宇宙  

  一般在新增版本號通常是`單支線`  
  透過 branch 可以在不影響原本版本的狀況  
  多支線去開發其他功能  
  最後在 merge 在一起成最後的公布版本 
  - 例子 :   
    假如 清單 APP 已經有    
      - 新增任務
      - 刪除任務 等等功能
    
  但是我想加入 `日期` 與 `提醒` 功能   
  那就會新開一個 branch 開發這些新功能  
  在完成時，和原本穩定的清單 APP merge 起來 

- 圖解 : 
  ![](https://chi01pap001files.storage.live.com/y4m0UdMQjFtoRYCvGBx9YvCgFCGujZ60DBR_LBjubAY_iNDvK5f-9pkgSCgzO9I8lTb8183venzbc5LGjSEJwaU5JbNvauYgIn5BGmXPRsME6dkAZxZXnA0quPROTtshUPLXX0qk2bkT39Cr46wMLxL8Xkhz0-xcYH_Q1_7PMcYGGa0m7mRS9YIp0AgNOwRmi37?width=660&height=372&cropmode=none)  

要注意的一點是，**`New branch`** 並不是完全空的    
像是 `複製` > `貼上資料夾繼續動作`    
New branch 出去的，是上一個版本的狀態延續
 
> 練習操作 : 

  <figure class="video_container">
  <video controls="true" allowfullscreen="true" poster="">
    <source src="https://licczq.ch.files.1drv.com/y4pdYb64sLm5R__suIWW6WYGTVIYRP17RAxfr8CHfDVoICyNokREw2wJkRH8knYqyfO2zZ07FcSAzFONymigmmdoWRaXEGy-84aOFOLJeUxg7pTi7xRJbL2gG_XfRBzkCY-VbUnkXmA-9ylARw0fsbfK30A_FiJaNqAVIbLJ7c8mYnvC_IBy2ZbfTVLlWer-FHbPYqS-zyaonuxdtUezjeebnU-BQ-biKOn-fxtIFf36AY/Screen%20Recording%20-%20Made%20with%20RecordCast.webm?psid=1" type="video/webm">
  </video>
</figure>  
  
  旁邊是小抄 XD，我怕思考拖長影片了  
  預先想好指令運作
  > 我在做什麼 :   
  >1. 用 `git branch -v` 來查看現在有多少分支
    >> 一開始只有master 
  >2. 用 `git log` 來知道 master 的版本狀態
    >> 先前 commit 了一次，有一個紀錄   
  >3. 接著我新增了一個檔案 `456.txt`  
  >4. 新增了一個 branch 叫 `Newfeature`  
  >5. `git checkout Newfeature` 切換到這個分支底下操作
  >6. 查看 Newfeature 的 `log`  
    >> 這邊可以知道是把 master 的版本套過來  
    commit 記錄依然保留  
  >7. `git add 456.txt` 加入控制行列 
  >8. `git commit -m "456"` 紀錄訊息456這個更新  
  >9. 接下來是看 branch 之間的差異  

  * 注意 : 新檔案要`add`哦，不然不能 commit  
  到這邊還沒 marge 哦哦!   

### conflict (衝突) ###
  > a.k.a 來決定最後存活者    

- 為何有衝突？
  > 合作時，如果 A、B 改了同一份文件  
    涵蓋的範圍又一樣的時候  
    回傳時，電腦要判定誰是正確的？

    這時候我們必須 **`手動`** 去解決衝突  
    Git 會告訴你 : 「哦!這裡有一個衝突!」  
    這時候把檔案打開解決就行了  

- 圖解
![](https://chi01pap001files.storage.live.com/y4m9Da_EJ6sKwLc097hF5pHF5m7tZkXD55mMJ4G7lFeQg4tRCXamb4Q8oO25f2KLV1zCCIejRWwdABSJNZhNA2N5KZBpIPUaZfzDv-ICw7xuAZr6SnfBGE2sG0nLcpbp0SPR7YSXH3G8r5w-Ob3ZBoVGrz8Lzi-3KpTAt6y-cdHTGHL0cn9R1laBXLTOqM8GXkm?width=660&height=372&cropmode=none)

> 練習操作 : 
  
  老實說我也沒遇過衝突，這是小小的範例而已  
  
  <figure class="video_container">
  <video controls="true" allowfullscreen="true" poster="">
    <source src="https://zxbleg.ch.files.1drv.com/y4pLco_Ji8QyZ8Y0L_CI1_LEj6VX4T0lgGx8WZPxX5ThUSkcuCrOKYsboPTQkDfDPv7DVmpR8OnY_wAgPD72Obmk-KdlqOl3tF6KxnSiROxKlEfl4PFwNbI1tOFlqDS1IoNOBKmRoU6cLdrOkE7fojQB7F23MRxJ6hMVuf50IbHM3SkAxWNaoiMWqlq423_3V3Tm0TWRUjWxUl2ySXqG2dQBkl3wOe_aqgMOaHjy9eWuBg/conflict.webm?psid=1" type="video/webm">
  </video>
</figure> 
    
可以發現我在兩個 branch 同時都改動了 第二行  
在 merge 時，git 顯示這邊有 `conflict`  
把衝突的檔案打開來修正就OK囉!  
另外我們可以發現其實 commit 出去的都還在  
還多一個 merge 處理 conflict 的 commit 。  

## Git 指令應用 ##

### init ###
- 你要使用 git 的功能，對著要版本控制的資料夾  
  - `git init`  
  
目錄下會新增一個叫 `.git` 的資料夾  
代表你要開始版本控制囉！  
.git 裡有很多設定，這邊就先不談了 

### status ###
- 當你想知道檔案的狀態，就可以輸入一下  
  -  `git status`  

git 會告訴你需不需要 add ，哪些 modify 了。  

### add ###
1. 加入檔案至 **`tracked`** 狀態
     - `git add [檔案名稱]` 
2. 加入所有檔案(好用)  
     - `git add .` 
 
- [X] 記住，加入版本控制，新檔案必須先 `add` 再 `commit`

### commit ###  
1. 新增檔案版本，把檔案推到 **`Staged`** 狀態
     - `git commit -m "訊息"`  
      `-m` 是 message ，後面接你想打的紀錄訊息  
2. 一次新增(好用)
     - `git commit -am "訊息"`  
        `a` 是 ALL 的意思  
3. 改變 commit 出去的訊息  
    - `git commit --amend`  
    通常改最後 commit 的那個 
4. 後悔 commit 想刪掉或更改  
    有三個方法，但各自的代表不同意思
    - `git reset Head^ --[不同模式] ` 
      > HEAD 指向現在所在的版本  
      > ^ 是指上一個；上上個是 `~` 波浪號   
  - mixed  
      預設模式。刪掉上一個 commit 與 add   
      **`但保留修改的內容`**。    
      - 退回 `add` 與 `commit`的狀態  
        版本的內容一樣是新版的
  - soft   
      回到 commit 前，但版本的內容一樣是新版的  
      - 退回已經 `add` 但`尚未 commit `的狀態  
        這邊會看到檔案標示 `modified` 
  - hard  
      版本跟上一版一樣，新版的修改就沒有保留了。  
      - 退回 commit、add 與 modified 的狀態  
        完全回到上一個版本 

有點霧沙沙 XD  
可以參考 [這篇文章](https://ithelp.ithome.com.tw/articles/10187303)  

### log ###  
- 你到底 commit 了什麼，來看一下詳細的歷史紀錄  
  - `git log`  
  - 想要離開 log ，就輸入 `q` 代表 quit。  
- 顯示更精簡的內容  
    - `git log --oneline`  

這就是歷史紀錄   
![](https://chi01pap001files.storage.live.com/y4mxhyPRSBSJ0DtpgC6pOq09kdav9fsPm3WfcjzKSj8geWtNRX-gR6Br7WliZ1aWMeFI7I2qp2BV0FreSN1AARa8gJgMMLRtowBzA14TESysuilfRhqIzI-f68bbLWGnmS1HOt4F8x4ECIlVSA6MjxnG-POOI3CiB_KewZC0OaZGHIDySbUc8VZymK5uE108gux?width=660&height=456&cropmode=none)  

> 解析 :   
1. commit 後面有一串自動產生的亂碼  
  代表版本號，每一個版本都有獨特對應的字串  
  這樣也不會出現重疊的情形  
  想查詢該版本的內容，可以複製字串 `checkout` 一下  
2. `Author` 可以看見是誰建立了這個版本  
3. `Date` 建立的時間 
4. `(HEAD -> master)` 指目前所在分支、目前的版本   
 
### checkout ###  
1. 查看某個版本內容
   - `git checkout [版本號]`
    
  - 看看版本運作  
  <figure class="video_container">
    <video controls="true" allowfullscreen="true" poster="">
    <source src="https://zxbleg.ch.files.1drv.com/y4pkzvhn1h7ZuS5j0vNxDkzGaM-oHG7DxjPInp-KNn7m89w_1hrhVr57OMoHxNDfn-nPvk8Q4rpT8cWgQlN6bkPFMXGXmEnZCFvOotKL9zNhSSlmtbEH-qgfxuZL00dDOgpeKf6E1FEX5Y2qidEcQJrfOjf405CSAc10XLgIM_wLICilUblq_IQsISmfUD-mr3wqd15AhTv2MiNaspONR3snvkGGJHdPC0mI5jWHaYclJE/checkoutOrder.webm?psid=1" type="video/mp4">
    </video>
  </figure> 
  
  
  是不是很奇異~  
  到這邊就可以知道 git 有多好用了:D

2. 切換到某某分支 
   - `git checkout [分支名]` 

checkout 的用途蠻廣的。     

### branch ###
1. 創建新分支
   - `git branch [新的分支名稱]`
2. 刪除分支
   - `git branch -d [分支名]` 
3. 改變分支名稱
   - `git branch -m [重新命名的分支名]`  
    **要先到那個分支哦!**  
4. 抓遠端的 branch   
比如遠端這邊有 branch 叫 `Newfeature`  
本地端沒有，透過 
   - `git checkout [你想要的branch]`  
   
就會自動有這個 branch 了。  

一般預設的會是 `master`  
其他 branch 是從主分支在延伸  
回到現在最新版本 checkout 回去就行了  

## Git 與 Github ##
Git 跟 Github 兩個並不相同    
前者是是版本控制的「軟體」  
後者是平台    
- [X] Github 一定要配 Git  
- [ ] Git 一定要配 Github   

大概是這樣的感覺  
平台提供 Resposity (儲存庫)  
透過 git push 來把資料同步上去  
當然也可以把最新檔案 pull 下來

大家常聽到 Github ，此外也有其他類似的平台  
像是 `Gitlab、Bitbucket`  
不管是哪個平台，在 Git 的操作是一樣的  
所以你學會了 Git ，遊走江湖至少不會重練啦      

## Github ##  
這邊解釋一些常見的東西，以及與 git 相關的指令  

### repository  ### 
又稱「`儲存庫`」，可以放檔案用  
也可以用 `靜態網站` 的方式顯示專案結果   
github 的 repository 有分 public 、 private  
- private 要錢，有的公司會購買來使用，畢竟專案不能亂公開  
- public 一般大家都在使用，大家都看的到專案內容    

### 如何開始? ###
新建完 repository，頁面下面會有告訴你怎麼連接  
通常我用第二個，將原有的檔案上傳上來  
![](https://chi01pap001files.storage.live.com/y4mKwQ_9Ir3-1Nas5uX9KqnYrlk8lp1g-Ms1T8f3_LHOrScO4NvLTpVAeY-n9gDVxTqvYzASVonAt0K1rIPsdCIcyk0ADYJGhdJYsLEnxfLsetdFgVh_uReUK_pVVWg4KcYQplpvjuF2LvUKszBI3O1roTxFD2ambTOKJ4IK15vU1_OFY9WSPI6OzE2ilfcoVJp?width=660&height=378&cropmode=none)  

在 GitBash 直接複製上去那幾行就行了~

### clone ###
- 目前本地沒有檔案，想下載遠端的資料   
  在 github ，按下這個綠綠的 
  ![](https://chi01pap001files.storage.live.com/y4mg80z42pM_kRWFRbweTgcM1_Ymn1ZniDkb1V2m4lfkWBiprmR8zJU9PiQ1vvpSP8M5zqdmF4hWylJHhiAFtPiDCKF42BEbUWYlVvqbH2oFPaqjSGFAM1kdVkPkOa2G1WJd2yss4jTfxliwxG1IkPjktJLLzM-dGSCFj4sHbHM2AOan59kGo3CEXo-HnEZ73xb?width=256&height=38&cropmode=none)   
  會有不同的方式，通常有 `https` 跟 `ssh`  
  看自己想用哪個。       
  -  `git clone [github給的路徑]`  
  
  在目錄底下就會看見檔案了  
  
### push ###
- 把 **`本地`** 的資料同步到 repository 裡  
  - `git push origin [分支名]`   
  
  \* `origin` 通常在 clone 時會自動幫你建立。  
  指向的地方就是 `伺服器` 那端。  

稍微查了一下，原來這個原樣貌長這樣  
`git push origin [本地分支名]:[在那端新建立的分支名]`  
翻譯機 :  
上傳 branch 至伺服器 (origin) 後建立新的 branch 儲存。  
我這個麻瓜非常需要翻譯機 QQ。


### pull ###  
- 已經有遠端的資料，但本地不是最新的  
  所以把遠端的 `repository` 同步到自己的資料
  - `git pull origin [遠端的分支]`  

### fork ### 
把 `A repository` 複製到 `B repository`  
可以 fork 別人的專案，再來修改  
也可以 pull resquest 去詢問原專案作者是否要 merge       
![](https://chi01pap001files.storage.live.com/y4m06-A5i7dDD3CNkWRriRtSmcLbOKtnGgip0Po34L7zWkdMs51ciCFISJglLCfB4I8m_XwtsvkoHDPKWeA3KlkQBSjGh84iLD8Ks6HNuxOVIBm7uta4SW_3x3J16PjyiiLFlPYX4U_qvab0ODWu2WjwesV8xfTPY7u8fDoia6hNuSa8uxObNLJbo4accwWgRS6?width=660&height=364&cropmode=none)  

### **pull resquest** ###  
umm... 因為我也還沒用到，也有點模糊    

意思是請求合併，在開源的專案會互相貢獻很常見    
github 上可以看見很多專案有不少的 resquest   
如果我們想要貢獻，可以發 `pull resquest`   
專案的擁有者會收到請求，作者可以決定要不要 merge

如果是所屬的同一個團隊，發出 resquest  
可以讓團隊裡的其他人一起討論  
確定後再 `merge`  

常常看到 `PR` 這個字，現在稍微理解一點了 XD  
可以閱讀 [這篇文章](https://github.com/twtrubiks/Git-Tutorials/tree/master/pr-tutorial#github-pr-pull-request-%E6%95%99%E5%AD%B8) 詳細了解   


## 結語 ##  
經過學習後再到 [這個網站](https://learngitbranching.js.org/?locale=zh_TW) 使用模擬  
就清楚多了  
git 雖然知道怎麼用  
實戰上還是有使用到才比較了解    
不過個人專案懂指令後也是超方便的 XD 

這次資訊算蠻多的  
不過現在學到的都只是冰山一角  
路還長(ㄔㄤˊ)著咧 QQ  
為自己加油 !


> **補充資料** :   
> 1. [很棒的簡報](https://www.slideshare.net/pokaichang72/git-42427674)    
> 2. [很酷的圖解 git](https://dev.to/lydiahallie/cs-visualized-useful-git-commands-37p1?fbclid=IwAR2qlaZYCG1mXsdy2aoUYvtHJN8UtG7VCFI-LZ7P81Z1eQghflKVpoXJI6I)  
> 3.  [git 常見問題](https://gitbook.tw/interview)


