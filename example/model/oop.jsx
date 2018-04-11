import Beatle, {BaseModel} from 'beatle-pro';
import Pane from '../pane';

class UserModel extends BaseModel {
  state = {
    profile: {
      name: 'Guest'
    }
  }
  getProfile(name) {
    return this.setState({
      profile: (nextState, payload) => {
        return {
          name: name
        };
      }
    });
  }
}
export default class Com extends Pane {
  static title = '通过Class类创建数据模型';

  componentDidMount() {
    const app = Beatle.getApp('model');
    app.model(UserModel);

    this.log('app.model', '副作用', '数据模型的行为副作用，是指会变更数据模型的数据结构的过程。');
    this.log('app.model', '非常重要', '通过纯model的actions会产生副作用，副作用可以renturn返回值，返回值是改变model的state整体结果，而通过Class创建的model，通过this.setState来设置副作用，其返回值值针对state单个属性有效，这是纯对象和Class最大的区别');
  }
}
