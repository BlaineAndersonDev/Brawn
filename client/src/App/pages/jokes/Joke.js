import React, { Component } from 'react';

class Jokes extends Component {
  render() {
    return (
      <div>
        <p>{this.props.joke.id}</p>
        <p>{this.props.joke.author}</p>
        <p>{this.props.joke.body}</p>
      </div>
    );
  }
}

export default Jokes;
