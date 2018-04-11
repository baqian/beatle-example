import Beatle, {Ajax} from 'beatle-pro';
import Pane from '../pane';

export default class Alone extends Pane {
  // 提供给示例用的
  static title = '应用ajax调用';

  componentDidMount() {
    this.log('new Beatle -> ajax 1', 'Beatle实例内部会维护一个Ajax实例', '通过app.ajax发起请求');
    const app1 = new Beatle({app: 'ajax1'});
    app1.ajax.request({
      url: 'https://api.github.com/users/baqian',
      method: 'get'
    }).then(result => {
      this.log('new Beatle -> ajax 1', '请求成功', '获取数据', JSON.stringify(result, null, 2));
    });

    this.log('new Beatle  -> ajax 2', '初始化Bealte同时给内部Ajax传递初始化配置', '初始化配置项包括：origin、normalize、delimeter、beforeRequest、beforeResponse 和 afterResponse');
    const app2 = new Beatle({
      name: 'ajax2',
      ajax: {
        origin: 'https://api.github.com',
        normalize: true,
        delimeter: /\{(\w+)\}/g,
        beforeRequest: (ajaxOption) => {
          this.log('new Beatle  -> ajax 2', 'ajax发送请求之前', '可获取到接口调用的整体信息ajaxOption', JSON.stringify(ajaxOption, null, 2));
        },
        beforeResponse: () => {
          this.log('new Beatle  -> ajax 2', 'ajax数据响应', '此时接口请求已经返回数据，但数据封装在第一个参数response中，网络层发生的错误可通过response.status获取到状态码，要获取数据，应该根据数据类型进行转换，比如json数据，通过response.json()获取到，字符串则通过reponse.text()获取到');
        },
        afterResponse: () => {
          this.log('new Beatle  -> ajax 2', 'ajax数据接收', '数据放在第一个参数result中，一般来说，此时我们应该针对result判断接口数据的正确性');
        }
      }
    });
    /* eslint-disable quotes */
    this.log('new Beatle  -> ajax 2', `normalize: true 和 delimeter: /\\{(\\w+)\\}/g', '请求地址为https://api.github.com/users/{name}?t={timestamp}，data为{name: 'baqian', timestamp: '123'}`);
    app2.ajax.get('/users/{name}?t={timestamp}', {name: 'baqian', timestamp: '123'});


    this.log('new Beatle -> ajax 3', 'new Beatle配置一个ajax实例，取代Beatle内部的ajax', '通过app.ajax发起请求');
    const ajax = new Ajax({
      origin: 'https://api.github.com'
    });
    const app3 = new Beatle({
      app: 'ajax3',
      ajax: ajax
    });
    app3.ajax.request({
      url: '/users/baqian',
      method: 'get'
    }).then(() => {
      this.log('new Beatle -> ajax 3', '请求成功', '注入的ajax实例，需要具备request、get、post、delete、put 和 patch方法，比如jQuery');
    });
  }
}
