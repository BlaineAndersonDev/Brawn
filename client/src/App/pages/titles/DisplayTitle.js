import React, { Component } from 'react';
import EditTitle from './EditTitle.js';

class DisplayTitle extends Component {
  constructor(props){
    super(props);
    this.state = {
      showMenu: false
    };
  }

  onTitleClick = () => {
    if (this.state.showMenu) {
      this.setState({ showMenu: false });
    } else {
      this.setState({ showMenu: true })
    };
  }

  render() {
    let menu = null;

    if (this.state.showMenu) {
      menu = <div>
      <EditTitle titleInfo={this.props.titleInfo}/> - Delete </div>
    } else {
      menu = null
    };

    return (
      <div>
        <h1 onClick={this.onTitleClick}>
          {this.props.titleInfo.name}
        </h1>
        {menu}
      </div>
    );
  }
}

export default DisplayTitle;
