---
date: 2022-07-28 12:29:12
title: React - 淺談狀態管理
author: Rosa Hong
tags: React
categories: [Front-end,React]
description: 
---
> 文章來自 :
> -  [Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react) [^1] 

## 摘要
管理 state 有很多不同的方式，作者用慢慢推進講解改進的方式，以下是不用 redux 的方式

1. 提升 State (lifting the state)
2. 把 component 重組 (component composition)
3. 使用 Context API
   - Context + useState
   - Context + useReducer

## 提升 State 的方式
這是最常看見的，但會有 prop drilling 的問題。
原本 count 只存在於 `<Counter/>` 當中，這時候 Display 也要用到 count ，把 state 提升到兩人的上一層，共享 count 值。 
```jsx
function Counter({count, onIncrementClick}) {
  return <button onClick={onIncrementClick}>{count}</button>
}

function CountDisplay({count}) {
  return <div>The current counter count is {count}</div>
}

function App() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return (
    <div>
      <CountDisplay count={count} />
      <Counter count={count} onIncrementClick={increment} />
    </div>
  )
}
```

## component 重組
把只負責傳遞的 Component 提出來，並透過 `props.children` 把內容填上，這種技巧可以將簡單的 Component 逃離 prop drilling 的魔掌。

另一個比較清楚的範例 : [Using Composition in React to Avoid "Prop Drilling" - YouTube](https://www.youtube.com/watch?v=3XaXKiXtNjw)。影片作者提到，有人建議只要跨超過一層的 props 就應該直接使用 Context，但其實大可不必，連 React 官方[^2]其實都建議，如果只是純粹不想傳多層，可以利用 component composition 的方法改善。

```jsx
function App() {
  const [someState, setSomeState] = React.useState('some state')
  /*
     someState 會被傳給需要的子元件
  */
  return (
    <>
      <Header someState={someState} onStateChange={setSomeState} />
      <LeftNav someState={someState} onStateChange={setSomeState} />
      <MainContent someState={someState} onStateChange={setSomeState} />
    </>
  )
}
```
把 React Element 都拆開在 props 中，但是程式碼變得很髒，作者說這是個做作 (contrived) 的 component 😂。

把 `<LeftNav>` 與 `<MainContent>` 拆開，用 props.children 直接放入需要取得 state 的 component 
```jsx
function App() {
  const [someState, setSomeState] = React.useState('some state')
  return (
    <>
       {/* 這裡的 prop 是一個 React Element */}
      <Header
        logo={<Logo someState={someState} />}
        settings={<Settings onStateChange={setSomeState} />}
      />
      <LeftNav>
        <SomeLink someState={someState} />
        <SomeOtherLink someState={someState} />
        <Etc someState={someState} />
      </LeftNav>
      <MainContent>
        <SomeSensibleComponent someState={someState} />
        <AndSoOn someState={someState} />
      </MainContent>
    </>
  )
}
```

## 使用 Context API
### useCount : customHooks
抽出成獨立的 Hooks 在裡面使用 Context[^3] 
```jsx
import * as React from 'react'

const CountContext = React.createContext()

/* 
   ⭐這裡做了一個錯誤處理，如果有 Consumer 上面沒有 Provider 而跳出錯誤。
   在 TS 裡要定義 undefined 的問題
*/
function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  return context
}

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  /*
     因為每次 setCount 都會產生新的 function ，所以要先用 useMemo 把值記住。 
  */
  const value = React.useMemo(() => [count, setCount], [count])
  return <CountContext.Provider value={value} {...props} />
}

export {CountProvider, useCount}
```


### 直接使用 useCount 取得 value
> [!NOTE] 換句話說 再 換句話說
> `const [count, setCount] = useCount()` 這句一開始不太懂為什麼可以直接用 useCount 取到 array。  
> `useCount() == context` 也就等於 Provider 提供的 value 的值，所以直接看成  `<Provider value={useCount()}>`


```jsx
import * as React from 'react'
import {CountProvider, useCount} from './count-context'

function Counter() {
   /* 2022-07-14 11:48 
      這裡我不太懂為什麼，會長出這兩個
      useCount 不是只有 context 嗎 ?
   */
   /* 2022-07-14 11:52
      ✅我懂了!，useCount 其實就是等同於 Provider 的 value
      所以才能被寫成 [count, setCount]
   */
  const [count, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>{count}</button>
}

function CountDisplay() {
  const [count] = useCount()
  return <div>The current counter count is {count}</div>
}

function CountPage() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}
```

另一種方式，是把相關資料跟操作都當作 `useCount` 的輸出，直接在這邊輸出 state 跟定義好要使用的 function
```jsx
function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }

   /*
      不用等到元件內 useCount 在解構，這邊直接解構當作輸出
   */
  const [count, setCount] = context
   /*
      定義方法，setCount 用 function 是確保 state 的正確性
   */
  const increment = () => setCount(c => c + 1)
  return {
    count,
    setCount,
    increment,
  }
}
```
使用時直接透過 `useCount` 解構出需要的值，Component 就被分得乾乾淨淨的
```jsx
function Counter() {
  const {count, increment} = useCount()
  return <button onClick={increment}>{count}</button>
}

function CountDisplay() {
  const {count} = useCount()
  return <div>The current counter count is {count}</div>
}

function CountPage() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}
```

## 🛠️效能上 (performance) 的問題
1. 不要把資料全打包往下傳，最好的方式將邏輯分開，把 [[React - Context API#如何改善 Context 的效能問題 | 不相關的 state 分成不同的 Provider]] 來解決強迫 re-render 的問題。
2. 優化 Context Provider (🛠️補連結)
3. 使用第三方 state management 函式庫 eg : [jotai](https://github.com/pmndrs/jotai)、[Recoil](https://recoiljs.org/)，這兩個都利用 atom (原子) state management 的概念。

## 總結
**Context API + useReducer** 是這次學到最多的，我沒想過這樣使用。另外傳入的值是 array ，避免每次都 re-render ，可以透過 `useMemo` shallowEqual 後再 bailout。

重點 : 
1. 不是所有的東西都要被儲存成一個 state。保持分開的邏輯，最好透過多個 Context Provider 的方式。 
2. 把要用的資料放置在越近的地方越好

作者有提到伺服器端 UI state 的問題[^4]，由於我還不是很熟 Server 端的東西，暫時就不著墨了


[^1]: 翻譯版 : [React 应用状态管理 | The Road](https://liyanlance.github.io/docs/react-state-management)
[^2]: [Context – React](https://reactjs.org/docs/context.html#before-you-use-context)
[^3]:複習 Context 用法 : [[React - Context API]] 
[^4]: 我還沒補上的 : [Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react#server-cache-vs-ui-state)