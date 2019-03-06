import React, { Component } from 'react';
import Get from './Get.js';

class Title extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      titles: [],
      showResults: false
    };
  }

  onClick = () => {
    if (this.state.showResults) {
      this.setState({ showResults: false });
    } else {
      this.setState({ showResults: true })
    };
  }

  render() {
    let button = null;

    if (this.state.showResults) {
      button = <Get />
    } else {
      button = null
    };

    return (
      <div className="App">
        <input type="submit" value="Get Titles" onClick={this.onClick} />
        {button}
      </div>
    );
  }
}

export default Title;
