---
title: 筆記 | React - 重新了解 useEffect
tags: React
categories: [Front-end,React]
author: Rosa Hong
date: 2022-08-14 11:27:57
---
> 文章來自 : [useEffect 的完整指南 — Overreacted](https://overreacted.io/zh-hant/a-complete-guide-to-useeffect/)
                           
## 摘要
1. useEffect 的基礎概念
2. useEffect dependencies array 的使用方式

大部分都是來自原文的再翻譯，我有些比較不懂的部分就用自己的方式去解釋，也會用原始的 JS 實作的方式，跟著一步步編譯。

更重要的是，要用 React 的思維來去了解 `useEffect` 的內涵。

<!-- more -->

## React 的渲染機制 
了解 useEffect 之前，先來了解 `setState` 的時候會發生什麼事。
當我們 `setState` 時，React 會重新呼叫 Component function，並更新其值，接著 
React 把我們最新的值更新到 DOM 上。

而 `useEffect` 執行的時間點在 render 之後，為什麼 `useEffect` 會拿到舊的 state 跟 props ?
> 每一次都渲染都保有自己的 state 跟 props

我們試著把每次 render 拆開來
```jsx
// useState 
const [count,setCount] = useState(0)

// 第 1 次 render 是這樣
function Counter(){
  const count = 0
  //...
}
// 第 2 次 render
function Counter(){
  const count = 1
  //...
}
```
每次 render 重新呼叫 `Counter()` ，把 count 每次重新賦值，每次 render state 都會是獨立的。

什麼意思呢？🤔 就是你在一周目看到的資料，既然你在一周目取資料，那也只會拿到一周目的資料。並不能直接取二、三周目的東西。

`useEffect` 雖然是渲染後執行的，但他其實還是待在同一個時間線的渲染 (也就是同步的)，並不是真正意味上的「渲染 **後**」，別被文字搞混了。  

## render function 內的 function ? 
文中[^1]範例順序是
1. 把 state 加到 3
2. 按下 `alert` 按鍵 ( `setTimeout` for $3$ seconds , and 顯示 state ) 
3. 馬上把 state 加到 5，最後顯示是 ?

> 結果是 $3$ ，這裡是抓到 (capture) 按下按鈕的 **當下**

可以想像成聊天 app ，跟 A 聊天送出訊息，接著馬上切換跟 B 輸入訊息，確實是 A 收到訊息，並不是 B 收到。
在 class Component 跟 functional Component 兩種解決不同的問題 (閉包)

### function 內部所引用的 state 關係
從最根本的 JavaScript 來看，例子是從文章來的
```js
function sayHi(person) {
  const name = person.name;
  setTimeout(() => {
    alert('Hello, ' + name);
  }, 3000);
}

let someone = {name: 'Dan'};
sayHi(someone);

someone = {name: 'Yuzhi'};
sayHi(someone);

someone = {name: 'Dominic'};
sayHi(someone);
```
可以看到 `person.name` 一開始是 'Dan'，但是每次 `sayHi` 都會經歷以下步驟 : 
```
// 第 1 次 
name = Dan 
setTimout 拿到的 name 是外部的 name = Dan
// 第 2 次
name = Yuzhi
setTimout 拿到的 name 是外部的 name = Yuzhi
//...
```
用 JavaScript 來說就是閉包 (closure) 的概念，Call Stack 到 `setTimeout()` 的時候，`sayHi` 裡面宣告的變數會被儲存下來，存在內部，並沒有被回收掉，因此 `setTimeout()`  當下拿到的值是 **內部已經計算完且被記錄起來的值**，才會是捕獲 (capture) 當時的值。 

> `setTimeout` 拿到的值會是當下執行完所記錄下的值，這也說明了為什麼 useEffect 會拿到舊的 state : **當下的 `setTimeout()` 是拿閉包的值。**

### 回頭看 React 的 render 內部的 function
已經知道 `setTimeout` 會記錄下當次 render 的值，不管哪一次的 render ，它當次的 state 與 props 都會是一樣的。如果是不同次的 render ，它的 state 和 props 是獨立的，在事件 (event handler) 或事件內的非同步 (async/await) 事件也都是一樣的原則。

範例用 `inline function` 是安全的 (button 的 click 事件)，因為 state 的 count 不會每次都被變動 (意思應該是 **產生新的記憶體空間**，指跟 object type 的差別)，如果 state 是 object type 的類型，必須確保 object 是用 **Immutable** 的方式改變。

文中提到 `setState(newObj)` 是合理的，為什麼這麼說呢 ?
只要**記住每次 render 都有自己的 state 或 props** ，直接改改成 `newObj`是沒問的，對於前一次的 render 也是完整的值。
👉  [codepen 簡易範例，請看 useRef 變化](https://codepen.io/shan473/pen/jOzeWEb?editors=0011)

例如 : 結構類似，但是巢狀內部有部分改變 
```jsx
// 假如原本的 state
const state = {
  a : {
    b : 2
  }
}
const newState = {
  a : {
    b : 3
  }
}
// ✅ 刷新整筆資料，這樣沒問題
setState(newState)

// ❌ 直接對值內部些微調整，React 根本察覺不到，不會 re-render
setState(prevState => {
  prevState.a.b = newState.a.b
  return prevState
})
```
當我們要觸發 `setState` 時，React 會先經過 state 的淺比較 (shallow comparison)，如果直接改變並不會 re-render。

## 每一次 render 都它自己的 Effect
React 會記住每個 `useEffect`，觸發的時間點是每次改變 DOM 之後與 browser 渲染完之後才會呼叫。

概念上來說，effect 是這次 render 後的結果 (render 後才執行的)，但 effect 其實也跟上面提及的 [[#回頭看 React 的 render 內部的 function]] 章節一樣的概念，其 state 跟 props 是都是屬於當次 render 的，effect 也是。

## 每一次 render 保有它的所有東西
範例[^2] 。  
已經知道 function 每一次的 render 會計下 `useEffect`，並且拿到內部 `local state` 的值。

跟著 `setTimeout` 跑一次 : 
- 第 $1$ 次 render
  1. state 是 $0$
  2. React 記下 effect : 3 秒之後 You clicked 0 times
  3. `Counter` 回傳提交 UI 給 React 
  4. React 跟 DOM 溝通並且瀏覽器渲染了畫面
  5. `useEffect` 這時候呼叫 React 所記下的 effect ，等到 3 秒之後 : 印出 You clicked 0 times

接著按下 button 觸發 `setCount` 讓 count + 1，React 重新呼叫 `Counter()` ，進行第 $2$ 次渲染
- 第 $2$ 次 render
  1. state 變成 $1$
  2. React 記下 effect : 3 秒之後 You clicked 1 times
  3. `Counter` 回傳提交 UI 給 React 
  4. React 跟 DOM 溝通並且瀏覽器渲染了畫面
  5. `useEffect` 這時候呼叫 React 所記下的 effect ，等到 3 秒之後 : 印出 You clicked 1 times

後面以此類推。
function component 是這樣操作，但是 class Component 在處理 effect 時卻不是這樣的。

### 跟 class Component 的差別
範例[^3]
凡有關 effect 的操作會放在 `componentDidUpdate` 這裡，意思是  **state 或 props 變更之後要做什麼事**
```js
  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }
```
這裡的 `this.state.count`  都會是現在的 count，也就是按到 5 `setTimeout` 抓到的都會是 5 ，而不是 **當下** 觸發的 count。

每一次 render 都是呼叫內部的 `render()` function ， state 永遠是指像實例的 state。

複習一下 class component 的 React 生命週期是 
> 1. **Mouting** : constructor 👉 render 👉 capture refs and DOM 👉DidMount
> 2. **Updating** : render 👉 capture refs and DOM 👉DidUpdate

跟著 `setTimeout` 跑一次 :
- 第 $1$ 次 render **(Mounting)**
  1. `constructor` 初始化 ，state = 0 
  2. `render` 觸發 Counter 內部的 render ，並提交 UI 給 React 
  3. `capture refs and DOM` React 跟 DOM 溝通並且瀏覽器渲染了畫面
  4. `DidMount` 被呼叫，印出 : You clicked 0 times  

接著按下 button 觸發讓 count + 1，React 重新呼叫 Counter 的 `render()` ，進行第 $2$ 次渲染

- 第 $2$ 次 render **(Updating)**
  1. 此時 state 的 count = 1，`setState` 等同於執行到 `Counter.state.count = 1` (注意 : 但開發者不能直接在元件內部這樣做，React 幫我們做 )
  2. `render` 觸發 Counter 內部的 render ，並提交 UI 給 React
  3. `capture refs and DOM` React 跟 DOM 溝通並且瀏覽器渲染了畫面
  4. Counter 呼叫 `componentDidUpdate`，3 秒之後 Counter state 是 1，印出 You clicked 1 times  

好，這邊看起來沒問題🤔。

> 那麼不間斷按了 5 次，而且不等每次 `setTimeout` 的秒數跑完呢 ?     

等於 `Event Loop` 中的 Call Stack 還在排隊的情況，會一值重複 $1$ ~ $3$ 這個動作，但是到了 $4$ !!!

> Counter 呼叫  `componentDidUpdate`，3 秒之後此時的 State 是 ???

這時候 main thread 上的 Call Stack 跑完，Event Loop 的 stack 開始執行，此時的 `Counter.state.count =  5`，執行時印出 **You clicked 5 times** 並且依序印出 5 次 

要解決此問題很簡單，把當下的 `this.state.count` 取下來包給 `setTimeout` ，其實等同於 **closure** 的方式
```js
componentDidUpdate() {
    const count = this.state.count;
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  }
```
當非同步進入 `Event Loop` 跑去排隊的時候，這邊的 **count 已經被記起來了**，所以當 `setTimout` 到 Call Stack 的時候，就會是當次 render 的 count。

Closures 很好用，當我們把值關在內部，即使它脫離了 function ，下次再呼叫 function 時其值還是會被保留住不會改變。可以想成把它想成雷同 `const` 常數。

## 如何拿取最新的 state ?  
把握上面所提及的原則，**每一次 component 執行 render function，包含 事件、effect 甚至 timeouts 或是其他 API 都會記住當次定義的 props 或 state。**

這兩個範例其實是一樣的 : 
```js
function Example(props) {
  //📍 等到 render 之後才讀取 counter
  useEffect(() => {
    setTimeout(() => {
      console.log(props.counter);
    }, 1000);
  });
  // ...
}
// 📍 一開始把 counter 存起來
function Example(props) {
  const counter = props.counter;
  useEffect(() => {
    setTimeout(() => {
      console.log(counter);
    }, 1000);
  });
  // ...
}
```
>不管是先還是後去讀取值，拿到的 state 是相同的    
>  `useEffect` 已經記住當時的 state    
> state 跟 props 是不會變的  

如果我們試圖在上一次的 render function 取得最新的 props 或 state，這樣是逆流而上 (文章這麼說的🤔)。

有時候我們會需要在 effect 中拿到最新的值，而不是當下 render 所記住的值，這並不是什麼錯誤的操作，但我們可以使用 refs 達成目的。

refs 不會促使 React re-render，因為 React 確保它是不會被改變的(指不會因 render 產生新的記憶體位址，每次都指向同一個實體)。也可以想成 React 幫我們建立一個全域的物件，我們都是對同一個物件進行直接操作。

> 然而逆流而上是什麼意思呢 ? 🤔 

functional component 是利用閉包 (closure) 的概念，從 JS 的基礎概念來看，執行完 function 後由於裡面的變數還是存在於 function 內部 (沒有被回收)，但是存在內部的變數外部不能直接操作。

回到 `setState` 會觸發 re-render，重新呼叫 component function ，但在 effect 中仍是屬於上一次 render 的，當我們想在 effect 取得最新的資料來操作就像在外部對 closure 內部拿某變數，這是不行的，因為值被封裝在內部。除非我們像在外部先建立好一個全域變數，並且直接拿其值進行操作，沒錯，這就等同於 refs 的概念了😲

## 使用 ref 來取得最新值
已經知道 [[#跟 class Component 的差別|class component 的行為]] 會拿到最新的值，而 function component 則不會，要怎麼用 function component 復刻 class 的行為呢 ? 

```jsx
const latestCount = useRef(count);
useEffect(() => {
  // 拿到最新的 count
  latestCount.current = count;
  setTimeout(() => {
    // 讀取最新的 count
    console.log(`You clicked ${latestCount.current} times`);
  }, 3000);
});
```
如此一來，連按 5 次，就會呈現最後通通印出 $5$ 的結果。
**ref** 就像在外部建立一個盒子，寄放不會被改變的值

這樣的方式不能保證每次 function call 的那個期間，state 是正確的 (state 不屬於那個當下的時間點)。由於每次都被直接改變 (class component 做的事)，拿到的就會是最新的。
這也是為什麼 React 預設不是 ref 的操作，而是選擇性的。

這裡可以比較 functional component 跟 class  component 對於 render 意義的不同之處 : 
- class component 將每次 render 分成不同階段來決定發生哪些事，也就是生命週期。在 A 階段變化到 B 階段的過程，資料也會隨時間發生變化。
- functional component 則是把每次的 render 是獨立的來看，這次 render 只關注這次資料的變化，並且同步一切的東西。

## 談談 clean up 
> clean up 的是舊的 props 還是當下的 props ?  

先釐清 `clean up` 的執行時間，在畫面渲染之後，在下一個 effect 執行之前，會執行 clean up effect。  
![|400x500](https://raw.githubusercontent.com/donavon/hook-flow/master/hook-flow.png)

意思是 
```js
useEffect(()=>{
  // 2️⃣ 在 return 之後才會做
  
  return ()=>{
    // 1️⃣ 這裡會先執行
  }
})
```

情境 : 有一個 state 從 10 改變成 20
```js
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.id, handleStatusChange);
  };
});
```
一開始可能會這麼想 :
1. React 先清除 (clean up) 帶有 `id = 10` 的訂閱
2. state 更新至 20，React 提交 UI 給瀏覽器渲染
3. React effect 執行帶有 `id = 20` 的訂閱

🤔這不是正確的，Why ?

回到 Flow 那張圖，可以知道 effect 執行的時間點是 **瀏覽器將元素放上 DOM (browser painting)** 之後，為什麼 React 要這麼設計 ? 🤔

> 才不會阻攔螢幕的更新

effect 很常處理 AJAX 取資料的事情， 如果取資料這件事不是安排到 effect 中處理，而是同步處理呢 ? 瀏覽器就必須等到資料回傳再去做 painting 的工作，如果回傳時間拉長，螢幕就會像被卡住、動彈不得。

React 才會把 effect 執行的時間點放在瀏覽器 painting 之後，以不阻擋螢幕更新率的情況下，提升 UI 體驗。而 **Effect 的 clean up function 也會被延遲**。

所以上面真正的情境順序
1. state 更新至 20，React 提交 UI 給瀏覽器渲染 
2. 瀏覽器渲染了，使用者看見 20 出現在螢幕上
3. React 清除 effect ， `id = 10`
4. React 執行 effect ，`id =  20`

奇怪的是，為什麼可以在 `id = 20` 的情況下，去清除 `id = 10` 的值呢 ? 🤔

> 每一個在 render 內部呼叫的 function (包含 handlers 、effect 等瀏覽器 APIs )，都會拿到當下定義的 state 。

實際上清除與執行 effect 的 state 都是來自當次 render 的資料，**effect 執行的並不會拿到最新的資料** ，而是舊 (當下)的。

What !?🤷
```js
// ✅實際上是這樣的
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(10, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(10, handleStatusChange);
  };
});

// ❌ 不是這樣的，我們在想像的 clean up 雖然清除的時間點 state 已經改變成 20，但仍然是屬於 id = 10 那次 render 的
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(20, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(10, handleStatusChange);
  };
});
```
clean up 是延後執行，並不代表是屬於下次的 render。 React 把 effect 相關操作是在瀏覽器渲染之後的原因，目的讓執行比預設的還要快。

而在 clean up function 被呼叫時，舊的 props 永遠都存在，以防我們需要用到它。

例如監聽事件，如果某按鍵元素消失於畫面，我們應該將它的監聽事件註銷掉，但是在 render 之後元素早已經從畫面消失，我們要怎麼註銷一個已經不在 DOM 上的元素監聽事件呢 ?  clean up function 讓我們把舊的 state 或 props 還存在著，在 effect 呼叫之前，我們就可以把它註銷掉。

## 同步執行但不是生命週期
在使用 `useEffect` 要跳脫生命週期的思考方式，運用同步的概念。

> 一切都是跟結果有關，而不是過程

這跟 JQuery 先呼叫 `addClass` 又呼叫 `removeClass` **過程派別** 是不同的 (意思是 DOM 新建立東西，又給它刪除這樣的行為)，這也是為什麼 React 的 CSS class 必須放在 render 程式碼之中 (只在乎結果，並不是從 A 變 B 的過程經歷了什麼。判斷樣式都是看最終的結果，並非隨時間而改變)   

React 根據當下的資料是同步處理 DOM (資料跟 UI 是同步的) ，在 function component 中 render 的  `mount` 跟 `updating` 是沒有區別的。這樣使 `useEffect` 讓我們可以根據 props 或 state 同步 React 樹狀以外的東西。

假如有一個 state 從 10 變到 20，跟一開始就賦予它 20 ，最終都會是 20。跟 call API 拿資料一樣，最後的結果都會是一樣的。我們看到的 UI 跟資料是同步的，也只會顯示最後資料的結果。

但是如果每次都 re-render 是很沒效率的，甚至導致無限循環。

## 告訴 React 不同 effect 之間的差別
避免每次不必要的資料都跟著 re-render，必須告訴 React 那些要 re-render。 (可以想想 render 之後的步驟順序)
1. state 改變，render 新的 UI 
2. React render ，提交 UI 給 DOM
3. DOM 更新，經過一系列操作，最後放上畫面 (這也為什麼說 操作 DOM 很昂貴，因為牽涉到太多畫面的 reflow、repaint，尤其是 reflow)

React 避免 DOM 昂貴的操作，只會更新 DOM 確實有改變的地方。

React Element 是一個 Object 裝載各種屬性。假如有一個元件指改動了 `props.name` (不包含 state 的操作) ，也就是文字的部分僅有 children 改變了，React 只會改動 `domNode.innerText` 的部份而已 (做淺拷貝比較 shallow comparison，這跟 React 的 Recoil 有關)

範例來自 Dan 大的文章 : 
```jsx
const oldProps = {className: 'Greeting', children: 'Hello, Dan'};
const newProps = {className: 'Greeting', children: 'Hello, Yuzhi'};
```

> 那 React 也會在 `useEffect` 幫我們檢查嗎 ?   
 
**不會。** React 對於沒有呼叫的 function，是沒辦法幫我們檢查、比較。

React 為了避免一直重複執行 effect 有關的操作，提供 **dependency array** (也稱 **deps** ) ，讓我們加入要關注的資料給 `useEffect` 判斷。

```jsx
  useEffect(() => {
    document.title = 'Hello, ' + name;
  }, [name]); // 👈 deps
```

透過這個 array 告訴 React ，這裡面
> 只有包含 array 的資料改變了才要執行，其餘的資料跟我無關，不要叫我謝謝。

React 每次 re-render 會檢查 array 中的資料，如果前後都長的一樣，就會跳過 `useEffect`  。

只要放入 array 中的資料，即使只有 1 個改變，也會重新執行 effect ，React 就會知道這是不能跳過的，因為 React 會同步所有事情。

所以不要把毫無相關的放在一起，**關注會改變而重新呼叫的資料。**

## 不要對 dependencies 說謊
function Component 中沒有生命週期，如果我們只想要在 `mount` 執行一次就好，通常會把 dependencies array 寫成空的。

例如 : 載入資料
```jsx
function SearchResults() {
  // 載入資料
  async function fetchData() {
    // ...
  }

  useEffect(() => {
    // ajax 是 side effect 把它擺在 useEffect 執行
    fetchData();
  }, []); // 👈 放入空陣列 
  // ...
}
```
看起來合理嗎 ? 如果有牽涉到其他的 props 或 state 這裡就會有問題。

### dependencies 說謊了會發生什麼問題 ? 
如果以計時功能 (`setInterval`) 在 class component 中的寫法思維，在 function Component 就要改變這個想法。 `setInterval` 雖然在基礎的 JS 建立一次，瀏覽器會持續記住直到刪除 id 為止，但在 function Component 每一次都擁有自己的 scope ，所以必須針對每次呼叫 render 時，如果要改變的資料具有副作用要先刪除，再重新產生，不然就會一直往上疊加，造成問題。

在 class Component 中，有關副作用的問題會在 `Mount` 監聽與 `Unmout` 註銷監聽，如果在使用 `useEffect` 也是同一個思維模式去思考， 把 dependencies array 當作是 mount 的行為，將 array 設為空的，但內部如果使用到有關 props 或 state ，effect 只會在 render 執行一次後就不會再直行了。
 
### 誠實以對 dependencies，把有關的放入 array 中
第 $1$ 種方式就是把所有相關資料放入 `useEffect` 的 array 中，讓 effect 按照資料改變就同步改變。
```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]); //👈 用到了 count 放入 array
```

第 $2$ 種是改變 effect 裡面的結構，不需要每輪 render 都要比較 array 中的資料，減少依賴性，往下會說明怎麼減少依賴性。

## 有效率的使用 useEffect 
> 如果我們不想把 state 放入 dependencies array 呢 ? 

>這不是叛不叛逆或是刻意操作    
> 而是 **React 一定需要透過依賴陣列去比較這筆資料嗎 ?**   effect 所執行的是具有副作用的操作。而 React 都能知道當次 render 的所有資料，有必要每次都去特別告訴 React 這筆是否具有變化呢 ?  

可以先提問自己 **這筆資料的是為了什麼 ?** 
例如 Counter 中每秒做 `setCount(count + 1)`，但**其實我們根本不需要比較每次 render 的 count 是多少**，之後再 `+1` 。

Why ? 🤔

因為 React 可以幫我們拿出前一次的 state，而 `setInterval` 每次是仰賴 **前一次的 state 再 `+1`** ，那麼可以使用 `setState` 的第二種方式，`setState` 裡面使用 callback function 拿到最新的 state 並回傳新 state。

> `setState((previousState)=> return state)`

```jsx
useEffect(() => {
  const id = setInterval(() => {
    // 參數 c 會拿到前一次的 count，回傳 count+1 的結果
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []); //👈 這裡就不用放依賴陣列
```
即使不告訴 React  正確的 dependencies array，`setInterval` 在第一次 render 後都會存在 (也就是會不斷的執行)，因為 `setInterval` 是屬於 `window` 也就是 browser 的 method。

只有在 Component 本身 `unmout` 會停下來，也就是上面 `return` 的部份。

試著跑一次 : 
```jsx
const count = 0;

// effect 第一次會被執行，它會在第一次 render 後都存在
useEffect(()=>{
    const id = setInterval(() => {
    setCount(0 => 0 + 1); // 所以這邊是 setCount(1)
  }, 1000);
  return () => clearInterval(id);
},[])

// 第二次 render 
const count = 1

// useEffect 不執行

// setInterval() 這個還是會執行，因為它存在於 browser  而不是每次 render function
```
文中稱是 **否定式依賴關係** (false dependencies)，因為 React **知道每次 render 的 state 值**，而範例中 `setCount` 做的事只有回傳 `count + 1`，React 並不用特別去檢查前後兩次的 count state 是否一樣，再去執行。

可以看做告訴 React : 
> 總之幫我把  `c=>c+1` 的結果回傳給我 ，不論 c 是什麼，React 是知道的。

就像指示，這種  `function setState`  的方式如同批次 (batch) 更新一樣。

我們確實移除 count 減少依賴性，但並不是對 deps 說謊，只是我們的 effect 沒有讀取來自 render 的範圍裡面的 count。

### 試著拆解並了解
我用自己的話解釋這段，一開始看的時候真的很吃力😵

```jsx
// 先回味一下原始長相，我要開始幫它變身囉😲
const [count,setCount] = useState(0)
useEffect(()=>{
    const id = setInterval(() => {
    setCount(0 => 0 + 1);
  }, 1000);
  return () => clearInterval(id);
},[])
```
上面說到 `setInterval` 其實可以看做把 function 提到外部，因為 `useEffect` 只 render 一次，代表內部的 function 是不會變隨 render 重新呼叫 (改變) 的，等同於把 function 提到外面存在來。

由於 `setCount` 本身就是透過 `updater function` 回傳新的 state  就我們按照他的架構回傳。
```jsx
// setIterval 的 callback function 看作把東西寫在 render function 以外
const countSomething = (setCount) => {
  setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
};
```
- 把提出的 function 塞回去，並不會影響原本的操作
```js
// 放回去
const [count,setCount] = useState(0)
useEffect(()=>{
    // 塞回去一樣可以執行
    const id = countSomething(setCount);
  return () => clearInterval(id);
},[]) // 👈 依賴陣列是空的
```

來按照步驟來人體 render 看看，按照 React 每次 render 都同步資料來看
```jsx
// 第一次 render

// 1. count = 0 
const count  = 0

useEffect(()=>{
    // 3. 進行 effect
    const id = countSomething(setCount);  

  // 2. 這邊先 clean ，但第一次的 id 是 null
  return () => clearInterval(id);
},[])

// 第二次 render
const count = 1

/* 雖然 useEffect 不會執行 
  但內部的 setInterval 會繼續執行，直到被清除
*/
// 不是這樣 function 一直被呼叫，而是內部的 setInterval 間隔觸發它的 callback function
countSomething(setCount);
```
 `setInterval` 不管在哪裡呼叫，由於它是屬於 window (瀏覽器) 底下的 api，如果沒有清除，那麼 `window` 一樣會每間隔 x 秒呼叫。這個例子證明不論放在 render function 內部或是外部，`setInterval` 都會風雨無阻的執行。
 
>注意    
> 我們讀取的 count 值已經不是來自於 render 範圍的   

這是什麼意思呢 ? 🤔  

經由上面的變化史，已經知道脫離了 render function 依然可以執行，那這裡的 `setCount (c=>c+1)` 裡面的 **`c=> c+ 1`** 又是另一個 callback function，那 `c` 這個參數來自誰重要嗎 ?  我們有必要填入這個 c 值才能計算嗎 ? (意思是一定要寫`setCount(anotherfunction(c))` 才能執行嗎 ?  )

我再把 `setCount` 裡面的 callback function 又拆出 render 以外，叫 `plusOne`，並且我把這個 `plusOne` 看做我們要對 `setCount` 做某事的藍圖。

```jsx
const countSomething = (setCount) => {
  setInterval(() => {
    setCount(plusOne);
  }, 1000);
};
// 告訴 React 資料要做的事
function plusOne(c) {
  return c + 1;
}
```
👉  [ `codsandbox` 範例](https://codesandbox.io/s/mystifying-williamson-s4799j?file=/src/index.js)

在把這串放回去，一樣可以執行。`setState` 如果是使用 callback function 的方式使用，內部其實是呼叫 **updater function**[^4]，它會保證拿到最新的 state，而我們的 `plusOne` 只是 updater function 的另一種表達方式。

回到 React render 的概念 : **每次 render 都保有自己的資料**，所以我們不用特別放入 deps 來告訴 React ，因為 React 就已經知道當次的 state。

這段有點饒口，但幫助我釐清到底為什麼不用加入 deps 內依然可以執行這個問題。

## 從 Google 文件的更新了解 function updater
如上面的範例，知道可以使用 `setCount(c => c + 1)`  避開 deps 填入 state ，但 : 
1. 為什麼使用呢 ? 
2. 跟原本 `setCount( c + 1)` 差別在哪 ? 

文章中舉例 Google 文章是雲端編輯。修改的時候，並不是每次都傳送整個頁面的內容給伺服器，文章如果檔案大，那樣傳送覆蓋太沒效率了。那怎麼溝通給後端讓它記住新增或修改的部分呢 ? 

> 透過傳遞 **定義好的表達方式**

其實如果使用過 redux 就知道 dispatch 與 action 的發號施令的概念，只有已經定義到的 action type 對應 actions 才能對資料內容進行變動。那也可以想像 Google 文章在編輯時也是如此，_使用者點擊某個按鈕，後端再做動作_。

如此一來達到 **找出最小化的資料來改變這個 component** ，如同 Google 文件不會送整頁資料出去改變文件。

這種方式跟是 React 所建議的原則 : **尋找最小化但完整的 state** 的概念 (意思是有些資料是可以透過計算出來的，不一定所有資料都得是內部的 state，例子補充在後面)，差別是這是 update 的。

最小化且完整的 state 舉例 :     
以 todo list 為例，有存放所有 todo 的陣列 state ，但我想要存取 todo 的長度，並不需要另外儲存的 state 
```jsx
// ❌ 不用這樣
const [length,setLength] = useState(null)
```
因為可以從 `state.todos.length`  取得，這筆資料是可以通過計算取得。    
這也是為什麼上面說  `c => c + 1` 是一個藍圖，因為它傳達的是個資料的表達方式。

那為什麼 `setCount(c => c + 1)` 比較好呢 ? 🤔

在於 **它沒有直接改變 count 本身** (沒有汙染到變數)，這個例子用最原始的 JavaScript 來看。由於本次的 count 是 primitive type，這邊並不討論 object type (React 之所以會建議解構 object type 是有原因的)。

- `c => c+1` : 並沒有改變到原始的 count
```jsx
let count = 0
function plusOne(count){
  count =  count + 1
  return count
}
let newCount = plusOne(count) // 用變數接起來
console.log(newCount) // 1
console.log(count) // 0
```
- `c + 1` : 直接對 count 進行操作😵
```jsx
let count = 0 
function plusOne(){
  count = count + 1
  return count
}
let newCount = plusOne() 
console.log(count) // 1
console.log(newCount) // 1
```

不直接操作資料也是避免非預期的結果發生。

這種方式保證更新多個來源 (事件或是具有副作用的操作等等) 都可以被合併成 **可預測的正確操作**。然而 `setCount(c => c + 1)` 並不是最佳解法，遇到以下的情境，可能會產生奇怪的問題 : 
1. 執行 effect 同時依賴多個 state 
2. 透過 props 計算新的 state

這時候可以使用 `useReducer` 來幫我們解決問題。

`useReducer` 可以看做加強版的 useState，而事實上 `useState` 也是 `useReducer` 簡化過來的，有興趣可以參考這篇 [React Hooks | 既生 useState 何生 useReducer ? | by Airwaves | 手寫筆記 | Medium](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-hooks-usestate-vs-usereducer-b14966ad37dd)
 
## 將資料更新與操作分離
範例中 count 是被 step 影響，我們也確實將正確的 deps 放進去。 
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [step]);

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
    </>
  );
}
```
用白話文解釋 : 當 step 改變時， effect 會先清除上一個計時器，接著產生新的計時器。

> 但是如果不想要改變 step 就重啟 interval 重新計時呢 ? 如果想要動態的改變 step 又能持續計時呢 ?

那麼就必須把 step 從 deps 移除，避免 step 改變也清除 effect 又產生新的 `setInterval` 重計。

這種情況是多個資料互相依賴 `(count ⇒ step)`，而且是 A 資料跟 B 資料現在的值有關。(count 每秒增加的值，跟 step 的值有關)

可以改使用 `useReducer` 管理複雜的資料流。`useState` 通常只能對著一筆資料操作，如果有很多筆，可能會建立多個 `useState`。或是發覺操作資料是 **根據於前一次的資料**，這時候很適合換成 `useReducer`。

> reducer 可以讓我們透過 **action type 對應 action 再去更新資料** ，而且也可以同時對多筆資料操作。

什麼意思呢 ? 那 `useState` 不能做這樣的事嗎 ? 
可以，但是非常麻煩，會使邏輯變得複雜🤔。

我試著復刻這兩種方式的操作 : 
1. 照舊分開的兩個資料，同時更新
2. 由於兩個是相依性的，把它放在同一個資料物件中。

另外多出來的是嘗試其他種方式。
1. 原始範例 : [Dan 大提供的 CodeSandbox](https://codesandbox.io/s/zxn70rnkx)
2. 實作範例 : [我複製改過的 CodeSandbox](https://codesandbox.io/s/zealous-monad-rco7nx?file=/src/index.js)，範例會看到多個不同的寫法，以下會一個個說明。

### 實驗 : 分開的兩筆資料更新
首先要釐清改變其值的變因，count 是依賴著 step，但是 step 是手動輸入值所改變的，因此 step 雖然改變了，但是 count 不能拿到最新的 step。
- 透過上面說過的 updater function，我們可以知道 `(c => c)` 這樣可以拿到最新值。
```jsx
const [count, setCount] = useState(0);
const [step, setStep] = useState(1);
useEffect(()=>{
  const id = setInterval(() => {
      setStep((s) => {
          // 最新的 step
          console.log(s);
        return s;
      });
      setCount((c) => {
          // 那這裡的 step 呢 ? 🤔
          console.log("step in count", step);
        return c + step;
      });
  }, 1000);
  return () => clearInterval(id);
}, []);
```
其他部分跟原範例一樣沒有更改。

>當然結果是不行的。

試著用 `setStep` 拿到最新的 step，並不代表當下取得的 step 會是最新的。React 新手最常陷入的陷阱是執行 `setState` 後馬上讀取 state 值，state 不會是新的。
 這跟 `setState` 是非同步的有關係。

回到那句話 : **每一次 render 都擁有它專屬的 state 或 props** 。  
所以  `setCount` 裏頭的 step 還停留在第一次 render ，`step = 1`。即使修改 input 的值，雖然 `setStep` 那行可以拿到最新的 step，但沒辦法在 `setCount` 裡面拿到。

### 實驗 :  再某筆資料內部拿到最新
那在 `setStep` 中拿到最新 step 在傳給 `setCount` 總可以了吧🤔
```jsx
useEffect(()=>{
const id = setInterval(() => {
    setStep((s) => {
      setCount((c) => {
          console.log("step in count", step);
        return c + s;
      });
      return s;
    });
  }, 1000);
  return () => clearInterval(id);
}, []);
```
變得越來越複雜了，認真拆解的話就是 callback hell 了。同上面說的如果 deps 是空的，state 再也不是取自 render function 裡面，同樣可以把這些 method 看作寫在外部。
- 上面就像 : 
```jsx
// 拆解再拆解
const countSomething = (setCount) => (setStep) => {
  // callback 再 callback
  return setInterval(() => {
    setStep((s) => {
      setCount((c) => c + s);
      return s;
    });
  }, 1000);
};

// 使用
useEffect(()=>{
 const id = countSomething(setCount)(setStep);
 return ()=> cleanInterval(id)
},[])
```
看起來還行🤔，但我認為這樣的架構不好被擴展，除非裡面又再拆，不過同時也讓我想到 HOC (Higher Order Component)，這樣的方法會有效能上的問題。

### 實驗 : object type 的 state
我認為這個例子是最接近 `useReducer` 的，同時必須把結構大改，並且用 immutable 的方式改變資料。
- `useState` 設為 object : 
```jsx
function Counter() {
  // 1. 把所有相關的 state 放入同一個容器中
  const [value, setValue] = useState({
     count: 0,
     step: 1
  });
  useEffect(() => {
    const id = setInterval(() => {
    // 2. 一樣使用 updater function 拿到最新值
    setValue((v) => ({ ...v, count: v.count + v.step }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <h1>{count}</h1>
      {/* 3. step 也要修改 */}
      <input
        value={value.step}
        onChange={(e) => setValue({ ...value, step: Number(e.target.value) })}
      />
    </>
  );
}
```
好像比上面都更來的精簡，只是改變 state 變成很囉唆😵

### 實驗 : 把 input 變成 uncontrolled component 
在 [[#使用 ref 來取得最新值]] 這章節已經有提到，搭配上表單的控制，可以讓我們不 re-render 的情況下，依然拿到 input 的最新值。

```jsx
const stepRef = useRef(1);
useEffect(()=>{
  const id = setInterval(() => {
    setCount((c) => c + Number(stepRef.current.value));
  }, 1000);
  return () => clearInterval(id);
}, []);

// 改成
<input ref={stepRef} defaultValue={1} />
```

## 回到 useReducer
- 按照文章中提供的 `useReducer` 範例
```jsx
// 初始值
const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  // 解構 state
  const { count, step } = state;

  // 根據不同的 action type 來改變 state，如果 type 一多用 switch case
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}

function Counter() {
  // useReducer 
  const [state, dispatch] = useReducer(reducer, initialState);
  // 解構值
  const { count, step } = state;

  useEffect(() => {
    const id = setInterval(() => {
      // dispatch 一個 action
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]); //👈 deps 放入 dispatch

  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => {
        // 一樣 dispatch action
        dispatch({
          type: 'step',
          step: Number(e.target.value)
        });
      }} />
    </>
  );
}
```
那這有比較好嗎 ? 意思是 deps 放入 dispatch 不是會回到 `setInterval` 又重新的狀況嗎 ?   

事實上可以這麼做是因為 **React 保證 dispatch 永遠被不會改變**，所以它不會讓 state 改變又重新啟動計時。由於 dispatch 不會改變，所以 `prevDispatch === nextDispatch`。

`useEffect` 的 deps 可以忽略 
1. `dispatch`
2. `setState`
3. `useRef` 容器值 : 指 `ref.current` 

因為 React 保證他們是靜態的，不會被改變。不過指定他們也不會怎麼樣。

回到優點的部分，比起在 effect 裡面直接讀取 `state`，**dispatch acition** 給予一個資料表達的方式，並且在外部的 reducer 按照 action type 操作資料。讓 effect 把 step 這個 state 分開來看待，count 跟 step 的依賴性就不會因在 render function 導致不同步的問題。

effect 不關注怎麼更新 state，而是什麼動作要發生，並在 reducer 集中處理這些資料邏輯。
```jsx
function reducer(state, action) {
  const { count, step } = state;
  // 收到 tick，reducer 定義 tick 對資料做某件事，回傳 count : count + step
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    // 收到 step，對 step 資料做重新賦值
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}
```

## 為什麼 useReducer 是 Hooks 的作弊方式 ? 
文中提出一個情境
> 如果是 step 透過 props 傳下來的值呢 ?

- 文中範例
```jsx
// 在父元件把 step 往下傳 
<Counter step={1} />

function Counter({ step }) {
  const [count, dispatch] = useReducer(reducer, 0);
  // 因為 step  是 props ，要把 reducer 搬進來才能讀取到
  function reducer(state, action) {
    if (action.type === 'tick') {
      return state + step;
    } else {
      throw new Error();
    }
  }

  // 這邊都沒變
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return <h1>{count}</h1>;
}
```
這個範例有優化上的問題，不要當作合理的使用方式。(我覺得是 reducer function 不斷新產生的問題，通常會用 `useCallback` 避免每次 render  重新產生。)

這個範例 dispatch 依然不會改變，所以 effect 裏頭並不會 re-render。因為 step 不屬於 `useReducer`  的 state，`reducer` 怎麼知道 props 產生變化而拿到最新的 props 呢 ?

由於 effect 不會再執行，React 會記住 dispatch 中的 action，但這依然會在下次 re-render (state 或是 props 改變) 呼叫 reducer 。這時候 props 是新的，reducer 接收到的 props 也是新，但不是在 effect 拿到。 

這也就是為什麼 Dan 大說 `useReducer` 像是 Hooks 的作弊模式，因為**把描述事情跟更新邏輯操作分開了**。另外一方面，可以移除一些 effect 中不需要的 deps，避免不必要的 re-render。 

### 白話翻譯機
先確定幾件事 : 
1. effect 是不會重新呼叫，因為 dispatch 永遠都是同一個
2.  dispatch 發送的只是一個 `action`，而且也不會改變。而 reducer 是接收 action type 來對 state 操作。 
3. reducer 在 render function 範圍內，按照原本每一個 render 都有它的 state 或 props ，也就是當 Counter 因 state 或 props 改變而 re-render ，reducer 也會產生新的 function ，也會拿到當前 render  範圍的 props。
4. `setInterval` 依然間隔秒數執行。

如果用 redux 的想法來思考，會看過這張經典的圖，比較容易理解，dispatch 接收一個物件，並再傳給 reducer 處理最後返回 state。  
![|300x230](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)  


卡住的話，再試著一步步拆解。  
把 dispatch 看作放在外部的 function 接收 action，並且內部呼叫 reducer
👉 [嘗試用 `codepen` 並用 Vanilla JS 復刻 ](https://codepen.io/shan473/pen/mdxKvYj?editors=0010)
```jsx
// 假的 dispatch 👉 不在 render function 裡面
function fakedispatch(action) {
  // 都呼叫來自 component 中的 reducer，更新目前的 state
  component.fakereducer(component.state,action);
}
```
- Counter component : 由於 React Element 是一個 Object，所以我轉換成簡化一些 Object 結構。
```jsx
const count = 0;
const step = 1;
let prev = null;
let component = null;

// props 模仿是由外部傳入的 props
function Counter(props = null) {
  // 是不是第一次 render
  if(component){
       this.state = component.state;
       this.props = props || component.props;
  }else{
      this.state = count;
      this.props = props || {step : step};
  }
  // 把 React Element 看成一個 Object
  return Object.assign(this, {
    state: this.state,
    props: this.props,
    // 😲 fakereducer，放在 render function 內部
    fakereducer: (action) => {
      if (action.type === "tick") {
        this.state += this.props.step;
      }
      if(action.type === "reset"){
        this.state = 0
      }
    }
  });
}
```
- Interval : 跟之前的在 `useReducer` 類似，只是在 dispatch 之後手動 re-render，因為我們改變了 state
```jsx
// 假裝等於 useEffect(()=>{},[]) ,deps 為空
function tick() {
  id = setInterval(() => {
    fakedispatch({ type: "tick" });
  }, 1000);
}

// 改變一下 dispatch 內部
function fakedispatch(action) {
  prev = component
  // 要跟 prev 比較的
  let temp = new Counter(prev.props);
  // 更新 state
  temp.fakereducer(component.state,action)
  
  //  假裝 setState 的概念，由於 state 不同，而re-render
  if(temp.state !== prev.state){
    // 重新呼叫 component 更新
    component = temp  
    
    // 更新畫面
    title.textContent = component.state;
    
    // 代表 re-render
    console.log("re-render")
  }
}
```
- 處理 `<Counter step="1"/>` props 改變時也 re-render，由於是 input 的值改變導致 props 改變 (re-render)，我們就模擬這個動作。
```jsx
input.addEventListener("input", (e) => {
  let result;
  // 檢查輸入是不是數字
  if(Number.isNaN(Number(e.target.value))){
    result =1;
  }else{
    result =Number(e.target.value);
  }
  // re-render 並傳入 props
  component = new Counter({step: result});
});
```
- 執行

### 人體編譯
`useEffect` 在上面的章節說過，如果 deps 沒有任何東西，effect 只會 render 一次，其 資料已經不是來自於 render function 本身，可以把它看作拿到 render 外部一樣。
所以我們製作假的 `useEffect` 是對應 `tick()`， 並且在 component 生成之後呼叫。
```js
component = new Counter({step});
tick();
```
- 編譯 : 這裡有兩種情境，(1) 本身 state 改變 ；(2) 傳入的 props 改變
```jsx
// 改變 Counter 的 state
const count = 0
const step = 1

// 產生 fakereudcer 
function fakereducer(action){
    if (action.type === "tick") {
      this.state += this.props.step;
    }
    if(action.type === "reset"){
      this.state = 0
    }
}

// tick() setInterval 每秒呼叫 dispatch 並送 action 給 fakereducer
fakedispatch({type: 'tick'}) //👉 count = 0 + 1 
// component state 改變，re-render 、畫面更新
temp = new Counter(1);
component = temp
title.textContent = component.state; // 1


// 改變 props 的 step = 4，props 改變 re-render
component = new Counter({step: 4});

// 產生新的 fakereducer
function fakereducer(action){
    if (action.type === "tick") {
      // 這次 render 1 += 4 = 5
      this.state += this.props.step;
    }
    if(action.type === "reset"){
      this.state = 0
    }
}
```
後面都是周而復始。雖然不是很準確的模仿 React ，透過拆解的方式我比較好理解。我們可以知道 reducer 是因為拿取 props 的最新值，我們才把它放在 component 內部，但是會造成不管 props 是不是有改變都會產生新的 reducer 。我可能會用 `useCallback` 記憶起來，並加上 `props.step` 作為 deps。

藉由這個例子我們知道 dispatch 只要負責把 action 帶給 reducer 就好，我們不用在內部實作詳細邏輯，而是交給 reducer 處理，減少像 `setState` 直接在 effect 中把資料拆開又塞回去，而且如果是多組資料集中於一個 state，牽一髮動全身😵。

## 把 function 移到 useEffect 中
`useEffect` 很常拿來做 call API 拿資料，也很常只做載入頁面的那一次。按照 effect 只執行一次，我們的 deps 會是空的。
```jsx
function SearchResults() {
  const [data, setData] = useState({ hits: [] });
  
  async function fetchData() {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=react',
    );
    setData(result.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
//...
}
```
上面看起來是可行的，比較不好的點在於  `fetchData` 沒有依靠任何 state 或 props，每一次 render 都是長一樣的，但又會每次產生新的 function🤔。

> 如果只用到函數內部的值，沒有依靠外部資料，把它放到 effect function 中

```jsx
useEffect(() => {
  // 把 function 搬到 effect 內部
  function getFetchUrl() {
    return 'https://hn.algolia.com/api/v1/search?query=react';
  }
  async function fetchData() {
    const result = await axios(getFetchUrl());
    setData(result.data);
  }

  fetchData();
}, []); // ✅ deps 是空的也沒關係，因為沒有用到 state 或 props
```
我們不用再擔心 deps 的問題，因為確確實實也沒有依賴任何外部資料。

但是當結構開始變的龐大，而且涉及 state 與 props，這時候如果當資料改變了，但 effect 並不會更新，依然只會停留在第一次 render 並且不會再執行了😵。

> 那把 state 或 props 加入 deps 呢 ? 

```jsx
const [query, setQuery] = useState('react');

useEffect(() => {
  function getFetchUrl() {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }

  async function fetchData() {
    const result = await axios(getFetchUrl());
    setData(result.data);
  }

  fetchData();
}, [query]); // ✅ 這樣是合理
```
如此一來當 `query` 改變，effect 就會重新呼叫，我們拿到的資料也都會同步。

加入 deps 不只是讓 React 不要發出警告。而是去理解相關資料的變化，例如 : 拿取資料是依靠 `query` 字串的變化，把 query 放入 deps 可以讓我們拿到當次正確的資料。

`useEffect` 強迫讓我們注意資料流應該要怎麼變化，也告訴我們也要讓 effect 一起同步更新，而不是忽略它，讓使用者處處碰到 bug😵

## 不能把 function 移入 useEffect 怎麼辦 ? 
如果有一個 function 在不同的 effect 中進行，那 function 在每次 re-render 都會被重新創造，如果加入 deps 會導致頻繁的更新。
```jsx
// 🔴 re-render 都會使 effect 重新產生並呼叫，況且還依附兩個😵
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query;
}

useEffect(() => {
  const url = getFetchUrl('react');
}, [getFetchUrl]); // 🚧 deps 是正確的但是改變的太頻繁

useEffect(() => {
  const url = getFetchUrl('redux');
}, [getFetchUrl]); // 🚧 deps 是正確的但是改變的太頻繁
```
絕對不會想把它複製貼到 effect 裡面😵。所以解決的方式有兩種 : 

- 第 $1$ 種 : 如上面一直提及的一種方式，把它提到 render function 外部。如果忘記了可以回想一下  [[#有效率的使用 useEffect]] 章節，概念上資料來源是不屬於 render function 範圍的。
```jsx
// ✅ 提到外部，不會再被 render 內部的資料影響了
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query;
}

function SearchResults() {
  useEffect(() => {
    const url = getFetchUrl('react');
  }, []); // ✅ deps 空的是 OK 的

  useEffect(() => {
    const url = getFetchUrl('redux');
  }, []); // ✅ deps 空的是 OK 的
}
```

- 第 $2$ 種，把 function 給記起來，由於每次 re-render 都會新建立 function，可以使用 `useCallback` 記起來，並且按照傳入的 deps 再重新建立 function，選擇再有必要的情況再更新。如果有使用到相關的 state 或 props 就能同步更新。

1. 類似把 function 提到外部的變化形態 : 
  ```jsx
    // ✅ 跟把 function 提到外部類似，但是在 render function 內讓它不變
    const getFetchUrl = useCallback((query) => {
      return 'https://hn.algolia.com/api/v1/search?query=' + query;
    }, []);  // ✅ callback deps 空的沒關係，因為它是靠帶入的參數來變化
  
    useEffect(() => {
      const url = getFetchUrl('react');
    }, [getFetchUrl]); // ✅ deps 放入 getFetchUrl 沒問題，因為 getFetchUrl 建立後不會隨 re-render 重新建立
  
    useEffect(() => {
      const url = getFetchUrl('redux');
    }, [getFetchUrl]);  // ✅ deps 放入 getFetchUrl 沒問題，因為 getFetchUrl 建立後不會隨 re-render 重新建立
  ```
2. 依賴內部的 state 或 props
```jsx
  const [query, setQuery] = useState('react');

  // ✅ getFetchUrl 直到 query 有改變才會更新
  const getFetchUrl = useCallback(() => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, [query]);  // ✅ callback deps 根據 query state 改變而重新建立

  useEffect(() => {
    const url = getFetchUrl();
  }, [getFetchUrl]); // ✅ deps 是 OK 的，跟 query 是同步更新
```

而 `useCallback` 的方式也適用於父元件傳遞 function props 給子元件的操作 : 
```jsx
function Parent() {
  const [query, setQuery] = useState('react');

  // ✅ 直到 query 改變才重新建立 fetchData
  const fetchData = useCallback(() => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, [query]);  // ✅ callback deps 根據 query state 改變而重新建立
  
  /* 傳給子元件，記住 ! 這邊的 function 更新條件是 query，所以傳入的 fetchData 會一直是同一個 */
  return <Child fetchData={fetchData} />
}

function Child({ fetchData }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); 
  /* 
  ✅ deps 是 OK，因為它也等 Parent 本身 query 改變才會重新呼叫，其餘的時候 Child 本身無法動到 effect 的，即使 setData 改變了，這裡也不會重新呼叫 
  */
}
```

## function 是資料流的一種嗎 ? 
這節提到 function 變成 props 傳遞給子元件要注意的點，另外凸顯 class component 跟 function component 之間的差別。

`useEffect` 我們知道是在 render 之後才呼叫的，而且具有 3 種不同情境 : 
1. 完全沒有 deps array，表示只要 re-render 之後就跟著執行
2. deps 為空，表示只在 mount (render) 之後只做一次
3. deps 放有相關資料，表示有關資料的改變就會重新呼叫 effect

看起來 `useEffect` 是等同於 class component 生命週期中的 `componentDidMount` 以及 `componentDidUpdate` 🤔🤔🤔

在這之前，複習一下 class component 的生命週期圖 : 
![|600x300](https://i.imgur.com/cpFlaro.png)

- class component 中傳遞 function props，把上面的例子轉成 class 版本
```jsx
class Parent extends Component {
  // 等同於 const [query, setQuery] = useState('react');
  state = {
    query: 'react'
  };
  // 定義了 fetchData 方法
  fetchData = () => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + this.state.query;
  };
  render() {
    // function 透過 props 傳給 Child 
    return <Child fetchData={this.fetchData} />;
  }
}

class Child extends Component {
  // 等同於上面 let [data, setData] = useState(null);
  state = {
    data: null
  };
  // 在 render 之後執行
  componentDidMount() {
    // 從 Parent 來的，我們像 functional component 一樣在 render 之後呼叫
    this.props.fetchData();
  }
  render() {
    // ...
  }
}
```
這樣在第一次 render 之後確實可以執行，但是沒辦法在 Parent props 改變時重新呼叫。

如果要重新呼叫 `this.props.fetchData`，就會在 `updating` 階段 render 完後呼叫 `componentDidUpdate` 來檢查前後的 props 是否有改變。確實跟 effect 很類似🤔
```jsx
componentDidUpdate(prevProps) {
  // ❌ 這個條件永遠不會成立
  if (this.props.fetchData !== prevProps.fetchData) {
    this.props.fetchData();
  }
}
```
但是 props 的比較不會成立，為什麼呢 ? 

> class component 是每次都重新呼叫 `render()`而已，並不是 new 重新建立實例，已經被建立的 function 是靜態的。


```js
// class component
const ComponentA = new Parent()
ComponentA.render() // re-render 是指呼叫 class 中的 render function

// 👉 prev ComponentA.method 等於 next ComponentA.method

// functional component
const ComponentB  = ()=>{
  return ()
}
/* 
re-render 是指呼叫 ComponentB() 本身，其內部的 function 都會重新建立。
*/
ComponentB() 

// 👉 prevComponentB 不等於 nextComponentB
```

如果把 `if` 條件拔掉，也是錯誤的。導致每次 re-render 都重新呼叫 `fetchData()` ，而且是不論 query 是不是有改變，這不是我們要的效果。

那讓我們的傳遞下去的 `fetchData` 是會跟著 query 變化的，使用 inline function，並且用 `bind` 綁定父層的 this ，避免傳到 Child 後用 this 導致指向不正確的問題。
```jsx
  render() {
    return <Child fetchData={this.fetchData.bind(this, this.state.query)} />;
}
```
這樣導致 `this.props.fetchData !== prevProps.fetchData` 始終成立，導致每次 re-render 都重新呼叫 `fetchData()` 。

解決問題的方法，就是 **把 query 當 props 跟著傳下去**，
```jsx
// Parent Component
render() {
  return <Child fetchData={this.fetchData} query={this.state.query} />;
}

// Child Component
componentDidUpdate(prevProps) {
  // 根據 props.query 決定
  if (this.props.query !== prevProps.query) {
    this.props.fetchData();
  }
}
```
function 可以被傳遞進去，但是 function 內部的改變與否是不能被看見的，它沒辦法直接拿來被比較。另一個原因是，props 傳來的方法封閉了 `this` (this 是看怎麼被呼叫，什麼意思呢 ? 看下面註解)，我們不能直接依賴它來決定是否更新。導致我們 **必須傳遞內部相關所有的資料**，就為了檢查是否有改變再決定要不要呼叫方法。

> 對於 class component 來說， function props 不是屬於資料流的一部分。

我們不知道 `this.props.fetchData` 從 Parent 傳過來是不是跟 state 有關，或是 state 是不是已經改變了。(這個 props 的 stateless 有關嗎 ? )

使用 `useCallback` 讓 function 可以加入資料流中，我們根據 function 的輸入值改變，代表 function 本身也要改變，反之亦然，輸入沒有變的話就也不會產生新的 function。有 `useCallback` 的協助，改變 props 的時候，`props.fetchData` 也會自動地傳遞下去，因為它本身是資料流的一部分。

### 注意
把任何 function 都加上 `useCallback` 是一件很不 Ok 的事，這不是保證是效能上的優化。

雖然它是一個很有效的方法，對於同時傳遞給多個子元件，並且應用在子元件內部的 effect，是可以避免子元件做無意義 render 的問題。當然也可以包裹成 Hooks 避免多個 callbacks 傳遞整個 React 樹狀結構。

用上面的 `fetchData` 來試著寫成 `useFetchData` ，這裡可以搭配 `useContext`，使用 Provider 包住的元件可以根據 query 改變而更新資料包。  
👉 [codesandbox 簡易查詢各國代碼 API](https://codesandbox.io/s/festive-fermi-1cms7c?file=/src/index.js)

列出功能 : 
1. Provider 包住的元件，使用 `useFetchData` 就可以拿到回傳的資料。
2. 當 query 改變時重新獲取資料
```jsx
import { createContext, useMemo, useState, useEffect, useContext } from "react";

// 基本網址
let baseurl = "https://restcountries.com/v3.1/name/";
// 建立 context，如此一來包住的元件都可以直接用 useFetchData 取的共享值
const Context = createContext(null);
// 修一下名字方便 debug
Context.displayName = "FetchDataContext";

// 建立 Provider 元件
function DataProvider({ children }) {
  const [query, setQuery] = useState("tw");
  // 避免造成 value re-render ，把 value 記憶起來，直到改變 query
  const value = useMemo(() => {
    return {
      query,
      setQuery
    };
  }, [query]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Custom Hooks 
function useFetchData() {
  // 這一段主要確認上方是否有 Provider 的防呆
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  // 確定有後把 context 解構比較好讀
  const { query, setQuery } = context;
  // 讀取回來的資料
  const [data, setData] = useState(null);
  // 錯誤處理
  const [message, setMessage] = useState(null);
  
  
  useEffect(() => {
    (async () => {
      if (query) {
        const data = await fetch(baseurl + query).then((r) => r.json());
        // 回傳不是 404 時判斷
        if (!data.status) {
          setData(data);
        } else {
          // 回傳 status 為 404 設定錯誤資訊
          setMessage(data.message);
        }
      }
    })();
    return () => {
      setMessage(null); // 清除錯誤資訊
    };
  }, [query]); // 👈 deps 放入 query

  // 回傳需要的值
  return { data, query, setQuery, message };
}

// 打包回傳
export { DataProvider, useFetchData };
```
寫成 Hooks 時在使用就很方便，只要在同一層共享的部份加上 Provider ，內部元件都使用 `useFetchData` 就能拿到想要的內容👍

當然這個例子可以再改進，例如 input 的部份可以改用 option，由第一次進入 app 先取得所有國家國碼，這樣使用者可以用選單的方式進行。

## 談談競爭條件 (race condition)
什麼是競爭條件呢 ? 

在 JavaScript 中跟競爭條件有關的是非同步的問題，如上面舉例的 `fetchData` 。**如果在非同步操作的未完成的時候，中途改變 state 或 props 會導致非預期的事情發生。**
👉 可以參考這篇文章 : [JavaScript — async/await 的 race condition](https://toy9986619.medium.com/javascript-async-await-%E7%9A%84-race-condition-20927705569)

> 簡單來說跟執行順序有關

以 `fetchData` 為例，我們用 async/await 簡化非同步的處理，內部的 fetch 是 Promise，如果在 pending 的時候又改變 state 重新獲取資料，就會發生問題。

例如 : 一開始搜尋 usa，在結果還沒返回時改成 peru，假設 usa 資料先回來並且顯示在畫面上，過一下子最終 peru 的 response 才會回來 。**畫面等待 peru 資料回傳時顯示 usa 資料的時候 input 是 peru 呀 !**  造成 UI 跟 state 對不上了😵。

如果要模仿此動作，可以到 devtool 的 network 並且自訂速度，這邊我訂了一個叫 `superslow`，把 Download 設為 1kb，讓回傳間隔變長就比較清楚問題。
![|400x220](https://i.imgur.com/Hh8l045.png)

怎麼避免或是解決此狀況呢 ? 🤔

要知道 React 的 `useEffect` 並不會幫我們處理這個問題，最好的方式是可以讓非同步被中斷 (abort)，並且在 clean up 的階段取消。另外一個方法是，**在把回傳資料放入 state 之前，用 `boolean` 檢查目前狀態是否要取消。** 因為在執行下一個 effect 之前，會先執行 clean up function。

既然我們上面有實作，那就來改造上面的例子 : 
```jsx
useEffect(() => {
    // 👉 建立當次 render 的 didCancel
    let didCancel = false;
    (async () => {
      if (query) {
        const data = await fetch(baseurl + query).then((r) => r.json());
        // 檢查是不是有取消 ?
        if (!didCancel) {
          setData(data);
        } else {
          setMessage(data.message);
        }
      }
    })();
    return () => {
      // 在下一個 effect 執行前，確定取消
      didCancel = true;
      setMessage(null);
    };
  }, [query]);
```
情境 :
1. 顯示畫面後改搜尋 usa
2. 資料還沒返回，改成 peru 

我們來執行看看，從第一次 render 完之後 :  
```js
// input 改成 usa
setState query = "usa"
re-render UI

clean up 清除 tw 副作用
  state query "tw"
  didCancel = true

effect 執行
  state query "usa"
  didCancel = false
  🚀async function 執行，進入 pending 狀態

// input 改成 peru
  setState query = "peru"
  re-render UI

clean up 清除 usa 副作用
  state query "usa"
  didCancel = true

effect 執行
  state query "peru"
  didCancel = false
  🚀async function  執行，進入 pending 狀態

👉 usa 資料回來了
  usa clean effect 已經被呼叫，此時 didCancel 是 true 😵
  ❌ setData 不會被執行

👉 最後 peru 資料回來了
  didCancel 是 false 
  setData 會執行
  顯示 peru 資料
```
一開始從上面看起來 `usa` 資料回來為什麼 `didCancel = true` 🤔，明明 `peru` 的 effect 執行了 `didCancel = false`。回到順序問題，在 `usa` 這個 render 時，我們的 `didCancel` 最後是什麼 ?

我一開始覺得很微妙，所以再回去複習 [[#談談 clean up]] 這個章節。

> 每一個在 render 內部呼叫的 function (包含 handlers 、effect 等瀏覽器 APIs )，都會拿到當下定義的 state 。

單看在 `usa` 這次 render 執行順序應該是 : 
```jsx
usa-didCancel = false
🚀async function 進行 fetch data
  
peru 的到來觸發了 use-clean up function
  usa-didCancel = true
  
usa 資料回來 data = ...
if (usa-didCancel = true)
❌ setData 這行不會被執行
```
在釐清概念的過程，我是使用 console 在每一個階段印出當時的 query ，幫助自己了解 effect 一值提到的 **同步** 概念

## 用正確的心態對待 useEffect
`useEffect` 雖然很常被用在非同步讀取資料，但 **`useEffect` 是核心思想是來做同步的操作**。 side effects 變成資料流的一部分，只要我們的當次 render 的資料同步，取得的資料也是一致的，對於邊際條件 (edge case) 的處理就會比較容易。

不過 React 在 18 版本對於處理非同步事件比較建議使用 **Suspense**。Suspense 是一個可以讓還沒準備好可以 render 的 UI 可以顯示預設的 Component ，主要要解決 2 個問題
1. code splitting : 不用把一次所有 app 元件載下來，而是載必要的
2. data fetching : 解決像是上面提到的 race condition 問題

不過 Suspense 我也還沒認真研究過 😵，先列入補坑大隊的名單吧

## 總結
1. `useEffect` 是 render 與瀏覽器 painting 之後執行，目的是不阻攔螢幕的更新。
2. `useEffect` deps array 如果是空的，僅執行一次，如果 array 有 state 或 props ，根據資料是否有改變，會跟著當次 render 之後重新呼叫。
3. 每一次 render 都保有它所有的東西，包含 event handler、非同步 (async/await)、effect 或是 API ，以及當次 render 的 state 與 props。
4. 想拿到最新的值可以使用 `refs`，refs 就像放在外部的盒子，React 確保它都指向同一記憶體位址，改變其值也不會造成 re-render。
5. clean up function 會在下一個 effect 呼叫之前先執行，注意 clean up 所清除的是上一次 render 的值。
6. 不要欺騙 deps array，通常 lint 會提醒，但是遇到 object type 的值要小心，可能造成過度頻繁更新。
7. `useEffect` 的 deps array 是否要放入相關 state 或 props ，可以視 effect function 中的 state 變化是否可由 `prevState` 推測出來，如果可以可使用 updater function 來更新。
8. useReducer 是可以讓資料跟邏輯分開操作的好方法。
9. `useCallback` 是可以記住 render 內的 function，使其每次不應 re-render 而重新建立，或是透過 callback 的 deps array 來優化。如果不是 function 則可以使用 `useMemo` 記住某值。
10. function 在 function component 與 Hooks 中是一種資料流。它可以透過 props 來傳遞，也可以被判斷是否為 render 的條件之一。記住，此行為跟 class component 不一樣。
11. useEffect 是處理同步的操作，確保每一次 render  的 state 或 props 與 UI 具有一致性。

本篇雖然著重於 `useEffect`  ，但對於新手一連貫認識 React 概念釐清很有幫助。讀完可以說是醍醐灌頂，從 class Component 到 function Component 的轉變，其解決的原因；function Component 使用的心智模型 (也就是核心概念)，更了解 Hooks 的思維與結合 JavaScript closure 的奧妙，讓人讀完有一種

>「原來是這樣的阿 !」

雖然閱讀過程很艱辛😵，因為我是生啃英文版，沒有選擇中文是擔心無法領會翻譯者的意思，不是怕翻不好，而是擔心翻譯者水平太高，反而我看不懂🤣。幸好 Dan 大的文章本身對小白很友善，很值得用原文一讀👍

### 題外話
這段期間校正本篇文章時，FB 社團 [ReactJS.tw](https://www.facebook.com/groups/reactjs.tw/)  也正好有大神做同樣的主題 [都 2022 年了你還是可能不懂 useEffect](https://slides.com/tz5514/useeffect-guide?fbclid=IwAR2VdZODJPO8Ex1Kd7PksCRA4dakIVvY-4aJ3X3ZtgfSwgq7hOGE6qHvcNc)。整理出的脈絡清晰，也有提到 React 18 為什麼嚴格模式會執行兩次的問題。目前我還沒完全看完，但我認為看不同的人解釋同篇文章也是很有值得學習的地方，畢竟新手跟老手的認知起點不同😂，很慶幸正好在學習 useEffect  同時遇到大神的簡報與演講，遇到觀念卡住時，我也會翻到大神的簡報去彌補我不懂的地方。

有一度想以簡報的內容去重新整理文章，但想想這也我學習 useEffect 的原汁原味學習過程，就全保留了🤓。

[^1]: render 內部 function 的執行點 : [w2wxl3yo0l - CodeSandbox](https://codesandbox.io/s/w2wxl3yo0l)
[^2]: function 版本 : setTimeout 之依序印出 state [lyx20m1ol - CodeSandbox](https://codesandbox.io/s/lyx20m1ol)
[^3]: class 版本 : setTimeout 之全部同時一樣的 state [kkymzwjqz3 - CodeSandbox](https://codesandbox.io/s/kkymzwjqz3)
[^4]: [Hooks API Reference – React – functional-updates](https://reactjs.org/docs/hooks-reference.html#functional-updates)
