import React from 'react';
import Beatle from 'beatle-pro';
import Demo from '../demo';
// 1. 初始化子应用
const app = new Beatle({
  name: 'route',
  subApp: true
});

// 2. 注意，这里设置的是根路径，但子应用作为主应用的路由时，是通过/route（初始化时的name值）来访问

// react-router的路由配置规范；
const routes = [{
  path: '/child',
  component: require('./child'),
  viewSource: require('raw-loader!!./child')
}];
app.route('/', (props) => {
  return (<Demo
    title="路由设置"
    summary="Beatle路由是借助react-router来处理路由配置和多级嵌套，同时又进行了扩展，可以支持子应用级别的路由以及路由设置参数变量"
    route={props.route}
    routes={routes}
    viewSource={props.children && props.children.props.route.viewSource}
  >{props.children}</Demo>);
}, {
  childRoutes: routes
});

// 示例需要
app.title = '路由设置';

export default app;
