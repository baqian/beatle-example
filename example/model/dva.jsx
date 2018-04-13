import Beatle, {Ajax} from 'beatle-pro';
import Pane from '../pane';

const UserModel = {
  displayName: 'User',
  state: {
    profile: {
      name: 'Guest'
    }
  },
  actions: {
    * setProfile(name, {put, call}) {
      const a = call(() => Ajax.request({url: 'https://api.github.com/users/' + name}));
      const result  = yield a;
      yield put({
        profile: result
      });
    }
  }
};

export default function aSyncRoute(nextState, callback) {
  class Route extends Pane {
    componentDidMount() {
      this.log(`
        # dva迁移

        ### Beatle和Dva的差异

        1. Bealte和Dva中的Model概念不同，Beatle的Model是指描述特定类型数据的对象，包括数据结构和行为方法。Dva的Model是Redux的数据模块分类，一个Model包含了数据基础结构、行为 和 改变数据的各种副作用。
        2. Beatle抛弃redux的概念，以React-like-Model来构建前端应用。而Dva强调redux概念和saga的结合来构建应用。
        
        > React-like-Model，是指通过state来定义数据状态，通过setState来改变数据状态，继承这2个接口来实现Model。

        ### 示例

        1. 主要改变为dva数据模型改为Beatle数据模型，effects、reducers 和 subscription概念通通去掉，取而代之的是actions
          actionKey的值可以是函数、Genertor或者Async函数，put参数可以直接把副作用结果更新到数据池

        ~~~
          ${JSON.stringify(this.props.User.profile, null, 2)}
        ~~~
      `);
    }
  }

  const app = Beatle.getApp('model');
  app.model(UserModel);

  const model = app.model('User');
  model.getAction('setProfile')('baqian').then(() => {
    callback(null, app.connect('User', Route));
  });
}
aSyncRoute.title = '替换dva的数据模型';
