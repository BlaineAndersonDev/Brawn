import React, { Component } from 'react';
import EditJoke from './EditJoke.js';

class Joke extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleEditMenu: false,
    };
  }

  onEditMenuClick = () => {
    this.setState({toggleEditMenu: true})
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

    return (
      <div>
        <p>{this.props.joke.id}</p>
        <p>{this.props.joke.author}</p>
        <p>{this.props.joke.body}</p>
        {editMenu}
        <button>Delete Joke</button>
      </div>
    );
  }
}

export default Joke;
