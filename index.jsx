import React from 'react';
import Beatle from 'beatle-pro';

import 'antd/dist/antd.less';
// 1. 初始化应用
const app = new Beatle({
  name: 'main'
});

// 2. 定义组件
const sayHello = (
  <div>
    <h1>Hello World! <a href="https://www.npmjs.com/package/beatle-pro" target="_blank" rel="noopener noreferrer">beatle文档</a></h1>
    {getExamples()}
  </div>
);

// 3. 挂载路由
app.route('/', sayHello);
// 4. 运行应用，挂载真实的DOM下
app.run(document.getElementById('main'));

// 其他例子需要
function getExamples() {
  const context = require.context('./example', true, /\/index\.jsx$/);
  return (
    <div style={{margin: 20, fontSize: 16}}>
      <p> beatle-example库用来演示Beatle框架的各大组成部分如何工作，其示例的目的是诠释前端SPA应用开发的4大关键要素来构建一个前端应用，其核心模式是MVP</p>
      <h3> SPA (单页应用) 的4大要素：</h3>
      <ul>
        <li>1. <b>一个应用实例app</b>，对SPA来说只会初始化一个应用实例（全局唯一的js对象），页面路由、数据管理 和 接口请求都通过app来控制和分配。（参考MVP模式的P)</li>
        <li>2. <b>页面路由</b>，SPA应用下不同路由对应着不同的页面（视图），全部都交给app来处理。（参考MVP的V）</li>
        <li>3. <b>数据管理</b>，SPA不同页面渲染依赖的数据，或者页面内多个组件之间的通信数据，不应该分散到各个地方，而是通过app维护一个js对象，用来存储所有必要的数据对象。根据OOP的思想，不同类型的数据是一个数据对象（数据模型）。（参考MVP的M）</li>
        <li>4. <b>接口请求</b>，接口请求是前端和服务端通信获取的主要方式，对于SPA要能封装一个通用的接口请求类，通过这个类在接口请求处理时做到统一和规范化。</li>
      </ul>
      <h3> 注意：想要快速掌握一个Beatle应用如何开发，那你可以到每个一级路由的index.jsx查阅下代码，都是一个Beatle应用。事实上整个beatle-example是一个复杂的多Beatle应用嵌套的SPA项目，仔细看实例代码会有更多收获！</h3>
      <h3> 示例列表（Antd组件请查阅<a href="http://design.alipay.com/develop/web/components/" target="_blank" rel="noopener noreferrer">Antd文档</a>）：</h3>
      <ul>
        {context.keys().map(key => {
          const demo = context(key);
          const keys = key.split(/[/\\]/);
          const klen = keys.length;
          const path = keys.slice(1, -1).join('/');
          if (klen === 3) {
            // 挂在为路由，注意，每个demo都是一个子应用，子应用可以已路由的形式挂在到主应用。
            app.route(path, demo);
            return (
              <li key={key}><Beatle.Link to={'/' + path}>{demo.title}</Beatle.Link>
                {demo.menus ? (<ul>{demo.menus.map(item => (<li style={{marginLeft: 20}} key={item.path}><Beatle.Link to={'/' + path + '/' + item.path}>{item.component ? item.component.title : item.getComponent.title}</Beatle.Link></li>))}</ul>) : null}
              </li>);
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
}
