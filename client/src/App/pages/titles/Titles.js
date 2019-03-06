import React, { Component } from 'react';
import Get from './Get.js';

class Titles extends Component {
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
    let results = null;

    if (this.state.showResults) {
      results = <Get />
    } else {
      results = null
    };

    return (
      <div className="App">
        <input type="submit" value="Get Titles" onClick={this.onClick} />
        {results}
      </div>
    );
  }
}

export default Titles;
