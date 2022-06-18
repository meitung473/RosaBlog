---
title: 紀錄 | 製作個人網站
tags:
    - React
    - styled-components
    - framer-motion
    - EmailJS
categories:
    - Frontend
author: Rosa Hong
---
## 前言
既然都學會了前端技術，就來打造自己的個人網頁 :D  
自己的網頁當然自己造 !     
本次使用 React + styled-components 製作    
搭配 EmailJS 與 Framer motion 第三方套件  
Let's GO !    

- [我的個人網站](https://profile.rosa.tw)  
- [github repo]()
- [Figma 設計稿]()
<!-- more -->

## 專案建置
1. create-react-app : 快速建構 react
2. styled-component : CSS 樣式
3. EmailJS : 透過第三方服務從前端寄信給自己
4. Framer motion : 套用一些動態效果

## 我的流程
1. 規劃主要功能與版面
2. Figma 繪製版面 + 定義元件樣式 : [檔案連結]()
3. React + styled-components 
4. 加上滑順動畫
5. webpack 配置 : 使用 react-rewired 更改 resolve 簡短解析路徑

## 功能實作
主要目標 : 
1. 點擊導覽列項目到達該區塊
2. 導覽列項目能夠按照目前所在區塊改變對應項目顏色
3. About 區塊按下按鈕，跑出下拉式內容，而且摺疊 (手風琴)
4. Contact 區塊再送出信件之前，利用 Regex 正規表達式簡單驗證合法信箱。  

### 滑到目的地 : scrollIntoView
一般透過 `a` 可以利用 href "直接"跳到內部帶有相同 id 的 `#` 區塊    
沒錯就是 anchor (錨點)，但是這樣的方式並沒有滑順的動畫，要做到這樣的方式有很多種，這邊列出常見 3 種 :   

1. 在 CSS 加上 `scroll-behavior`，預設是 auto，改成 smooth 就可以 
2. 透過 JavaScript scrollIntoView 設定 `behavior : "smooth"` 就可以滑到指定位置，scrollTop 也是類似的概念  
3. `requestAnimationFrame`，呼叫每秒 60 楨更新畫面，讓卷軸轉動到指定位置。 (我還不是很熟...)  

試作範例 :  [三種不同的滑順錨點](https://codepen.io/shan473/pen/KKQVQWN?editors=0011)    

#### 1. CSS 作法
以 caniuse 的數據來看，現代瀏覽器幾乎都有支援  
只要一行就可以解決🥴 ，但是缺點是不能自己定義 transition 的效果。  
```css
body{
	scroll-behavior: smooth;
}
```

#### 2. JS scrollIntoView
scrollIntoView 是瀏覽器提供的 API，用法是 `element.scrollIntoView`，滾動父層的卷軸到 element 所在的頂端。  
可能之前都會使用 `window.scrollTo`，直接滾動視窗卷軸，但是差別在於，scrollTo 必須先找出目標元素在整個視窗的位置 (offsetTop)，scrollIntoView 只要找出哪個目標元素就好，會幫我們帶往目標所在處。  

- scrollIntoView
```javascript
// 1. 找到所有帶有錨點的 a
const links = document.querySelector('a[data-anchor]')
links.forEach((link)=>{
	link.addEventListener('click',(e)=>{
		// 避免預設跳轉
		e.preventDefault();
		let anchor = link.getAttribute('href');
		scrollToAchor(anchor)
	})
})
// 2. 處理滾輪
function scrollToachor(anchor){
	const section = document.querySelector(anchor);
	section.scrollIntoView({
		behavior : 'smooth'
	})
}
```

- scrollTo 的做法  
```javascript

function scrollToachor(anchor){
	// ... 把 scrollIntoView 的部分改成
	const container = section.parentNode
	// scrollTo 是從父層來看
	container.scrollTo({
			top: section.offsetTop,
			behavior: 'smooth'
	})
}
```

scrollIntoView 在跨瀏覽器的部分 optional 並不是普遍支援， 但 behavior 的設定在主流瀏覽器幾乎都有。    

參考 : [Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)  

#### 3. JS 動畫 requestAnimationFrame
比較少碰到的 API，大致從別人的範例來理解  
```javascript
function scrollToSmoothly(container,pos, time) {
  // 目前在父層容器離卷軸頂部的 y 多少(滾動多少了)
  let currentPos = container.scrollTop;
  // 觸發當下，存從 dom 生成後開始計時，一開始會是 null
  let start = null 
  // 從執行到結束的總計時間，像 transition 的秒數，.5 秒會到達目標
  if (time == null) time = 500;
  
    // 這裡每楨呼叫
    window.requestAnimationFrame(function step(currentTime) {
    // currentTime : 真正拿到 dom 生成後開始計時
    // 如果 start 沒有值，代表第一次觸發，以新計算為起點，若有，拿暫存值的點
    start = !start ? currentTime : start;
      
    // 從點擊存下的時間往後算到目前"經過多久"，會逐漸趨近於 time
    let progress = currentTime - start;
    
    // currenPos 是父層的 scrollTop ，pos 是想到達區域的 scrollTop
    // 如果目的地的位置已經滑過 (pos > currentPos)
    if (currentPos < pos) {    
      // (目標所在位置 - 目前卷軸所在位置 = 差距)*進度 / 所有時間 + 目前的位置
      container.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos);
    } else {
      
      // 如果超過目標
      // 目前 - (差距*進度)/時間
      container.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time);
    }
      
      
    // 直到呼叫次數沒了
    if (progress < time) {
      // 呼叫自己直到條件結束
      window.requestAnimationFrame(step);
    } else {
      // 最後固定位置在目標本身
      container.scrollTo(0, pos);
    }
  });
}
```
透過這個方法可以更客製化動畫，上面使用的方法都只能固定速率的滑動，requestAnimationFrame 可以在觸發動畫做一些事，




### 利用 useRef 抓取多個 DOM 元素
`useRef` 簡單來說就是一個空盒子(空物件)，可以在不 re-render 的情況下更新裡面的值。  
ref 就像參照某個地址的意思，我覺得[這篇](https://ithelp.ithome.com.tw/articles/10246939)給的解釋蠻不錯，就像屋子內裝潢會變，但地址還是同一個。普遍直接拿來操作 DOM 元素，或者儲存前一次 render 的 state 。  

本次的網頁需要監聽多個的 sections，來觀察是否進入某個 section 而來改變導覽列的項目顏色，所以必須創建多個 refs。  
通常建立一個 ref 來綁在某個 DOM 元素上，如果要使用到多個就必須在 **"盒子裡在放入更多盒子"** 。  

```jsx
function App(){
	//1. 讓 useRef 接收一組陣列，拿來放所有的 section tag
	const sections = useRef([])
	//2. 再裡面建立新的 ref，利用 createRef 來建立  
	 sections.current = Array.from({ length: 5 }).map(
        (_, i) => sections.current[i] || createRef()
   );
	 return(
				 // 這樣就可以抓到每一個 section 的 DOM 元素
        <Section ref={sections.current[0]}>
            {children}
        </Section>
        <Section ref={sections.current[1]}>
            {children}
        </Section>
        <Section ref={sections.current[2]}>
            {children}
        </Section>
	 )
}
```
 

![[網頁練習題/img/Pasted image 20220515142838.png]]

### 監聽目前頁面位置 : IntersectionObserver API 
主要是想實作 **scrollspy** 的功能，滑到該區塊改變導覽列的項目樣式，以往會透過一系列卷軸的值來監聽捲動事件，利用  offsetTop 還有元素所在的位置來計算。   

IntersectionObserver API 幫我們省下很多計算，只要觀測目標是不是有進入 viewport 再進行執行就好，最普遍使用的是 lazyload 的作法。   

由於狀態在不同的元件上，統一寫在 App.js 再傳給 navbar 目前所在 anchor 位置。  

IntersectionObserver 簡單來說只要設定好三個東西  
1. 觀測者 : 整個 window
2. 被觀測者 : 所有的 sections
3. 觀測條件 : 根據條件可以在進入 section 的範圍觸發事件  

因為不需要每次 render 都重新建立新的 Observer ，只需要在第一次畫面 **渲染結束後**，抓到要觀測的 DOM 元素，所以寫在 `useEffect` 裡，並且要在 unmout 時解除觀察，避免不必要的浪費。  

上面我們把拿到的 section 沿用在這邊，由於我的各區塊是獨立的 ref 必須透過 props 傳到主要的 React Component 才能使用。  
> 注意 : 把 ref 當作 props 傳遞，不能用 ref 作為 props 的名字，所以我這邊改成 refer，這

- App.js
```jsx
// 這是我先寫 Section 的名稱，避免打字的錯誤，使用物件的方式存取
import { SectionType } from "./layout/Section/SectionVariants";

function App(){
	const sections = useRef([])
	sections.current = Array.from({ length: 5 }).map(
      (_, i) => sections.current[i] || createRef()
  );
  // 1. 用 state 紀錄目前的 anchor 
   const [nowAnchor, setnowAnchor] = useState(null);
   
	// 2. useEffect 是等到 render 之後才做的事
	useEffect(()=>{
		// 5. 建立觀測的條件
		const options = {
				rootMargin: "0px",
				threshold: 0.5,
    };
		// 6. 觀測符合的條件時觸發事件，
		const handler = (entries, observer) => {
				entries.forEach((entry) => {
						// 沒有進入就忽略
						if (!entry.isIntersecting) return;
						// 5-1. 當 threshold 指定的範圍覆蓋率有達到，代表視為進入目標，把目前錨點設定為 section 的 id
						setnowAnchor(entry.target.id);
				});
		};
		
		// 3. 實例出 new IntersectionObserver，前者放 callback,後者放條件
		let observer = new IntersectionObserver(handler, options);

		// 4. 監聽所有的 section
		sections.current.forEach((section) => {
				observer.observe(section.current);
		}); 
		
		//6.將沒有觀察的目標解除
		return ()=>{
			observer.disconnect();
		}
	},[])
	return (
		<Navbar />
		// 7. 補上 refer
		<Hero id={SectionType.Hero} refer={sections.current[0]} />
		<Skills id={SectionType.Skills} refer={sections.current[1]} />
		<Collection
				id={SectionType.Collection}
				refer={sections.current[2]}
		/>
		<About id={SectionType.About} refer={sections.current[3]} />
		<Contact id={SectionType.Contact} refer={sections.current[4]} />
	
	)
}
```

搭拉 ! 可以看到很順利的跟著滾輪滑動時，樣式也跟著改變
![[網頁練習題/img/20220515_220638.gif]]  

再加上點擊導覽列到目的地的功能
- App.js
```jsx
function App(){
	const scroll2Section = (anchor) => {
		// ...

		// 1. trigger 是觸發的區塊，從 refs 中找到符合的 DOM element 
		const trigger = sections.current.find(
				(section) => section.current.id === anchor
		);
		// 2. 滑到目的地，用法 element.scrollIntoView
		trigger.current.scrollIntoView({
				behavior: "smooth",
		});
		// 3. 改變目前的 nowAnchor
		setnowAnchor(anchor)

	return (
			// 4. 把 method 當成 props 傳下去
			<Navbar scroll2Section={scroll2Section}/>
	
	)
}
```
基本上到這邊 scorll 有關的都處理完了 🥰  
但是變的不是很好讀，要把邏輯抽出去，未來再修改的時候就比較方便。  

#### 做成 Hooks : useScrollspy
把有關卷軸的獨立到 `useScrollspy.js`  

```javascript
import { useRef, useEffect, createRef, useState } from "react";

/**
 * 監聽到達 section
 * @returns  sections : 需要監聽的區域, nowAnchor : 現在錨點位置
 */
export function useScrollspy() {
    const sections = useRef([]);
    const [nowAnchor, setnowAnchor] = useState(null);
    sections.current = Array.from({ length: 5 }).map(
        (_, i) => sections.current[i] || createRef()
    );

    useEffect(() => {
        const options = {
            rootMargin: "0px",
            threshold: 0.5,
        };
        const handler = (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                setnowAnchor(entry.target.id);
            });
        };
        let observer = new IntersectionObserver(handler, options);
        sections.current.forEach((section) => {
            observer.observe(section.current);
        });
        return () => {
            observer.disconnect();
        };
    }, []);

    const scroll2Section =(anchor) => {
					const trigger = sections.current.find(
							(section) => section.current.id === anchor
					);
					trigger.current.scrollIntoView({
							behavior: "smooth",
					});
					setnowAnchor(anchor)
      }
    // 把需要用到的部分匯出來，用物件的方式可以避免陣列順序上的問題
    return { sections, nowAnchor, scroll2Section };
}
```

在 App.js 就可以使用 useScrollspy 處理有關視窗滾輪的邏輯    
```jsx
// 1. 引入 Custom Hooks
import { useScrollspy } from "./Hooks/useScrollspy";
function App() {
		// 2. 使用 Hooks
    const { sections, nowAnchor, scroll2Section } = useScrollspy();

    return (
        <>
					<Navbar scroll2Section={scroll2Section}/>
					<Hero id={SectionType.Hero} refer={sections.current[0]} />
					{//....}
       </>
    );
}
```

#### 問題 : 閃來閃去的 NavLink
後來發現當我點擊導覽列的項目，同時 IntersectionObserver 也會觸發 setAnchor，導致畫面上會有一瞬間閃了一下 ，尤其是橫跨 2 個區塊的時候。  
原因在於點擊改變 1 次，滑動又改變 1 次  
![[網頁練習題/img/20220516_113525.gif]]  

只要把 scroll2Section 的  setAnchor 去掉就好了，因為改變 anchor 的 state 是透過 IntersectionObserver 來決定，scroll2Section 只要把卷軸拉到那邊就好了。

### 改善 props drilling : useContext 
由於元件分的很細，導致 props 要傳到子孫去，造成 props drilling 的問題，可以透過 `useContext`  直接傳到目的地。   

- context.js 
```jsx
import { createContext } from "react";
// creact 一個 context
export const Sectionstate = createContext(null);
```
- App.js
```jsx 
function App() {
    const { sections, nowAnchor, scroll2Section } = useScrollspy();
    return (
		// 1. 透過 Provider 來傳遞
				<Sectionstate.Provider value={{ nowAnchor, scroll2Section }}>
					//2. 記得拿掉 props
					<Navbar />
					// ....
				</Sectionstate.Provider>
    );

}
```
- NavLink.js
```jsx
import { useContext } from "react";
import { Sectionstate } from "src/context";

function NavLink({ children, anchor, handler }) {
    const { nowAnchor, scroll2Section } = useContext(Sectionstate);
    // 1. 控制 css ，決定顏色
    const IsActive = nowAnchor === anchor.replace("#", "");
    // 2. click 事件
    const clickhandler = (e) => {
        e.preventDefault();
        scroll2Section(anchor.replace("#", ""));
    };

    return (
		    // 3. 加入事件
        <NavListItem onClick={clickhandler} $isActive={IsActive}>
            <a href={anchor}>{children}</a>
        </NavListItem>
    );
}
```
搭拉，卷軸後的 state anchor 可以共享，不用一層層傳到最裡面。  
至此完成功能的前兩項😃   

### accordion 手風琴摺疊內容
手風琴是很常看見的功能，一般帶有 Icon ，切換時會換顯示、延展內容 。  
參考 [w3school](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_accordion_symbol)，就拿來沿用並改成 React 版的。  

可以看到例子是使用 `max-height` 來調整內容的高度，搭配 transition ，就可以達成，這裡的 max-height 是來自內容的 **完整高度** (scrollHeight)，也就是子元素撐開的完整高度。  

- 摺疊的時候  
```jsx
const DropdownInfoCard = styled(InfoCard)`
    width: 100%;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-out;
`;
```
由於是依靠內容撐開 ，摺疊起來必須隱藏內容，overflow 一定要。     

在 React 要抓到 DOM 元素就要使用到 useRef，但不同於上面的作法，這邊使用 [callbackRef](https://zh-hant.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node) 作為練習。  

callbackRef 跟一般的 ref 差別在於我們是可以更彈性控制的，useRef 是不受 render 影響的，如果 DOM 節點消失，一般的 ref 可能會出現錯誤，在 callbackRef 中只要把節點改成 null，React 就不會渲染也會釋放記憶體，很適合使用在觀測 DOM 的狀態。

```jsx
function ButtonDropDownCard({ children, title }) {
		// 1. 按鈕開關，預設展開
    const [isopen, setIsopen] = useState(true);
    // 2. 先把 Height 記錄起來
    const [contentHeight, setContentHeight] = useState(null);
    // 3. 不使用 useRef，而是用 callback 透過 state 紀錄值
    const contentHeightRef = useCallback((node) => {
        if (node !== null) {
            setContentHeight(node.scrollHeight);
        }
    }, []);
		// 4. Button onClick 事件
    const toggleInfoHandler = (e) => {
        setIsopen(() => !isopen);
    };

    return (
        <DropDownCard>
            <Button
                iconName={isopen ? "remove" : "add"}
                handler={toggleInfoHandler}
            >
                {title}
            </Button>
            <DropdownInfoCard
		            // 5. 把 callbackref 掛上去
                refer={contentHeightRef}
                $open={isopen}
                // 6. height 先把內容高度記起來
                $height={contentHeight}
            >
                {children}
            </DropdownInfoCard>
        </DropDownCard>
    );
}
```
內容是固定的，在 mount 的時候就可以拿到 height 值，不用再額外寫 useRef 並且透過改變 state 在決定 ref.current 的值了。  

關於 callbackref 與一般 useRef 的差別，可以參考[這篇](https://stackoverflow.com/questions/41467146/what-is-the-different-between-the-ref-callback-and-the-ref-myinput-in-reac)。  

### 簡單的前端 email 驗證
我使用 **[EmailJS](https://www.emailjs.com/)** 讓前端可以寄信，藉由第三方代理服務。因為是免費的，每個月有寄出上限值，所以在網頁寄出之前最好驗證一下，以免被濫用 🥲  
下方會提到如何設定 EmailJS 。

第一道檢查可以使用內建 input 檢查 `type = email` 的格式是否正確，瀏覽器有自帶 tooltips 會跳出，但是如果打出 `1212@1.1` 還是能夠通過的，一看就知道並不是常見的合法信箱，所以必須再加上第二道檢查🥴。

#### 透過 Regex 正規表達式檢查
參考 [JavaScript : email validation](https://www.w3resource.com/javascript/form/email-validation.php)，這份提供常見的 email 驗證寫法。  

觀察常見的 email 組成，再寫出相對應的 pattern  
1. xxx@gamil.com 
2. xxx@yahoo.com.tw 
3. xxx@etech.ncyu.edu.tw 以學校的為例

**歸納條件 :** 
1. 一定要有 `@` 
2. `@` 前面必須有字元
3. @ 後面的文字部分至少會超過 1 組，(子網域 + 頂級網域)

```javascript
function isVaild(value) {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(pattern)) {
        return true;
    }
    return false;

}
```
拆解成三段
1. @ 以前 : `^\w+([\.-]?\w+)*`  
	以字(a-zA-Z0-9_)開頭，含 1 個以上  
	處理特殊字元(.-)出現 0 次至 1 次，字元含 1 個以上，這樣的組合可以 0 次以上。
2. @~第一個 . 以前 : `@\w+([\.-]?\w+)*`  
	跟上面的一樣，只加入 @
3. 第一個 . 以後 : `(\.\w{2,3})+$`
	. 加上字元重複 2~3 次，這樣的組合要有一次含以上
	
> 後來想想為什麼限定後面的字只能 2 ~ 3 個，以常見的 TLD (頂級網域)，不外乎 .com、.tw、.org、.edu、.net 等等的，是常見有效的 email

可以到 [regex101](https://regex101.com/) 測試看看一些範例。  

## CSS 部分
### 共同的樣式 createGlobalStyle 
從 [⟬ 紀錄 ⟭ Frontend Mentor 挑戰題 - Time tracking dashboard ](https://blog.rosa.tw/Frontend/%E7%B7%B4%E7%BF%92/Practice-to-Master-01/)  這邊就有提到引入 normalize css 的方法，由於我想要在 styled-components 使用 meyer 版的，可以透過 createGlobalStyle 的方式，或者引入 css 檔案在最上層。  
參考 : [使用 CreateGlobalStyle 在 React Styled-Components 取代 CSS Reset 與 CSS Normalize](https://medium.com/itsoktomakemistakes/%E4%BD%BF%E7%94%A8-createglobalstyle-%E5%9C%A8-react-styled-components-%E5%8F%96%E4%BB%A3-css-reset-%E8%88%87-css-normalize-fc8faa8059f1)

只要是有關全域 css 的都可以在這裡設定。  
```jsx
// Reset
export const ResetStyle = createGlobalStyle`
	// meyer reset css
`
```

### 把 variants 概念帶入
Figma 的 variants 讓類似元件可以替換，或者讓元件具有不同的狀態或客製化樣式。舉 Icon 為例，讓 svg 檔聚集成同一組 component variants，個別取不同的 name ，切換就改變樣式，不只一種屬性，還可以巢狀一層層包起來， core component 的方式，只要改變核心元件，其他樣式也能保持一致性。  
很多 ui 元件庫也有類似的概念，像 framer motion 以及 chakraUI，先定義好很多不同的樣式，只要切換 variants 就可以變換樣式。  

以圖片卡為例，圖片卡有橫向直向，所以 variants 只要把 object 的 key 當作輸入值就可以套用。
- 定義樣式，我把 styled-components 想成回傳一大串字串而已 
```javascript
export const ImageCardVariants = (props) => ({
    h: `
        aspect-ratio: ${ratio.h};
        transform: translate(0.5em, 1.4em);
        max-width: 80%;
        height: calc(80vw * ${1 / ratio.h});
        box-shadow: -1em -1.4em 0 ${props.theme.colors.secondary.Dark};
        ${br.md}{
                max-width: 300px;
                height: calc(300px * ${1 / ratio.h});
                img{
                        filter: grayscale(1) blur(1px);
                }
        }
        `,
    v: `
            flex: 1;
            transform: translate(0.5em, 1.4em);
            width: 50vw;
            aspect-ratio: ${ratio.v};
            box-shadow: -1em -1.4em 0 ${props.theme.colors.secondary.Dark};
            flex-shrink: 0;
            max-width: 300px;
            ${br.md}{
                    width:25vw;
            }
        `,
});
```
實際應用 :   
```jsx
const ImageCard = styled.div`
	  ${(props) => ImageCardVariants(props)[props.$dir]}
`
// 透過 props 自定義的 dir 改變方向
<ImageCard dir={"h"} />
<ImageCard dir={"v"} />
```
 
### 字型 font family 
載入字體可以透過 web font 或者下載字型檔到資料夾引用    
font 有很多種類 :  
1. otf (open type font) : 很大一包的所有文字，通常高達好幾 MB
2. woff、woff2 (Web Open Font Format) : 壓縮過的 web font，二代與一代差別在於壓縮技術，二代比一代多壓縮了 10%。

還有 svg 圖片格式的文字，暫時還沒研究🥴
在 CSS 使用 `@font-face` 可以針對不同字型定義粗細、名稱，到 [google webfonts helper](https://google-webfonts-helper.herokuapp.com/fonts) 可以選擇有公開的 webfont ，提供可用的文字檔來引入，也可以下載。

```jsx
import NotoSansTCBold from "../utils/noto-sans-tc-v26-latin-700.woff2";
import NotoSansTCRegular from "../utils/noto-sans-tc-v26-latin-regular.woff2";
import NotoSansTCThin from "../utils/noto-sans-tc-v26-latin-100.woff2";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "Noto Sans TC";
        src: local('Noto Sans TC'),url(${NotoSansTCBold}) format('woff2');
        font-weight: bold;
        font-display: swap; 
    }
    @font-face {
        font-family: "Noto Sans TC";
        src: local('Noto Sans TC'),url(${NotoSansTCRegular}) format('woff2');
        font-weight: normal;
        font-display: swap; 
    }
    @font-face {
        font-family: "Noto Sans TC";
        src: local('Noto Sans TC'),url(${NotoSansTCThin}) format('woff2');
        font-weight: 100;
        font-display: swap; 
    }
`
```

#### 試著優化載入字型
參考 [五個方法提升 Web Fonts 載入速度](https://www.astralweb.com.tw/five-ways-to-improve-web-fonts-loading-speed/)。   

因為中文字實在很多，比起英文字的 26 字母，一包中文字型檔高達 5 MB (otf)....，在載入就會很花時間，可以針對幾項小優化。

簡單的優化手段 :    
1. 不使用 [@import 而是用 <link>](https://sia.codes/posts/making-google-fonts-faster/#should-i-use-%3Clink%3E-or-%40import%3F)，一般 CSSOM 與 DOM 解析完後會再合併一起渲染，如果在 CSS 載入字體，會導致一開始畫面空白，沒辦法看到任何文字，影響使用者體驗，利用 link 加上 preload，告訴瀏覽器先行預備 。
	> 現在的 google font API 已經有加上 preload 與 font-display 的 swap了 ! 
2. `font-display` :  `swap` 讓使用者先看到文字，等加載到對應文字再替換。
3. `local` : 檢查使用者電腦是不是有該字體，優先載入本地檔案避免不必要的下載。

除了基本的 CSS 優化外也有其他種方式，像是使用 **[  
webfontloader](https://github.com/typekit/webfontloader)** 利用 JS 非同步加載字型，或者使用 Google Font API 透過 CDN 快取加快字型載、或是 chunk 分割成小檔案，雖然會增加 request 但至少不會為了一個完整檔案等太久，優化的坑很大，未來要在研究。  
 
## EmailJS
> EmailJS 並不是透過別人信箱寄信，而是透過代理服務，讓別人按按鈕，代替 **你** 寄信給自己/別人

個人的服務每月提供 200 封綽綽有餘，可以選擇綁定不同 email 服務，因為我有購買網域(gandi)有一年的信箱功能，就順手接上 SMTP 的服務。     

**主要步驟 :** 
1. 創建對端服務
2. 寫好郵件範本，要寄給自己的內容
3. 前端創建 form 表單
4. 使用 EmailJS SDK 填入細節


首先 [創建帳號](https://dashboard.emailjs.com/sign-up) ，登入後會到後台準備建立對端服務。  

### 建立對端服務
1. 點擊 **建立新服務**，目前我的已經建立了
	![[網頁練習題/img/Pasted image 20220518091201.png]]
2. 選擇自己要收件的信箱，我這邊選擇 SMTP
	![[網頁練習題/img/Pasted image 20220518091519.png]]
3. 填寫 SMTP 一些設定，
	Gandi > 域名 > 電子信箱 > 目前已啟動的信箱 > 連線設定  
	複製訊息到 EmailJS 的表單，帳號密碼都是來自 gandi 電子信箱的設定，**並不是 EmailJS !**
	Port 的部分填寫 SSL ，因為網域有提供服務所以勾記得打起來~  
	最後一項打勾後，服務建立會寄一封信到你填寫的信箱測試。  
	![[網頁練習題/img/Pasted image 20220518093629.png]]
	
另外我是用 window 內建郵件軟體收發信，所以也把 gandi 信箱接上。  

### 建立信件模板
[官方教學](https://www.emailjs.com/docs/tutorial/creating-email-template/)  

1. 新建信件模板
	![[網頁練習題/img/Pasted image 20220518094425.png]]
2. 官方會給你預設模板，我們可以客製化**自己想要收到的訊息格式**，但是我們要連接到前端的表單，必須透過特定的字串。  
	![[網頁練習題/img/Pasted image 20220518100227.png]]
3. 按下 **save** ，上面的 test it 會亮起來，可以不花費額度來先測試看看是否成功 ，200 OK 代表成功寄出。會發現 `user_name` ，`user_email` 以及 `reply_to` 都沒有在上面，這是留給前端表單來填入的。    
	![[網頁練習題/img/Pasted image 20220518102739.png]]
4. 改成前端發送出來的字串，官方提供這三個，要放在 `input` 的 name ，把它加進 template 裡面。
	```javascript
	{{ message }} // 訪客留言內容
	{{ user_name }} // 訪客名稱
	{{ user_email }} // 訪客提供的聯絡信箱
	```
	![[網頁練習題/img/Pasted image 20220518103601.png]]

之後就是到前端來設定表單了，更細的還有 reCAPTCHA 認證、GA 追蹤設定等等的，因為我沒有弄就沒寫步驟了。

**補充 :** reply_to 是使用者寄信給你之後，自己先寫好範本，讓系統自動發一封回覆信給使用者，這需要另外打開設定。  

### 前端設置
> 注意 : 這邊的 userId 跟 public key 一定是公開的，官方有說並不會影響帳號安全。如果要限制別人濫用自己的 userId 可以使用 **白名單**，或者 EmailJS 提供其他的防禦措施。參考 [javascript - Front end Sensitive info ](https://stackoverflow.com/questions/61649182/front-end-sensitive-info)  

**安裝 EmailJS 的 SDK** :  
```bash
npm install @emailjs/browser --save
```

官方很貼心提供不同框架的[範例](https://www.emailjs.com/docs/examples/reactjs/)，我就選擇 React ，貼上並修改成符合自己網頁格式的 。
```javascript
// 引入 EmailJS 的 SDK
import emailjs from "@emailjs/browser";
// 有關設定的部分獨立出來
import { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } from "./emailjs.config";

// 不同狀態下的按鈕文字
const btnstate = {
	default: "送出",
	issending: "寄送中",
	success: "我會盡快回覆您 :)",
	fail: "寄送失敗",
};
const Contact = (props) => {
		// EmailJS 使用
    const form = useRef();
    // controlled components 拿到表單內容
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [email, setemail] = useState("");

    // 按鈕的狀態
    const [issend, setSend] = useState(btnstate.default);

		// 避免寫太多個 onchange 事件
    const changeHandler = (setter) => (e) => {
        setter(() => e.target.value);
        // 改變按鈕顯示文字  => 如果已經發送成功，當 input 又改變，重新顯示可發送文字
        if (issend === btnstate.success) {
            setSend(btnstate.default);
        }
    };
    const sendEmail = (e) => {
		    // 阻止表單預設事件發生的跳轉行為
        e.preventDefault();
        // 改變按鈕顯示文字 => 發送中
        setSend(btnstate.issending);
        // 檢查是否有空欄位
        if (!username || !email || !message) {
            alert("有未填寫欄位");
            setSend(btnstate.default);
            return;
        }

        // 簡單篩選合法的信箱
        if (!isVaild(email)) {
            alert("請填寫合法的信箱");
            setSend(btnstate.default);
            return;
        }
        //EmailJS 主要的設定，回傳一個 promise，引入需要設定的部分
        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then(
                (result) => {
		                // 成功寄出
                    setSend(btnstate.success);
                    console.log(result.text);
                },
                (error) => {
		                // 失敗
                    setSend(btnstate.fail);
                    console.log(error.text);
                }
            );
    };

    return (
        <Section defaultBG {...props}>
            <Title $id={props.id}>CONTACT</Title>
            <Form ref={form} onSubmit={sendEmail}>
                <Inputfield
                    options={{
                        title: "名稱",
                        type: "text",
	                      //EamilJS template 的值
                        name: "user_name",
                    }}
                    value={username}
                    handler={changeHandler(setUsername)}
                    btnstate={issend === btnstate.issending}
                />
                <Inputfield
                    options={{
                        title: "信箱",
                        type: "email",
                        //EamilJS template 的值
                        name: "user_email",
                    }}
                    value={email}
                    handler={changeHandler(setemail)}
                    btnstate={issend === btnstate.issending}
                />
                <label>訊息</label>
                <CutsomTextareaAutoize
                    minRows={5}
                    maxRows={10}
                    // EamilJS template 的值
                    name={"message"}
                    onChange={changeHandler(setMessage)}
                    disabled={issend === btnstate.issending}
                />
                <StyleSubmitButton
                    type="submit"
	                  // 按照目前的文字內容改變狀態
                    disabled={
                        issend === btnstate.issending ||
                        issend === btnstate.success
                    }
                >
                    {issend}
                </StyleSubmitButton>
            </Form>
        </Section>
    );
};
```
接著試著寄信跟收信  
![[網頁練習題/img/20220518_114729.gif]]  
搭拉! 成功了，自己寄信給自己。  

## Framer motion
Framer motion 是 React 的元件動畫庫，提供預設動畫設定，簡單達成讓元素動起來 。剛好看 youtube 有開發者做出漂亮的動畫，這次想說來試試看吧 !  
另外我從 The Net Ninja 的[教學](https://www.youtube.com/playlist?list=PL4cUxeGkcC9iHDnQfTHEVVceOEBsOf07i) 認識 framer motion 的基本操作，也搭配官方的 API 學習。  

**安裝** : 
```bash
npm install framer-motion
```
### motion component
要讓元素動起來很簡單，只要引入 motion 並且把元件改為 `motion.<htmltag>` 自動就會轉成 **可以編輯動畫** 的物件。  
範例 : [CodeSandbox](https://codesandbox.io/s/happy-rgb-3wm4vc)  
```jsx
<motiom.div
		initial={{
			opacity: 0,	
			backgroundColor : 'rgba(255,0,0,1)'
		}}
		animate={{
			opacity: 1
			backgroundColor : 'rgba(255,0,0,1)'
		}}
		transition={{
			type:'tween',
			ease : 'easeIn'
		}}
></motion.div>
```
- initial : 初始狀態
- animate  : 啟動動畫
- transition : 動畫效果

這三個是基本設定，而且都接收一個 **物件**，使用 CSS 屬性要用駝峰式 (Camelcase) 命名，eg : fontWeight    

比較不一樣的是 transform 屬性，如果要移動 translateX，可以直接寫 `x`，反之 `y` 也是，縮小放大也可以直接寫 `scale` 。至於單位 motion 會幫我們自己加上，預設是 `px (像素)`，`s (秒數)`，其餘用法就跟 css 差不多，也可以 `calc` 使用計算  

```jsx
<motiom.div
		initial={{
			x: 100,	
			scale : 1
		}}
		animate={{
			x: 300,
			scale : 1.1
		}}
		transition={{
			type:'tween',
			ease : 'easeIn'
			duration: 5
		}}
></motion.div>
```

#### 在 styled-components 使用 framer motion
由於樣式都是使用 styeld-components 撰寫，像一般覆寫 React component 的形式就可以了，framer motion 產生的就是一個 component。 

```jsx
const ImageCard = styled(motion.div)`
	// css
`
```

### transition : 控制 animation 效果
像一般在用 css 裡面使用 transition，有兩種 type 提供使用  
**type :**  
1. spring : 預設，彈簧效果
2. tween : 漸變

也可以設定 delay、duration、ease   

```jsx
<motion.div 
	//...略
	transition={{
		type: 'tween',
		ease: 'easeInOut'
		duration : 3,
		delay: 1,
	}}
>
</motion.div>
```
spring 有很多有趣的設定，像是 mass (質量)、damping (阻尼)，等等的，未來要在研究。  

### Variants
幫助程式碼更加簡潔以及可重複使用，並且在父層的動畫會藉由 propagation 讓子元素 **同命名的 label** 也生效。  
普遍會用 **hidden、show** 來代表，當然 label 也是可以自己取的。

- `hidden` (initial) : 初始狀態
- `visible` (animate) : 啟動狀態 

使用時是用 string label  
```jsx
// 父元素 variants
const variants = {
		//2. 定義自己的 string label
    hidden: {
        opacity: 0,
        x: "100vw",
        transition: {
            type: "tween",
            ease: "easeIn",
            when: "afterChildren",
        },
    },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            ease: "easeOut",
            staggerChildren: 0.2,
        },
    },
};
// 子元素 variants
let linkVariants = {
    hidden: {
        y: 10,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
    },
};
function Navgation(props) {
	const isMd = useMediaQuery(br.md);
	const { open, handler } = props;

	return (
			<NavWrapper
					// 1. 加上 variants
					variants={variants}
					// 3. 設定好初始與動畫的 label
					initial={"hidden"}
					animate={open ? "show" : isMd ? "show" : "hidden"}
>
					<Linklist>
							{Object.entries(SectionType)
								.filter((_, i) => i !== 0)
								.map(([key, value], i) => (
										<NavLink
												key={i}
												handler={handler}
												anchor={`#${key}`}
												// 3. 透過 props 加入 variants，但是不用加上 initial 與 animate
												animVariants={linkVariants}
>
												{value}
										</NavLink>
								))}
					</Linklist>
			</NavWrapper>
	);
}
```
在子元素裡面並沒有去定義 initial 和 animate ，因為跟父元素的 label 同名，會在執行的時候一併動畫，這就是 `propagation`，就像 DOM 事件一樣會向下傳遞。  

#### transition : when
可以在 **父層** 決定在子元素動畫的時間點，啟動覆元素的動畫。  
如果沒有設定在什麼時候啟動，預設是 `false`
when 有兩個常用屬性
1. beforeChildren
2. afterChildren

以導覽列為例，開啟時順序 父 > 子，關閉時還是 父 > 子，這樣子會造成 link 還沒完全退場，就被收掉了，link 的動畫就像斷掉一樣，所以要改動關閉的順序，讓子先結束再換父。  

```jsx
const variants = {
    hidden: {
				//...略
        transition: {
            type: "tween",
            ease: "easeIn",
            // 設定在這裡
            when: "afterChildren",
        },
    },
}
```
要注意的是如果 **父子的 variants 並不在同一份檔案**，variants 是沒有效果的，不會有 propagation ，when 也沒用處。  

**差別 :**   
![[網頁練習題/img/顯示.gif]]
可以看到有 when 的那邊是等到子元素往下結束後才進行父元素的淡出動畫。    
#### transition : staggerChildren 後延遲 
父元素出現後，子元素的延遲行為，等於 css 中的 animation delay。
以 **級距** 的延遲來執行子元素，像是 sass 來說是自己寫 @for 迴圈使每個 delay 往上加，在 framer motion 透過 staggerChildren 就會自動幫我們按照順序延遲。

- 回憶一下 sass
```scss
@for $i from 1 through 5
	.link:nth-child(#{$i})
		animation-delay: (.2s*$i);
```

- variants 設定
```jsx
const variants = {
		//...
    show: {
        opacity: 1,
        x: 0,
        transition: {
            type: "tween",
            ease: "easeOut",
            staggerChildren: 0.2,
        },
    },
};
```
framer motion 會幫我們補上 **s** 秒數，所以直接寫數字就 ok 了  
效果 : ![[網頁練習題/img/20220517_160500.gif]]

### whileInview 在 viewport 內觸發動畫
framer motion 也有提供"動作"上的動畫，例如 hover、tap 、focus 之類的，另一個就是 **當目標進入 viewport 啟動動畫**，跟上面自製的 IntersetionObserver API 很類似，但 framer motion 幫我們用好了。    
這邊我用在滾輪滑到某區塊物件按順序到中央。  
```jsx
const CardVariants = {
    hidden: { x: "-100%" },
	  // 2. 觸發移動到 x = 0
    inView: {
        x: 0,
        transition: {
            delay: 0.3,
            type: "spring",
            mass: 0.1,
            damping: 8,
        },
    },
};

function CollectionCard({ children, content }) {
    const { url, title, site, repo } = content;
    return (
        <Container
            variants={CardVariants}
            initial="hidden"
            // 1. 設定當進入 viewport 觸發的動畫
            whileInView="inView"
            // 2. 只觸發一次
            viewport={{ once: true }}
        >
				//...略
				</Container>
		)
}
```

### 控制響應式下的 motion
有些裝置我們不希望出現 motion，像是手機上根本不需要 hover 。以往在 styled-component 進行斷點處理，在 framer-motion 則要在 variants 上處理。    
參考 : [Responsive Animations with Framer Motion](https://samuelkraft.com/blog/responsive-animation-framer-motion)  

透過 JS 來判斷螢幕寬度，在來決定 variants 的值。  
並且把判斷的部分寫成 custom hooks  
- useMediaQuery.js
```jsx
import { useState, useEffect } from "react";

export function useMediaQuery(query) {
    query = query.replace("@media", "");
    const [matches, setMatches] = useState(()=>{
	    return window.matchMedia(query).matches
    });

    useEffect(() => {
		    /* 1. 回傳 MediaQueryList，裡面包含 
			    matches : boolean ,目前是否符合輸入的媒體值 ? 
			    media : 媒體輸入值
			    onchange : 事件，當 window resize 時可以監聽
		    */
        const media = window.matchMedia(query);

				// 2. state 是否有改變 ? 
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        // 4. 如果 window 改變 size 做變化 
        const listener = () => {
            setMatches(media.matches);
        };
        // 3. 監聽是否有改變
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);
		// 回傳 true or false
    return matches;
}
```

主要判斷在電腦版上不要出現 navbar 的開啟/關閉動畫，不過奇怪的是我按照教學使用，在初始狀態還是會被手機板預設的隱藏起來，原因在於 motion 在渲染出 DOM 之後就會開始動了，而 Media 的判斷等到渲染之後 (useEffect) 才會改變值，所以動畫一開始就已經被啟動了。因此我在 useState 設定初始值就直接抓取目前的 media 尺寸，到電腦版的時候 nav 就不會啟動動畫。  

## 總結
每做一個網頁，都會覺得又成長一些，不斷在實作中學到不同的概念，但同時也覺得自己對於基礎不是很穩固 🥲，期望下次可以能實作出更有系統性與完整的架構。   

**反思改善的部份 :**   
寫到後來發現元件的架構並不是很好，styled-components 寫的太多層，當我做完網站有看到這篇文章 [Cleaner Codes — React Subcomponents](https://medium.com/@marioserano55/cleaner-codes-react-subcomponents-1c2ebe178566)，下次目標是改善 nested 過頭的結構，以及參考其他 ui 元件庫的結構。      

補 : 實際上叫 **Compound component** (複合元件) 是一種 design pattern。
中文參考 : [Design Pattern In React — Compound component (複合元件)](https://oldmo860617.medium.com/design-pattern-in-react-component-compound-component-%E8%A4%87%E5%90%88%E5%85%83%E4%BB%B6-46ed5fb65459)


**TODO :**  
加入 Next.js : 利用 SSG 改善 SEO ，未來想新增不同的頁面，放入有關其他領域作品，像是繪畫、攝影以及動畫 ，未來擴充會比較方便。

## 參考

