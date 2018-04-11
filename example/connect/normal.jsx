import React from 'react';
import Beatle from 'beatle-pro';
import Pane from '../pane';
export default function aSyncRoute(nextState, callback) {
  const UserModel = {
    displayName: 'User',

    state: {
      profile: {
        name: 'Guest'
      }
    },
    actions: {
      setProfile: (nextState, payload) => {
        nextState.profile = payload.arguments[0];
      }
    }
  };

  const app = Beatle.getApp('connect');
  app.model(UserModel);

  class Route1 extends Pane {
    componentDidMount() {
      this.log('app.connect', '组件连接到数据池后，其绑定的数据模型的数据和行为方法会被注入到组件的props中', 'app.connect("User", Route)并打印this.props.User，默认是挂在props下属性名为modelName的属性值下（你会发现行为并非是actions中定义的部分，而是一个闭包函数', 'this.props.User = ' + JSON.stringify({profile: this.props.User.profile, setProfile: 'function'}, null, 2).replace('function', this.props.User.setProfile.toString()));
      this.props.User.setProfile('baqian');
      // this.props.User.setProfile('baqian')更新后立马触发组件更新，期间如果我们在componentDidMount更新组件就会报Can only update a mounted or mounting component, 因为Connect每次都是新生成的组件
      this.log('app.connect', '通过this.props.User.setProfile调用更新数据模型的state', '组件获取到最新的数据到props中，同时更新组件', JSON.stringify({
        profile: {
          name: 'baqian'
        }
      }, null, 2));
    }
  }
  class Route2 extends Pane {
    componentDidMount() {
      this.log('app.connect', '组件连接到数据池，并且把数据模型的数据和行为平铺到组件的props下', 'app.connect(["User"], Route, true)并打印整个props，另外你注意User放在数组中，说明参数可以指定多个数据模型', 'this.props = ' + JSON.stringify({profile: this.props.profile, setProfile: 'function'}, null, 2).replace('function', this.props.setProfile.toString()));
    }
  }

  class Route3 extends Pane {
    componentDidMount() {
      this.log('app.connect', '组件连接到数据池，兼容Redux原生的connect行为绑定数据和行为到组件中。', '此时this.props.nick为baqian，而配置的代码如下：', `app.connect([
        (state) => {
          return {
            nick: state.User.profile.name
          };
        },
        () => {
          const setProfile = app.model('User').getAction('setProfile');
          setProfile();
          return {
            login: setProfile
          };
        }
      ], Route3);`);
    }
  }
  // 异步组件的调用方式
  callback(null, () => {
    const Com1 = app.connect('User', Route1);
    const Com2 = app.connect(['User'], Route2, true);
    const Com3 = app.connect([
      (state) => {
        return {
          nick: state.User.profile.name
        };
      },
      () => {
        const setProfile = app.model('User').getAction('setProfile');
        setProfile('baqian');
        return {
          login: setProfile
        };
      }
    ], Route3);
    return (<div> <Com1 /> <Com2 /> <Com3 /> </div>);
  });
}

aSyncRoute.title = '函数调用注入数据模型';
