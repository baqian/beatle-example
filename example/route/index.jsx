import React from 'react';
import PropTypes from 'prop-types';
import Beatle from 'beatle-pro';
import Demo from '../demo';
// 1. 初始化子应用
const app = new Beatle({
  name: 'route',
  subApp: true
});

// 2. 注意，这里设置的是根路径，但子应用作为主应用的路由时，是通过/route（初始化时的name值）来访问
class Route extends React.Component {
  static title = '多级路由设置';

  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const {children, route} = this.props;
    return (<Demo
      title={Route.title}
      summary="Beatle路由是借助react-router来处理路由配置和多级嵌套，同时又进行了扩展，可以支持子应用级别的路由以及路由设置参数变量"
      route={route}
      subRoute={children && children.props.route}
      routes={routes}
    >{children}</Demo>);
  }
}
// react-router的路由配置规范；
const routes = [{
  path: '/',
  component: Route,
  childRoutes: [{
    path: '/child',
    component: require('./child'),
    viewSource: require('!!raw-loader!./child')
  }, {
    path: '/query',
    component: require('./query'),
    viewSource: require('!!raw-loader!./query')
  }, {
    path: '/connect',
    component: require('./connect'),
    viewSource: require('!!raw-loader!./connect')
  }, {
    path: '/view',
    component: require('./view'),
    viewSource: require('!!raw-loader!./view')
  }, {
    path: '/wildcard',
    component: require('./wildcard'),
    viewSource: require('!!raw-loader!./wildcard')
  }]
}];
app.route(routes);
// 示例需要
app.title = Route.title;

export default app;
