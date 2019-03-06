import React, { Component } from 'react';

class DisplayTitle extends Component {
  render() {
    return (
      <div className="App">
        <h1>{this.props.titleInfo.name}</h1>
      </div>
    );
  }
}

export default DisplayTitle;
