import{_ as e,o as t,c as s,a}from"./app-CVXxSXU1.js";const o="/assets/浏览器的多进程-DIghxaOx.png",i="/assets/渲染过程-DiiBX5aN.jpg",r={},l=a('<h1 id="浏览器的多进程" tabindex="-1"><a class="header-anchor" href="#浏览器的多进程"><span>浏览器的多进程</span></a></h1><p><img src="'+o+'" alt=""></p><ol><li><p>渲染进程：负责一个Tab内的显示相关的工作，也称渲染引擎也是浏览器的内核（控制每一个页面的内容）</p></li><li><p>插件进程：负责控制网页使用到的插件</p></li><li><p>GPU进程：负责处理整个应用程序的GPU任务</p></li><li><p>浏览器进程：负责浏览器的TAB的前进、后退、地址栏、书签栏的工作和处理浏览器的一些不可见的底层操作，比如网络请求和文件访问</p></li></ol><h2 id="多进程使得浏览器更加文档安全-更稳定-更流畅" tabindex="-1"><a class="header-anchor" href="#多进程使得浏览器更加文档安全-更稳定-更流畅"><span>多进程使得浏览器更加文档安全，更稳定，更流畅</span></a></h2><ol><li><p>一个进程卡死不会影响其他进程</p></li><li><p>线程之间可以通过内存共享直接共享数据，是不安全的，而进程则不会</p></li><li><p>所有工作由一个进程完成会产生性能问题</p></li></ol><h2 id="渲染进程的开启模式" tabindex="-1"><a class="header-anchor" href="#渲染进程的开启模式"><span>渲染进程的开启模式</span></a></h2><p><strong>注意</strong> 渲染进程中，包含线程分别是：</p><p>一个主线程（main thread）（js与渲染工作均运行在主线程，二者互斥）</p><p>多个工作线程（work thread）</p><p>一个合成器线程（compositor thread）</p><p>多个光栅化线程（raster thread）</p><p>对于渲染进程的使用，有以下四种模式</p><ol><li>Process-per-site-instance (default) - 同一个 site-instance 使用一个进程</li><li>Process-per-site - 同一个 site 使用一个进程</li><li>Process-per-tab - 每个 tab 使用一个进程</li><li>Single process - 所有 tab 共用一个进程</li></ol><p>关于 site 和 site-instance 的定义</p><p>site 指的是相同的 registered domain name(如： google.com ，bbc.co.uk)和scheme (如：https://)/)。比如a.baidu.com和b.baidu.com就可以理解为同一个 site（注意这里要和 Same-origin policy 区分开来，同源策略还涉及到子域名和端口）。</p><p>site-instance 指的是一组 connected pages from the same site，这里 connected 的定义是 can obtain references to each other in script code 怎么理解这段话呢。满足下面两中情况并且打开的新页面和旧页面属于上面定义的同一个 site，就属于同一个 site-instance</p><ol><li>用户通过<code>&lt;a target=&quot;_blank&quot;&gt;</code>这种方式点击打开的新页面</li><li>JS代码打开的新页面（比如 window.open)</li></ol><p>理解了概念之后，下面解释四个进程模式 首先是Single process，顾名思义，单进程模式，所有tab都会使用同一个进程。 接下来是Process-per-tab ，也是顾名思义，每打开一个tab，会新建一个进程。 而对于Process-per-site，当你打开 a.baidu.com 页面，在打开 b.baidu.com 的页面，这两个页面的tab使用的是共一个进程，因为这两个页面的site相同，而如此一来，如果其中一个tab崩溃了，而另一个tab也会崩溃。 Process-per-site-instance 是最重要的，因为这个是 Chrome 默认使用的模式，也就是几乎所有的用户都在用的模式。当你打开一个 tab 访问 a.baidu.com ，然后再打开一个 tab 访问 b.baidu. com，这两个 tab 会使用两个进程。而如果你在 a.baidu.com 中，通过JS代码打开了 b.baidu.com 页面，这两个 tab 会使用同一个进程。</p><p>默认模式选择Process-per-site-instance</p><p>那么为什么浏览器使用Process-per-site-instance作为默认的进程模式呢？ Process-per-site-instance兼容了性能与易用性，是一个比较中庸通用的模式。</p><p>相较于 Process-per-tab，能够少开很多进程，就意味着更少的内存占用 相较于 Process-per-site，能够更好的隔离相同域名下毫无关联的 tab，更加安全</p><h1 id="多进程之间的合作" tabindex="-1"><a class="header-anchor" href="#多进程之间的合作"><span>多进程之间的合作</span></a></h1><p>浏览器的加载与渲染时多个进程合作的结果</p><h2 id="在浏览器地址栏里输入内容后-会发生什么" tabindex="-1"><a class="header-anchor" href="#在浏览器地址栏里输入内容后-会发生什么"><span>在浏览器地址栏里输入内容后，会发生什么？</span></a></h2><h3 id="发送过程" tabindex="-1"><a class="header-anchor" href="#发送过程"><span>发送过程</span></a></h3><ol><li><p><strong>域名解析</strong> 浏览器进程对输入内容进行解析判断，如果为一个网址则启动网络线程对其进行<code>DNS</code>解析，如果不是网址浏览器则会使用搜索引擎进行搜索</p><p>DNS过程：查询浏览器是否有IP地址缓存，检查本机是否有缓存，向根域名发出请求，逐层向下查找</p><p>使用UDP协议进行连接，UDP的特点：不基于链接，不可靠的，但传输速度很快，适合对时效性要求高可靠性要求低的场景</p></li><li><p><strong>HTTP请求</strong> HTTP请求包括请求行（HTTP版本+URL+请求方法），请求头（请求头参数），请求体（一般POST请求会有）</p></li><li><p><strong>TCP连接</strong> 应用层HTTP协议完成后进入传输层层，用TCP协议向目标IP地址建立连接</p><p>建立可靠的连接，使数据完整，有序的传递</p><p>三次握手建立连接（SYN，SYN+ACK，ACK） 确认序列号正确，避免历史连接，避免浪费资源</p><p>四次握手终止连接（FIN，ACK，FIN，ACK） 保证了在双方都将所有数据处理完毕的情况下才关闭连接</p></li><li><p><strong>IP协议</strong> TCP协议封装后使用网络层IP协议封装</p><p>将数据包从一个网络节点传输到另一个网络节点，通过路由和转发机制实现这一功能。</p></li><li><p><strong>完成连接</strong> 完成连接后不断使用HTTP协议进行数据传输</p></li></ol><h3 id="收到返回信息后" tabindex="-1"><a class="header-anchor" href="#收到返回信息后"><span>收到返回信息后</span></a></h3><p><img src="'+i+'" alt=""></p><ol><li><strong>安全检查</strong> 浏览器进程作用</li></ol><p>网络线程收到数据后首先使用内置的安全检查系统对网址进行安全检查，判断网站是否为恶意站点并像你发送提醒</p><ol start="2"><li><strong>数据传递</strong> 浏览器进程-&gt;渲染进程</li></ol><p>返回数据准备完毕且安全校验通过时，浏览器进程通过IPC管道将数据交给渲染进程，开始渲染</p><ol start="3"><li><strong>DOM Tree</strong> 主线程作用</li></ol><p>解析HTML形成DOM Tree,遇到<code>&lt;script&gt;</code>标签时会停止解析，先加载<code>&lt;script&gt;</code>标签,因为JavaScript可能会操作DOM影响DOM Tree，可以使用<code>async</code>或<code>defer</code>属性使<code>&lt;script&gt;</code>异步加载</p><ol start="4"><li><strong>计算样式</strong> 主线程作用</li></ol><p>遇到<code>&lt;style&gt;</code>标签或者<code>&lt;link&gt;</code>标签的CSS资源，会加载CSS代码，根据CSS代码确定每个DOM节点的计算样式</p><ol start="5"><li><strong>layout Tree</strong> 主线程作用</li></ol><p>DOM树和计算样式完成后，我们还需要知道每一个节点在页面上的位置，布局（Layout）其实就是找到所有元素的几何关系的过程。主线程会遍历DOM及相关元素的计算样式，构建出包含每个元素的页面坐标信息及盒子模型大小的<strong>布局树（Render Tree）</strong>，遍历过程中，会跳过隐藏的元素（display: none），另外，伪元素虽然在DOM上不可见，但是在布局树上是可见的</p><ol start="6"><li><strong>确认绘制顺序（层叠关系）</strong> 主线程作用</li></ol><p>在绘制阶段，主线程会遍历布局树（layout tree），生成一系列的绘制记录表（paint records），记录了文档的绘制顺序，并生成layer tree</p><ol><li><strong>栅格化</strong> 合成器线程作用</li></ol><p>将文档的绘制顺序与layer tree传给<strong>合成器线程</strong>，<strong>合成器线程</strong>开始对层次数的每一层进行光栅化。有的层的可以达到整个页面的大小，所以合成线程需要将它们切分为一块又一块的小图块（tiles），之后将这些小图块分别进行发送给一系列<strong>栅格线程（raster threads）<strong>进行栅格化，结束后栅格线程会将每个图块的光栅结果存在</strong>GPU进程</strong>的内存中。当图层上面的图块都被栅格化后，合成线程会收集图块上面叫做<strong>绘画四边形（draw quads）</strong>（记录了图块在内存中的位置以及图块应该在页面的哪个位置）的信息来构建一个<strong>合成帧（compositor frame）</strong></p><ol start="8"><li><strong>渲染</strong> 合成器线程-&gt;浏览器进程+GPU</li></ol><p>合成线程会通过IPC向浏览器进程（browser process）提交（commit）一个合成帧。这些合成帧都会被发送给GPU从而展示在屏幕上。如果合成线程收到页面滚动的事件，合成线程会构建另外一个合成帧发送给GPU来更新页面。</p><h3 id="优化手段" tabindex="-1"><a class="header-anchor" href="#优化手段"><span>优化手段</span></a></h3><ol><li><p>可以使用requestAnimationFrame()api，将js执行分散到每一帧渲染所剩余的时间，减少页面卡顿</p></li><li><p>tranform动画直接运行在合成器线程与栅格线程，不需要重绘重排</p></li></ol>',46),n=[l];function p(c,d){return t(),s("div",null,n)}const h=e(r,[["render",p],["__file","index.html.vue"]]),m=JSON.parse(`{"path":"/article/l44rtx2y/","title":"浏览器是如何工作的？","lang":"en-US","frontmatter":{"title":"浏览器是如何工作的？","author":"wt1","createTime":"2023/10/17","permalink":"/article/l44rtx2y/","tags":["浏览器"],"head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;if (um === 'dark' || (um !== 'light' && sm)) {document.documentElement.classList.add('dark');}})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"多进程使得浏览器更加文档安全，更稳定，更流畅","slug":"多进程使得浏览器更加文档安全-更稳定-更流畅","link":"#多进程使得浏览器更加文档安全-更稳定-更流畅","children":[]},{"level":2,"title":"渲染进程的开启模式","slug":"渲染进程的开启模式","link":"#渲染进程的开启模式","children":[]},{"level":2,"title":"在浏览器地址栏里输入内容后，会发生什么？","slug":"在浏览器地址栏里输入内容后-会发生什么","link":"#在浏览器地址栏里输入内容后-会发生什么","children":[{"level":3,"title":"发送过程","slug":"发送过程","link":"#发送过程","children":[]},{"level":3,"title":"收到返回信息后","slug":"收到返回信息后","link":"#收到返回信息后","children":[]},{"level":3,"title":"优化手段","slug":"优化手段","link":"#优化手段","children":[]}]}],"isBlogPost":true,"readingTime":{"minutes":7.24,"words":2172},"git":{},"filePathRelative":"前端/浏览器/浏览器是如何工作的.md","categoryList":[{"type":10000,"name":"前端"},{"type":10001,"name":"浏览器"}]}`);export{h as comp,m as data};
