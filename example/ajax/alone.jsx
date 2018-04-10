import {Ajax} from 'beatle-pro';
import React from 'react';
// import PropTypes from 'prop-types';
import Card from 'antd/lib/card';

export default class Alone extends React.Component {
  // 提供给示例用的
  static title = 'Beatle.Ajax';

  constructor(props) {
    super(props);

    this.state = {
      logs: {}
    };
  }

  componentDidMount() {
    this.log('Ajax.request', '请求开始: https://api.github.com/users/baqian', '不通过Ajax初始化，直接发起请求');
    Ajax.request({
      url: 'https://api.github.com/users/baqian',
      method: 'get'
    }).then(result => {
      this.log('Ajax.request', '请求结束', '获取数据', JSON.stringify(result, null, 2));
    });

    const ajax = new Ajax();

    this.log('new Ajax request 1', '初始化', '通过Ajax初始化来发起请求');
    this.log('new Ajax request 1', 'ajax.request请求开始: https://api.github.com/users/baqian', '通过Ajax初始化来发起请求');
    ajax.request({
      url: 'https://api.github.com/users/baqian',
      method: 'get',
    }).then(() => {
      this.log('new Ajax request 1', 'ajax.request请求结束', '获取数据成功');
    });


    this.log('new Ajax request 2', 'ajax.request请求开始: https://api.github.com/users/:name?t=:timestamp', '请求url包含路径变量和参数变量');
    ajax.request({
      url: 'https://api.github.com/users/:name?t=:timestamp',
      method: 'get',
      params: {
        name: 'baqian'
      },
      data: {
        timestamp: '123'
      }
    }).then(() => {
      const obj = {
        params: {
          name: 'baqian'
        },
        data: {
          timestamp: '123'
        }
      };
      this.log('new Ajax request 2', 'ajax.request请求结束', '结果描述', '请求地址为: https://api.github.com/users/baqian?t=123，传入的变量配置： \n' + JSON.stringify(obj, null, 2));
    });

    this.log('new Ajax get 1', 'ajax.get快速调用：https://api.github.com/users/:name?t=:timestamp', '相同的还有post、put、patch、delete');
    ajax.get('https://api.github.com/users/:name?t=:timestamp', {timestamp: '123'}, {params: {name: 'baqian'}}).then(() => {
      /* eslint-disable quotes */
      this.log('new Ajax get 1', 'ajax.get调用结果', '获取数据成功', `get、post、put、patch、delete的调用参考$.ajax(url, data, callback, dataType)调用\n唯一不同的是第三个参考可以是Object，该参数会作为ajaxOption的额外信息merge进来\n同时url支持路径变量，通过ajaxOption#params来替换注入变量值\n调用代码：\najax.get('https://api.github.com/users/:name?t=:timestamp', {timestamp: '123'}, {params: {name: 'baqian'}})`);
    });

    this.log('new Ajax get 2', 'ajax.get请求变量值统一通过ajaxOption#data来替换', '相比于默认是，其实是吧ajaxOption#params和ajaxOption#data整合到ajaxOption#data中');
    const ajax1 = new Ajax({
      normalize: true
    });
    ajax1.get('https://api.github.com/users/:name?t=:timestamp', {timestamp: '123', name: 'baqian'}).then(() => {
      this.log('new Ajax get 2', 'ajax.get调用结果', '获取数据成功', `在 new Ajax({normalize: true})传入调用配置项normalize: true，用来整合ajaxOption#params和ajaxOption#data\n调用代码：\nconst ajax = new Ajax({normalize: true});\najax.get('https://api.github.com/users/:name?t=:timestamp', {timestamp: '123', name: 'baqian'})`);
    });

    this.log('new Ajax get 3', 'ajax.get请求变量名从:var改为{var}', '通过new Ajax传入delimeter配置，值为正则表达式，默认是/:(\\w+)/g');
    const ajax2 = new Ajax({
      normalize: true,
      delimeter: /:(\\w+)/g
    });
    ajax2.set('delimeter', /\{(\w+)\}/g);
    this.log('new Ajax get 3', 'new Ajax的配置项，可以通过实例ajax配置', `ajax.set('delimeter', /\\{(\\w+)\\}/g);`);
    ajax2.get('https://api.github.com/users/{name}?t={timestamp}', {timestamp: '123', name: 'baqian'}).then(() => {
      this.log('new Ajax get 3', 'ajax.get调用结果', '获取数据成功', `调用代码：\nconst ajax = new Ajax({normalize: true, delimeter: /\\{(\\w+)\\}/g});\najax.get('https://api.github.com/users/{name}?t={timestamp}', {timestamp: '123', name: 'baqian'})`);
    });

    this.log('new Ajax 拦截', 'ajax请求时对接口做拦截', '通过new Ajax配置接口函数，来针对请求前、数据响应、数据接收3个阶段做拦截');
    const ajax3 = new Ajax({
      beforeRequest: (ajaxOption) => {
        this.log('new Ajax 拦截', 'ajax发送请求之前', '可获取到接口调用的整体信息ajaxOption', JSON.stringify(ajaxOption, null, 2));
      },
      beforeResponse: () => {
        this.log('new Ajax 拦截', 'ajax数据响应', '此时接口请求已经返回数据，但数据封装在第一个参数response中，网络层发生的错误可通过response.status获取到状态码，要获取数据，应该根据数据类型进行转换，比如json数据，通过response.json()获取到，字符串则通过reponse.text()获取到');
      },
      afterResponse: () => {
        this.log('new Ajax 拦截', 'ajax数据接收', '数据放在第一个参数result中，一般来说，此时我们应该针对result判断接口数据的正确性');
      }
    });
    ajax3.get('https://api.github.com/users/baqian');
  }

  log(tag, title, summary, code) {
    if (!this.state.logs[tag]) {
      /* eslint-disable react/no-direct-mutation-state */
      this.state.logs[tag] = [];
    }
    this.state.logs[tag].push({
      title: title,
      summary: summary,
      code: code
    });
    this.forceUpdate();
  }

  render() {
    const tags = Object.keys(this.state.logs);
    return (<div>
      {tags.map((tagName) => {
        const logs = this.state.logs[tagName];
        return (<Card key={tagName} title={tagName} bordered={false}>
          {logs.map((log, index) => {
            return (<div key={index}>
              <h5>{(index + 1) + '. ' + log.title}</h5>
              <p>{log.summary}</p>
              {log.code ? (<pre style={{background: '#f7f7f7', padding: 20, border: '1px solid #ddd', marginBottom: 20}}>{log.code}</pre>) : null }</div>);
          })}
        </Card>);
      })}
    </div>);
  }
}
