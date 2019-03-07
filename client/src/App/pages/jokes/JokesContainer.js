import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke.js';

class Jokes extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      jokes: []
    };
  }

  componentDidMount() {
    this.getJokes();
  }

  getJokes = () => {
    axios.get('/api/jokes/')
    .then(response => {
      this.setState({jokes: response.data})
    })
    .catch(error => console.log(error))
  }

  consoleJokes = () => {
    console.log(this.state.jokes)
  }

  renderJokes = () => {

  }

  render() {
    return (
      <div>
        <h1>JOKES</h1>
        <button onClick={this.consoleJokes}>CLICK MEEEEEE</button>

         <div>
           {this.state.jokes.map((joke) => {
              return <Joke key={joke.id} joke={joke} />
           })}
         </div>

      </div>
    );
  }
}

export default Jokes;
