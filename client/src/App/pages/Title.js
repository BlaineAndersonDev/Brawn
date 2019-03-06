import React, { Component } from 'react';
const axios = require('axios');

class Title extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: ["bob"]
    };
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getAllTitles();
  }

  // Retrieves the list of items from the Express app
  getAllTitles = () => {
    axios.get('/api/example/titles')
    .then(response => {
      console.log(response)
      this.setState({ideas: response.data})
    })
    .catch(error => console.log(error))
  }

  // getAllTitles = () => {
  //   const createResults = fetch('/api/titles')
  //   .then(list => this.setState({ list }))
  //   console.log('createResults:' + createResults)
  // }

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>Title of Items</h1>
        <p>{list}</p>
      </div>
    );
  }
}

export default Title;
