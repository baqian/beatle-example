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
      this.log('dva迁移', '主要改变为dva数据模型改为Beatle数据模型，effects、reducers 和 subscription概念通通去掉，取而代之的是actions', 'actionKey的值可以是函数、Genertor或者Async函数，put参数可以直接把副作用结果更新到数据池', JSON.stringify(this.props.User.profile, null, 2));
    }
  }

  const app = Beatle.getApp('model');
  app.model(UserModel);

  const model = app.model('User');
  model.getAction('setProfile')('baqian').then((res) => {
    console.log(model.state);
    console.log(res);
    callback(null, app.connect('User', Route));
  });
}
aSyncRoute.title = '替换dva的数据模型';
