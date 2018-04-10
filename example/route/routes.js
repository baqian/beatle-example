// react-router的路由配置规范；
export default [{
  path: 'child',
  component: require('./child'),
  // viewSource只是为了做示例需要
  viewSource: require('!!raw-loader!./child')
}, {
  path: 'query',
  component: require('./query'),
  viewSource: require('!!raw-loader!./query')
}, {
  path: 'connect',
  component: require('./connect'),
  viewSource: require('!!raw-loader!./connect')
}, {
  path: 'view',
  component: require('./view'),
  viewSource: require('!!raw-loader!./view')
}, {
  path: 'injector',
  component: require('./injector'),
  viewSource: require('!!raw-loader!./injector')
}, {
  path: 'wildcard',
  component: require('./wildcard'),
  viewSource: require('!!raw-loader!./wildcard')
}];
