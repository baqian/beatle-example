import React from 'react';
import PropTypes from 'prop-types';
import Beatle, {Link} from 'beatle-pro';
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
    subRoute: PropTypes.object,
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
    const {title, subRoute, summary, route, routes} = this.props;
    const selectedKeys = [subRoute ? Beatle.getResolvePath(subRoute) : Beatle.getResolvePath(route)];
    const subTitle = subRoute && subRoute.component.title;
    const viewSource = subRoute && subRoute.viewSource;
    let subRoutes = [];
    return (<Layout>
      <Layout.Sider width={250} style={{background: '#fff'}}>
        <h3 style={{height: 40, lineHeight: '40px', margin: '0 20px', borderBottom: '1px solid #ddd'}}>实例列表<a href="/"><Icon type="rollback" /></a></h3>
        <Menu
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          style={{height: '100%'}}
        >
          {routes.map(route => {
            if (route.childRoutes) {
              subRoutes = subRoutes.concat(route.childRoutes);
            }
            return (<Menu.Item key={Beatle.getResolvePath(route)}><Link to={route.path}>{route.component.title}</Link></Menu.Item>);
          })}
          {subRoutes.map(route => {
            return (<Menu.Item key={Beatle.getResolvePath(route)}><Link to={route.path} style={{paddingLeft: 10}}>{route.component.title}</Link></Menu.Item>);
          })}
        </Menu>
      </Layout.Sider>
      <Layout style={{padding: '0 24px 24px'}}>
        {subRoute && this.renderBreadCrumb(subRoute)}
        <Layout.Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
          <Card title={(<div><h1>{title + (subTitle && subTitle !== title ? ' - ' + subTitle : '')}</h1><p style={{whiteSpace: 'normal'}}>{summary}</p></div>)} extra={viewSource ? (<a href="javascript:;" onClick={() => this.setState({viewable: !this.state.viewable})}>源码 <Icon type="eye-o" /></a>) : null}>
            {this.state.viewable && viewSource ? (<pre style={{background: '#f7f7f7', padding: 20, border: '1px solid #ddd', marginBottom: 20}}>{viewSource}</pre>) : null}
            {this.props.children}
          </Card>
        </Layout.Content>
      </Layout>
    </Layout>);
  }
}
