import Beatle from 'beatle-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Demo from '../demo';

const app = new Beatle({
  name: 'injector',
  subApp: true
});

class Root extends React.Component {
  static title = '服务注入器';

  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const {children, route} = this.props;
    return (<Demo
      title={Root.title}
      summary="服务注入器，负责把通用JS类初始化后注入到组件（context）或者注入到Beatle应用全局"
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
  }, {
    path: 'single',
    component: require('./single'),
    viewSource: require('!!raw-loader!./single')
  }, {
    path: 'global',
    component: require('./global'),
    viewSource: require('!!raw-loader!./global')
  }]
}];

app.route(routes);

app.title = Root.title;
app.menus = routes[0].childRoutes;

export default app;
