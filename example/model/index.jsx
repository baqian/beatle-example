import Beatle from 'beatle-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Demo from '../demo';

const app = new Beatle({
  name: 'model',
  subApp: true
});

class Root extends React.Component {
  static title = '数据模型';

  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const {children, route} = this.props;
    return (<Demo
      title={Root.title}
      summary="数据模型是指描述数据状态以及数据行为的对象，Beatle把应用内部组件和组件之间、组件和接口之前的通信都通过数据模型来管理，起到数据驱动组件自动更新的效果。"
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
    path: 'obj',
    component: require('./obj'),
    viewSource: require('!!raw-loader!./obj')
  }, {
    path: 'oop',
    component: require('./oop'),
    viewSource: require('!!raw-loader!./oop')
  }, {
    path: 'origin',
    component: require('./origin'),
    viewSource: require('!!raw-loader!./origin')
  }, {
    path: 'flattern',
    component: require('./flattern'),
    viewSource: require('!!raw-loader!./flattern')
  }, {
    path: 'selector',
    component: require('./selector'),
    viewSource: require('!!raw-loader!./selector')
  }, {
    path: 'dva',
    component: require('./dva'),
    viewSource: require('!!raw-loader!./dva')
  }]
}];

app.route(routes);

app.title = Root.title;
app.menus = routes[0].childRoutes;

export default app;
