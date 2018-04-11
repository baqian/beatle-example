import Beatle from 'beatle-pro';
import React from 'react';
import PropTypes from 'prop-types';
import Demo from '../demo';

const app = new Beatle({
  name: 'redux',
  subApp: true
});

class Root extends React.Component {
  static title = '数据池核心模块';

  static propTypes = {
    route: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const {children, route} = this.props;
    return (<Demo
      title={Root.title}
      summary="数据池核心模块，Beatle的数据池是封装Redux来管理数据，我们可以单独获取核心模块，来应用其他的Redux应用中。"
      route={route}
      subRoute={children && children.props.route}
      routes={routes}
    >{children}</Demo>);
  }
}

const routes = [{
  path: '/',
  component: Root
}];

app.route(routes);

app.title = Root.title;
app.menus = [];

export default app;
