---
title: CSSZeroToOneSeries | 03 | 人員介紹卡片
tags:
  - CSS
  - CSSZeroToOneSeries
categories:
  - '2022'
  - '03'
author: RosaHong
date: 2022-03-20 10:21:28
---


## 本篇成果
[Codepen](https://codepen.io/shan473/pen/qBVKqOO)
![人員介紹卡片](https://dsm01pap006files.storage.live.com/y4mHzg-JW7SyoAHGTdGlUdj_5ZnwCD4xI67k_hSfC3GQoVpUstnuk7UTBR7UmUJpb13ZdYrbWwiYAHfilOlHT7mMJQ7HXqcji-jzR8muC__o_Dw1iYTtrnTdQi6XfOoLIEtZsrFHqsrZq3aNmq8disMaXDMzI_RxGM47SUv3SgTztsiBsVOTkzmRI7CYrfu6ytD?width=1024&height=585&cropmode=none)
<!-- more -->
## 計算區塊尺寸  
現代在撰寫 CSS 之前，在 reset 你可能會看到     
```css
*,*::after,*::before{
  box-sizing: border-box;
}
``` 
總是會加上一個 `box-sizing : border-box`  
讓設計師終於不用再算那些奇奇怪怪的數字  
不過在沒有設定之前  
到底怎麼算出內容寬度呢 ?  

以本篇為例    
wrap 總寬度設為 1200px  
共有 3 個 item 一個平均設 400px  
加上 
- margin 上下左右各 15 px
- border 上下左右各 1 px

對吧 ! 那我 width 設 400px 準沒錯  
  
結果你打開 devtool 一看 !  
![368... 什麼鬼，那我還要設寬度嗎 ? ](https://dsm01pap006files.storage.live.com/y4mzmrNWlb-z4xM6ccNPP18s_3klzarPfgQB5BTOPYpOpmJtGrioRBX7Qd5y8xMG1gcZrjoPOwMaXE7NIZSLZAbxRM2xNfah6MTMEOkY6KCfGDaV2WyMtTDMEEv4wHNfgF-9BfapXpyLFlhiC_hzthM7G2lJCfrPn4uKKTrR5z4SriKohs1faMgQ_ukHRedGqO_?width=404&height=660&cropmode=none)
不過 devtool 也告訴你答案了  

如果設超過平均寬度那還好，因為設定了 `display : flex`    
瀏覽器會幫你自動平均壓一壓併在同一排  
但在 flex 出現之前呢 ? 
大家會用 float 來排版，結果最後一個 item 被擠到第二行   

實際上在算寬度時 box-model (盒模型) 有兩種方式  
預設是 content-box  
意思是你的實際內容 (width) 是還要扣掉  
- padding
- border 

但又因為 item 並排又有 margin 的存在  
也要一併算在內  
就能知道為什麼瀏覽器給我們的寬度是 368   
你應該設定的 width    

> width  = 400 - (15 * 2)`<margin 左右>` - (1 * 2)`<border 左右>`

如果今天設定 box-sizing : border-box ，width 就會是 370    
只要扣除 margin 就可以了   


## 製作三角形  
- 有 width 跟 height 的情況下    

```css
.box{
  width: 100px;
  height: 100px;
  border-style: solid;
  border-color: black;
  border-width: 50px;
}
```
![一般具有長寬的 border](https://dsm01pap006files.storage.live.com/y4myQ83gcWFgUdpgYx28trLrkeTeEbnNNerUjEyJiejmEwdCXaGVE8Hec0xCD1_fwAq92se5upOAAzgxpNwDcbKERH78dbQM3p_NVWKRDIgdiSWZ0XekHD6cKfkgm1MVp8SW3uYRu6qLPctjarWRedUKtrIWTB8OHBkk1uVrWJZDPEoFB4W_NUjxJw_kfrCWh11?width=497&height=484&cropmode=none)  

你可能會想我為什麼不寫 `border: 50px solid black`  
我是覺得這樣個別設定可以更方便    
當然也可以個別寫方位 `border-top` 等等的   

- width、height 都等於 0   
![只有 border](https://dsm01pap006files.storage.live.com/y4m433-jklFksPiycDy1fvGep6xnsZvv3ps2NNrt4dxZY2AhEySiD_gkuAowFAnbRYjg8UEfdfHvkqo4fe5dXdEx-NEmCFJ06RxrKSJKceEmgUQ1Zfdqxz0mVcswcOGDRFas_Bb-rinjNvhWlINqQ2-fTxO_Xbg8TJFQa8LNA72YsZ7rAbU7uz37y33GtCNM1S8?width=284&height=283&cropmode=none)  

會發現 border 的組成是來自四個等腰三角  
出現單個三角只要把其中三邊背景變成透明就可以了 

比如說我想要 **向上** 的三角  
所以只有底部的 border 保留  
`border-color : <上> <右> <下> <左>`  
```css
.box{
  width: 100px;
  height: 100px;
  border-style: solid;
  border-color: transparent transparent black transparent;
  border-width: 0 25px 50px 25px;
}
```
![向上等腰三角形](https://dsm01pap006files.storage.live.com/y4mhEdF0YF0fV9DU8nRo63Lueil9A23f78iKvteTNLhrdagTR-P-FEg9JABpPpBf-oJ7HyY8FkAjj2gXaVE1cbl1NiIl3a0-O45t1xzfzOfa-1dn-6WhlHowlP3L80zoOJlzQxpAitnDEtH13ICceEnB4r0sY9uOlPxP3RpjmGjUshc5BxzCwGrpYXQTJ-5FKdw?width=249&height=266&cropmode=none)  

雖然左右兩邊是透明的，但不代表他們毫無無關  
當我們去調整 width 的左右邊時  
發現三角傾斜度不一樣  
也可以說 **border 左右邊是來控制傾斜度**  

在本篇要做兩個到三角  
只要把上面的 border 設為透明就 OK 了    
左右邊則來控制斜度    

### 正三角形呢 ?  
對，我上面一直說等腰，那正三角形呢 ? 
我們可以確定的是左右兩邊的長度  
剩餘的就是底邊 (下) 長    

來簡單算數學  
假設正三角邊長是 1，那高是  
> 1^2 - (1/2)^2 開根號 = 根號 3 / 2 
> 根號 3 大概是 1.73... ，除以 2 大約等於 0.866..  

以上面的值來說左右如果設 50  
因為左右是 除以 2 的結果  
往回推，底長度 `50 * 2 * 0.866` 

這邊就可以使用 CSS3 的 `calc` 來計算  
我們只要控制 `--width` 達成想要的邊長就好  
```css
.box {
  --width: 100px;
  --tri : calc(var(--width) * 0.866);
  --side : calc(var(--width) / 2);
  position: absolute;
  display: inline;
  border-style: solid;
  border-width: 0 var(--side) var(--tri) var(--side);
  border-color: transparent transparent green transparent;
}
```

### 補充 : 三角形的陰影  
我們知道 width、height 做出的陰影就是同等的大小  
要做三角形的陰影不能用單一邊來想  

如果直接加上 box-shadow 只會有框邊有陰影  
![只有框邊，而不是三角直角陰影](https://dsm01pap006files.storage.live.com/y4mTG53FSgXjdPHvOF9D5Dqki3tUPtD_CNtxuMpoF968okr8GNjzzrQN3Tw9LSr-K-EBAoqpsb9RmjyJYoeWSlad8Ak2PQIYG9kAGd4DNeE1qcm7bTbkmqnFNQmz2lfF5LFkBWwVvc7LUOol8lEi8OI2SouBCtNdGKiKkCOD0hS0wjEfAnzpL7ws5jpFxN9-VFn?width=281&height=291&cropmode=none)
我們要的是 **直角** 那邊的陰影  
所以要有兩邊的 border 形成直角再加陰影   
```css
.tri{
  width:0;
  height:0;
  border: 50px solid black;
  border-color:  transparent transparent green green;
  transform-origin:0 0;
  transform:rotate(-45deg);
  box-shadow: -3px 3px 0px rgba(0,0,0,1);
}
```
![正確的三角陰影](https://dsm01pap006files.storage.live.com/y4mA2Jyaa1HqhHgBom2vW4U42LqOPi2CjxozjxzGJOYstpR76s_Cx5_QWCghJR8bAN3Ua6RYK3LK6lsHOGnMsv9JZ3iB_u8CW4RRpBXgO9hAj6S_ZStsvoVVms31KuLFAbBkI_8KIGN9IKeyeTKTm70222bEwW5LV0pbhJlidC1yHB78ona8fSGWn6lljvyM-ph?width=370&height=192&cropmode=none)

