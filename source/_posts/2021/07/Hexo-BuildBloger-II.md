---
title: 紀錄 | HEXO 一起來做部落格(II)
tags:
  - Blog
categories:
  - Hexo
author: Rosa Hong
description: 一邊建置Blog，一邊紀錄。 ─ Day02
date: 2021-07-17 13:32:35
---


## 前言 ##

昨日已經將網站安裝起來了  
今天要基礎設定，以及發佈至github上  
使用很多人用的 NEXT 主題，NEXT 也有很多好用的插件  
像是留言區、人流計數、打賞之類的都有  
客製化自己的部落格更方便了  
讓我想起小時候玩無名小站的快樂...  

## 複習 ##

昨天最常使用的2個指令，今天再加一個  

```
hexo clean => 簡寫 hexo cl //清除建構檔  
hexo g  //重新建構  
hexo s  //發布伺服器(本端)  
```

有時候會有囤積的檔案，clean一下之後再重新建構
明天再來細補資料夾的結構與檔案設定的部份
來做一個統整復習

## 換上NEXT主題 ##  
  
> [官方指引](https://github.com/theme-next/hexo-theme-next)  

不過我一樣是看那位[巴哈L大大的文章](https://home.gamer.com.tw/artwork.php?sn=5138471)，真的幫助我很多☺️  
  

```
npm install hexo-theme-next  
```

直接在終端機輸入安裝指令  
之後在左側的資料夾找到  
![](https://chi01pap001files.storage.live.com/y4mZoV2zYTezJ7XnQzQftdPHv7G283xYtZn29Jm7MZ5BcCvcgEz5ET80-IILT_wrv5cE-TDME573cM8j3IQndYptgcFKJboIPsDViORzMo-554RRyfmKuwmWNFLSCifx1yqRbRS_1vGsOCjc52mDfyHSBXfKC2qOJOSP-_382CTz8EjWdyen19M2UAwGLqGcNis?width=290&height=602&cropmode=none)
`_config.yml`  ⇒ 網頁設定檔，設定一些插件開關阿，網頁名稱、網址等等的  
NEXT安裝完後會生出 `_config.next.yml` ⇒ 是 NEXT主題中的設定，這個先不設定了。  
首先要把網頁設定檔的一些東西設定好，善用 `ctrl + F` 直接尋找  

![](https://chi01pap001files.storage.live.com/y4mg5VYrXhn9SKuFB7O410M0VrdE80dSyg12iiXxEjvdvFV36VXtMsNIyS90lEwOEjoEwGU8AvLctdsyh42QKc7m_VT5DBKUkjUwZAVZzXPWkqjbUjvOIrtXtZmk8w-NQb--hMM-_jkdmrzXBFZ8f8xG2ofs35BdVqZQ36OjvduhjK3UXSuWqfopS2MDFKov9NB?width=660&height=418&cropmode=none)  

| 名稱  | 說明                                                             |
| ----- | ---------------------------------------------------------------- |
| url   | 網頁的網址。先去 github 建立好一個空的網頁，複製網址貼上         |
| root  | 網頁的根目錄，這邊寫專案名就好， /***/ 是相對路徑的寫法哦        |
| theme | 網站套用的主題。這邊安裝的是NEXT填寫上 next                      |
| deloy | 發布設定。這邊先填寫 `type: git` 。 repo 等等到github 上複製即可 |

![](https://chi01pap001files.storage.live.com/y4m31ODFxu3XGBixiLchDX0zi4lqY1toUWP2_3Bvbe2iqrsvUY5k035-7vUuTxYOsecl-msD3YU6BjrtEXYrR4vfzVsO0GR7w5HPZuS816bAUuUJ3b8LOyZro_eBsQX7EzvEvwyCle5dAdlWgxV2Ynrlk2WOPIyQan6qaNM5hF8XhMsowebpXBVIsiPg6QkwICt?width=256&height=68&cropmode=none)  

> 記得 冒號 : 後面要空一格(space)，設定值才算有哦  

裝完 Next 也改完設定了，再一次執行指令   

```
hexo cl
hexo g
hexo s
```


會在終端機上看到大大的NEXT  
開啟本機伺服器後，看到主頁面沒問題就OK囉
發現tags categroies 等等頁面都not found是正常的  
因為還沒新增頁面  

## 發布至github pages ##

關於上傳有兩個方式  
分別用 https 或 SSH 形式，兩者都可以  
都是git的上傳方式  
根據[**卡斯柏大大**](https://wcc723.github.io/git/2018/02/12/github-ssh-https/)寫的，github 官方推薦https方式但也有提供SSH  

> **https** ⇒ 是不用金鑰，上傳時第一次會要求登入  
**SSH** ⇒ 需要金鑰，不用再登入帳號認證  

懶人如我，當然選SSH XDD  
以下這邊會以 SSH 部署方式進行  
先安裝 hexo - git 的發布工具   
如果有慣用的可以到hexo Plugin 找一下  
```
npm install hexo-deployer-git --save
```


恩...   `- -save`  是什麼碗糕呢  
查了一下大概是 發佈&開發狀態的區別  
不過就先照官方的做吧! 之後在總結補上概念  
`deploy` 中文是部署，就是發布的意思啦!  
接著回到上面 `_config.yml` 檔進行設定  

![](https://chi01pap001files.storage.live.com/y4mAgiLoI6WV74o0adjBGFlRZU-8LOLmfwTqA6WE10zJOcOQWQcjFuUUTtl_jsAoAXrQUu08ZmDPU8g7l7hgaAT1DOVYYDjxiWeS2hftDZXLinaOqNrU4zsLPPdPZn3nBsD5Crg07WHCYbskme0mhi0CQD_sWE-ZjVSFhPULnsB8ZurJzRRoMCsXMHt_GFO52eL?width=256&height=68&cropmode=none)  

剛剛我們在 `deploy` 這邊寫打好type了  
為了接上自己的 github repository  
我們到要成為blog的專案底下找到 code 這個綠綠的，按一下  
裡面會有 https 跟 SSH 的git 上傳地址 ， 複製SSH 的那串到 repo 貼上  

![](https://chi01pap001files.storage.live.com/y4mtrlRgLYfAcRsAhseYDa7VThDuZI0wLDMnhFqvZ7xSbTkFjpstkcIn1SQWWs-ZgIQXy9_w2VNi0KMgNLoJdt9Uvcsq2JAyt-klGyB5qA_HHhyUCu1RJqsELKcVABJd1Rh-QcOSMEcfBXzOdw1pN1zkgWoeBD68rwLUwpTZoiXDjH5eFa_V-Rx4InL5hdAIyA2?width=660&height=487&cropmode=none)  

再來我們要透過 終端機用git連接上去囉!  
設定好登入口  

```
git config --global user.name "你的帳號名"  //像我的就是 meitung473  
git config --global user.email "你註冊的信箱(你的帳號)"
```

因為透過SSH的方式，需要金鑰，所以來建立一個新的金鑰  
```
ssh-keygen -t rsa -C "你註冊的信箱(你的帳號)"
```

...你說這又是啥碗糕，SSH 之前略懂略懂而已，所以我又查了一下  
`ssh-keygen` ⇒ 產生金鑰， 後面的 rsa 是加密金鑰的演算，至於這些不是我的拿手就不多說了  
好奇的話可以看 [MS 官方說明](https://docs.microsoft.com/zh-tw/azure/virtual-machines/linux/create-ssh-keys-detailed) ，像是 為什麼有 -t 與 -C 的用途是為何  

總之非對稱加密會有兩把鑰匙，一把公鑰一把私鑰  
接著把公鑰的部分提出來，塞給自己的github，上傳的時候透過  「鑰<->鑰」溝通(you know~)  

```
cat ~/.ssh/id_rsa.pub
``` 

`cat` ⇒ 是印出檔案內容指令，我們要提取剛剛產生的SSH 公鑰的部分  
`~./ssh/id....`這邊是公鑰的檔案路徑  
你會發現輸入指令後有一大串的東西出現  
開頭 `ssh-rsa AAAAB.... 你的電子信箱` 結尾，把它複製起來  
接著到 github > Setting，找到 `SSH keys and GPG keys` 的設定頁面，建立新的SSH key  
複製的文字貼到key上，title取自己方便的就好
<center> 

![step01](https://chi01pap001files.storage.live.com/y4mtrlRgLYfAcRsAhseYDa7VThDuZI0wLDMnhFqvZ7xSbTkFjpstkcIn1SQWWs-ZgIQXy9_w2VNi0KMgNLoJdt9Uvcsq2JAyt-klGyB5qA_HHhyUCu1RJqsELKcVABJd1Rh-QcOSMEcfBXzOdw1pN1zkgWoeBD68rwLUwpTZoiXDjH5eFa_V-Rx4InL5hdAIyA2?width=256&height=189&cropmode=none)

![step02](https://chi01pap001files.storage.live.com/y4m8_6cDZHW1v4JSUJsrUu1p9bMSzDmISLkPucVi6NDP88dCk5LwTSNVligcXEMl81_wAl0zvVnA_WXHJdKvEIccFUNyticly15iG3l2HSc4Wob7_MFbIQaPdxt1KrDyLUosjUouzN0940St1O3nLFi2qH_LUIFad_H5L0VmBpQQJZegkAIR9m0Z8NpnoCC4dbg?width=256&height=140&cropmode=none)  
</center>

恩?你說這樣就好了嗎，NONO雖然都打好了  
但我們還沒用「(公)鑰(私)鑰」連結    
接著輸入指令，連結到 github 做認證，當在終端機部署上去就會上傳到你的github了  


```
ssh -T git@github.com
``` 


出現 `Hi,你剛剛帳號名! …` 就代表成功囉!  
最後一步了!再次打上指令  

```
hexo g  
hexo d  //部署 deploy 的縮寫
```

燈愣!等一會兒就會發現發布的網頁出現新的主題哦!   
長得不太一樣是因為NEXT 有4種不同版型  

如果發現好像沒有動靜，檢查一下 `branch` 是不是設定正確哦    
![](https://chi01pap001files.storage.live.com/y4mUwaX8yxoT5torp_6oiPYLOI5bjcEE0IJ89NRpRpuhwB6uUaD7dWVgENZka-pJtH4jWV_QrTpJhDe5styDA24xN6fvf0_nWbzeWRzgFWsz9U--NP80ITmFjg4HyStxEjbMOPPco1sLRZPDNmy9Z4TLRgNYcRlBSgGYnzNgDACmLTzLz2Kq859eMQbkhbKT1mq?width=256&height=76&cropmode=none)
![](https://chi01pap001files.storage.live.com/y4mK9VlB_cWLjYZ-RMixf0tnkWDOEsySIboe-UtyXoGkSN38L2iUgW4cfm4ru33sO850_G6xbqnE1fQ1VmFeIuJWc4NZKcOWcI0x6NW6by4-rCVi8btKN5Hqt54R23dSlNk5hhOVUEIsc6nYJF2ihz-1AMnxct_WzyxqXEAopufB_acOFW8a5OIrzMyH9MmjSKO?width=256&height=120&cropmode=none)

## \[追加\]利用Hexo後臺來快速新增頁面或文章

今天查一查發現有後台可以安裝  
挖屋~~~~簡直是一大福音  
輸入指令安裝  

```powershell
npm install hexo-admin --save  
```

重新重構與開啟伺服器 `hexo g` ⇒ `hexo s`  
打開`localhost:4000` 後面輸入 admin 進入管理後台，就會看到這樣的頁面  

![](https://chi01pap001files.storage.live.com/y4m6t5lwQPLeYwvheAsHrOEHdnJDvfl0c0F_h5yuFzqA519FHGGLzP7wzctJ4tWl-gKQVjsmRL_fTPQZfF-lkmpGSk1ElGcFRl91NAVboiaUtF8aJ_5SBTB7FcXnFt0aLhgJsASoM9qihet4CBavi-X-4oSRL7ygPu1IBOAk1-G-b0e78pNOTA5C_avI3hXqGtM?width=660&height=406&cropmode=none)

哦耶，這邊就可以更整潔的去組織文章與頁面囉!  
也會同步更新到 VS 編輯器裡的檔案  
是不是很讚呢!  
明天慢慢把東西搬過去吧!  

## 結語 ##  

到部署步驟的總結，要會的指令大概四招吧  

```powershell
hexo cl     //建構檔案清理
hexo g      //檔案重構
hexo s      //本機在進行修改的時候開的伺服器，如果要發布就不用打了
hexo d      //發布到指定地方，要先建置好部署步驟哦
```  

安裝下來，發現自己要去學習的東西更多了  
- npm的基礎指令  
- git 指令   
- markdown 語法   

雖然還有很多想要的插件還沒安上...  
就一步步來吧:D... 

---

> 參考資料 :  
>1. [Hexo 簡易調教指南（一）：軟體安裝及網站建構 - lewopa47894的創作 - 巴哈姆特](https://home.gamer.com.tw/artwork.php?sn=5138471)  
>2. [[Github 中的 ssh、https 路徑有什麼差異？ - 如何設定 Github SSH 金鑰]](https://wcc723.github.io/git/2018/02/12/github-ssh-https/)  
>3. [[SSH 金鑰：免密碼登入遠端主機、傳遞檔案]](https://ithelp.ithome.com.tw/articles/10227181)  
>4. [\[教學\]我的第一篇 Hexo 文章：使用 hexo-admin 後台管理工具](https://ed521.github.io/2019/08/hexo-admin/)