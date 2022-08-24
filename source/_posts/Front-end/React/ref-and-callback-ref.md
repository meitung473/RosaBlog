---
title: 筆記 | React - ref 與 callback ref
tags: React
categories: [Front-end,React]
author: Rosa Hong
description:
date: 2022-08-24 10:43:24
---
> 文章來自 :
> 1. [Refs 和 DOM – React](https://zh-hant.reactjs.org/docs/refs-and-the-dom.html)
> 2. [React Hook 筆記 useRef. useRef 神奇的地方除了可以在不 re-render… ](https://medium.com/hannah-lin/react-hook-%E7%AD%86%E8%A8%98-useref-c628cbf0d7fb)
> 3. [Imperative vs Declarative Programming in JavaScript](https://www.linkedin.com/pulse/imperative-vs-declarative-programming-javascript-yehuda-margolis)

## 摘要
1. 什麼是 ref ?
2. ref 使用的時機
3. ref 的另一種型態 callback ref

<!-- more -->

## 什麼是 ref ?
ref 提供 React 資料流以外的操作方式，讓我們可以改變 React Component 的 instance (實例)，或者它來來操作 DOM 元素。

ref 可看作是一個普通的 JavaScript 物件，內部具有 current 的屬性的東西，可以直接 (mutable) 改變它。 React 保證它在生命週期 (render) 循環中永遠都指向同一個位址。
```js
const ref = {current : ... };
```

## 不過度使用 ref
使用 ref 的第一直覺上，我們可能會想說 ref **要在哪裡發生** ( 像是 state 會放到需要用到的元件內)，ref 不單單是拿來存放不會影響 re-render 的值，不應該被過度使用操作有關 React 資料流的部分。這時候應該使用 state，並且考慮 **哪個 component 應該擁有狀態**，如果是要共同擁有的 state 要做的是 *提升 state*。

## 使用 ref 的時機
1. focus、選擇文字或影音媒體播放等等
2. 觸發即時的動畫
3. 與第三方 DOM 函式整合

> 如果操作可以用宣告式 (declarative) 操作，避免使用 ref 

例如 : 對話視窗我們可以不用暴露 `open()` 或 `close()` 方法 ，而是使用 `isOpen` 作為 props 來操作。 我們不用告訴某元件要怎麼做 (HOW) ，而告訴其結果 (WHAT) 就好。

## 補充 : Declarative v.s Imperative in JavaScript
### Declarative 宣告式
著重於 WHAT (想要拿到的結果是什麼)，比較抽象的流程，多使用表達式 (expression)，特色是單純運算且具有回傳值。像是 functional programming。 

**特色 :** 
- Stateless : 專注內部算式，並不會直接改變原本傳入的值，單純輸入與輸出。
- 無副作用 (side effect)

```js
// 函式表達相乘
function multiple(arr){
  if(arr.length===0) return 0
  // 回傳相乘後的結果，其 state 又被塞進內部回傳新的結果
  return arr.map(x => x*2)
}

console.log(multiple([1,2,3]))
```
將其 function 名稱代表回傳的意義會使程式碼比較了解，也可以說 **定義 OO 是什麼**。

### Imperative 命令式
著重於 HOW (目標到底要怎麼做)，具體表示應該怎麼做來達到目標，一步步按照步驟，常使用 statement 流程控制 (if , while , for , switch) 等。像是 OOP。

**特色 :** 
- Stateful :  state 是互相有關連性的。
- 常會有副作用 side effect 發生

```js
const multiple = array =>{
  if(array.length == 0) return 0
  const result = [];
  for(let i=0;i<array.length;i++){
    result.push(array[i]*2)
  }
  return result 
}
console.log(multiple([1,2,3]))
```

### 小結
從例子來看，兩種方式都能達到結果，在 Imperative 中可以很清楚看見 state 是 "如何變化" 的，經過一步步的流程控制得出結果；在 Declarative 中資料的變化都被藏到內部另一個函式中 (邏輯被抽象化)，我們看到的是 "結果"。

JavaScript 使我們可以用兩種方式來實作，其各有優缺 : 
**Imperative :**   
- 優點 : 
  1. 語法對於開發人員比較好掌握。
  2. 在流程控制上都是在同一個區塊操作，包含停止或暫停 loop 都可以根據想要的操作。
  3. 在某些情況下，效能會比較好。
- 缺點 :  
  1. 程式碼通常較冗長，原因是邏輯都寫在同一塊
  2. 比較難以閱讀

**Declarative :**  
- 優點 : 
  1. 程式碼通常都很短，而且整潔、易讀
  2. 很適合用在 JavaScript 一些框架上，像是 React 與狀態管理的 redux 
- 缺點 :  
  1. 運行的比較慢一點，但在小型的應用程式不是太明顯。
 
## 建立 ref
在 class component 可以在建立 (constructor)  時新建 ref，可以是代表屬於某個 instance 的屬性，或者透過屬性 (attribute) 依附在 React element，在整個 component 裡面被參考。
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // 1. 用 createRef() 建立
    this.myRef = React.createRef();
  }
  render() {
    // 2. 使其用 attr 依附在 node 上，透過 this.myRef 就可以操作 DOM 元素
    return <div ref={this.myRef} />;
  }
}
```

在 function component 用 Hooks 可以直接在內部建立 ref
```jsx
const ref = useRef(0)
// ref = { current : 0}
```
`useRef` 比一般的 ref 更有用，它可以很方便地持有任何 mutable 的值 (`useRef` 可以是任何的值)，跟 class 中的 instance field 類似。

除非做延遲初始化[^1]，避免在 render 時設定 ref ，造成非預期的行為，所以我們應該 **在 event handler 和 effect 中修改 ref**。

## 存取 ref
Ref 的值會根據節點的類型而有所不同：
1. 建立的 ref 用在 html 元素上的屬性，等同於取得 DOM 元素本身作為 current 屬性。
2. 客製化的 class component 使用 ref 時，ref 等同於此 component mount 之後的實例(instance) 當作 current。 (簡單來說 ref 可以直接傳給 class component 中的子元件，但 functional component 不行)
3. 不能在 functional component 上使用 ref，因為他們沒有實例 (instance)。

### 在 DOM Element 加上 Ref
在 DOM Element 加上 ref，利用 ref 來儲存對於 DOM 節點的參考：
```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 產生一個可以儲存 textInput DOM element 的 ref
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }
  // focus 方法，直接對 DOM 元素操作
  focusTextInput() {
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          {/* 在 mount 的時候將 DOM element 賦值到 current 屬性*/}
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```
React 會在 component mount 的時候將 DOM element 賦值到 current 屬性，並在 unmount 時將它清空回 null 。 ref 的更新發生在生命週期 `componentDidMount` 或 `componentDidUpdate` 之前。

### 在 Class Component 加上 Ref
如果我們想在父元件 mount 之後，自動做 `focus` 這件事，可以透過父元件的 ref 拿到 `textInput` 實例本身 (也可以直接使用內部的方法)，並在 `componentDidMount` 呼叫。
```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  // 在元件 mount 之後自動做這件事 
  componentDidMount() {
    // focusTextInput() 是來自 CustomTextInput 本身 
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```
注意這 **只適用於利用 class 來宣告** `CustomTextInput` 的情形：
```jsx
class CustomTextInput extends React.Component {
  // ...
}
```

### Ref 和 Function Component
不能用 function component 使用 ref ，因為本身沒有 instance ，不能像 class component 直接將 ref 傳給 child component。
```jsx
/* 沒有這東西 */
function Input({ref}){
  return <input ref={ref} type="text"/>
}
function App(){
  const inputRef = useRef(null);
  return (
    <div>
      {/* ❌不行， Input 沒有 instance，不能接收 ref */}
      <Input ref={inputRef}/>
    </div>
  )
}
```
要不就在 child component 直接使用 `useRef`
```jsx
function Input(){
  // ✅ 這樣可以
  const ref = useRef(null)
  return <input ref={ref} type="text"/>
}
```
如果在父元件真的想將 ref 交遞給其他 function component ，React 會建議使用 **傳送 ref** (`forwardRef`) 的方式，**傳送 Ref 使得 component 能夠選擇要不要把 child component 的 ref 當作自己的 ref** 。不過這樣的方法不太建議，因為會破壞 component 的封裝。但有時候觸發 focus 或測量 child 的 DOM 節點的大小、位置是很有用的。

## 實務上的 ref
1. 計算 render 次數 (少)
2. **用 Imperatively 方法改變 DOM 跟 Child Component (最常)**
3. 想抓 Previous 的值 (少)

### 計算 render 次數
如果用 state 來計算，這個例子會導致無窮迴圈， `setState` 導致 re-render ，做 `setRenderCount` 又一而再地觸發，沒完沒了。
```jsx
function Counter(){
  const [count,setCount] = useState(0)
  const [renderCount,setRenderCount] = useState(0)

  // 每次 render 就 ++
  useEffect(()=>{
    setRenderCount(r => r+1) 
  })
  return (
    <div>
      {count}
      render : {renderCount}
    </div>
  )
}
```
這時候很適合使用 `useRef` ，因為它不會觸發 re-render。
```jsx
function Counter(){
  const [count,setCount] = React.useState(0)
  const countRef = React.useRef(0)

  // 每次 render 就 ++
  React.useEffect(()=>{
    countRef.current +=1 
  },[count])
  return (
    <div>
      {count}
      <button type="button" onClick={()=> setCount(count+1)}>+1</button>
      render : {countRef.current}
    </div>
  )
}
```

### 用 Imperatively 方法改變 DOM 跟 Child Component 
Imperative 的意思在 [[#補充 Declarative v s Imperative in JavaScript]] 章節解釋過。如果使用
state 的思路來看，會利用 focus state 來控制元件的狀態，基於好奇，我也就實作了 state 版本。

#### 實作 : 使用 state 來控制 autofocus
利用 key 的特性，讓 React 換掉節點，為什麼用 key 後面會解釋
```jsx
function App() {
  const [autoFocus, setAutoFocus] = React.useState(false);
  
  return (
    <>
      <input key={Number(autoFocus)} type="text" autoFocus={autoFocus} />
      <button type="button" onClick={() => setAutoFocus((f) => !f)}>
        關注
      </button>
    </>
  );
}
```
在 render 之後自動 Focus 也可以使用 `useEffect` 再多做一次的 render
```jsx
useEffect(()=>{
  setAutoFocus(true)
},[])
```
還記得 key 是拿來判斷 DOM 節點是否替換的一種指標嗎 ? 我們最常使用在 array 上，但其實也可以單獨拿出來使用，尤其對於大區塊的更動。

這部分時原本採取這樣的寫法，結果發現雖然 state 有改變，但是 `input` 沒有被 focus : 
```jsx
<input type="text" autoFocus={autoFocus} />
<button type="button" onClick={() => setAutoFocus((f) => !f)}>
  關注
</button>
```
阿 ! 結果忘了 React 怎麼去渲染這件基本的事，記得嗎😵它會做淺比較，既然 input 節點沒有改變，它只會修改屬性。在來說說 `autofocus` ，它的觸發點是在 DOM 節點被放在上面之後才會做 `focus()`，那上面這段我們確實可以把 `autoFoucs` 透過 state 變化添加上去，但是 input 本身是沒有重新建立這件事，因為 React 淺比較自動幫我們做渲染上的優化，所以我透過 key 幫直接重新產生 input 。

原本是透過替換不同的 html tag，實作 `autoFocus` 成功，但這不是正確的答案，又突然想到 key 的作用，結果就出來了。

#### 使用 ref
回到 ref ，建立 ref 綁在 DOM element 上，使我們可以直接操作 DOM，比上面的簡單多了。
```jsx
function App(){
  const inputRef = useRef(null)
  useEffect(()=>{
    inputRef.current.focus()
  },[])
  
  return (
    <div>
      <input type="text" ref={inputRef}/>
    </div>
  )
}
```
這樣的方式在表單很常使用，在 React 中分成 controlled component 和 uncontrolled component， 前者依賴 state 來操作，後者是透過 ref 直接讀取 DOM。

> ref 並不會出現在 `devtool` 的檢查視窗上，實際看到的只會是  `<input type="text"/>`

### 抓 Previous 的值
function component 因為 closure 的關係，只會記住當次 render 的 state 或 props 甚至是任何東西，我們沒辦法拿到上一次 render 的值。而透過 ref  來建立不會隨 render 而改變的盒子，讓我們可以在下一次 effect 呼叫之前先記住上一次的值。
```jsx
function App(){
  const [value,setValue] = React.useState("")
  const prevValue =React.useRef("");
  React.useEffect(()=>{
    prevValue.current = value
  },[value])
  
  return (
    <div>
      <input type="text" value={value} onChange={(e)=> setValue(e.target.value)}/>
      <div>previous: {prevValue.current}</div>
    </div>
  )
}
```
實際跟著跑一次 : 
```js
// 第一次 render
  value = ""
// JSX(UI顯示)
  input value =""
  previous:
// effect 執行
  prevValue.current = value = ""

// 使用者輸入 "1" re-render
  value = "1"
// JSX(UI顯示)
  input value ="1"
  previous:
// effect 執行，但是改變 ref 並不會造成 re-render，此時沒有更新停留在 previous:
  prevValue.current = value = "1" 
```
實際上 `prevValue.current` 等於 `value`，但是 render 是停留在第二次，並沒有刷新 UI，因此在畫面上看起來 `prevValue` 停留在前一次的 render，使我們可以拿到 previous 值。
![300x180](https://i.imgur.com/H2K46gT.png)




## callback ref
ref 還有另一種形式，不是將 `createRef()` 所產生的 ref 傳遞下去，而是把一個 function 往下傳 (function 也是一種 Object)。 function 會將 React component 的實例 (instance) 或 HTML DOM 作為它的參數，儲存之後在別的地方使用。

- class component
```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 1. 儲存 callback ref 取得的 node 或 instance 的空間
    this.textInput = null;
    // 2. 參數是 html DOM 或是 component 實例
    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // 利用原生的 DOM API 來 focus 文字輸入
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 在 mount 的時候自動 focus 輸入
    this.focusTextInput();
  }

  render() {
    return (
      <div>
        <input
          type="text"
          {/* ref 儲存參考 */}
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```
React 會在 component render 時用 DOM element 呼叫 ref callback，然後在 unmount 時用 null 呼叫它。  

>Ref 被保證在 `componentDidMount` 或 `componentDidUpdate` 觸發時能夠維持在最新的狀態。

### 有 ref + effect 為什麼還需要 callback ref
ref 建立/更新的時間點是在 render 階段，且在 `componentDidMount` 或 `componentDidUpdate` 觸發時能夠維持在最新的狀態 (在裡面獲取 state 是最新的)，換成 Hooks 是 `setState` 當下能拿到最新值，並且在 effect 執行之前發生。這避免在還沒獲取到 DOM 元素之前拿到 null 來操作。以往我們直接在 html tag 加上 ref 在 effect 操作 ref 時就已經拿到 `ref.current` 存取的 DOM 元素本身。 

到這裡好像都沒問題，但如果是 **子元件的條件式渲染** 呢 ? 在子元件巢狀結構中，父元件並不知道子元件的巢狀元件是否存在 (或是存在於第一次 render )，導致 render 之後在父元件的 ref 不知道有沒有抓到就執行 effect，而導致錯誤。

> 範例來自 : [Avoiding useEffect with callback refs | TkDodo's blog](https://tkdodo.eu/blog/avoiding-use-effect-with-callback-refs#focus-with-an-effect)
```jsx
function App() {
  const ref = React.useRef(null)

  React.useEffect(() => {
    // 🚨 ref.current 永遠是 null，這行會報錯 
    ref.current?.focus()
  }, [])
  
  return <Form ref={ref} />
}

const Form = React.forwardRef((props, ref) => {
  const [show, setShow] = React.useState(false)
  return (
    <form>
      <button type="button" onClick={() => setShow(true)}>
        show
      </button>
      /* 
      ref 附加在 input 上。
      但這是條件是渲染，ref.current 在 show = false 並沒有抓到 input DOM
      */
      {show && <input ref={ref} />}
    </form>
  )
})
```
我後來在想這個例子好不好🤔，其實提升 state 就可以解決問題了。但想一想我搞錯了😵，目的是 **Form 本身去判斷 input 出現就 autofocus**，應該把功能跟 Form 綁在一起，並非透過外部的元件來控制，這樣會使 APP 跟著 re-render ，是不必要的，所以應該是 Form 元件本身 state 改變， input 執行 `onfocus`。

補 : 後來我又想了想，應該是指 ref 傳下去不知道是不是有抓到該值，由於 ref 是可以直接改變的，如果在 render 期間改變，會造成結果不同🤔。  
 
第二次嘗試，直覺上我們會在 Form 元件用 state 透過 effect 來操作，這也是可以的 : 
```jsx
function App() {
  const ref = React.useRef(null)
  // ❌ 不需要 effect 了
  return <Form ref={ref} />
}
const Form = React.forwardRef((props, ref) => {
  const [show, setShow] = React.useState(false)
  
  // 用 effect 來補這個問題
  React.useEffect(()=>{
    if(show){
      ref.current?.focus()
    }
  },[show]) // 當按下按鈕就顯示，執行 focus
  
  return (
    <form>
      <button type="button" onClick={() => setShow(true)}>
        show
      </button>
      {show && <input ref={ref} />}
    </form>
  )
```
恩...雖然這可以解決問題，但 effect 其實不必這樣檢查 show ，何況 button 只觸發一次的 `setShow`🤔，難道不能讓它產生的時候自己  focus 嗎 ? 當 input `mount` 就自己 focus 。

另一個著手點就是把 `autoFocus` 裝上去， input 做 `mount` 又 `unmout` 對 React 來說都是新的節點誕生 : 
```jsx
{show && <input autoFocus/>}
```
不過衍生問題就在 [[#實作 使用 state 來控制 autofocus]] 的部分有討論過，如果在 input 是 "已出現" 的狀況下透過按鈕來控制 `autoFocus` ，由於 React 的淺比較優化導致元件僅修改屬性，而  `autoFocus` 只會在元件 mount 執行。 

最後一個解決的問題就是靠 **callback ref** 自己去判斷 Element node 是否存在去執行邏輯 : 
```jsx
function App() {
  return <Form />;
}
const Form = (props)=>{
  const [show, setShow] = React.useState(false);
  return (
    <form>
      <button type="button" onClick={() => setShow(true)}>
        show
      </button>
      {show && (
        <input
          // ref 接收的是一個 function，參數會是 DOM 節點本身
          ref={(node) => {
            if (node) {
              node.focus();
            }
          }}
        />
      )}
    </form>
  );
});
```
檢查 node 是否存在再呼叫，因為 ref 是在 `componentDidMount` 或 `componentDidUpdate` 拿到最新值，簡單來說就是 render 階段執行，在我們 `setShow` 改變 show 為 true 進到 render 階段，如果沒有加上判斷，會導致 `unmout` 時執行錯誤。

如果我們不判斷 node 是否存在，執行順序上是這樣 : 
```js
// 第一次 render
const show = false
input callback ref 不會執行

// 使用者按下按鈕觸發 setShow re-render
const show = true
// input ref function 執行， function(node) 參數是該 DOM 元素
node.focus() // ✅ 執行成功，node 不是 null

// 再按一次按鈕 setShow re-render 
const show = false
/* 
  input unmout，ref function 執行，ref 回到 null 代表節點消失，元素消失了 node = null 
*/
node.focus() //😵 執行失敗
```
callback ref 會在 component  `mount` 跟 `unmout` 都各執行一次，但 `unmount` 那次就不會抓到參數本身，因為 ref 回傳的是 null。 

寫成 inline 的方式就會使元件 re-render 也跟著重新建立 function，可以用 `useCallback` 把 function 記起來，避免不必要的 render : 
```jsx
const Form = (props)=>{
  const [show, setShow] = React.useState(false);
  // 1. 建立 function
  const inputRef = React.useCallback((node)=>{
    node?.focus();
  },[])
  return (
    <form>
      <button type="button" onClick={() => setShow(true)}>
        show
      </button>
      {show && (
        <input
          // 2. 填入 function
          ref={inputRef}
        />
      )}
    </form>
  );
});
```

## callback ref 的使用時機
1. 節點會消失又出現，需要動態的控制元件本身
2. 測量 DOM 的位置、大小

callback ref 提供動態的方式讓我們取得 DOM 節點，並且在 browser painting 之前可以做一些事。從上面 `autofocus` 可以讓元件建立又做 DOM 的 `focus()`。

### 小實作
Accordion 的內容會按照 `open` 開關影響高度，我們只要在 `open` 觸發 re-render 時，一併把樣式改變就可以輕鬆做到功能。
👉[Collapsibles/Accordion React callback ref](https://codepen.io/shan473/pen/MWVxzPX)
```jsx
function Accordion() {
  // 1. 開關控制
  const [open,setOpen] = React.useState(false)
  // 2. callback ref node 存在且 open = true
  const panelRef = React.useCallback((node)=>{
      if(node && open){
        node.style.maxHeight =node.scrollHeight +'px'
      }else if(node && !open){
        node.style.maxHeight =0
      }
  },[open])
  return (
    <div>
      <button className="accordion" onClick={()=> setOpen(open => !open)}>
        Section
      </button>
      <div
        className="panel"
        ref={panelRef}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}
```
當然這樣的方式也可以使用 `useRef` 搭配 `useEffect` 來實作 : 
```jsx
const panelRef = React.useRef(null)
React.useEffect(()=>{
 panelRef.current.style.maxHeight= open ? panelRef.current.scrollHeight +'px' : 0
},[open])
```
目前還想不到實際上的差異，但論時間點來說，useEffect 會在 render 之後才執行，很可能畫面會造成一瞬間的閃爍，這時候我們可能會用 `useLayoutEffect` 來處理，在 painting 之前就執行結束，像是樣式的更新，這不會讓使用者看到畫面突然閃一下變化。

通常 ref + `useEffect` 都可以做到 callback ref 做到的事。但  `useEffect` 具有 clean up function，假如元件具有監聽事件且 `unmount` 時，需要做清除的動作 (clean up function)，effect 使時我們拿到的 `ref.current` 依舊是上一次 render ，對 `ref.current` 取消監聽事件是可以的，但是 callback ref 在 unmount 時會把 node 回歸到 null，不能對 null 取消監聽事件。

### 注意
如果 callback ref  是被 inline function 所定義的，會在更新的時候被呼叫兩次。render 一次，mount 一次。第一次用 null 然後再用 DOM element 呼叫一次。這是因為新的 function 的 instance 是在每次 render 的時候被產生，所以 React 需要將舊的 ref 清掉然後設定新的。

可以定義 callback ref 為 class 上的一個 bound method (`method.bind`) 來避免這種情形，但在大多情況下他並沒有任何影響。

> 簡單來說 function 不要隨 render 每次都產生新的，將其給記住。

## ref 、 effect 與 layouteffect 
👉 [Box moving / multiple ref test with show null](https://codepen.io/shan473/pen/BarbEWJ?editors=0011) 我試做 `ref + useEffect` 、 `ref + uselayoutEffect`  ，來看看這三者的時間點。

根據範例印出 `render` 、`mount`  以及 `unmout` 時間 : 
```jsx
// render
callback ref call undefined (不管有沒有 node)
callback ref call null node undefined
callback ref render undefined
render effect null
render layout null

// mount 
callback ref call (不管有沒有 node)
  <div class=​"box one" style=​"top:​ 100px;​">​callback ref​</div>​
callback ref call in node 
  <div class=​"box one" style=​"top:​ 100px;​">​callback ref​</div>​
in effect layout 
  <div class=​"box three" style=​"top:​ 100px;​">​layout effect​</div>​
in effect 
  <div class=​"box two" style=​"top:​ 100px;​">​effect​</div>​

// unmount
callback ref call null (不管有沒有 node)
callback ref call null node null
clean up layout 
  <div class=​"box three" style=​"top:​ 100px;​">​layout effect​</div>​
clean up effect null
```
1. callback ref 在 render 時 call 再 mount 時又 call
2. `layoutEffect` 在 unmount 時 ref 還沒消失🤔

網路上已經有人把它製成表格，而且還有 updating 😄
![|400x180](https://blog.thoughtspile.tech/images/react-ref-order-f455246e4b65dcd8bad4434384f2460e.png)  
> 圖源自 : [So you think you know everything about React refs](https://blog.thoughtspile.tech/2021/05/17/everything-about-react-refs/)

effect 在 unmount 讀取 node 也會消失，但可以利用 closure 的特性，建立變數先將 node 給記住，在 `unmout` 呼叫 clean up function 時取消監聽事件。
```jsx
React.useEffect(() => {
  // 刻意記住，因為 boxRef 是會變動的
  const keepRef = boxRef.current
  boxRef.current.addEventListener("click", changeColor);
  boxRef.current.style.top = "100px";
  return () => {
    // null , box two 本身
    console.log(boxRef.current,keepRef.current)
    keepRef.current.removeEventListener("click", changeColor);
  };
}, []);
```

那 `layoutEffect` 可以直接在清除執行取消監聽嗎 ? 雖然 `ref.current` 依舊存在，但還是不安全的，最好是像 effect 一樣，利用 closure 的方式來取消監聽事件。

## callback ref 的 clean up function
>官方討論串 :  [React callback ref cleanup function · Issue #15176 · facebook/react · GitHub](https://github.com/facebook/react/issues/15176)

在 React 18 釋出以前已經有探討 callback ref clean up 的問題，上面有提到當 callback ref 在 `unmount` 呼叫時是 null，因此註銷監聽事件是不容易的，因此有人提出一些解決方案，未來也可能出現新的 API 來解決此問題🤔，大概看完 RFC 目前應該是沒有打算建立新 API ，結尾都指出這樣的改變可能導致新舊會產生衝突。

不過這部分我還沒詳讀😵，先記錄起來，之後會再寫文章來研究研究🤔  
1. Dan 大有提到，useCallback 如果回傳 function ，等同於做出新的行為，就不會有呼叫到 null 得的問題，🤔。 [RFC: Callback Ref Cleanup by KurtGokhan · Pull Request #205](https://github.com/reactjs/rfcs/pull/205)
2. 我覺得很玄的問題， 改變 ref 不 re-render ，但是這個需求卻要求 ref 要跟 state 做一樣的事🤔，不過最後也是提到 `return ()=>{}` clean up function 。[React 18 let's make ref.currant to be reactive value · Issue #21903 ](https://github.com/facebook/react/issues/21903)
3. 這一串討論 Custom Hooks 將 ref 外傳，然後 `useEffect` 的 deps 是放入 `ref.current` 這件事。聽起來有點反設計，因為 ref 不會觸發 re-render ，但是卻把它放在 deps 中監聽是否有改變再隨 re-render 重新呼叫🤔 [Accessing state/props in callback ref with hooks · Issue #16154](https://github.com/facebook/react/issues/16154)
4. 根據第三點官方提出的解決辦法 : [Hooks FAQ – How to read an often-changing value from useCallback?t](https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback)

以上都是處理邊際條件 (edge case) 的討論。

## 總結
1. ref 可以看做是一個普通 JavaScript 物件，帶有 `current` 屬性，React 確保改變它不會造成 re-render，也不會隨生命週期改變 。
2. 不能使用 `useRef` 替代 `useState`。 `useRef` 不會觸發 re-render ，操作後不保證能同步 UI (資料改了但是 React 不會刷新畫面，參見 : [[#抓 Previous 的值]])。
3. 最好在 effect 或是 event handler 裡面更新 ref ，因為 ref 的建立與更新的時間點。
4. 最常拿來直接操作 DOM 元素。
5. callback ref 常用來測量 DOM 的大小

過程中差點忘記主要目的是認識 ref 的用途，一不小心挖太深🤓，同時也看到原來 callback ref 有這麼多可擴展的方式，我一開始不太能理解 callback ref 要怎麼使用 ，因為 `useEffect + ref` 都能解決大部分的問題，只是麻煩了點🤔。後續 ref 的部份會再寫一篇再深入 ref 的文章。

[^1]: 延遲初始化是指初始值需要經過計算而來，我們只需要在 render 一次建立就好