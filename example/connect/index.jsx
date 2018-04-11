import Beatle from 'beatle-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Demo from '../demo';

const app = new Beatle({
  name: 'connect',
  subApp: true
});

class Root extends React.Component {
  static title = '连接数据池（注入数据模型）';

  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const {children, route} = this.props;
    return (<Demo
      title={Root.title}
      summary="连接数据池是指通过观察者模型，把组件和指定数据模型进行连接，从而观察该数据模型的state发生变化时，驱动组件自动更新"
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
