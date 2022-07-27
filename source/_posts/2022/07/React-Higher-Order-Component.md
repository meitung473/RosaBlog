---
title: 筆記 | React Higher Order Component (HOC)
tags: React
categories:
  - '2022'
  - '07'
author: Rosa Hong
date: 2022-07-26 15:32:36
description:
---

> 文章來自 : 
> 1. [Higher-Order Components – React](https://zh-hant.reactjs.org/docs/higher-order-components.html)

# 摘要
1. 了解 HOC 的運作原理，以及意義
2. HOC 的架構與實作
3. HOC 應用上的注意事項
test!!! pr
<!-- more -->
# 什麼是 Higher Order Component  ?
HOC 是一個 function，把另一個元件的邏輯包起來，產生新的 **加強版** 元件， 使元件內部的邏輯可以重複使用。而且不會動到原本 Component 的結構，而是加上 HOC 帶來的功能。

被共用的邏輯是封裝 () 在裡面，大部分第三方 library 都是這麼使用。 
例如 : react-redux 裡 `connect()` 就是一個 HOC。
```jsx
const NewComponent = connect(StoreProp,StateProps)(Component);
```

> HOC 的重點是減少類似功能元件的 **重複邏輯**，提高元件的重用性 (reusable)。

舉個實際例子，todolist 具有 toggle 功能，也很多個 button 也有 (切換背景顏色啦等等)，兩者具有 `open State` 並且 `setOpen` 只負責切換 true & false 。
```jsx
// 這一段邏輯不斷的重複撰寫，把它提出來 做成 withToggle，把 toggle 功能封裝
const [open,setOpen] = useState(false);
const handleToggle = ()=>{
	setOpen((prevOpen)=> !prevOpen)
}
```
toggle 這個邏輯要被抽成可重複性的邏輯，所以 HOC 可以是一個叫 `withtoggle(<Component/>)`，又稱具有 toggle 功能, 的 Component。

# HOC  的架構
最基本的架構是包裹著另一個 Component，回傳的是一個新的 Component。其他參數可以自訂，也可以傳入想要共同使用 data。
>  HOC 是一個 pure function (same input ,same output)，不具有副作用 (side effects)

```jsx
const NewComponent = higherFunction(WrappedComponent);
```

HOC **不是用繼承的方式** 來產生新的 Component ，而是 **composed** (重組)。
可以看是一個新容器 (Container)。其參數是不限的，另外 HOC 不管資料的來源出處，它只是負責開一個通道，讓被包住的 Component 省去做重複動作。

functional Component
```jsx
const EnhancedComponent = (WrappedComponent) =>{
	return function (props){
		// 記得把 props 還回去
		return <WrappedComponent {...props}/>
	}
}
```

class Component
```jsx
const EnhancedComponent = (WrappedComponent) =>{
	return class extends React.Component{
		return(){
			// 一樣要把 props 還回去
			return <WrappedComponent {...props}/>
		} 
	}
}
```

這裡的 `{...props}` 是 `<NewComponent>` 傳入的 props。

例 : `<WithToggleCompoent index="1"/>` 像是 index 這個 props，在不影響原本 `<WrappedComponent/>`情況下把 `props` 都塞回去。如果沒有 `{...props}` 這步驟，就不會接收到 HOC 包裹的效果。

# 橫切關注點 (Cross-cutting concern)
邏輯是透過 HOC 攜帶的，並不是硬生生嵌入在某元件的程式碼中，有助於 **橫切關注點**。

範例情境 : 
1. 有一 a 元件需要附帶 A 功能，功能 A 被開發，由於目前只有 a 元件需要，直接將邏輯寫死在 a 元件上。
2. 某一天 a 元件需要被更新改成 b 元件，其中 A 功能需要被保留，其餘都不要，這時候需要挖出 A 功能的代碼並進行重構。
3. 那如果某天 b 元件又不要 A 功能呢 ? 

> 導致元件的代碼就會一直被重構😵，是很糟的行為

橫切關注點的概念使得 A 功能被抽取出來，並採用 **添加** 的方式加到需要的元件身上。邏輯被分開的狀況，如果突然不想要 A 功能隨時都抽取掉，原本的元件也不會被受影響。

HOC 之所以說是加強版的元件，它追加新的功能在原本的元件上，但也不影響原本的元件。

# 實作練習
codepen 👉 [React - HOC practice](https://codepen.io/shan473/pen/WNzjdmJ)   

凡是有操作開開關關的 Component ，包成 `withToggle` 的 HOC，把同樣的 **開關邏輯** 抽出來。以 W3school 的 [Navbar](https://www.w3schools.com/howto/howto_js_sidenav.asp) 與 [Accordion](https://www.w3schools.com/howto/howto_js_accordion.asp) 為例。

## HOC withToggle
- 建立一個 HOC - `withToggle`
```js
const withToggle = (Component) => {
  return function(props){
    const [open,setOpen] =React.useState(false);
    const togglehandler = ()=> {setOpen(prevOpen => !prevOpen)}

    return (
      <Component open={open} togglehandler={togglehandler} {...props}/> 
    )
  } 
}

// 使用 
const AccordionWithToggle =  withToggle(Accordion);
const NavbarWithToggle = withToggle(Navbar);
```
主要傳入的 props 是 `open` 的 state ，與 `togglehandler` 這個 method

## Accordion
基本的 Accordion (手風琴)，手風琴最重要的就是改變 `maxheight` 讓內容伸縮。
```js
function Accordion({open,togglehandler,index}){
	// 1. 內容的高度資料
 const [panelheight,setPanelHeight] = React.useState(0)
 /* 
	 2. 使用 callback ref，透過 ref 拿到 DOM 內容的高度，並根據 開關 open 來決定高度
 */
  const panelref = React.useCallback((node)=>{
     if(node!==null){
        if(!open){
          setPanelHeight(node.scrollHeight)
       }else{
         setPanelHeight(0)
       }
     }
   },[open])

  return (
  <div> 
  {/* 3. 填入 HOC 傳入的 togglehandler */}
    <button className="accordion" onClick={togglehandler}>Section {index+1}</button>

		{/* 4. 改變 maxHeight */}
    <div className="panel" ref={panelref} style={{
          maxHeight: panelheight+'px'
        }}>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </div>
  )
}
```

## Navbar fullwidth
重點是改變 `width`
```js
function Navbar({open,togglehandler,type}){
	// 1. width 的 state 
  const [width,setWidth] = React.useState(0)
  
  // 2. 監聽 open 的變化
  React.useEffect(()=>{
    if(open){
      setWidth('100%')
    }else{
      setWidth(0)
    }
  },[open])
  
  return (
    <div>
	   {/* 3. 改變 width */}
      <div className="sidenav" style={{
          width : width
        }}>
        <a href="javascript:void(0)" className="closebtn" onClick={togglehandler}>&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      {/* 4. 填入 HOC 傳入的 togglehandler */}
      <button onClick={togglehandler}>open</button>
    </div>
  )
}
```

## 效果
![](https://i.imgur.com/6tr37Nj.gif)
如此一來我們只要幫元件包上 `withToggle` 都可以擁有開開關關的功能。  
看到 w3school 的 Navbar 範例有很多款，我決定再來實作可以依照不同類型產生客製化的 Navbar😎。

## 再包裝 Navbar : withNavbarType
不同的 type ， width 不一樣。一開始新增 type 的參數來達成效果。
```js
// 利用 Object bracket notation 的特性，帶字串當索引
const Navtype = {
  Full : '100%',
  Overlay: '250px',
}

const withNavbarType =(CoreComponent,type) => {
  return (props)=>{
      return <CoreComponent type={Navtype[type]} {...props}/>
  }
}
// 使用
const FullNavbar = withNavbarType(withToggle(Navbar,'Full'))
```

但又覺得這樣很不優雅😵，想變成 `const FullNavbar = customNavbar(type)` ，讓每次輸入都只剩一個參數 (柯里化)
```js
const Navtype = {
  Full : '100%',
  Overlay: '250px',
}

// 1. 讓 type 成為最後一個參數，只要添入對應字串就好
const withNavbarType =(CoreComponent)=> (type) => {
  return (props)=>{
      return <CoreComponent type={Navtype[type]} {...props}/>
  }
}
// 2. 把原本的功能加一加，變成 客製化的 Navbar
const customNavbar = withNavbarType(withToggle(Navbar))

// 3. 帶入想要的 style string 就可以產生對應的 Navbar
const FullNavbar = customNavbar('Full')
const OverlayNavbar = customNavbar('Overlay')
```

接著修改 `<Navbar/>` 的其中一個部份
```js
React.useEffect(()=>{
	if(open){
		// 改成按照 prop 傳入的 type 改變 width
		setWidth(type)
	}else{
		setWidth(0)
	}
},[open])
```

搭啦 ! 就可以擁有不同的客製化 Navbar。
![](https://i.imgur.com/Hq7kYZg.gif)
好處是 **不用在原本的 Navbar 元件內判斷 type 是什麼才做不同的 width 變化** ，只要專注在 Navbar 的功能就好。
```js
// ❌ 我覺得不是很好的 pattern
React.useEffect(()=>{
	// 😵 如果沒有抽出來，在元件裡面判斷
	let finallywitdh;
	switch(type){
		 case 'Full':
			 finallywitdh = '100%'
			 break;
		case 'Overlay':
			finallywitdh = '250px'
			break;
	}
	if(open){	
		setWidth(finallywitdh)
	}else{
		setWidth(0)
	}
},[open])
```
在這個 Navbar 例子中，我使用 HOC 在包裹著另一個 HOC，讓元件可以往上追加想要的資料或功能。

# 慣例 : 使用 HOC 傳遞不相關的 props 
慣例是 React 官方建議的操作習慣。  
[🔗章節連結](https://zh-hant.reactjs.org/docs/higher-order-components.html#convention-pass-unrelated-props-through-to-the-wrapped-component) 

有些 props 傳進來可能是 **作為運算使用**，傳入的 props 並非全部都要傳進 `<WrappedComponent/>` 而是經過一些運算後留下 `<WrappedComponent/>` 需要的。

通常會傳給 `<WrappedComponent/>` 的 props 通常是 state 或是在 HOC 定義的 method。

> 重點在於 **只關注想要的資料**，可以在 HOC 傳入不相關的沒關係，HOC 的 props 傳至 `<WrappedComponent/>` 之前可以篩選出哪些 props 要繼續傳下去。

這樣的好處是讓 HOC 更加彈性化。
```jsx
render() {
  /* 
	  props 傳進來的不一定跟 WrappedComponent 有直接關係，HOC 是一個容器，將關注於想要的資料傳給 WrappedComponent
  */
  const { extraProp, ...passThroughProps } = this.props;

  /* 
	  特別提出要被傳入的 props，通常是 state 或是 methods 
  */
  const injectedProp = someStateOrInstanceMethod;

  // 用 props 傳給 WrappedComponent
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```
以官方的例子來說，HOC 包含資料，但是資料在 A 元件中只要 a 部分，B 元件中只要 b 部分，但他們的 **來源都是同一個資料**。

這時候可以透過傳入的 prop 拿出不同的資料，傳進 `<WrappedComponent/>`。    
```js
const withData = (Component,data)=>{
	return (props)=>{
		// 1. 不同的 props 抽出來
		const {dataType,...restprops} = props
		// 2. 按照 type 再來取出不同的 data
		const needData = data.filter( x => x === dataType)

		return <Component data={needData} {...restprops}/>
	}
}
```
一開始我有點看不懂這個例子，想不到應用的例子。原本只知道可以 **加功能**，但沒有想過類似分類篩的概念，經過幾次的實作突然就悟了😂。

# 慣例 : 最大化的可組合性 (Maximizing Composability)
HOC 的寫法可以只回傳一個參數，也可以回傳好幾個參數。HOC 並沒有特別限制傳遞的參數量，但是那顯得很冗長，盡可能讓 HOC 只接收一個參數。

像 React-redux，使用 `connect()()` 這樣呈現
```jsx
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```
把上面的分開解析 : 
```js
// connect 是一個 function ，功能是回傳另一個 function
const enhance = connect(commentListSelector, commentListActions);
// 回傳的是一個 HOC，是跟 Redux store 連結的 Component
const ConnectedComment = enhance(CommentList);
```
>  簡單來說 : HOC 包住另一個 HOC

如果 HOC 數量一多，寫起來就會變得很冗長，這時候可以運用 compose (組合) 的概念
```jsx
// 😵 不應該一層包一層
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// 可以運用一個 function 將傳入的 HOC 打包成捆，compose 是別處地定義組合 function 的方法
const enhance = compose(
  // 這邊的 HOC 只接收一個參數
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```
也有其他的 library 可以幫助把 HOCs 打包成捆，例如 : 
-  lodash.flowRight
- Redux
- Ramda

我覺得就是 **柯里化** (curried function)，使 function 每次都只接收一個參數，並且同時是 pure function。

# 慣例 : 用 displayName 取名字幫助 Debug
HOCs 是 Container 的概念，如果結構上是使用 :  
```js
const withToggle = (WrappedComponent)=> (props)=> {
	// ...
	return <WrappedComponent {...props}/>
}
```
匿名的 arrow function，在 Debug 會傻傻搞不清楚。

從實作範例打開 devtool 來看，用 HOC 包過的元件都只顯示 **Anonymous**
![|200x250](https://i.imgur.com/V4Uk0fb.png)

Navbar 有 `Full` 跟 `Overlay` 兩種，但在這邊是看不出來的。主要原因就是上面提到的結構，重點是 **讓內部的 function 擁有名字**，必須獨立出來。可以先把它一步步給解開來
- 在內部取名 : 
```js
const withToggle = (WrappedComponent)=> {
	// 第一種 : 直接寫成 function statements
	function newComponent(props){
		//...
		return <WrappedComponent {...props}/>
	}
	// 第二種 : 寫成 function expressions
	const newComponent = (props)=>{
		//...
		return <WrappedComponent {...props}/>
	}
	// 1. 讓被包成 HOC 的元件拿到原本 WrappedComponent 的名稱(例如 : "Navbar")
	newComponent.displayName = `withNavbarType(${getDisplayName(WrappedComponent)})`
	return newComponent
}

/* 2. 官方寫法 : 讀取到被包裹的元件原名稱 */
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```
- 外部命名 : 直接替生產出來的 HOC 命名
```js
// 第一種 : 直接附加屬性
const AccordionwithToggle =  withToggle(Accordion);
AccordionWithToggle.displayName = "withToggleAccordion";

// 第二種 : Object.assign，物件上 + 物件屬性
const AccordionwithToggle = Object.assign(withToggle(Accordion),{
	displayName: 'withToggleAccordion'
})
```
![|250x250](https://i.imgur.com/e3103Wo.png)  
`withToggle` 我沒有在內部命名，而是在 `Accordion` HOC 上命名，所以自然在 `Navbar` withToggle 會看到匿名。

displayName 這個屬性是 React 提供我們替 Component 取不同的名稱時，在 devtools 上觀察，方便 Debug。  
如果有使用 Context API ，其實也是同個概念，Context 中的 Provider 可以放在 APP 以下的樹狀位置，也可能出現複數個，這時候可以替 Context 命名方便查看。

在內部取名就是讓 function 露出名字，雖然 `function expressions` 對於內部是匿名的，但我們只在乎最外部 function 的名稱。

另外像上面寫的 `withNavbarType()` 這樣包裹起來，括號以外的會在外部 (圖中灰色方塊區)，類似 Component 的附加訊息，但被括號包裹住的最裡面才是顯示元件的 displayName。

# 注意 : 不要直接修改到原本的 Component
- 假如我們要操作有關元件的生命週期，不應該直接修改元件的 prototype
	```js
	// ❌ 壞透了
	function logProps(InputComponent) {
	  InputComponent.prototype.componentDidUpdate = function(prevProps) {
	    console.log('Current props: ', this.props);
	    console.log('Previous props: ', prevProps);
	  };
		// InputComponent 本身已經被改變
	  return InputComponent;
	}
	
	// EnhancedComponent will log whenever props are received
	const EnhancedComponent = logProps(InputComponent);
	```
	導致所有傳進來的 Component  被改變，`componentDidUpdate` 這個方法都被 修改/覆寫 了，HOC 不能被重複使用，因為 function component 並沒有生命週期的方法。

- 利用 composition 的概念
	```js
	// ✅ composition
	function logProps(WrappedComponent) {
		// 用新的 Component 包裹傳入的 Component，不去影響到原本的 Component
	  return class extends React.Component {
	    componentDidUpdate(prevProps) {
	      console.log('Current props: ', this.props);
	      console.log('Previous props: ', prevProps);
	    }
	    render() {
	      return <WrappedComponent {...this.props} />;
	    }
	  }
	}
	```

# 注意 : 不要在 render function 使用 HOC
function 是 Object 的一種，每次 re-render 都是新的 function (object)，造成效能上的浪費。所以要在外部產生 HOC 再帶入新的 Component 中。

> 簡單來說 : **{ } !== { }**，要避免這種情況發生

```js
// ✅ 這是 ok 的，AccordionwithToggle 不會因為 App re-render 而改變
const AccordionwithToggle = React.memo(withToggle(Accordion))
function App(){
	const [count,setCount] = useState(0)
	return (
		<div>
			<AccordionwithToggle/>
			<button onClick={()=>{ setCount(count+1) }}></button>
		</div>
	)
}

// ❌ 每次 App re-render 都是重新呼叫 function,產生新的 Accordion，React 會將全部替換，因為跟上一次的 Accordion 不一樣。
function App(){
	const [count,setCount] = useState(0)
	// 每次都是新的
	const AccordionwithToggle = React.useMemo(withToggle(Accordion),[])
	return (
		<div>
			<AccordionwithToggle/>
			<button onClick={()=>{ setCount(count+1) }}></button>
		</div>
	)
}
```
codepen 中預設的引入的 React script 是 production mode，是不能使用 React 的 profiler... 的。
要麼改成 development，在 html 添加這兩行，並且把編輯器的 `External Scripts/Pens` 取消。
```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```
- in render
![|600x350](https://i.imgur.com/GgF9oDS.gif)
- outside  
![|600x350](https://i.imgur.com/j4Uec3j.gif)

以肉眼來看，當 App 的 state 改變，進行 re-render，如果是在 render 產生的 `<Accordion/>`會閃一下，因為對 App 來說 `<Accordion/>` 是新物件，等同於產生新的 DOM 節點 並且 repaint 。放在外部的話，就沒有這個問題。

# 注意 : refs 並不會被傳遞
**refs** 不是 props 的一種，就像 `key`，是由 React 來控制的。就像你不能在子元件中拿到 `❌props.key`。如果在 HOC 使用 ref，接收到 ref 的不會是 WrappedComponent，而是 HOC 本身。

要使 WrappedComponent 能夠接收 ref ，必須使用 `React.forwardRef`[^1]。

`React.forwardRef` 包住的 Component 可以接收 **ref** (這裡的 ref 是 forwardRef 刻意為之)。
- `withtoggle` 為例，改成 **withToggle2**
```js
const withToggle2 = (Component) => {
	/* 接住上層傳下來的 ref */
  return React.forwardRef((props, ref)=> {
    const [open, setOpen] = React.useState(false);
    const togglehandler = () => {
      setOpen((prevOpen) => !prevOpen);
    };
	    /* 😵 Wrapped Component 不能使用 ref 這個字眼接 ref ，要取別名接 */
      return <Component open={open} togglehandler={togglehandler} {...props} forwardRef={ref} />;
    }) 
};

// App 產生新的 ref
function App() {
  const SpecialRef = React.useRef('hello')
  
  return (
    <div>
      {/* 使用 ref 直接傳 */}
      <AccordionwithToggle2 index="special" ref={SpecialRef}/>
    </div>
  );
}

// 在 Wrapped Component 從 prop 接收 ref 
function Accordion({ open, togglehandler, index,forwardRef }) {
  // 略
  console.log(forwardRef) // 結果 hello
  return (
	  //...略
  )
}
```
值得注意的是，只有在產生 Ref 的同一層可以直接使用 ref ，例如 : 
- App 在這裡 `createref / useRef` 👉  `<AccordionwithToggle2 ref={✅} />` 
- HOC 裡面的 `<WrappedComponent/>` 不能使用 ref 傳，要取別名。 HOC 👉`<WrappedComponent ref={❌} forwardref={✅} />`

# 總結
關於 HOC 的特點
1. 是一個 Design Pattern ，可以提高 Component 重複性
2. 是一個 function ，包裹另一個 Component，回傳新的 Component，又稱 **加強版 Component**，並且不會影響到包住的 Component 。

HOC 最常比較的還有 render props 這個 Pattern，差別可以參考
- [HOC 與Render Props，談我從她們身上學到什麼. 前言 | by Wendell Liu | Frochu | Medium](https://medium.com/frochu/hoc-%E8%88%87renderprops-%E8%AB%87%E6%88%91%E5%BE%9E%E5%A5%B9%E5%80%91%E8%BA%AB%E4%B8%8A%E5%AD%B8%E5%88%B0%E4%BB%80%E9%BA%BC-2681ab4cc453)
- [Avoiding HOC; Favoring render props · GitHub](https://gist.github.com/heygrady/f9bf3b6dd93fe3d87ba87430fd3c20d5)

[^1]: 補充 HOC 的 ref 問題 : [傳送 Ref – React](https://zh-hant.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)