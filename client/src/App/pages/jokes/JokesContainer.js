import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke.js';
import CreateJoke from './CreateJoke.js';
import DeleteJokeImage from './DeleteJokeImage.js';
import {Image} from 'cloudinary-react';
import './stylesheets/JokeContainer.css';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class Jokes extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      jokes: [],
    };
  }

  async componentDidMount() {
    try {
      await this.refreshJokes();
    } catch (error) {
      console.log(error)
    }
  }

  consoleJokes = () => {
    console.log(this.state.jokes)
  }

  refreshJokes = () => {
    axios.get('/api/jokes/')
    .catch(error => console.log(error))
    .then(response => {
      this.setState({jokes: response.data})
    })
  }

  render() {
    return (
      <div>
        <div className="allJokeContainer">
          <h3 className="jokeContainerTitle">Current Jokes</h3>
          {this.state.jokes.map((joke) => {
            return (
              <Joke
                key={joke.id}
                joke={joke}
                refreshJokes={this.refreshJokes}
              />
            )
          })}
        </div>

        <div style={{backgroundColor: "#ccffe6"}}>
          <h3>Delete a Joke by PublicId</h3>
          <DeleteJokeImage
            handleImageDelete={this.handleImageDelete}
          />
        </div>

        <div style={{backgroundColor: "#ffccff"}}>
          <h3>Create a Joke (Complete)</h3>
          <CreateJoke
            refreshJokes={this.refreshJokes}
          />
        </div>

        <div style={{backgroundColor: "#ff9999"}}>
          <h1>Hello, world!</h1>
          <Image cloudName="BrawnImages" publicId="samples/animals/kitten-playing" width="300" crop="scale"/>
        </div>


      </div>
    );
  }
}

export default Jokes;
