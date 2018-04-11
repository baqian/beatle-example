import Beatle from 'beatle-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Demo from '../demo';

const app = new Beatle({
  name: 'service',
  subApp: true
});

class Root extends React.Component {
  static title = '服务依赖注入';

  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const {children, route} = this.props;
    return (<Demo
      title={Root.title}
      summary="服务依赖注入，服务是通用的JS代码模块，一般来说和组件无关，用来处理通用的业务逻辑，一般注入到不同的组件、模块等，构建复杂的应用"
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
    path: 'com',
    component: require('./com'),
    viewSource: require('!!raw-loader!./com')
  }]
}];

app.route(routes);

app.title = Root.title;
app.menus = routes[0].childRoutes;

export default app;
