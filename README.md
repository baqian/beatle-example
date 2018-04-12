# Beatle示例 - [beatle文档](https://www.npmjs.com/package/beatle-pro)
`beatle-example`库用来演示Beatle框架的各大组成部分如何工作，其示例的目的是诠释前端SPA应用开发的4大关键要素来构建一个前端应用，其核心模式是MVP

## SPA (单页应用) 的4大要素：

1. 一个应用实例app，对SPA来说只会初始化一个应用实例（全局唯一的js对象），页面路由、数据管理 和 接口请求都通过app来控制和分配。（参考MVP模式的P)
2. 页面路由，SPA应用下不同路由对应着不同的页面（视图），全部都交给app来处理。（参考MVP的V）
3. 数据管理，SPA不同页面渲染依赖的数据，或者页面内多个组件之间的通信数据，不应该分散到各个地方，而是通过app维护一个js对象，用来存储所有必要的数据对象。根据OOP的思想，不同类型的数据是一个数据对象（数据模型）。（参考MVP的M）
4. 接口请求，接口请求是前端和服务端通信获取的主要方式，对于SPA要能封装一个通用的接口请求类，通过这个类在接口请求处理时做到统一和规范化。


## 准备工作
1. 自行安装`nodeJS`和`npm`

## 启动

通过webpack来配置启动，入口模板为`index.html`，入口JSX为`index.jsx`

```javascript
npm run start
```

> 您也可以

## 实例列表(图)
![实例图](https://img.alicdn.com/tfs/TB1sa5Xlf9TBuNjy1zbXXXpepXa-355-894.png)