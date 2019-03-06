import React, { Component } from 'react';
const axios = require('axios');

class Title extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      titles: []
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
      this.setState({titles: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {

    return (
      <div id="getTitleContainer">
        <h1>Title of Items</h1>
          {this.state.titles.map(item => <p key={item.id}>{item.name}</p>)}
      </div>
    );
  }
}

export default Title;
