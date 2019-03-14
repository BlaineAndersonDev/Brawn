import React, { Component } from 'react';

class ImageJoke extends Component {
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

  handleDenyDeleteJoke = () => {
    this.setState({toggleDeleteMenu: false})
  }

  render() {
    let editMenu = null;
    if (this.state.toggleEditMenu) {
      editMenu = (
        <EditJoke
          key={this.props.joke.id}
          joke={this.props.joke}
          handleUpdateJoke={this.props.handleUpdateJoke}
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
        {editMenu}
        {deleteMenu}
      </div>
    );
  }
}

export default ImageJoke;
