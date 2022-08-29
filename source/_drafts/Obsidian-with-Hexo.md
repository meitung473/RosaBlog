---
title: 紀錄 | Hexo - 利用 Obsidian 打造舒適的寫文環境
tags:
categories:
author: Rosa Hong
description: Hexo + Obsidian 打造舒適寫文環境
date: 
---

# 前言
我使用 Obsidian 長達一年，它是一款很優秀的 markdown 筆記軟體，不僅美觀、客製化程度高，另外更讓我最想稱讚的是很多超棒的 Plugins。主要是我也會寫點 JS ，每當我有點懶人癌發作，都會自己手動寫程式碼，幫助自己快速的建構筆記。
<!-- more -->

# 擾人的寫作問題
一開始我都使用 vscode 作為 markdown 的寫作工具，但隨著筆記越寫越多，不變就隨之而來QQ。

1. 撰寫與預覽視窗不一致，導致我要邊開本地 server 邊撰寫文章😡
2. 總是要查看建立了什麼 tags 😵
3. 很常忘記空格導致排版錯誤，vscode 不會糾正也不會出現警告
4. 缺乏更自動化的流程，我有用 gulp 寫優化以及用一個指令做所有的事


# Obsidian
Obsidian 是用 elector

# MetaEdit + MetaMenu : 
- `MetaEdit` 使可以快速對連結型的文章修改 metadata
- `MetaMenu` 則可以幫助在填寫 metadata 用選單的方式添加

# templater : 用程式碼幫你造文章
Hexo 實際建立到發布很簡單，就是 
> 建立草稿 ⇒ 把文章挪到  `_posts` 資料夾，貼上更新時間 ⇒  `hexo g` 收集文章 



1. createDraft : 創建草稿
2. publish
3. backToDraft


# Obsidian Git  + husky : 輕鬆備份與發佈
這個有點偷吃步了，因為直接在 Obsidian 直接執行 node 程式碼其實會跑出錯誤的，但 husky 直接把這招略過了。

# Dataview : 管理所有文章

# 總結
