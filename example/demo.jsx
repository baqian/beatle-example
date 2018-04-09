import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'beatle-pro';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Breadcrumb from 'antd/lib/breadcrumb';
import Layout from 'antd/lib/layout';

export default class Demo extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    summary: PropTypes.string,
    route: PropTypes.object,
    routes: PropTypes.array.isRequired,
    viewSource: PropTypes.string,
    children: PropTypes.any
  }

  state = {
    viewable: false
  }

  renderBreadCrumb(route) {
    const items = [];
    items.push(<Breadcrumb.Item key={route.path}>{route.component.title}</Breadcrumb.Item>);
    while (route.parent) {
      route = route.parent;
      items.push(<Breadcrumb.Item key={route.path}>{route.component.title}</Breadcrumb.Item>);
    }
    return (<Breadcrumb style={{margin: '12px 0'}}>{items.reverse()}</Breadcrumb>);
  }

  render() {
    const {title, summary, route, routes, viewSource} = this.props;
    const selectedKeys = route ? [route.path] : route.path;
    return (<Layout>
      <Layout.Sider width={200} style={{background: '#fff'}}>
        <h3 style={{height: 40, lineHeight: '40px', margin: '0 20px', borderBottom: '1px solid #ddd'}}>实例列表<a href="/"><Icon type="rollback" /></a></h3>
        <Menu
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          style={{height: '100%'}}
        >
          {routes.map(route => {
            return (<Menu.Item key={route.path}><Link to={route.path}>{route.component.title}</Link></Menu.Item>);
          })}
        </Menu>
      </Layout.Sider>
      <Layout style={{padding: '0 24px 24px'}}>
        {route && this.renderBreadCrumb(route)}
        <Layout.Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
          <Card title={(<div><h1>{title}</h1><p style={{whiteSpace: 'normal'}}>{summary}</p></div>)} extra={viewSource ? (<a href="javascript:;" onClick={() => this.setState({viewable: !this.state.viewable})}>源码 <Icon type="eye-o" /></a>) : null}>
            {this.state.viewable ? (<pre style={{background: '#f7f7f7', padding: 20, border: '1px solid #ddd', marginBottom: 20}}>{viewSource}</pre>) : null}
            {this.props.children}
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>);
  }
}
