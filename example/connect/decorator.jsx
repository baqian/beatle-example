import {BaseModel, model, connect} from 'beatle-pro';
import Pane from '../pane';

/* eslint-disable no-unused-vars */
@model({
  app: 'connect'
})
class UserModel extends BaseModel {
  static displayName = 'User';

  state = {
    profile: {
      name: 'Guest'
    }
  }

  setProfile(name) {
    this.setState({
      name: name
    });
  }
}

@connect({
  app: 'connect',
  bindings: 'User',
  flattern: false
})
export default class Alone extends Pane {
  static title = '装饰器注入数据模型';

  componentDidMount() {
    this.log('@connect', 'Beatle提供装饰器connect，来连接组件到数据池', '通过组件的props可以获取到注入的数据模型的数据和行为', 'this.props.User = ' + JSON.stringify({profile: this.props.User.profile, setProfile: 'function'}, null, 2).replace('function', this.props.User.setProfile.toString()));
  }
}
