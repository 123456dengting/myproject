console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')

/**
 * 
 javascript 环境
 事件循环中的异步队列有两种：macro（宏任务）队列和 micro（微任务）队列。宏任务队列可以有多个，微任务队列只有一个。
 宏任务：常见的 macro-task 比如：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作、UI 渲染等。
 微任务：常见的 micro-task 比如: process.nextTick、new Promise().then(回调)、MutationObserver(html5 新特性) 等。

 js中，script标签属于宏任务
 1. 执行script标签 输出start， end    ======= start end
 2. 执行完script宏任务之后，生成了两个宏任务和一个微任务，先执行微任务 promise3 ========= promise3
 3. 执行完微任务，再执行宏任务，timer1， 执行完time1这个宏任务会生成一个微任务promise1，再执行微任务promise1 ============= timer1 promise1
 4. 执行完promise1，再执行宏任务timer2， 执行完timer2这个宏任务会生成一个微任务promise2，再执行promise2  ============= timer2 promise2

 // start end promise3 timer1 promise1  timer2   promise2


 nodejs 中执行顺序
 1. start end   ==============  start end
 2. 执行完同步任务，生成一个微任务 promise3， 执行微任务promise3.     ========== promise3
 2. 执行完微任务，生成两个宏任务。会在这个阶段把两个宏任务都在这个阶段执行timer1 timer2   ============ timer1 timer2
 3.  执行完两个宏任务，生成两个微任务，执行两个微任务 promise1 promise2 ============= promise1 promise2

  // start end promise3 timer1   timer2  promise1  promise2



  总结：
   浏览器和 Node 环境下，microtask 任务队列的执行时机不同
   Node 端，microtask 在事件循环的各个阶段之间执行   （可以同时存在多个微任务）
   浏览器端，microtask 在事件循环的 macrotask 执行完之后执行 （只能存在一个微任务）
*/