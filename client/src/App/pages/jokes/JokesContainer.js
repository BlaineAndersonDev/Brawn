import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke.js';
import CreateJoke from './CreateJoke.js';
import {Image} from 'cloudinary-react';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
// import Wigit from './Wigit.js'

class Jokes extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      jokes: [],
      showWigit: false,
      uploadedFileCloudinaryUrl: '',
      uploadedFile: ''
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

  handleCreateJoke = (author, body) => {
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
      this.getJokes();
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
      this.getJokes();
    });
  }

  handleDeleteJoke = (id) => {
    axios.delete(`/api/jokes/delete/${id}`, null)
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      console.log(JSON.stringify(res));
      console.log(JSON.stringify(res.status));
      console.log(JSON.stringify(res.data));
      // Add some kind on 'Creation Complete' Block.
      this.getJokes();
    });
  }

  handleUpload = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: 'BrawnImages', upload_preset: 'tester', tags: ['blaine'] },
      function(error, result) {
        console.log(result);
      }
  )}

  render() {
    return (
      <div>
      <button onClick={this.handleUpload}> Upload Images </button>

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
                handleDeleteJoke={this.handleDeleteJoke}
              />
            )
          })}
        </div>

        <div>
          <h1>Hello, world!</h1>
          <Image cloudName="BrawnImages" publicId="samples/animals/kitten-playing" width="300" crop="scale"/>
        </div>


      </div>
    );
  }
}

export default Jokes;
