import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';

export default class Child extends React.Component {
  // 提供给示例用的
  static title = '子级路由';

  /**
   * 一个组件通过app.route(path, Component)挂载到路由时，内部会生成一个路由配置对象routeConfig
   * routeConfig的对象结构参考react-router的路由配置项
   *
   * 有2种方式可以给routeConfig添加额外的信息
   * 1. 通过组件静态属性routeOptions来merge到routeConfig
   * 2. 通过app.route(path, Component, routeOptions) 的第三个参数来merge
   */
  static routeOptions = {
    childRoutes: [{
      path: 'sub',
      component: require('./subRoute')
    }]
  }

  /**
   * 虽然react不推荐使用context，然而很多场景都需要维护单例对象，来贯穿全局，统一控制业务逻辑，比如路由器
   *
   * 我们推荐使用router来发起路由变更，一般来说通过this.context.router.push(path, query)来跳转指定路由
   */
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
        <Col style={{background: 'red'}} span={12}>col-12</Col>
        <Col style={{background: 'green'}} span={12}>col-12</Col>
      </Row>
      <h3>子路由显示区域：(通过this.context.route进行路由<Button type="primary" onClick={() => this.context.router.push('/child/sub')}>跳转</Button>)</h3>
      {this.props.children}
    </div>);
  }
}
