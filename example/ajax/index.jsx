import Beatle from 'beatle-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Demo from '../demo';

const app = new Beatle({
  name: 'ajax',
  subApp: true
});

class Root extends React.Component {
  static title = '接口调用';

  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const {children, route} = this.props;
    return (<Demo
      title={Root.title}
      summary="接口调用"
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
    path: 'alone',
    component: require('./alone'),
    viewSource: require('!!raw-loader!./alone')
  }, {
    path: 'inherit',
    component: require('./inherit'),
    viewSource: require('!!raw-loader!./inherit')
  }]
}];

app.route(routes);

app.title = Root.title;
app.menus = routes[0].childRoutes;

export default app;
