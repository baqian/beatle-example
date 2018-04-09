import React from 'react';
import PropTypes from 'prop-types';
import Affix from 'antd/lib/affix';
import Button from 'antd/lib/button';

export default class SubRoute extends React.Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (<div>
      <h5>➡️ 展示Antd Affix图钉组件示例</h5>
      <Affix>
        <Button type="primary">Affix top</Button>
      </Affix>
    </div>);
  }
}
