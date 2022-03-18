---
title: ⟬ 紀錄 ⟭ DIY 架站 - 安裝 LAMP Server + phpMyAdmin  並且部屬在 AWS EC2 主機
tags:
  - Backend
  - MySQL
  - phpMyadmin
  - LAMP
categories:
  - bookreport
description: 紀錄 DIY 架站的歷程
author: Rosa Hong
date: 2022-02-06 12:38:32
---

## 前言
前端跟後端學點皮毛，想要自己架站看看，雖然有免費的 github pages 可以放靜態網站，但遇到資料庫就不支援了，php 檔放到 github pages 只能當純文字而已，於是自己使用虛擬主機跟買網域來架 :D  

這次是要安裝 LAMP Server + phpMyAdmin 在 Linux 系統上架站，主機是使用虛擬主機 (AWS EC2)， AWS 提供免費一年就來試試看，網域的話從 [Gandi](https://www.gandi.net/zh-Hant) 購買一年份，我才知道域是有分級的，不同的網域價錢真的差很多...  

## 設置
主要都是參考這篇好文章 => [部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin)](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)
接下來 Let's GO !  

### 設定 AWS EC2
註冊完 AWS 帳號，登入用 `Root user`(管理員)，設定上才不會有太多限制。  

不過官方還是建議創建 `IAM user`，在往後日常操作比較適合，我想應該是怕去動到原始設定，或者建議組織架構將權限分散。  
![登入](https://dsm01pap006files.storage.live.com/y4mf8DngFOVKM87YZaaJg_A14Y8pog_C_Hbotg4kAt2JPM7Svs7ebIjUWjdA1uAWlTtVLNnorxd1-1cm8zFbfGI1f45TOng_tiu6bTMQse6HJwXLFozcCQpRIjMq6wan9QCZ88bzbG8I1JGi4Zut53DOE_c-4HBS2P7V3l5Llz_N1EbSj4OUM1Wt9jI2rG1ZKJ2?width=980&height=632&cropmode=none)

登入後會有不同服務方案，選 `EC2`  
![EC2](https://dsm01pap006files.storage.live.com/y4m3ZaSFwn_k99MGTLJskQ0mT7J-RKzcHbNQKpa1BlyqoCstPIcYaOkZNQQ29SJWz1tb0h8vltystPhHyUjiZ9ivknXvFjFjF-MdMbev5fq0MhXgiQ_ZPEhaCUKsPx0UvTCCLFcIqP6fQHwLbqdSBcARYFZKwEFGs37gfajwp35J3dA_ztKa-6dvo_t_u8IG6Js?width=2730&height=1545&cropmode=none)

#### Step 1 : 選虛擬主機
我選 `Ubuntu Server 18.04 LTS (HVM)`  
![Ubuntu Server](https://dsm01pap006files.storage.live.com/y4mcZYCAzid00O2SXv3_F77FWOcJja7Yrr-fJgevek5LPWFdqxVB1UrYiJDAHCTZwbdjixL24xVXT2wfS2rGiATqDK5dQXmF32Qa4XmpNbEvQHSVllNU-5S607UqWGp7p3GCiNAI4q-HzLi8HWXx45eM4zB2FEkMp8sR6K7WqO-500kCnd09bty9azCLfLEoFAN?width=2735&height=1565&cropmode=none)

中間有好幾部可以略過，也可以自行更改，沒什麼要動可以直接跳到第六步   

第二步是選擇伺服器的類型，免費預設類型就很夠用了。  
![選主機類型](https://dsm01pap006files.storage.live.com/y4mUj0tw8Hg-PkgDB91mcYYHevrZpgvbDAl0vJTVeaywND3vwSTuFq-it4bCHSciyhcRsrbYB6UDSovtMyNJ1G14cSpxQnndJI2Y6dCMRJcylEboTYH7X_3iFu6oLTRFnETRRzCh564HZh0DV4PAOprW5bB1YrsxLQOgMUYTWeoJ4-byY6PQCwwZowe6t4Vp5aI?width=2408&height=1376&cropmode=none)
第三步是伺服器設定的細節  
第四步是記憶體容量設定，預設是 8 GB  
第五步是跟容量有關係的設定 (看不太懂...)  

#### Step 2 : 第六步 Configure Security Group
設定網路通道跟安全，只要先新增 HTTP 跟 HTTPS ，才能使用網頁連線，再按 `Review and Lanch`，最後一步是全面步驟的總和而已  
![Configure Security Group](https://dsm01pap006files.storage.live.com/y4mq2kdMSDZmkJbh1bArHYZmR-YD8MfcpFkh-SI9D41krI7xiNPfeNEP0eZkpO6YwMIPgcLzm-BoaYfb-stJGi0Za-U54-_7GXYpvoixprGZ7kH1xzN3k6Fchw7xL5ZOrQpR6hZ3Xbc2JPdMc5BQnmRbup9I8tJd_2GaMizMnFA7aB33pQCh_a42lAzErvuKGhw?width=2735&height=1312&cropmode=none) 

#### Step 3 : 配對金鑰
因為要透過 SSH 連線，必須要有金鑰，`RSA` 是常見的非對稱加密法。  

下拉選單會有三個選項，第一次使用 `create`，下面是檔案名稱，會產生 `<filename>.pem` 的檔案，等等連線會用到
![下載金鑰](https://dsm01pap006files.storage.live.com/y4mfUwE7kl8QCWfs1FyTwVLWGf0surxUO4Gy2ypz51DkRyidK1x_ba_y3UZoGKMoJRA5Btj3GE9e7Og5n2FC9Ui-0D3lR3Bz3oSv_O9EtAt2Ukakfi8WZJ1cMfAGlmOa36vlrHWuggCkGA2YAKa3Qg5yUplIvGWI4VfPe0Ff2r4Punh0Qqsr_DquNx2RSexPMq0?width=2408&height=1376&cropmode=none)

#### Step 4 記下 IPv4
回到 EC2 儀錶板，會有主機的狀態訊息，選擇剛剛開起來正在執行的   
![EC2 儀錶板](https://dsm01pap006files.storage.live.com/y4m3ZJghMG-GmoRrtVNdLOp_xOr8AEQ35BhoCKrzSPbCyG7RYKKF_U6N-CrjkhcMNBvLk_3tzHP8-QaRveiWr-rxs7W6H1h4VD9tyRqN-k0NF_FIrkuOFNg9C4JSKwr9poJM29KLxXCqk2DjA-fctK0btph1HgC9UXcN3fpw63q_KtMvgWuHwqL5oL561k2sYx5?width=2408&height=1376&cropmode=none)

點一下正在執行的個體，下面會有概要，記下公有 `IPv4`  
![IPv4](https://dsm01pap006files.storage.live.com/y4mOjbTxzVsSeLt_jimxUFsqt6Q-P-TQ87TmsNKzunm3WEff2KXdhzavkrCFkBepOY33-vUTXsXT6S1nU9cQY2BJwpUxIy8l4FBJfEJM3n6fFOTD2lN5vAukmZJQ93i8bkte6EdZPGDCg3a0Y5oi3CDQNWAgA5VP12ckOVPuJF6vTmpuq1b8bYJHomOtS6Z191s?width=2408&height=1376&cropmode=none)

到這步就有一個只有作業系統的主機，接著再把環境給裝起來  

### 設定 LAMP 環境
- **L**inux : 作業系統  
- **A**pache : 網頁伺服器  
- **M**ariDB or **M**ySQL : 資料庫  
- **P**HP : 可以編寫動態網頁的程式碼  

#### Step 5 連上虛擬(遠端)主機  

剛剛下載的金鑰，跟記下的 IPv4 派上用場  
金鑰如果跟 cmd 目錄不同，記得加上相對路徑  

打開 cmd 輸入  
```bash
ssh -i <file.pem> ubuntu@<IPv4>
```
例 : `ssh -i ~/Desktop/key.pem ubuntu@123.11.22.3`   
問 :  `Are you sure you want to continue  connecting (yes/no)?`  
答 : `y`
![登入遠端主機](https://dsm01pap006files.storage.live.com/y4mn3vALzZNWp-Acn_mxNele8w-LVujJTvzr30apsQsRuUis-cs-UCn3AVE5gGcg3_GUIOmHRTHDufaHNwW93B5TWDwbpKGkM2fYkiDc4QFZL_NdhXERBpNXhnN758xE48g023o9Nvz_szUsqfsrVDL-7bKdd9AaSvYOwQy0DpWfPGNhMT2JUu3kLsqjhB3SRD4?width=1925&height=1142&cropmode=none)  

前面變成主機位置就是登進去了  

#### Step 6 : 系統更新  
裝伺服器之前系統更新一下  
```bash
sudo apt update && sudo apt upgrade && sudo apt dist-upgrade
```
問 : 是否繼續下載 ?  
答 : y  

- **apt** (Advanced Packaging Tool) : 套件管理器工具，可以做套件的查找、升級、安装、刪除，執行必須要有 `root` (超級管理員)的權限  

所以這邊都會用 `sudo`  

#### Step 7 : 好用的套件 tasksel  
```bash
 sudo apt install tasksel
```
tasksel 是已經幫你整理好成一組的工具，包含 LAMP 伺服器  
輸入 `sudo tasksel` 看到的安裝介面，可以一次選好幾個，打包成一組安裝   
![tasksel 安裝包](https://dsm01pap006files.storage.live.com/y4mnt-7tjSuj7EUF7qdsQXy43btYrwRq84uk4ZxfGJfFMHh5BpAArgfUZopHq6IngtePnB8s2RyVTG-49PJt1uiNbLdhDAud3GoVRmWhftui7LL3O4MqGb7cjizJEcS6M80Orrida7n0fFV0uVmjAFhPoeohQjw8ls3X_p6VY7iAO6VQvztquBnCuau_PVj2hoj?width=1905&height=1675&cropmode=none)

#### Step 7 : 安裝 LAMP server
也可以直接打入指令直接安裝，不用再到介面選擇  
```bash
sudo tasksel install lamp-server
```
會跳一下紫色視窗代表安裝，在網頁打上 IPv4 的網址，就會出現 apache 起始頁面代表成功  
![成功連上的畫面](https://dsm01pap006files.storage.live.com/y4mnfxBZr0dvNkHq_dKRmxzdzCheXNg77h9mjJd7jMRFfJPYslmw53w4REgiHf8lb3LXHLoY82NHDfCPj7Qp4CwWTzCPM2f8s0jWkVP1hDq8WrcpDke6BzM8eYGHNxXdc3RtHgtGJdBAUHBuT5y2Roulmu1yCL3BKI9n2D0xb-tQ5L-a5PH2v8rIkPPUTwb0hQ0?width=2679&height=1537&cropmode=none)

### 設定 phpmyadmin
phpmyadmin 是 mySQL 管理的介面軟體，不用下載軟體就可以在網頁連上資料庫。  

後續我也會使用 `MySQL Workbench 8.0 EC` 桌上軟體來管理資料庫。  

#### Step 8 : 安裝 phpmyadmin  
```bash
sudo apt install phpmyadmin
```
![連接 apache](https://dsm01pap006files.storage.live.com/y4mLZKbUP3LkaBCAIM6PKtuBVQ7_zF7hu4uNXPod28KcInO3uuPjaIovOMk4980mfsHPLu5oYyJ-HP2JViGignoFy0VZOYMOi96QX9EbPch5Tt2Sg3k60lGRvser2az_NGR7WLi8ECRPVoxXrcbcVvLDvYltfT8Ok0vMpEGvRG7JC-g1lw5J4qJBHItThHCP8mP?width=1892&height=1687&cropmode=none)
記得要按一下空白鍵，出現星號才是選定，讓 phpmyadmin 連接到 apache2，不然後面會無法連上，我第一次就沒有按到導致輸入網址是沒辦法連上的 (已解決  [[#解決問題 網址連不上]])  

問 : 是否設定 dbconfig-common   
答 : Y  

會建立一個新的 MySQL 使用者來操作運行 phpmyadmin 額外需要用到的資料表。預設使用者名稱為 `phpmyadmin`，接著要設定 phpmyadmin 這個 MySQL 使用者的密碼  

記得這裡是新的 user 設定 phpmyadmin 操作， root 還沒有  

#### Step 9 : 設定 phpmyadmin 登入  
預設 MySQL root 密碼是空的，但沒辦法使用密碼來登入(因為驗證方式是 `auto_socket`)。  
為了讓 phpmyadmin 可以用 root 帳號管理，就要先設定 MySQL 本身的 root 帳號，變成可以透過帳號密碼來登入  

透過 root 帳號進到 `mysql` 這個資料庫  
```bash
sudo mysql -u root mysql
```

進到 MySQL 的 shell，加入讓 root 啟用
`mysql_native_password` 插件，在來一定要刷新權限表
```SQL
UPDATE user SET plugin='mysql_native_password' WHERE User='root';

FLUSH PRIVILEGES;
```
記得尾巴一定要有分號，才是完整的斷句

再來離開 mysql  `exit`

#### Step 10 : 設定 MySQL 的 root 密碼
剛剛只是開啟功能，接下來要真的設定密碼，輸入  : 
```bash
sudo mysql_secure_installation
```
開啟 `VALIDATE PASSWORD` 插件，密碼驗證，幫忙檢查 root 的密碼安全性，會問是否啟用， 答 `y`

再來會問密碼複雜度
- 0 (Low) : 長度大於等於 8
- 1 (Medium) : 長度大於等於 8，包含大小寫和一個特殊字元
- 2 (Strong) : 長度大於等於 8，包含大小寫和一個特殊字元，包含字典檢查 (???)

直接選 2 就好，再來要輸入兩次密碼，後面會詢問幾項問題
- 確認密碼輸入無誤 : y
- 移除匿名使用者的資料 : y
- 可以禁止從遠端使用MySQL的root帳號來登入MySQL : y
- 移除測試用的資料庫 : y
- 重新載入權限表 : y

都給他 y 下去就是了。到最後就 ok 了，接著打開瀏覽器輸入 `<IPv4>/phpmyadmin` 看到登入頁面就可以使用了
![/phpmyadmin](https://dsm01pap006files.storage.live.com/y4muMsNIJeduUG0E5NPBPq4IJWIhaSOSpG3q51AO5s6Hvj1iiCPcr1XGPpAe_eQCIu6zWV1bt09EJamYRnLspgQFHFmEzHj6feXlmVnprFR6Tu5COkNSEOFy6op49B82xyGc5T1bUruuwckI2FCrz1RDzk-YV0GjH2XyoruE5i8G8D1PpKeDG2c2mPfdqN2Yg_O?width=2408&height=1376&cropmode=none)

##### 解決問題 : 網址連不上
直到再網址上打 `/phpmyadmin` 都連不上，重新安裝後 MySQL 顯示是 OK 的，`show databases` 也有看到 phpmyadmin 的 schema，但不知道為什麼都連不上 QQ

- 方法一 : 重新再設定
	一樣會跳回第一次選擇連接的伺服器口
	```bash
	sudo dpkg-reconfigure phpmyadmin
	```
	dpkg 也是處理安裝套件的一種管理指令，跟 apt 很像，但差別在 `dpkg` 安裝套件並不包含依賴關係。

- 方法二 : 手動把檔案連結起來
1. 先確定連結的檔案存不存在
	```bash
	file /etc/apache2/conf-enabled/phpmyadmin.conf
	```
	如果有會出現
	`/etc/apache2/conf-enabled/phpmyadmin.conf: symbolic link to ../conf-available/phpmyadmin.conf`
	沒有的話就會報錯
	
2. 手動連結
	```bash
	sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf
	sudo a2enconf phpmyadmin
	sudo systemctl reload apache2
	```
	- `ln` : 會把兩個檔案連結起來
	- 第二個是重新設定
	- 第三個是系統重載入 apache2


####  Step 11 : 把網頁放上來
網頁檔案要放在 `/var/www/html` 底下
先移到資料夾底下 `cd /var/www/html`，建立一個網頁 `vi index.html`，打個 html，到網址打上位址，出現內容代表 OK 了 :D

- 使用 `git clone`
	失敗的原因是權限，那對 `/var/www/html` 更改權限
	```bash
	sudo chown ubuntu /var/www/html
	```
	再使用一次 git clone 就沒問題了
	- `chown <>`

### 網域設置
我在 gandi 買了自己的網域，打開域名設定
![DNS 轉址設定](https://dsm01pap006files.storage.live.com/y4mWOHsaEFsldsxUXYVnt4AAC_qHEDpom6VjiExv8gUu3TPFBQ-01EnSY3ZcJhUqjCAa_seueuDv6babkELzu_W8W7RVjEXUsbD4SJYsZjBVo6rtRs0HY20FjqioD_7bIfOUCWOUKqKOYPEQNwUFs9Gu0hVSn2sVjQvgGjpJiQyUO2nVFstN-RbU4kjiv1Etqk9?width=2735&height=1573&cropmode=none)
更動這個 `A` 的值改成 `IPv4` 也就是虛擬主機的 IP，對應到 IPv4 的 32 位元位址

- `A` : 將DNS網域名稱對應到IPv4的32位元位址
- `CNAME` : 同一部主機設定許多別名

等大概一會兒，在打上自己買的網域，就會連到 IPv4 看到的畫面，後面可以在新增自己的子網域

### 補充 : 把資料庫連線到 MySQL Workbench
雖然有 phpmyadmin 了，之前我都是用 workbench 來管理，來換一下吧

這時候直接新增 connection 會被擋掉，根據這篇 [文章](https://lidemy5thwbc.coderbridge.io/2021/07/27/webserver-set/) 做設定 

1. 遠端主機的防火牆
	防火牆會擋住外來的連線，這時候要到 EC2 安全性設定打開 MySQL 通道
	![防火牆設定](https://dsm01pap006files.storage.live.com/y4mGvlCum2TSup9BLc0Pz6uHBCW5s3dikyxRLRjscvgkgJd4goDhU-i4tneFJ7WOQ_3EphoMuBLY79U6sSnDnv61KkKkCfFdZnUFlJvBfHs3CDKUqPhH-4gDxwOMYZWUMfBjl7WRJbz0w01xmxAhcZUDyF2jWVfvEU204PZ3Y7AdXX7-CEESrgbuS-uGDXMklW-?width=2408&height=1376&cropmode=none)
	按下編輯後會列出所有規則，在最下面新增一個 MySQL port 3306，然後儲存
	![設定 MySQL](https://dsm01pap006files.storage.live.com/y4mLdtiE_1fwss9MHgYjXweRxDnCZiVswDaexi_8Y91KM-JVydwdt29pszdUwoIbgSm_hXnlH1y8-3mL93q2fCRwfmnYWEda09G7MMUKYzVOKK8D1CD41GLZQoDBHWKzont0vtYdLrVLD1mf76XAM1O0dHp828CTocVbTAqt77iePJcSQ8tNt-ipL9krJd1jZem?width=2408&height=1032&cropmode=none)
2. MySQL 同意遠端連線
	預設是只能連線本機，但軟體是裝在我的電腦上，而不是遠端的主機，所以也要設定 MySQL 連線問題
	
	連線到遠端主機
	```bash
	ssh -i ~/key.pem ubuntu@<IPv4>
	```
	修改 MySQL 設定檔
	```bash
	sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
	```
	找到 `bind-address` ，原本會是 `127.0.0.1`，只允許本機，改成 `0.0.0.0` 或者註解掉這行也可以
	![允許外部連接](https://dsm01pap006files.storage.live.com/y4muXJECe6tXKTdZargY3Puf_nhNra6cV_3c2B1KtAZzI8kAT6K-rNjN-A9up6aO9JE6arHtYFMBLl3Ys_8DmsseSQWRSjSzUoInN4mIWtLWn7dGk0_SO9J4KmbpQ-Ut5b7BFEvH44hpOrQferqTqYyu5J9g0czooL1GkeGUrhHmSJrzUM-IomyQD9Dtp2aK3h7?width=1917&height=1670&cropmode=none)
	
	最後重新啟動 MySQL ，讓設定寫入
	```bash
	sudo service mysql restart
	```
3. phpmyadmin 解除個別使用者的遠端連線限制
	用 root 連線到 phpmyadmin，到 `使用者帳號`，點擊 `編輯權限`
	![編輯權限](https://dsm01pap006files.storage.live.com/y4mfv_hg8buRnf-GBShL_zMPOz0DkSf7kErvTLBwqJ5_-lsG_VlnYh3ceyIYSiEuvwQjWCFpNiLarRonbIDzCGwCXPtdCLkmTT6hKwELsqgu7wAW4t3TpZit1hBaq6DUQ0tsttUowm5xzCxvnUuTleRGFnesu3C0ebWpN28McgVHbBg_f8Bsyn2f0HY0fHkwzrg?width=2408&height=2021&cropmode=none)
	跳到 `登入資訊` ，把主機名稱改為任意主機。 
	![修改登入資訊](https://dsm01pap006files.storage.live.com/y4mI5KlKXpxlvV1Cbko1UPT4WnzBUPvzilV5zxmi31ymj4gDM46DuSzqY3z5y0vOxL5F2yYri2Jl3Dbk0HqgoC-axND4ESiX-jzwTScDfqztPKxI69EVbq1HoRdPzb3yJ-hxYTJpe_OZMBfjtTYTThdBc8xeqiHBjzkxEmwcvdtZVyAuN7D4zNwBIaVX4sbLJIh?width=2408&height=1976&cropmode=none)
	最後回到 mysql CLI 打更新權限
	```SQL
	FLUSH PRIVILEGES
	```
	大功告成 QQ，至此所有的封印都解除了，回到 MySQL Workbench 新增一筆新的連線
	搭拉 ! 成功
	![Workbench 測試連線](https://dsm01pap006files.storage.live.com/y4mTaT_SAlbQeh09auWSIkVUd77ntYREr4HeKgJlWNOrLFIlwNylxz4KD7Vm92HChqkxcI2VLAbv9nNAUIFbNuxbFU9XHsScWWtJ9XxhHbGobfaR9YTYo2IMpWCCj2AujdYS4oaE4mxmwxtX9yTVpDL7kdUVVmJ48ZSRywv8puKRL_po2kuBsXhPEGFDzu-6XIP?width=2735&height=1825&cropmode=none)

## 結語
歷經千辛萬苦終於架好了，沒有想到架站步驟是這麼的複雜，必須突破一層層關卡，像是雖然打開了虛擬主機外部連線問題，但 MySQL 也是要更改權限問題，不然也還是不成功的。

另外比較印象深刻的大概是買網域的部分，當時挑很久，在思考不同網域名的差別。我才知道網域是有分級的，`.shop` 這個字尤其價值不斐。不過轉念想想，好的網域名，在使用者輸入更好記，會記住這個網頁的用途，SEO 自然就會比較好。

再來就是虛擬主機的部分，裡面大多都是我看不懂的東西，大多都是偏向是硬體，因為我本身沒有接觸硬體，之後會想多了解一些...

---

參考 : 
 - [部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin)](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)
- [安裝 LAMP Server + phpMyAdmin 在 Linux 系統上輕鬆架設網站 | MagicLen](https://magiclen.org/lamp/)
- [網頁伺服器架站流程 (coderbridge.io)](https://lidemy5thwbc.coderbridge.io/2021/07/27/webserver-set/)
- [Install phpMyAdmin with Apache (LAMP) on Ubuntu.txt](https://drive.google.com/file/d/1ZymwmKb3MaX3F5YMQb77AC_wrUsX_ljS/view) : phpmyadmin 連接 apache 問題
- [DNS資源紀錄(Resource Record)介紹 (twnic.net.tw)](http://dns-learning.twnic.net.tw/bind/intro6.html)
