import React, { Component } from 'react';

export default class History extends Component {
  render() {

    const historyItems = this.props.history ? this.props.history.map( (item, i) => {
      return (
        <div key={i} className='history-item-container'>
          <div className='history-item'>
            {item}
          </div>
        </div>
      )
    }) : null;
    
    return (
      <div className='history-container'>
        {historyItems}
        <div className='clear-history-button-container'>
          <button onClick={this.props.clearHistory}>Clear History</button>
        </div>
      </div>
    )
  }
};
