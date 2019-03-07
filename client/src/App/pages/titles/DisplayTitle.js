import React, { Component } from 'react';
import EditTitle from './EditTitle.js';

class DisplayTitle extends Component {
  render() {
    return (
      <div>
        <h1 data-id={this.props.titleInfo.id} onClick={this.props.toggleMenu}>
          {this.props.titleInfo.name}
        </h1>
        <div>
          <EditTitle
            editMenuActive={this.props.editMenuActive}
          />
        </div>
      </div>
    );
  }
}

export default DisplayTitle;
