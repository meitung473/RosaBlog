---
title: 紀錄 | Frontend Mentor 挑戰題 - Time tracking dashboard
tags:
  - React
  - styled-components
categories:
    - Front-end
author: Rosa Hong
date: 2022-04-29 12:00:01
---


## 前言
這是在 [frontend mentor 的挑戰題](https://www.frontendmentor.io/solutions/responsive-reactjs-styledcomponent-BkFnvCvr9)  
使用 React + styled-components  
- [網頁](https://meitung473.github.io/time-tracking-dashboard-main/)  
- [github repo](https://github.com/meitung473/time-tracking-dashboard-main)

![完成圖](https://dsm01pap006files.storage.live.com/y4m9LQmpdiru45ZO2sTWfVBoSuRS1cfQoRCmHTFQxc-7aQWX0hkbq0r2q3tefJlGHA3SeXfA_G4CV5PHZIagjALPplvZ3s9MO6tpWyEEYyL2J7ep3EbhiNczfUybFUlxBTjvVQybnsXtFwrgoLmqEFJBftLbJvhzcipVkL-hdLjY23wEqHVpwrW0vNREUMTmt-y?width=1024&height=585&cropmode=none)
<!-- more -->

## 專案建置
1. **create-react-app** : 一鍵建立好環境
2. **eslint** : 加上 `Protype` 來檢查類型

## 我的流程
1. Design - 照著參考圖刻出 figma 版型及元件
2. JS - 完成 filter 的功能，拿出想要的資料
3. JS - 照 figma 切出 component 架構
4. CSS - mobile 刻板
5. CSS - RWD
6. 上傳至 frontend mentor + 撰寫 Readme 

## 額外練習 figma : 切版
一邊練習切版以及 figma 的使用    
本次學習 & 練習    
- 元件 `component` : 
- 變體 **variants** : 用程式概念想有點像 obj  `key-value` pair，可透過先建立好的類似類型，再替換選項。
	常用的例子 : 有無圖案，實心空心，方向。
	figma 是 `[property,value]` 來替換。  
	> obj 的 key 不能重複， **figma 的 property 也是不能重複**。  
	> 如果不在同一個 frame 裡的元件不能結為變體
- **auto layout** : 有點像 css 的 flex
- **asset** : 將重複的物件作做成元件，放到元件庫
- 巢狀結構 : 用 `/` 斜線來代表類似的元件群組

最後切出來的元件
![Asset](https://dsm01pap006files.storage.live.com/y4mZHL-B7h3iluUZzub-BxoLDbrZc2Wp43yRJd2NVsXDW2zIV5XhtSM4KNshxjCkPBfsHoSgqnK2Kdxg1pBBWw0T5RjD-TTXkiNZn69EENIX9dqbxu3K51pbNjKeNhyHJ1bpXSDwFX9c_cUoC8vv_UUaPUbmLmE9C2qcbYmNRl93CPWgVuKOBRb8U8crh2FSTTU?width=656&height=1024&cropmode=none)

菜鳥設計稿 🥴，照著圖片檔慢慢切出來
![設計稿](https://dsm01pap006files.storage.live.com/y4mwTdZBRAfGvMzTnynXGFrQ4yShvVgoGM-PJdXLOnF-3zi3OCyKeWiW1TYFmpurDs8l3lReNkOzMNTIDjoFCNdWNQbukzoR0iXkfmz9edOCJrqOrnH-aS2aT-17DZPd3W4cOL2lLovbNjta_rMsjlzeAgNDWQf458D4AxkOyiGYVlSHwfLTq1slPvuG8YDTHV4?width=1024&height=800&cropmode=none)
上半部都是變體的設定

### 變體設定
變體部分是透過 nested 的方式，從元件最小的部分到整塊卡片都是可以切換  
1. 卡片種類，我把每一種都先做樣板，可以直接替換卡片。  
	發現用處不大 XD，因為卡片都只有一張...，替換順序倒是蠻有幫助的。
2. 滑鼠移入 `:hover` active & inactive。  
	我直接做在 setting component 上
3. Profile 底下的時間節點切換，把 daily 、 weekly 等等的跟 setting 一樣分成 active 跟 inactive。
4. 電腦版型  & 手機版型 卡片，用處也不大。當時是想說如果多一種版型可以思考...
5. 背景的 icon 切換，這是在做個別卡片原件快速切換用的而已

在把上述的合併起來，在面板可以自由切換 😃
接下來就是進到寫程式的環節🥰  

## React 部分
練習題較少用到使用到 React Hooks   
大部分還是 CSS 居多   
只有使用 `useState`、`useMemo` 而已

### svg 當作 component 匯入
[官方](https://create-react-app.dev/docs/adding-images-fonts-and-files/) 要引入圖片有兩種方式  
1. 當作 component 匯入 (svg)
2. 直接匯入圖檔來源  

圖檔是 svg ，這邊我採用 component 的方式，主要是想改變 hover 時的填色  
```jsx
// 當作元件匯入
import {ReactComponent as Play} from './images/icon-play.svg';

function App(){
	return (
		<div>
			{/*作為元件使用*/}
			<Play/>		
		</div>
	)
}
```

關於第二點，使用 `src` 引入圖檔  
因為 deploy 之後 `index.html` 的路徑無法對上，有的人會建議把圖檔放在 `public` 上，在透過相對路徑引入。  
或者讓 webpack 幫我們透過 JavaScript module (file loader)來處理，不過要注意的是，路徑的起始點是 `./`，所以後續在 deploy 時要設定 `homepage` 來矯正路徑
```jsx
// 這邊是相對路徑字串
import play from './images/icon-play.svg'
function App(){
	return (
		<div>
			{/*作為路徑使用*/}
			<img src={play} alt="Play icon"/>
		</div>
	)
}
```

### 從外部匯入的 Element 轉成正確的 React component
這邊我需要找到對應的樣式跟 icon 圖，起初我是回傳 `[Icon[type], theme.primary[type]]`    
預想中是在 component 中要拿到 `<Play/>` 這樣的 svg as component  
轉出來的是 component `{Play}` 這樣可以，看起來好像一般的值，我想改成 tag 的形式，加上 `<>` 反而變成  `React Element` 。  
從[官方的 issues 這篇](https://github.com/facebook/react/issues/13445#issuecomment-414389398) 有提到，是因為 **格式錯誤**  
加上 tag 的方法實際上變成這樣 `<<Play/>/>`，可以用 function 先把元件輸出再使用。    

```javascript
// svg as component
export const Icon = {
    Exercise: <Exercise />,
    Play: <Play />,
		...
};
// 拿到該圖檔跟顏色
export function type2Style(type) {
    if (type.includes(" ")) {
        type = type.replace(" ", "");
    }
    // React Element -> Component，把 React Component 
    const BgIcon = () => Icon[type];
    return [BgIcon, theme.primary[type]];
}
```

### 資料轉化 
這部分是想要熟悉如何去使用 Object & Array 的 function  
把自己想要的資料召喚出來，目前已知的是按鈕切換取得資料，`useState` 在 set 的時候做 re-render 讓我們可以看到資料改變後畫面也改變。

- Click Event
```jsx
function App() {
		// 1. 觀察 timeframe 改變時設定的值
    const [timeframe, setTimeframe] = useState(() =>
        Type2Data(timetype.daily, data)
    );
    // 2. 點擊後改變 type
    const [type, setType] = useState(timetype.daily);
    // 3. 傳入 type 值
    const clickhandler = (type) => {
        setTimeframe(() => Type2Data(type, data));
        setType(() => type);
    };
    return (
        <ThemeProvider theme={theme}>
            <TimerLayout>
		            {/* 4. 把 handler 當作 props 傳給元件的 button */}
                <ProfileCard clickhandler={clickhandler} type={type} />
                {timeframe.map(({ last, title, prev, current }, i) => (
                    <TimeframeCard
                        key={i}
                        data={{ last, title, prev, current }}
                    />
                ))}
            </TimerLayout>
        </ThemeProvider>
    );
}
```
- 轉換資料的 function
```javascript
export function Type2Data(type, data) {
		// 初始值是陣列
    return data.reduce((p, n) => {
		    // 1. 把官方給的 data.json 解構
        const { title, timeframes } = n;
        // 2. 畫面上需要轉換 timeframe 的文字
        let type2text = "";
        switch (type) {
            case timetype.daily:
                type2text = "day";
                break;
            case timetype.weekly:
                type2text = "week";
                break;
            case timetype.monthly:
                type2text = "month";
                break;
            default:
                break;
        }
        // 3. 把符合的 timeframe 資料抓出來，後續要透過 map 把資料印出來
        p.push({
            last: type2text,
            title,
            prev: timeframes[type].previous,
            current: timeframes[type].current,
        });
        return p;
    }, []);
}
```
搭拉 ! 當我按下按鈕，state 改變進行 re-render 
![切換 timeframe](https://i.imgur.com/P9Aj0ae.gif)  

### useMemo : 把資料記起來
由於我的圖片以及顏色是透過計算而來，而不是寫死的， 每次 state 改變時也會 re-render ，導致每次都重新計算一次😓。  
但是 **樣式內容是不變** 的，所以用 `useMemo` 包起來，紀錄樣式資料  
```jsx
function TimeframeCard({ data }) {
    const { last, title, current, prev } = data;
    // 避免 re-render 又跑一次
    const [BgIcon, BgColor] = useMemo(() => type2Style(title), [title]);
    return (
        <TimeframeCardContainer bgcolor={BgColor} br={br}>
            <BgIcon />
            <FrameBody>
                <FrameHeader>
                    <FrameHeaderTitle>{title}</FrameHeaderTitle>
                    <Setting />
                </FrameHeader>
                <FrameContent>
                    <CurrentText>{current}hrs</CurrentText>
                    <PrevText>
                        Last {last} - {prev}hrs
                    </PrevText>
                </FrameContent>
            </FrameBody>
        </TimeframeCardContainer>
    );
}
```
後來寫文時，我覺得這邊寫的不是很好，既然是固定的，我為什麼要透過計算來取得樣式呢🥴  
回想當初在寫，多想到如果改成客製化卡片，樣式內容就會改變，以目前的練習題並沒有這個需求😅  
也許可以作為之後的 :Todo 

### Deploy : 部屬網站 
`package.json` 需要設定 homepage 將路徑重新設定，否則輸出的 build 裡面的 index.html 引入的東西會找不到。  
[Deployment 官方教學](https://create-react-app.dev/docs/deployment/#building-for-relative-paths)  

- package.json 
```javascript
{
  "name": "my-app",
  // 我發布在網頁上的路徑
+ "homepage": "https://meitung473.github.io/time-tracking-dashboard-main/",
}
```

## CSS部分
包含 styled-component 以及一些 CSS 遇到的問題  
### normalize.css 
我記得在 create-react-app 使用 normalize 在 `index.css` 加上 :  
```css
@import-normalize
```
結果 IDE 提示格式錯誤以外，感覺好像都沒作用  
![IDE 提示格式錯誤](https://dsm01pap006files.storage.live.com/y4muj1fnDJhMGuehE88QmzA1uezUw5o7ocb8_KQf52VuXLdBQFYupbRyS3943vlDwAYqGq1KtqHfS80RjlFnRRYsuOvLIUb1Nd-Rog1ThCib7FhPDbyqo_bYip_65arJPHfXKV5Q4g4iJGC1JO8kls0kAU8JQXlHFxFogThYvQFB2GRkhdoUH31i7XUKHkXADaH?width=1024&height=115&cropmode=none)
我是按照官方的 [教學](https://create-react-app.dev/docs/adding-css-reset/#browser-support)    
打開 devtool 反而是多了 `where:` 的樣式，所以並不是沒有  
![where:](https://dsm01pap006files.storage.live.com/y4mzXONRr23Eb4GiE7hLxjSlL9TuG5SxD6Xhhcl5xYKY__SAR-WM9kUhCeYYOZQpf1O6AFdFl27BwQM1_6LlbadtlQvNV1T-VtH7aIhhR0MP35pOqAxyfMIjPgTVbN0UhbGShKwyy-LxhksBAcP-GSYnocw-tj-k3YF6zbeelM3Tn2MOfTm-p5cIGAwkqtW9xUl?width=1024&height=147&cropmode=none)    

我查到 [這篇](https://stackoverflow.com/questions/56532121/normalize-css-does-not-fully-add-reset-to-react-app) 解釋為什麼 normalize.css 其實有不同份，如果在另外安裝 [normalize.css](https://github.com/necolas/normalize.css) ，引入為什麼作用是因為 **根本沒有指向到這版**。    

目前的 React 是使用 `@csstool/normalize` 而不是 `necolas/normalize` 版的  
關於這兩份的差別，[共同作者解釋](https://github.com/csstools/normalize.css/issues/3) 是移除一些固定格式的設定像是 (`body{margin:0}`) ，以及兼顧瀏覽器的兼容性問題。 🤔  

另外我也查了一下 [:where](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:where) 偽元素，為什麼 normalize 會使用這個。  
以往在寫 CSS 必須注意權重的問題，而 `:where` 的權重是 0 ，不管設定的 CSS 權重後來的值都可以覆蓋過去， 相較 `:is()` 來的更適合設定預設值。  
目前幾乎所有的瀏覽器都有支援，IE 因為今年六月要被淘汰了，就沒差了吧 🥴  

### styled-components @media query
在之前學習是寫成個別一行，再一個個 import 到需要改動的元件裡面做修改     
```javascript
export const breakpoint_md = "@media screen and (min-width: 768px)";
```

不過都 CSS-in-JS 了，不如把它變得更加程式化一點。  
我在寫 styled-component 時只把他想成 **會產出一大串的文字**，想要做到 sass 的 @mixin 功能，改成寫 function 回傳想要的字串。   
所以這次的目標是 : 
> object 透過 key 拿到 `@media` 的字串，例 breakpoint.md 對應 min-width : 768px

參考 : [How to use CSS Media Query Breakpoint in Styled-Components](https://dev.to/cagatayunal/how-to-use-css-media-query-breakpoint-in-styled-components-9of)

```javascript
// 先寫好對應的尺寸
export const sizes = {
    xxl: 1440,
    xl: 996,
    md: 768,
    sm: 576,
};
// @media 固定的格式，從手機往上寫 {size} 拿來做替換
const prefix = "@media screen and (min-width: {size}px)";
export const br = Object.keys(sizes).reduce((p, n) => {
		/* 轉換過後的 sizes : ['xxl','xl',...]
		我們只要
			{
				n1 : sizes[n1]
				n2 : sizes[n2]
				...
			}
		*/
		
		// 用取代的方式
    p[n] = prefix.replace("{size}", sizes[n]);
    return p;
}, {});
```
不想這麼麻煩也可以直接透過 template 帶值     
`@media screen and (min-width: ${sizes[n]}px)`  
在 styled-component 內我們就可以直接使用  
```jsx
import { br } from "../../Device";
const FrameBody = styled(InfoCard)`
		{/* 直接寫 */}
    ${br.md} {
        padding: 1em 1.2em;
        cursor: pointer;
        transition: filter 0.3s ease-out;
    }
`;
```
這樣做 RWD 就可以比較簡單了🥰  

## 結語
每次練習都會覺得自己又更進步一些  
重新思考自己的製作流程   
最後覺得 CSS 的部份有點雜，可以抽出相同的樣式再重構  
後續有時間再修改  

## 參考資料
1. [How to use CSS Media Query Breakpoint in Styled-Components](https://dev.to/cagatayunal/how-to-use-css-media-query-breakpoint-in-styled-components-9of)
2. [Airbnb JavaScript Style Guide](https://airbnb.io/javascript/react/#class-vs-reactcreateclass-vs-stateless)
3. [expected a string (for built-in components) or a class/function](https://github.com/facebook/react/issues/13445)
4. [Create React App](https://create-react-app.dev/)