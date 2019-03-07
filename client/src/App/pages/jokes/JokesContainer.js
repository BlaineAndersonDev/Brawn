import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke.js';
import CreateJoke from './CreateJoke.js';

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
    // event.preventDefault();
    axios.post(`/api/jokes/create`, null, {
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

  deleteJoke = () => {

  }


  render() {
    return (
      <div>
        <h1>JOKES</h1>

        <div>
          <CreateJoke handleCreateJoke={this.handleCreateJoke} />
        </div>

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
