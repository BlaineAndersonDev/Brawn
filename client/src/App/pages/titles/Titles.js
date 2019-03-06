import React, { Component } from 'react';
import axios from 'axios';
import DisplayTitle from './DisplayTitle.js';

class Titles extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      titles: [],
      showResults: false,
    };
  }

  componentDidMount() {
    this.getTitles();
  }

  onClick = () => {
    if (this.state.showResults) {
      this.setState({ showResults: false });
    } else {
      this.setState({ showResults: true })
    };
  }

  getTitles = () => {
    const results = axios.get('/api/example/titles')
    .then(response => {
      console.log(response)
      this.setState({titles: response.data})
    })
    .catch(error => console.log(error))
    this.setState({ titles: results })
  }

  render() {
    let displayTitles = null;

    if (this.state.showResults) {
      displayTitles = this.state.titles.map((item) => <DisplayTitle key={item.id}
                titleInfo={item} />
      );
    } else {
      displayTitles = null
    };

    return (
      <div className="App">
        <h1>Titles</h1>
        <h4>An example of CRUD application in both Frontend & Backend!</h4>
        <input type="submit" value="Get Titles" onClick={this.onClick} />
        {displayTitles}


      </div>
    );
  }
}

export default Titles;
