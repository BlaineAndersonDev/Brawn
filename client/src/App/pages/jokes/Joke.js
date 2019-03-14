import React, { Component } from 'react';
import EditJoke from './EditJoke.js';
import DeleteJoke from './DeleteJoke.js';
import {Image} from 'cloudinary-react';

class Joke extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleEditMenu: false,
      toggleDeleteMenu: false,
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

  render() {
    let jokeImage = null;
    if (this.props.joke.imagePublicId) {
      jokeImage = (
        <Image cloudName="BrawnImages" publicId={this.props.joke.imagePublicId} width="300" height="300" crop="scale"/>
      )
    } else {
      jokeImage = null;
    }

    let editMenu = null;
    if (this.state.toggleEditMenu) {
      editMenu = (
        <EditJoke
          key={this.props.joke.id}
          joke={this.props.joke}
          handleUpdateJoke={this.props.handleUpdateJoke}
          handleCancelEditJoke={this.handleCancelEditJoke}
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
          handleDeleteJoke={this.props.handleDeleteJoke}
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
