import Beatle from 'beatle-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Demo from '../demo';

const app = new Beatle({
  name: 'view',
  subApp: true
});

class Root extends React.Component {
  static title = '生成视图';

  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const {children, route} = this.props;
    return (<Demo
      title={Root.title}
      summary="生成视图是一种特别的Hoc封装，可以注入数据模型和服务，从而得到的一个Hoc组件，改组件我们称之为视图"
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
    path: 'decorator',
    component: require('./decorator'),
    viewSource: require('!!raw-loader!./decorator')
  }]
}];

app.route(routes);

app.title = Root.title;
app.menus = routes[0].childRoutes;

export default app;
