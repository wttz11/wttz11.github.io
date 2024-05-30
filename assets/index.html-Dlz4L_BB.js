import{_ as e,o as a,c as i,a as l,b as n,d as s}from"./app-CVXxSXU1.js";const c="/assets/响应式流程-CaS_koEg.png",p={},u=l('<p>以下内容均围绕Vue3</p><p>响应式系统的核心其实就是<strong>响应式数据</strong>以及其对应的<strong>副作用函数</strong>，二者缺一都无法实现响应式</p><h1 id="副作用函数" tabindex="-1"><a class="header-anchor" href="#副作用函数"><span>副作用函数</span></a></h1><p>副作用函数是指那些运行会对页面或者其他数据产生影响的函数，而并非一个纯函数。通常渲染函数，<code>computed</code>、<code>watch</code>、<code>watchEffect</code>中所配置的函数等等都是副作用函数</p><h1 id="响应式数据" tabindex="-1"><a class="header-anchor" href="#响应式数据"><span>响应式数据</span></a></h1><p>响应式数据是指发生变化后需要引起页面变化或其他数据变化的那些数据，通常以<code>ref</code>,<code>reactive</code>所声明的数据，以及<code>computed</code>、<code>watch</code>、<code>watcheffect</code>所使用的数据均为响应式数据</p><h1 id="响应式原理" tabindex="-1"><a class="header-anchor" href="#响应式原理"><span>响应式原理</span></a></h1><p>响应式的原理其实很简单也容易理解，收集所有响应式数据相关的副作用函数，在响应式数据发生变化时把他们都重执行一次即可</p><p><img src="'+c+'" alt=""></p><h1 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现"><span>具体实现</span></a></h1><h2 id="副作用函数-1" tabindex="-1"><a class="header-anchor" href="#副作用函数-1"><span>副作用函数</span></a></h2><h3 id="effect-函数包装副作用函数" tabindex="-1"><a class="header-anchor" href="#effect-函数包装副作用函数"><span><code>effect()</code>函数包装副作用函数</span></a></h3><p>真正被存放与取出使用的函数是经过<code>effect()</code>包装的</p><p><strong><code>effect()</code>函数的基本实现</strong></p>',14),r=n("div",{class:"language-text line-numbers-mode","data-ext":"text","data-title":"text"},[n("pre",{class:"shiki shiki-themes vitesse-light vitesse-dark vp-code","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"function effect(fn, options={}){")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const effectFn = () =>{")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //清除原有的响应式依赖关系，主要针对函数中存在分支切换的情况，下面执行fn的过程中会更新依赖关系")]),s(`
`),n("span",{class:"line"},[n("span",null,"        cleanup(effectFn)   ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // activeEffect是一个全局变量，保存正在运行的副作用，用于副作用函数的收集")]),s(`
`),n("span",{class:"line"},[n("span",null,"        activeEffect =effectFn  ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        /*effectStack栈同样是一个全局变量，与下方的当前副作用函数的入栈出栈操作结合，")]),s(`
`),n("span",{class:"line"},[n("span",null,"        用于解决发生副作用函数嵌套时的响应式丢失问题*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 在调用副作用函数之前将当前副作用函数压栈")]),s(`
`),n("span",{class:"line"},[n("span",null,"        effectStack.push(effectFn)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //调用待封装的函数，函数执行时会触发响应式变量的get方法进行收集")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const res =fn()  ")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect 还原为之前的值")]),s(`
`),n("span",{class:"line"},[n("span",null,"        effectStack.pop()")]),s(`
`),n("span",{class:"line"},[n("span",null,"        activeEffect=effectStack[effectStack.length-1]")]),s(`
`),n("span",{class:"line"},[n("span",null,"        return res")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    effectFn.options=options    //配置项，可用于在trigger函数中调度器的执行")]),s(`
`),n("span",{class:"line"},[n("span",null,"    effectFn.deps=[]    //为当前副作用函数创造依赖集合，存放那些含有当前副作用函数的set，用于cleanup")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if(!options.lazy){  //lazy选项，在计算属性和监听器中会用到")]),s(`
`),n("span",{class:"line"},[n("span",null,"        effectFn()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return effectFn()")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),t=n("p",null,[n("strong",null,[n("code",null,"cleanup()"),s("函数的基本实现")])],-1),d=n("div",{class:"language-text line-numbers-mode","data-ext":"text","data-title":"text"},[n("pre",{class:"shiki shiki-themes vitesse-light vitesse-dark vp-code","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span",null,"function cleanup(effectFn){")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //遍历effectFn.deps,其中的元素是包含了该副作用函数的set")]),s(`
`),n("span",{class:"line"},[n("span",null,"    for(let i=0;i<effectFn.deps.length;i++){")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const deps =effectFn.deps[i] //即set")]),s(`
`),n("span",{class:"line"},[n("span",null,"        deps.delete(effectFn)   //从set中删除当前函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    effectFn.deps.length=0")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),v=l('<p><code>computed</code>,<code>watch</code>,<code>watchEffect</code>也都与effect的封装与调度器（与options参数相关）的使用相关</p><h3 id="computed-的实现" tabindex="-1"><a class="header-anchor" href="#computed-的实现"><span><code>computed()</code>的实现</span></a></h3><p><code>computed()</code> 方法期望接收一个 getter 函数，返回值为一个计算属性 ref。和其他一般的 ref 类似，你可以通过 obj.value 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 .value。Vue 的计算属性会自动追踪响应式依赖。(来自Vue3文档)</p>',3),m=n("div",{class:"language-text line-numbers-mode","data-ext":"text","data-title":"text"},[n("pre",{class:"shiki shiki-themes vitesse-light vitesse-dark vp-code","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"function computed(getter) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let value")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let dirty = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const effectFn = effect(getter, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        lazy: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"        scheduler() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (!dirty) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                dirty = true")]),s(`
`),n("span",{class:"line"},[n("span",null,"                // 当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应")]),s(`
`),n("span",{class:"line"},[n("span",null,"                trigger(obj, 'value')")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const obj = {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get value() {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (dirty) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                value = effectFn()")]),s(`
`),n("span",{class:"line"},[n("span",null,"                dirty = false")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"            // 当读取 value 时，手动调用 track 函数进行追踪")]),s(`
`),n("span",{class:"line"},[n("span",null,"            track(obj, 'value')")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return value")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return obj")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),b=l('<h4 id="getter-不应有副作用​" tabindex="-1"><a class="header-anchor" href="#getter-不应有副作用​"><span>getter 不应有副作用​</span></a></h4><p>计算属性的 getter 应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，不要改变其他状态、在 getter 中做异步请求或者更改 DOM！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此 getter 的职责应该仅为计算和返回该值。在之后的指引中我们会讨论如何使用侦听器根据其他响应式状态的变更来创建副用。作</p><h4 id="避免直接修改计算属性值​" tabindex="-1"><a class="header-anchor" href="#避免直接修改计算属性值​"><span>避免直接修改计算属性值​</span></a></h4><p>从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。</p><h3 id="任务队列" tabindex="-1"><a class="header-anchor" href="#任务队列"><span>任务队列</span></a></h3><p>任务队列，个人理解就是为了在一个事件循环内，所有被触发渲染函数不是立即执行，而是收集起来进行去重优化后放入下一个微任务队列，可以提升渲染性能,在watch中也会使用</p>',6),o=n("div",{class:"language-text line-numbers-mode","data-ext":"text","data-title":"text"},[n("pre",{class:"shiki shiki-themes vitesse-light vitesse-dark vp-code","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 定义一个任务队列，个人理解就是为了在一个事件循环内，所有被触发渲染函数不是立即执行，而是收集起来进行去重优化后放入下一个微任务队列，可以提升渲染性能")]),s(`
`),n("span",{class:"line"},[n("span",null,"const jobQueue = new Set()")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 使用 Promise.resolve() 创建一个 promise 实例，我们用它将一个任务添加到微任务队列")]),s(`
`),n("span",{class:"line"},[n("span",null,"const p = Promise.resolve()")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"// 一个标志代表是否正在刷新队列")]),s(`
`),n("span",{class:"line"},[n("span",null,"let isFlushing = false")]),s(`
`),n("span",{class:"line"},[n("span",null,"function flushJob() {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 如果队列正在刷新，则什么都不做")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (isFlushing) return")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 设置为 true，代表正在刷新")]),s(`
`),n("span",{class:"line"},[n("span",null,"    isFlushing = true")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 在微任务队列中刷新 jobQueue 队列")]),s(`
`),n("span",{class:"line"},[n("span",null,"    p.then(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        jobQueue.forEach(job => job())")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }).finally(() => {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 结束后重置 isFlushing")]),s(`
`),n("span",{class:"line"},[n("span",null,"        isFlushing = false")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"effect(() => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.log(obj.foo)")]),s(`
`),n("span",{class:"line"},[n("span",null,"}, {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    scheduler(fn) {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 每次调度时，将副作用函数添加到 jobQueue 队列中")]),s(`
`),n("span",{class:"line"},[n("span",null,"        jobQueue.add(fn)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 调用 flushJob 刷新队列")]),s(`
`),n("span",{class:"line"},[n("span",null,"        flushJob()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"})")])])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),f=n("h3",{id:"watch-的实现",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#watch-的实现"},[n("span",null,[n("code",null,"watch()"),s("的实现")])])],-1),h=n("p",null,"在组合式 API 中，我们可以使用 watch 函数在每次响应式状态发生变化时触发回调函数,watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组：",-1),g=n("div",{class:"language-text line-numbers-mode","data-ext":"text","data-title":"text"},[n("pre",{class:"shiki shiki-themes vitesse-light vitesse-dark vp-code","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"//source 是响应式数据，cb 是回调函数，options是配置项")]),s(`
`),n("span",{class:"line"},[n("span",null,"function watch(source, cb, options = {}) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let getter")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //如果传入的不是一个get函数，就将其包装为一个函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (typeof source === 'function') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        getter = source")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        getter = () => traverse(source)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let oldValue, newValue //用于存放新旧值")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // cleanup 用来存储用户注册的过期回调")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let cleanup")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 定义 onInvalidate 函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    function onInvalidate(fn) {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 将过期回调存储到 cleanup 中")]),s(`
`),n("span",{class:"line"},[n("span",null,"        cleanup = fn")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const job = () => {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //得到最新的响应式数据")]),s(`
`),n("span",{class:"line"},[n("span",null,"        newValue = effectFn()")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 在调用回调函数 cb 之前，先调用过期回调")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (cleanup) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            cleanup()")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 将 onInvalidate 作为回调函数的第三个参数，以便用户使用")]),s(`
`),n("span",{class:"line"},[n("span",null,"        cb(newValue, oldValue, onInvalidate)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        oldValue = newValue")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const effectFn = effect(")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 执行 getter，建立响应式联系")]),s(`
`),n("span",{class:"line"},[n("span",null,"        () => getter(),")]),s(`
`),n("span",{class:"line"},[n("span",null,"        {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            lazy: true,")]),s(`
`),n("span",{class:"line"},[n("span",null,"            scheduler: () => {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"                // 在调度函数中判断 flush 是否为 'post'，如果是，将其放到微任务队列中执行")]),s(`
`),n("span",{class:"line"},[n("span",null,"                if (options.flush === 'post') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    const p = Promise.resolve()")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    p.then(job)")]),s(`
`),n("span",{class:"line"},[n("span",null,"                } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    job()")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    )")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ")]),s(`
`),n("span",{class:"line"},[n("span",null,"//是否立即执行一次，若立即执行则没有oldValue")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (options.immediate) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        job()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        oldValue = effectFn()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),k=l('<h2 id="响应式数据-1" tabindex="-1"><a class="header-anchor" href="#响应式数据-1"><span>响应式数据</span></a></h2><h3 id="track-与trigger" tabindex="-1"><a class="header-anchor" href="#track-与trigger"><span><code>track()</code>与<code>trigger()</code></span></a></h3><h4 id="track-用于副作用函数的收集" tabindex="-1"><a class="header-anchor" href="#track-用于副作用函数的收集"><span><code>track()</code>用于副作用函数的收集</span></a></h4>',3),x=n("div",{class:"language-text line-numbers-mode","data-ext":"text","data-title":"text"},[n("pre",{class:"shiki shiki-themes vitesse-light vitesse-dark vp-code","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"function track(target, key) {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 没有 activeEffect，直接 return")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!activeEffect) return")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let depsMap = bucket.get(target)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!depsMap) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        bucket.set(target, (depsMap = new Map()))")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    let deps = depsMap.get(key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (!deps) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        depsMap.set(key, (deps = new Set()))")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 把当前激活的副作用函数添加到依赖集合 deps 中")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // deps 就是一个与当前副作用函数存在联系的依赖集合,就是一个Set")]),s(`
`),n("span",{class:"line"},[n("span",null,"    deps.add(activeEffect)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 将其添加到 activeEffect.deps 数组中，存放那些包含当前副作用函数的的Set，用于cleanup")]),s(`
`),n("span",{class:"line"},[n("span",null,"    activeEffect.deps.push(deps) // 新增")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),_=n("h4",{id:"trigger-用于在数据变化时重执行响应式函数-这里地trigger仅用于object-对于array、map、set则要考虑它们自身属性的特殊性-类如array的length属性的响应式",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#trigger-用于在数据变化时重执行响应式函数-这里地trigger仅用于object-对于array、map、set则要考虑它们自身属性的特殊性-类如array的length属性的响应式"},[n("span",null,[n("code",null,"trigger()"),s("用于在数据变化时重执行响应式函数(这里地trigger仅用于Object,对于Array、Map、Set则要考虑它们自身属性的特殊性，类如Array的length属性的响应式)")])])],-1),y=n("div",{class:"language-text line-numbers-mode","data-ext":"text","data-title":"text"},[n("pre",{class:"shiki shiki-themes vitesse-light vitesse-dark vp-code","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"function trigger(target,key,type){")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //全局weakMap->Map->Set")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const depsMap= bucket.get(target)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if(!depsMap) return")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const effects = depsMap.get(key)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    /*对原有Set做一个备份，因为之前说过，在执行副作用函数之前会进行cleanup操作，")]),s(`
`),n("span",{class:"line"},[n("span",null,"    删去原有的响应依赖，而执行副作用函数又会收集依赖向Set中添加，倘若不做备份记录")]),s(`
`),n("span",{class:"line"},[n("span",null,"    而直接遍历原Set去执行其中的副作用函数,会因为原Set不断地加入函数而陷入死循环*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"    const effectsToRun = new Set()")]),s(`
`),n("span",{class:"line"},[n("span",null,"    effect && effect.forEach((effectFn)=>{")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if(effectFn !== activeEffect){")]),s(`
`),n("span",{class:"line"},[n("span",null,"            effectsToRun.add(effectFn)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    // 当操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数重新执行")]),s(`
`),n("span",{class:"line"},[n("span",null,"    if (type === 'ADD' || type === 'DELETE') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        const iterateEffects = depsMap.get(ITERATE_KEY)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        iterateEffects && iterateEffects.forEach(effectFn => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (effectFn !== activeEffect) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                effectsToRun.add(effectFn)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"        })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    }")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //遍历备份Set执行副作用函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"    effectsToRun.forEach(effectFn => {")]),s(`
`),n("span",{class:"line"},[n("span",null,"        //如果有调度器则直接执行调度器，在computed、watch属性中用到")]),s(`
`),n("span",{class:"line"},[n("span",null,"        if (effectFn.options.scheduler) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            effectFn.options.scheduler(effectFn)")]),s(`
`),n("span",{class:"line"},[n("span",null,"        } else {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            effectFn()")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),w=n("h3",{id:"reactive对象的创建",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#reactive对象的创建"},[n("span",null,[n("code",null,"reactive对象"),s("的创建")])])],-1),E=n("p",null,[s("基本逻辑就是要在响应式数据被访问时调用"),n("code",null,"track()"),s("进行依赖收集，在响应式数据被更改时调用"),n("code",null,"trigger()"),s("进行依赖触发")],-1),F=n("div",{class:"language-text line-numbers-mode","data-ext":"text","data-title":"text"},[n("pre",{class:"shiki shiki-themes vitesse-light vitesse-dark vp-code","v-pre":""},[n("code",null,[n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"function createReactive(obj, isShallow = false, isReadonly =false) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return new Proxy(obj, {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        /*使用Reflect是为了利用receiver参数保证在依赖收集，分发时保证this时刻指向代理对象，")]),s(`
`),n("span",{class:"line"},[n("span",null,"        而不是原对象，只有对代理对象的操作才能产生响应式*/")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"        // 拦截读取操作")]),s(`
`),n("span",{class:"line"},[n("span",null,"        get(target, key, receiver) {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"            //可以通过raw属性访问到原对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (key === 'raw') {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return target")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (!isReadonly) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                track(target, key)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const res = Reflect.get(target, key, receiver)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (isShallow) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return res")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (typeof res === 'object' && res !== null) {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"                // 如果数据为只读，则调用 readonly 对值进行包装,否则递归调用reactive做深响应")]),s(`
`),n("span",{class:"line"},[n("span",null,"                return isReadonly ? readonly(res) : reactive(res)")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return res")]),s(`
`),n("span",{class:"line"},[n("span",null,"        },")]),s(`
`),n("span",{class:"line"},[n("span",null,"        set(target, key, newVal, receiver) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const oldVal = target[key]")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const type = Object.prototype.hasOwnProperty.call(target,key) ? 'SET' : 'ADD'")]),s(`
`),n("span",{class:"line"},[n("span",null,"            const res = Reflect.set(target, key, newVal, receiver)")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"            /* 当使用get时，若当前对象上并没有这个属性则会去原型上寻找，倘若原型也是一个响应式对象")]),s(`
`),n("span",{class:"line"},[n("span",null,"            则会导致原型与当前对象都与副作用函数建立响应式依赖，在响应式分发时也会在原型与当前对象上")]),s(`
`),n("span",{class:"line"},[n("span",null,"            都执行一次副作用函数，  ")]),s(`
`),n("span",{class:"line"},[n("span",null,"            target === receiver.raw ")]),s(`
`),n("span",{class:"line"},[n("span",null,"            说明 receiver 就是 target 的代理对象，为了屏蔽因原型而引起的重复更新。*/")]),s(`
`),n("span",{class:"line"},[n("span",null,"            if (target === receiver.raw) {")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"                // 比较新值与旧值，只有当它们不全等，并且不都是 NaN 的时候才触发响应")]),s(`
`),n("span",{class:"line"},[n("span",null,"                if (oldVal !== newVal && (oldVal === oldVal || newVal=== newVal)) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    trigger(target, key, type)")]),s(`
`),n("span",{class:"line"},[n("span",null,"                }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            }")]),s(`
`),n("span",{class:"line"},[n("span",null,"            return res")]),s(`
`),n("span",{class:"line"},[n("span",null,"        }")]),s(`
`),n("span",{class:"line"},[n("span",null,"    })")]),s(`
`),n("span",{class:"line"},[n("span",null,"    //省略其他拦截函数")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),V=[u,r,t,d,v,m,b,o,f,h,g,k,x,_,y,w,E,F];function S(j,M){return a(),i("div",null,V)}const T=e(p,[["render",S],["__file","index.html.vue"]]),P=JSON.parse(`{"path":"/article/07o4e87w/","title":"Vue3的响应式系统","lang":"en-US","frontmatter":{"title":"Vue3的响应式系统","author":"wt1","createTime":"2024/01/3","permalink":"/article/07o4e87w/","tags":["Vue"],"head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"副作用函数","slug":"副作用函数-1","link":"#副作用函数-1","children":[{"level":3,"title":"effect()函数包装副作用函数","slug":"effect-函数包装副作用函数","link":"#effect-函数包装副作用函数","children":[]},{"level":3,"title":"computed()的实现","slug":"computed-的实现","link":"#computed-的实现","children":[]},{"level":3,"title":"任务队列","slug":"任务队列","link":"#任务队列","children":[]},{"level":3,"title":"watch()的实现","slug":"watch-的实现","link":"#watch-的实现","children":[]}]},{"level":2,"title":"响应式数据","slug":"响应式数据-1","link":"#响应式数据-1","children":[{"level":3,"title":"track()与trigger()","slug":"track-与trigger","link":"#track-与trigger","children":[]},{"level":3,"title":"reactive对象的创建","slug":"reactive对象的创建","link":"#reactive对象的创建","children":[]}]}],"isBlogPost":true,"readingTime":{"minutes":8.75,"words":2624},"git":{},"filePathRelative":"前端/Vue框架/响应式/Vue3的响应式系统.md","categoryList":[{"type":10000,"name":"前端"},{"type":10002,"name":"Vue框架"},{"type":10006,"name":"响应式"}]}`);export{T as comp,P as data};
