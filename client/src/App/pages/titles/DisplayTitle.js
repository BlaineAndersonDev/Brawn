import React, { Component } from 'react';

class DisplayTitle extends Component {
  render() {
    return (
      <div>
        <h1 onClick={this.props.onTitleMenuClick}>
          {this.props.titleInfo.name}
        </h1>
        {this.props.editMenu}
      </div>
    );
  }
}

export default DisplayTitle;
