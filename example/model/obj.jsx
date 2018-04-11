import Beatle from 'beatle-pro';
import Pane from '../pane';

export default class Com extends Pane {
  static title = '通过纯对象创建数据模型';

  componentDidMount() {
    const app = Beatle.getApp('model');
    const model1 = {
      displayName: 'User',
      state: {
        profile: {
          name: 'Guest'
        },
        profile1: {
          name: 'Guest'
        }
      },
      actions: {
        /* eslint-disable no-unused-vars */
        getProfile: (nextState, payload) => {
          nextState.profile = {
            name: 'baqian'
          };
        },
        setProfile: (nextState, payload) => {
          nextState.profile1 = {
            name: payload.arguments[0]
          };
        },
        requestProfile1: {
          exec: Promise.resolve({name: 'baqian_1'}),
          callback: (nextState, payload) => {
            nextState.profile1 = {
              name: payload.data
            };
          }
        },
        requestProfile2: {
          exec: (name) => {
            return Promise.resolve({name: name});
          },
          callback: (nextState, payload) => {
            nextState.profile1 = {
              name: payload.data
            };
          }
        }
      }
    };
    this.log('app.model', '副作用', '数据模型的行为副作用，是指会变更数据模型的数据结构的过程。');
    this.log('app.model', '非常重要', '通过纯model的actions会产生副作用，副作用可以renturn返回值，返回值是改变model的state整体结果，而通过Class创建的model，通过this.setState来设置副作用，其返回值值针对state单个属性有效，这是纯对象和Class最大的区别');

    this.log('app.model 1', '注册数据模型User', '通过纯对象注册一个User的数据模型，注意displayName: "User"', JSON.stringify(model1, null, 2));
    app.model(model1);
    const modelInst1 = app.model('User');
    this.log('app.model 1', '通过User获取数据模型实例', '通过纯对象注册一个User的数据模型', JSON.stringify(modelInst1.state, null, 2));
    const actions = modelInst1.getAction();
    actions.getProfile().then(() => {
      this.log('app.model 1', '调用实例的getProfile方法', '此时会给nextState.profile赋予新的数据，而nextState是数据模型实例的state最新的数据值', JSON.stringify(modelInst1.state, null, 2));
    });
    this.log('app.model 1', '调用setProfile、requestProfile1和requestProfile2返回的数据是一致的', 'actionKey的值是函数时，其内部会以actionKey生成一个行为方法，通过这个方法调用后会以actionKey的值作为副作用处理，得到的数据更新到model的state中');
    Promise.all([
      actions.setProfile('baqian_1'),
      actions.requestProfile1(),
      actions.requestProfile2('baqian_1')
    ]).then(() => {
      this.log('app.model 1', '调用requestProfile1和requestProfile2相比于setProfile，其值不是一个函数（副作用），而是一个obj配置，obj#exec是行为方法触发时调用，返回值（或者Promise接受值）会经过obj#callback是副作用函数处理', 'actionKey的值是函数时，其内部会以actionKey生成一个行为方法，通过这个方法调用后会以actionKey的值作为副作用处理，得到的数据更新到model的state中');
    });

    const model2 = {
      displayName: 'UserMulti',
      state: {
        profile: {
          name: 'Guest'
        }
      },
      actions: {},
      subscriptions: {
        'User.setProfile': (nextState, payload) => {
          nextState.profile = {
            name: payload.arguments[0]
          };
        }
      }
    };
    this.log('app.model 2', '注册数据模型UserMulti', '验证User触发的副作用如何来影响UserMulti', JSON.stringify(model2, null, 2));
    app.model(model2);
    const modelInst2 = app.model('UserMulti');
    actions.setProfile('baqian_multi').then(() => {
      this.log('app.model 2', '触发User的setProfile，查看UserMulti的state数据', 'UserMulti的subscriptions属性可以副作用名来拦截User的setProfile的副作用，副作用名为"modelName.actionKey.status"', JSON.stringify(modelInst2.state, null, 2));
    });
  }
}
