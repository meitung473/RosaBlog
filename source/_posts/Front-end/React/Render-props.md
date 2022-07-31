---
title: 筆記 | React - render props
tags: React
categories: [Front-end,React]
author: Rosa Hong
description:
date: 2022-07-31 05:35:00
---
> 文章來自 : 
> 1. [Render Props – React](https://zh-hant.reactjs.org/docs/render-props.html)
> 2. [Avoiding HOC; Favoring render props · GitHub](https://gist.github.com/heygrady/f9bf3b6dd93fe3d87ba87430fd3c20d5)

# 摘要
1. 什麼是 render props 
2. render props 的應用範例
3. render props 與 HOC (higher order component) 的差別
<!-- more -->

# 什麼是 render props
render props 是一種把 props 當作 render function 的概念。  
擁有 render props 的 Component 不會執行自己的 render 邏輯，或是可以想成把 children 當成 function 呼叫後回傳一個 `React.Element` 。

- 這是一種 : 但是不見得一定要用 `props.children` 
```jsx
function AComponent(){
	return (
		<div>
			{props => {
				/* 把 children 寫成 function 帶入*/
			}}
		</div>
	)
}
```
- 實際上只要 props 是 function ，而且在 render function 內部被呼叫
```jsx
function AComponent(props){
	return (
		<Wrapper render={props => {	
			/* 直接把 function 拆開來，可以直接接收 AComponent 的 state 與 props*/
			
		}}/>
	)
}
// 直接把 props.render 在內部呼叫
function Wrapper(props){
	return <div>
		{props.render(props)}
	</div>
}
```
叫不叫 `render` 都沒關係，這是種命名上的慣例而已。

如果使用過 [Context Consumer](https://blog.rosa.tw/2022/07/React/React-Context)，Consumer 的另一個型態就是 :
```jsx
class AComponent extends React.Component{
	render(){
		<Context.Consumer>
		{props => {
			/* 放在這裡面的 Component 都能透過 props 拿到 context value*/
		}}
		</Context.Consumer>
	}
} 
```
好處是可以同時擁有多個 Provider 來使用，優點就顯示在動態上的資料結構。

# render props 的結構
把 props 當作 function 直接傳入 `(props)=> <Component {傳入想要的 props 與 state}/>`
```jsx
function somethingwithToggle(){
	return (
		<div render={(props)=>{
			return (
				<div>
					{/* ✅在這裡就可以直接接收到資料，不用再經過另外的 Container 包住*/}
					<AnthorComponent somevalue={value} someprop={props.OOO}/>
				</div>
			)
		}}/>
	)
}
```
我自己看作 **直接在 props 把 function 結構打開** 到父元件直接使用，在內部的 Element 可以直接接收到 props 與 state。跟 HOC 比較而言，在使用結構上更一目了然。

由於 HOC 是將 Component 用 function 包起來，邏輯包在 function 內部 (封裝起來)，如果要知道傳入的 props name 還要把 HOC 所在的腳本打開來看。
```jsx
// ❌ 看不出來 Toggle 裡面傳什麼東西給 Navbar 
const NavbarwithToggle  = withToggle(Navbar)
```

另一個是動態與靜態的關係，render props 的 render 部分可以想填入任何結構的 JSX，而 HOC 類似 **固定的模板** (Container)，只能按照定義的格式填入。
- HOC
```js
// 最簡單的 HOC，這邊只能回傳被包住的結構
const withToggle = (Component)=> (props) => <Component {...props} />
// 產生出來的結構 👉 
<Navbar/>
```
- render props
```js
const ToggleComponent = ()=>{
	return (
		<Toggle render={
			(props)=>(
				<div>
					// 任何結構，一個也可以
					<OnlyComponent open={props.open}/>
					// Nested 也行
					<NestedContainer {/*也可以插入 props */}>
						<Component open={props.open}/>
					<NestedContainer/>
				</div>
			)
		}/>
	)
}
```

# 實際範例
可以先複習 HOC 的部份，會改寫來自 [HOC 實作練習](https://blog.rosa.tw/2022/07/React/Higher-Order-Component)。  


接下來我要做的 : 
1. 將 `withToggle` 改成 render props 格式，叫 `<Toggle/>`
2. 用 `<Toggle/>` 把 Navbar 與 Accordion 包起來
3. 實作 Push Canvas Navbar

其實在 HOC 時有一種 Navbar 不太好做到，那就是向整個畫面推的 Navbar，因為 HOC 將結構給綁住了，結果只能控制 Component 本身，雖然可以用判斷的方式 (conditional rendering)，但會使得結構攏長 😵，接著會使用 **render props** 創建 Push Canvas Navbar。 

在寫這篇的同時，我也在 HOC 也有補上 Push Canvas Navbar 的寫法 👉 [React - HOC practice](https://codepen.io/shan473/pen/WNzjdmJ)

## 掰掰 withToggle 👋
通通砍掉 HOC 的部分，改成 Component 的形式
```jsx
// 1. props.render 是一個 function，render children
function Toggle({render}) {
	// 2. 類似邏輯的 open 與 togglehandler
  const [open, setOpen] = React.useState(false);
  const togglehandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  /* 3. 👇 重點在這裡 render 是一個 function 負責渲染 React Element，參數是帶給 Element 
  的 props
  */
  return <div>{render({ open, togglehandler })}</div>;
}
```
參數使用 object 比起使用 array ，用解構時不用管順序的問題。

## 加上客製化的 Navbar
基本上兩個元件的結構並沒有動到，而是將 HOC 中的 `withNavbarType` 改成 `<CustomNavbar/>`，並且改成傳入的 type 來判斷 `width` 的值
```jsx
function CustomNavbar({ type }) {
	// 1. displayName 是幫助 devtool 辨名稱，但是這裡有 BUG 😵😵😵，下面會說明
  CustomNavbar.displayName = type + "Navbar";
  return (
	  // 2. 把 Toggle 元件 render function 展開，並且把 props 直接傳給 Navbar
    <Toggle
      render={(props) => {
        return <Navbar type={type} {...props} />;
      }}
    />
  );
}
```
其實有點多此一舉，不過我原本是想要加上 displayName ，但這邊出 BUG 😵

## 組合
```jsx
function App() {
  return (
    <div>
	  {/* 1. 兩種 Navbar */}
      Overlay:
      <CustomNavbar type="Overlay" />
      FullNavbar:
      <CustomNavbar type="Full" />
      <div>
      {/* 2. Accordion */}
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <Toggle
              key={i}
              render={(props) => <Accordion {...props} index={i} />}
            />
          );
        })}
      </div>
    </div>
  );
}
```
其實 Navbar 也可以一起拆開，因為只有包住 Navbar 而已。如此一來，在結構上就可以看的出來在做什麼
```jsx
function App() {
  return (
    <div>
	    {/* 1. 透過 Navtype 直接取 name 生成，由於 Push Navbar 處理方式不一樣就另外用*/}
      {Object.keys(Navtype).map((name, i) => {
        if (i === 2) return null;
        return (
          <>
            {name}
            <Toggle
              key={name}
              render={(props) => {
                return <Navbar type={name} {...props} />;
              }}
            />
          </>
        );
      })}
      <div>
	      {/* 2. 這裡的 Accordion 沒什麼差別，但比 HOC 少一層包裝 */}
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <Toggle
              key={i}
              render={(props) => <Accordion {...props} index={i} />}
            />
          );
        })}
      </div>
    </div>
  );
}
```
最後效果跟 HOC 一樣，不過 render props 是在結構上就很清楚看見自己在做什麼👌(看 devtools 的地方)  
![|420x400](https://i.imgur.com/YJChQnc.gif)

## Push 版本的Navbar
Push 版本需要把 *整個畫面往右推*，在結構上是長在 `root Element` 的鄰居，所以必須透過 **Portal** 來幫我們直接在 `root` 以外的節點生成 DOM 。

首先在 `html` 加上要長出的 `container`，叫 `push-navbar`
```html
<div id="push-navbar">Push:</div>
<div id="app"></div>
```
只有 Push 的 Navbar 結構不同，我希望把它獨立出來
```jsx
/* 1. 拿到 Container 的 DOM */
const pushEl = document.getElementById("push-navbar");

function PushNavbar() {
	/* 2. ReactDOM.createPortal 可以在指定的 Container 生成 element */
  return ReactDOM.createPortal(
    <Toggle
      render={(props) => {
	      /* 4. 根據 open 讓 root 往右推移。我選擇不在 Navbar 裡面判斷，把它提到這裡 */
        React.useEffect(() => {
          if (props.open) {
            document.getElementById("app").style.marginLeft = "250px";
          } else {
            document.getElementById("app").style.marginLeft = 0;
          }
          /* 5. 記得加上 dependencies */
        }, [props.open]);
        
		    /* 6. render props Navbar ，並且把 Toggle 的資料塞回去，一樣要加上 type */
        return <Navbar {...props} type="Push" />;
      }}
    />,
    /* 3. 第二個參數放 Container */
    pushEl
  );
}
```
最後把他加在 `<App/>` 裡面，雖然在裡面， Portal 只會在指定的 Container 生成。
```jsx
function App() {
  return (
    <div>
	    {/* 在這裡加上 */}
      <PushNavbar />
      {/* ... 略 */}
    </div>
  );
}
```
效果 :  
![|580x400](https://i.imgur.com/zh8X6fB.gif)

## 遇到的問題 :  CustomNavbar 的 displayName 錯誤
因為 CustomNavbar 是用在只有固定移動寬度的 Navbar 上，為了方便 debug 加上了 displayName ，但是永遠只會顯示排在最後面改過名的 Navbar ，我用 console 印出 displayName 是兩個不同的，不過在 React devtools 卻顯示一樣的😵 ，實際上我也不知道發生什麼問題....

>如果有解答的大神，煩請寫信告訴我😢

![600x280](https://i.imgur.com/2X0ATS6.png)

# 注意 : render props 使用在 Pure Component
props 放入 function，Object Type 放在 render 會導致每次 re-render ，這在 [[../React - 巢狀 Component 優化 & anti-pure Pattern | Component 優化的問題]] 有提過，所以使用 render props 的方式，在 render 展開的 function 本身就不會是 Pure 的，如果裝有 render props 的元件要變成 Pure Component 可以把傳入 function 提出來，而不是每次 re-render 產生新的 function。

> 簡單來說 : `{ } !== { }`

把 render function 永遠指向相同的 function，以  `<Toggle/>` 為例 
```jsx
// 1. 把 render function 提出來，🤔 是不是跟 HOC 有 87% 像
function renderNavbar(type) {
	// 2. 這邊回傳的是一個 function 不是 element，因為我們要把 type 跟 props 同時帶進去
  return (props) => <Navbar {...props} type={type}/>;
}
// 3. 把這個帶 type 的 function 記起來
const FullwithToggle = renderNavbar("Full");

function CustomNavbar({ type }) {
  CustomNavbar.displayName = type + "Navbar";
	// 4. ✅ 記住傳進去的是一個 function ，不是 "呼叫的"
  return <Toggle render={FullwithToggle} />;
}

// ❌ 不能這樣，因為傳入的還是回傳新的 function，
function CustomNavbar({ type }) {
  CustomNavbar.displayName = type + "Navbar";
  return <Toggle render={renderNavbar(type)} />;
}
```
我準備兩個一樣的介面，一個 Toggle 傳入的 function 有被記憶起來，另一個沒有。
用 devtools 來看，App  state 改變 ，`<CustomNavbar/>` 也會 re-render。當 render props 的 function 被提出來， `<Toggle/>` 這邊不會進行 re-render，只會顯示 `parent render`；另一組則是會寫 `props changed(render)`。 
![](https://i.imgur.com/DB2jLnQ.png)
我覺得這樣的方法很類似 HOC ，結構上沒有太大的延展性， render 裡面的結構變成固定的，不過依然比 HOC 好一點。

# HOC + render props 的組合技
當然也可以使用 HOC 包住 render props 的方式，**但反之是不行的**，這也是為什麼 HOC 逐漸不備受用，而大部分推從 render props 的原因。

在 **react-router v5** 的` withRouter` 就採取 HOC 包住 render props 的方式，HOC 包出去的是 Pure Component 。在 `withRouter` 的部份，會改變 historyAPI 也就是顯示的網址 (SPA 並非真的執行跳轉的行為，而是改變 url 的長相)

`withRouter` 的結構[^1] : 
```jsx
const withRouter = (Component) => {
  const C = (props) => {
    const { wrappedComponentRef, ...remainingProps } = props
    return (
      <Route render={routeComponentProps => (
        <Component {...remainingProps} {...routeComponentProps} ref={wrappedComponentRef}/>
      )}/>
    )
  }
```
但在 v6 後 `withRouter` 就消失了，現今都改成 Hooks 版本，因為 Hooks 很香阿 (X

# render props v.s HOCs
當我學習 HOC 時，很多文章指出 render props 是比 HOC 更好的實作方式，從上面的實作大略知道超越的優點，接著要來深入更具體的原因。

根據這篇文章[^2]，來釐清幾個 HOC 的問題

## HOC 被淘汰的原因 
1. HOC 廣泛的被濫用，造成任何結構相同都得用來包。有些包裝成 HOC 卻**沒有實行傳遞 props 或 method 的功能**，失去它的核心意義。
2. 造成 React tree 變得更複雜。這個概念就是 function 裡面不斷包 function，Call Stack 不斷往上疊加，加重效能上的負擔。
3. 需要額外的動作兼容原始 Component 的行為。 
	1. ref 的問題。不能直接加在 HOC 產生的 Component 上，必須透過 **forwardref** 承接 ref，再多包一層往下傳遞至 `WrappedComponent` 
	2. Class Component 的 method 不會被傳遞，必須提升靜態 (static) 的 function 到 HOC 上來擴充。

這些缺點都有在 React 官方被提及[^3]，也都有補救的方式。  
更簡單來說，使用 HOC 要像補丁一樣，東補西補把它回還原成原本 Component 應有的東西，在有些時候多此一舉了。

- 以文章的 `Row` 為例
```jsx
import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import classnames from 'classnames'
import styles from './row.css'

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const row = ({ backgroundColor, className, style }) => (WrappedComponent) => {
  // 產生合併的 Component
  const Row = ({ wrappedComponentRef, ...otherProps }) => (
    <div class={classnames(styles.row, className)} style={{ backgroundColor, ...style }}>
      <WrappedComponent ref={wrappedComponentRef} {...otherProps} />
    </div>
  )

  // 3. displayName，因為由 HOC 包出來的元件通常不具名
  Row.displayName = `Row(${getDisplayName(WrappedComponent)})`

  // 2. 定義型別 : forward refs 
  Row.propTypes = {
    wrappedComponentRef: PropTypes.func
  }

  // 1. 把 WrappedComponent 靜態的方法提升並繼承過來
  return hoistStatics(Row, WrappedComponent)
}

export default row
```
HOC 變得要遵守額外許多規則，因為本身突破 React 的基礎規定，導致要花其他的功能幫忙把 React 的功能補回去😵😵😵。

不如直接使用 `<Row>` 元件包裹裡面的東西
```jsx
const Somewhere = () => (
  <div>
    {/* ✅ 邏輯直接在這裡拆開，不用刻意包裝到 HOC，直接少一層結構 */}
    <Row backgroundColor="green">
      <MyThing name="hello" />
    </Row>
  </div>
)
```
亦或者改成 render props : 
```jsx
const MyThing = ({ className, name, style }) => (
  <Row
    backgroundColor='green'
    className={className}
    style={style}
    {/* render */}
    render={({ visible }) => {
      if (!visible) {
        return null
      }
      return `Hello, ${name}!`
    }}
  />
)
```
不過 `visible` 在那裏判斷 `null`，我感覺不太好🤔，應該在 `Row` 還沒 return 之前就要直接跳出了，在裡面判斷會導致 `Mything` 已經 `mount` 又多一次渲染 `unmout` 掉。

## 小結
我覺得這篇還有提到一個有趣的問題，**React-redux `connect` 為什麼不改為 render props ?**， 因為 connect 內部還是 HOC ，因此有人發起討論希望可以改成 render props ，用 Component 的方式包裝，但是被駁回了[^4]。主要當時 Hooks 的興起，團隊比較傾向改為 Hooks ，另外關鍵的點在於 render props 不是 Pure 的，會導致每次 re-render 都產生新的 `connect` ，造成效能問題，之後有時間再慢慢破解內部的 funciton 。 

# 總結
 1. 傳入的 props 是一個 function，並且 render React Element，等同於 `props.children` 作為 function 並且傳入 props  為參數。
 2. render props 要謹慎使用 Pure Component，因為 props 放入 function 每次 re-render 都是新 function ，本身就不 Pure。
 3. render props > HOCs。 React  composition Design Pattern 的選擇是 **Hooks > render props > Hocs** 

HOC 與 render props  
- **HOC** : 一個 function 包住要擁有功能的 Component，並且產生新的加強版 Component。
- **render props** : 一個 Component 直接將其中一個 props 作為 function，並帶上 props 作為參數給內部使用。 

# 補充閱讀
1. React 關於 Design Pattern 的歷史補充 : [【React深入】从Mixin到HOC再到Hook - SegmentFault 思否](https://segmentfault.com/a/1190000018811476?utm_source=sf-similar-article) 
2. 一些關於 render props 常見的問題 : [Answers to common questions about render props](https://kentcdodds.com/blog/answers-to-common-questions-about-render-props#question-1-performance)

[^1]: [react-router/withRouter.js at v5.3.3 · remix-run/react-router · GitHub](https://github.com/remix-run/react-router/blob/v5.3.3/packages/react-router/modules/withRouter.js#L11)
[^2]: [Avoiding HOC; Favoring render props · GitHub](https://gist.github.com/heygrady/f9bf3b6dd93fe3d87ba87430fd3c20d5)
[^3]:[Higher-Order Components – React](https://zh-hant.reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over)
[^4]: [Render props version of connect · Issue #799 · reduxjs/react-redux · GitHub](https://github.com/reduxjs/react-redux/issues/799)
