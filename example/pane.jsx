import React from 'react';
// import PropTypes from 'prop-types';
import Card from 'antd/lib/card';

export default class Pane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: {}
    };
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
