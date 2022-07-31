---
date: 2022-07-31 05:31:43
title: 筆記 | React - Context API
author: Rosa Hong
tags: React
categories: [Front-end,React]
description:
---
> 文章來自 : 
> 1. [Using Context API in React (Hooks and Classes) | Tania Rascia](https://www.taniarascia.com/using-context-api-in-react/)
> 2. [Context – React](https://reactjs.org/docs/context.html#gatsby-focus-wrapper)

## 摘要
主要以 Class Component 為主
1. 使用 Context 的時機
2. 如何使用 class Component 的 ContextAPI
3. Context 缺點

<!-- more -->
## 什麼時候用 Context ? 
在 React 中，當這個值想要共享的範圍很廣，擴及多個 Component ，意味著變成 **global** ，可以使用 Context 來避免 props 傳遞至太深的地方 (又稱 `props drilling`)。

常見使用 Context 範例 :
- 使用者登入的狀態、資料 : 元件操作之權限
- 網頁主題 (theme) : 不同元件需要更換顏色
- 偏好語言 : 文字資料切換

## 或許不用 Context
```jsx
// 最上層接收 props 後往下傳
<Page user={user} avatarSize={avatarSize} />

// 中間幫忙傳遞而已
<PageLayout user={user} avatarSize={avatarSize} />
<NavigationBar user={user} avatarSize={avatarSize} />

// 內部終於拿到 props
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```
`user` 跟  `avatarSize` 不斷地被重複提到。
如果只是避免傳遞 props 到每一層，你應該做的是 **提出來並重構[^1]** (component composition)，而不是使用 Context 。

## Context.createContext
建立 Context，主要是建立 `Provider` 與 `Consumer`
```jsx
const MyContext = React.createContext(defaultValue);
```
defaultValue 可以設定預設值，例如對於 **主題** 來說，可以先預設 `theme.dark`

```jsx
const theme = {
   light: {
      background : '#fff';
      text : '#000'
   },
   dark:{
      background : '#000';
      text : '#fff'
   }
}
const ThemeContext = React.createContext(theme.dark);
```
並且 **defaultValue 是給沒有被 Provider 包住 Component**，對 Consumer 並沒有影響。 

>Note: passing **undefined** as a Provider value does not cause consuming components to use defaultValue.[^2]

如果把 Provider 的 value 設成 `undefined`，也不會是 defaultValue

👉試著實作 [React Context Provider value as undefined](https://codepen.io/shan473/pen/XWEjrQy)。

### default Value 的用意
那我就好奇了，defalut value 的用意在哪裡 ?   
我找到這篇
>This is helpful for testing components in isolation without wrapping them, or testing it with different values from the Provider.[^3]

default value  是不在 Provider 裡面的 component，如果試圖用 Context 會拿到 createContext defalutValue 的值。

👉試著實作 [React Context - out of Provider component get Context](https://codepen.io/shan473/pen/LYdRYZV?editors=0010)

好處是提高測試性，可以獨立測試 component。

## Context.Provider
Context 翻譯是上下文，上有 Provider 下有 Consumer。
Provider 可以將提供 value 給 Consumer 使用 : 
```jsx
// Primative type
<Context.Provider value={'hello world'}>
   //...
</Context.Provider>

// Object type : 注意物件型別的問題
<Context.Provider value={[1,2,3]}>
   //...
</Context.Provider>
```
每一個 Consumer 都會監聽 Provider value 的變化。
一個 Provider 底下可以有很多個 Consumer，也可以被底下的其他的 Provider 覆寫。

### render 的問題
> 當 Provider 的 value 改變時，所有的 Consumer (包含使用 contextType 與 useContext) 都會被強迫 re-render。

變化是傳遞到所有 Consumer 元件，這種更新是不受 shouldComponentUpdate 控制，即使父層沒有變化，還是會被迫更新，

決定 value 改變的比較方式是 `Object.is`。

> [!NOTE] **Object.is** v.s === & ==
> - **==** 會強制轉型，undefined、null 等等會被強制轉為 falsy
> - **===** 比 == 多比較型別，但與 Object.is 不同的是  

| 比較相同  | Number.NaN & NaN | +0 & -0 |
| --------- |:----------------:|:-------:|
| Object.is |       true       |  false  |
| ===       |      false       |  true   |
| ==        |      false       |  true   |

如果 value 是 Object type 會讓底下的子孫代 component 強迫 re-render，簡單來說 `{} !== {}` 或是 `[] !== []`。

### value 是 Object Type 的問題
```jsx
<Context.Provider value={[1,2,3]}>
   //...
</Context.Provider>
```
value 如果是物件型別，每次 render 都會重新建立，如果是頻繁變動的 context ，可以把控制權交給 React 的 state，**提升 state 到 parent component**。

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Context.Provider value={this.state.value}>
        <Toolbar />
      </Context.Provider>
    );
  }
}
```

## Consumer
Consumer 使用的 context 是在樹狀中最鄰近 Provider 的 value。
class Component 建立 Consumer 有 $2$ 種方式，並且用於不同情境    
1. `<Context.Consumer>` :
   - 僅有 `render()` 可以使用
   - 可以同時使用多個 Context 
   - 優化 Context ，拆分成好幾個 Consumer
2. `contextType` :
   - 所有生命週期內可以使用，並使用 `this.context` 取得值
   - 只能應用一個 context

在 Hooks 中只要用到 `useContext` 就可以拿到 context value。
```js
const value = useContext(MyContext)
```

### Class.contextType
**在生命週期內使用 context**，可以在 class 內部加上 static 的 contextType，或是在外部加。
使用時可以直接用 `this.context` 取得 value 的值。

```jsx
import MyContext from './MyContext'
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
  }
  componentDidUpdate() {
    let value = this.context;
  }
  componentWillUnmount() {
    let value = this.context;
  }
  render() {
    let value = this.context;
  }
}
// 在外部指定
MyClass.contextType = MyContext;
```
也可以使用 class 中的 `static` 
```jsx
class MyClass extends React.Component {
   static contextType = MyContext
   render(){
       let value = this.context;
   }
}
```

### Context.Consumer
有別於 `this.context` 的方式，`Context.Consumer` 是透過 **props** 取的 context 的值，就像 functional component 一樣，使用 props 並 return React Node。
這種方式是 Render Props[^4] 的技巧，等同把 React Element 當作 props 來傳遞。

```jsx
class MyClass extends React.Component {
   render(){
      return(
         <MyContext.Consumer>
           { props => {
                 return (
                    <div>
                       {props.value}
                    </div>
                 )
              }   
           }
        </MyContext.Consumer>
      )
   }
}
```

## Context.displayName
替 context 取別名，在 React 的開發工具之下，會使用 displayName 的值來顯示這個 context。
我比較常看見在 UI 函式庫看到這樣的用法，例如 : [React-Boostrap - Accordion](https://github.com/react-bootstrap/react-bootstrap/blob/master/src/AccordionContext.ts)

範例 :
```jsx
const context = React.createContext<AccordionContextValue>({});
context.displayName = 'AccordionContext';

export default context;
```

如果在同一個 Component 有多個 Provider ，在 DevTools 只會出現 `Context.Provider`
![#small](https://i.imgur.com/TCVpxYH.png)
重複的 Context.Provider 造成 Debug 困難，這時候可以使用 displayName 將不同 context 分開。

## Multiple Context
最好不要把所有用到的值都塞進同一個 Context，這就會導致非相關的 component 強制更新，優化的方式就是拆成好幾個 Provider 與 Consumer ，將明確的界線劃分出來。

範例 :  theme 跟 user 分開成不同的 context
```jsx
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

## Context 的優缺點
- 優點
   1. 改善 props drilling 的問題，跳過 intermediate component ，把值直接給想要的 component。
   2. 在小型的 APP 中，可以快速解決 global 的問題，不用用到 React-Redux
- 缺點
   1. 效能上的問題，只要 value 中的值更新，其底下所有套上 Consumer 的元件也會被強迫更新
   2. 當 APP 擴展共享值越多時，使用 Context 會造成效能上的問題。
   3. 不適合用 **頻繁** 改變的值
   4. 耦合性高，不好做測試

## 如何改善 Context 的效能問題
Dan 大提供 $3$ 種優化 Context 的方式[^5]，主要以 Hooks 為主。

1. 分開不同的 Context，跟上面 [[#Multiple Context | 多個 Context]] 是一樣的意思，只有用到 theme 就拆成 themeContext，不要跟其他 Context 包在一起。**分開 Context 這是最好的方式**
2.  `memo` 作為 component 的 props 觀察需要**需要變化的 value**。
 Button 主要是接收 Context 的容器，將 theme 給分離出來。
 ```jsx
 function Button() {
    let appContextValue = useContext(AppContext);
    // 把 theme 從 Context 提取出來
    let theme = appContextValue.theme;
    return <ThemedButton theme={theme} />
 }
 // 當 theme 沒有改變的時候，就不會 re-render
 const ThemedButton = memo(({ theme }) => {
    // 剩下的邏輯
    return <ExpensiveTree className={theme} />;
 });
 ```
3. `useMemo` : 如果全部塞在同一個地方，這裡的 `useMemo` 記住 React Element，並監聽 theme 是不是有改變。
   ```js
   function Button() {
     let appContextValue = useContext(AppContext);
     let theme = appContextValue.theme; // Your "selector"
   
     return useMemo(() => {
       // The rest of your rendering logic
       return <ExpensiveTree className={theme} />;
     }, [theme])
   }
   ```

`memo` 與 `useMemo` 都是額外交給 React 處理，因此效能上不一定保證能優化，是需要去權衡的 (React 將優化流程的方式稱作 **bailout**)。

## 總結
- 建立 Context 使用 `createContext()`
- Context 提供 `Provider` 與 `Consumer`，Provider 的 `value` props 就是傳遞下去的值；接住值使用 Consumer 。
- 如果 value 是 Object type ，最好提到 Component 之外建立，或者只用 state 。
- 不相干的 Context 最好分開來，避免造成效能上不必要的 render


[^1]: [Composition vs Inheritance – React](https://reactjs.org/docs/composition-vs-inheritance.html#containment)
[^2]:[Context -  default Value – React](https://reactjs.org/docs/context.html#reactcreatecontext)  
[^3]: default 的用意 :  [javascript - React.createContext point of defaultValue? - Stack Overflow](https://stackoverflow.com/questions/49949099/react-createcontext-point-of-defaultvalue)
[^4]:把 React Element 當作 props 傳遞[Render Props – React](https://reactjs.org/docs/render-props.html)
[^5]: Context 預防 re-render : [Preventing rerenders with React.memo and useContext hook. · Issue #15156 · facebook/react · GitHub](https://github.com/facebook/react/issues/15156#issuecomment-474590693)
