import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke.js';

class Jokes extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      jokes: [],
    };
  }

  componentDidMount() {
    this.getJokes();
  }

  consoleJokes = () => {
    console.log(this.state.jokes)
  }

  getJokes = () => {
    axios.get('/api/jokes/')
    .then(response => {
      this.setState({jokes: response.data})
    })
    .catch(error => console.log(error))
  }

  handleCreateJoke = (author, body) => {
    console.log('newJokeAuthor: ' + this.state.newJokeAuthor)
    console.log('newJokeBody: ' + this.state.newJokeBody)
    this.setState({
      newJokeAuthor: author,
      newJokeBody: body
    })
    console.log('newJokeAuthor: ' + this.state.newJokeAuthor)
    console.log('newJokeBody: ' + this.state.newJokeBody)
  }

  createJoke = () => {
    // event.preventDefault();
    axios.post(`/api/jokes/create`, null, {
      params: {
        author: this.state.newJokeAuthor,
        body: this.state.newJokeBody
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      console.log(JSON.stringify(res));
      console.log(JSON.stringify(res.status));
      console.log(JSON.stringify(res.data));
      this.setState({
        newJokeAuthor: '',
        newJokeBody: ''
      });
      // Add some kind on 'Creation Complete' Block.
    });
  }

  handleUpdateJoke = (id, author, body) => {
    axios.put(`/api/jokes/update/${id}`, null, {
      params: {
        author: author,
        body: body
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      console.log(JSON.stringify(res));
      console.log(JSON.stringify(res.status));
      console.log(JSON.stringify(res.data));
      // Add some kind on 'Creation Complete' Block.
    });
  }

  updateJoke = (id, author, body) => {
  }

  deleteJoke = () => {

  }


  render() {
    return (
      <div>
        <h1>JOKES</h1>
        <button onClick={this.consoleJokes}>CLICK MEEEEEE</button>

         <div>
           {this.state.jokes.map((joke) => {
              return (
                <Joke
                  key={joke.id}
                  joke={joke}
                  handleUpdateJoke={this.handleUpdateJoke}
                />
              )
           })}
         </div>

      </div>
    );
  }
}

export default Jokes;
