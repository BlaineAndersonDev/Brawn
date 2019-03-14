import React, { Component } from 'react';
import EditJoke from './EditJoke.js';
import DeleteJoke from './DeleteJoke.js';
import axios from 'axios';
import {Image} from 'cloudinary-react';

class Joke extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleEditMenu: false,
      toggleDeleteMenu: false,
      imageChange: null
    };
  }

  onEditMenuClick = () => {
    this.setState({toggleEditMenu: true})
  }

  onDeleteMenuClick = () => {
    this.setState({toggleDeleteMenu: true})
  }

  handleCancelEditJoke = () => {
    this.setState({toggleEditMenu: false})
  }

  handleDenyDeleteJoke = () => {
    this.setState({toggleDeleteMenu: false})
  }

  handleImageChange = (imagePublicId) => {
    this.setState({imageChange: imagePublicId})
  }

  handleUpdateJoke = (id, author, body, publicId) => {
    axios.put(`/api/jokes/update/${id}`, null, {
      params: {
        author: author,
        body: body,
        imagePublicId: publicId
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      this.props.refreshJokes();
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
      this.props.refreshJokes();
    });
    this.handleImageDelete(jokeImagePublicId)
  }

  // Delete image from cloudinary if user changes image mid-creation.
  handleImageDelete = (jokeImagePublicId) => {
    axios.post(`/api/jokes/cloudinaryDelete`, null, {
      params: {
        publicId: jokeImagePublicId
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
    });
  };

  render() {
    let jokeImage = null;
    if (this.state.imageChange) {
      jokeImage = (
        <Image cloudName="BrawnImages" publicId={this.state.imageChange} width="300" height="300" crop="scale"/>
      )
    } else {
      jokeImage = (
        <Image cloudName="BrawnImages" publicId={this.props.joke.imagePublicId} width="300" height="300" crop="scale"/>
      )
    }

    let editMenu = null;
    if (this.state.toggleEditMenu) {
      editMenu = (
        <EditJoke
          key={this.props.joke.id}
          joke={this.props.joke}
          handleUpdateJoke={this.handleUpdateJoke}
          handleCancelEditJoke={this.handleCancelEditJoke}
          refreshJokes={this.props.refreshJokes}
          handleImageChange={this.handleImageChange}
        />
      )
    } else {
      editMenu = (
        <button onClick={this.onEditMenuClick}>Edit Joke</button>
      );
    }

    let deleteMenu = null;
    if (this.state.toggleDeleteMenu) {
      deleteMenu = (
        <DeleteJoke
          key={this.props.joke.id}
          joke={this.props.joke}
          handleDeleteJoke={this.handleDeleteJoke}
          handleDenyDeleteJoke={this.handleDenyDeleteJoke}
        />
      )
    } else {
      deleteMenu = (
        <button onClick={this.onDeleteMenuClick}>Delete Joke</button>
      );
    }

    return (
      <div>
        <p>{this.props.joke.id}</p>
        <p>{this.props.joke.author}</p>
        <p>{this.props.joke.body}</p>
        <div>{jokeImage}</div>
        {editMenu}
        {deleteMenu}
      </div>
    );
  }
}

export default Joke;
