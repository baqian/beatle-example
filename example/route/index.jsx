import React from 'react';
import PropTypes from 'prop-types';
import Beatle from 'beatle-pro';
import Demo from '../demo';
import childRoutes from './routes';
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
      summary="路由配置是一组指令，用来告诉 router 如何匹配 URL以及匹配后如何执行代码，Beatle路由是借助react-router来处理路由配置和多级嵌套，同时又进行了扩展，可以支持子应用级别的路由以及路由设置参数变量"
      route={route}
      subRoute={children && children.props.route}
      routes={routes}
    >{children || (<pre style={{background: '#f7f7f7', padding: 20, border: '1px solid #ddd', marginBottom: 20}}>{require('!!raw-loader!./routes')}</pre>)}</Demo>);
  }
}

/**
 * 等同于app.rotue('/', Route, {childRoutes: childRoutes})
 */
const routes = [{
  path: '/',
  component: Route,
  childRoutes: childRoutes
}];
app.route(routes);

// 示例需要
app.title = Route.title;
app.menus = childRoutes;

export default app;
