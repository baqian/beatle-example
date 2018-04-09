import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';

export default class Child extends React.Component {
  // 提供给示例用的
  static title = '多级路由';

  static routeOptions = {
    childRoutes: [{
      path: 'sub',
      component: require('./subRoute')
    }]
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (<div>
      <h3>当前路由显示区域：</h3>
      <h5>➡️ 展示Antd Grid组件示例</h5>
      <Row>
        <Col span={12}>col-12</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <h3>子路由显示区域：(通过this.context.route进行路由<Button type="primary" onClick={() => this.context.router.push('/child/sub')}>跳转</Button>)</h3>
      {this.props.children}
    </div>);
  }
}
