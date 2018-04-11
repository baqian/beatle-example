import Beatle from 'beatle-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Demo from '../demo';

const app = new Beatle({
  name: 'selector',
  subApp: true
});

class Root extends React.Component {
  static title = '数据选择器';

  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const {children, route} = this.props;
    return (<Demo
      title={Root.title}
      summary="数据选择器，提供数据模型连接到组件的另一种形式，通过数据选择器来管理和操作数据模型，实现数据模型和组件完全解构"
      route={route}
      subRoute={children && children.props.route}
      routes={routes}
    >{children}</Demo>);
  }
}

const routes = [{
  path: '/',
  component: Root,
  childRoutes: [{
    path: 'normal',
    component: require('./normal'),
    viewSource: require('!!raw-loader!./normal')
  }, {
    path: 'service',
    component: require('./service'),
    viewSource: require('!!raw-loader!./service')
  }]
}];

app.route(routes);

app.title = Root.title;
app.menus = routes[0].childRoutes;

export default app;
