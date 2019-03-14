import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke.js';
import CreateJoke from './CreateJoke.js';
import DeleteJokeImage from './DeleteJokeImage.js';
import {Image} from 'cloudinary-react';



// import cors from 'cors';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class Jokes extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      jokes: [],
      imagePublicIds: null,
      cloudinaryPublicIdChange: ''
    };
  }

  async componentDidMount() {
    try {
      await this.getJokes();
    } catch (error) {
      console.log(error)
    }
  }

  consoleJokes = () => {
    console.log(this.state.jokes)
  }

  getJokes = () => {
    axios.get('/api/jokes/')
    .catch(error => console.log(error))
    .then(response => {
      this.setState({jokes: response.data})
    })
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
      this.getJokes();
    });
  }

  handleDeleteJoke = (joke) => {
    const jokeId = joke.id;
    const jokeImagePublicId = joke.imagePublicId;
    axios.delete(`/api/jokes/delete/${jokeId}`, null)
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      this.getJokes();
    });
    this.handleImageDelete(jokeImagePublicId)
  }

  render() {
    return (
      <div>

        <h1>JOKES</h1>

        <div style={{backgroundColor: "#ccffe6"}}>
          <h3>Delete a Joke by PublicId</h3>
          <DeleteJokeImage
            handleImageDelete={this.handleImageDelete}
          />
        </div>

        <div style={{backgroundColor: "#ffccff"}}>
          <h3>Create a Joke (Complete)</h3>
          <CreateJoke
            getJokes={this.getJokes}
          />
        </div>

        <div style={{backgroundColor: "#ccccff"}}>
          <h3>Current Jokes</h3>
          {this.state.jokes.map((joke) => {
            return (
              <Joke
                key={joke.id}
                joke={joke}
                handleUpdateJoke={this.handleUpdateJoke}
                handleDeleteJoke={this.handleDeleteJoke}
              />
            )
          })}
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
