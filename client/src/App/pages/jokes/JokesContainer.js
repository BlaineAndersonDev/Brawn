import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke.js';
import CreateJoke from './CreateJoke.js';
import {Image} from 'cloudinary-react';



// import cors from 'cors';
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class Jokes extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      jokes: [],
      showWigit: false,
      uploadedFileCloudinaryUrl: '',
      uploadedFile: '',
      newImagePublicId: null,
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

  handleImageUpload = () => {
    if (this.state.newImagePublicId !== null) {
      console.log('this.state.newImagePublicId: NOT NULL!')
      // SETUP: Remove previous image from DB.
      this.setState({newImagePublicId: null})
    }
    window.cloudinary.openUploadWidget(
      {
        cloud_name: 'BrawnImages',
        upload_preset: 'tester',
        tags: ['blaine']
      }, (error, result) => {
        if (result && result.event === "success") {
          this.setState({newImagePublicId: result.info.public_id})
          console.log('Image Upload Successful: ' + this.state.newImagePublicId)
        }
      }
    );
  };

  handleImageDelete = (event) => {
    event.preventDefault()
    axios.post(`/api/jokes/cloudinaryDelete`, null, {
      params: {
        publicId: this.state.cloudinaryPublicIdChange
      }
    })
    .catch(err => {
      console.warn(err);
    })
    // .then(res => {
    //   // console.log(JSON.stringify(res));
    //   // console.log(JSON.stringify(res.status));
    //   // console.log(JSON.stringify(res.data));
    // });
  };

  handleImageGet = () => {};
  handleImageGetAll = () => {};

  handleCloudinaryPublicIdChange = (event) => {
    this.setState({cloudinaryPublicIdChange: event.target.value})
  }

  render() {
    return (
      <div>
      <button onClick={this.handleUpload}> Upload Images </button>

      <form onSubmit={this.handleImageDelete}>
        <label>
          cloudinaryPublicId:
          <input type="text" value={this.state.cloudinaryPublicIdChange} onChange={this.handleCloudinaryPublicIdChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

        <h1>JOKES</h1>

        <div>
          <CreateJoke handleCreateJoke={this.handleCreateJoke} />
        </div>

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
