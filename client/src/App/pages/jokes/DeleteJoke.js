import React, { Component } from 'react';

class DeleteJoke extends Component {

  handleConfirm = () => {
    this.props.handleDeleteJoke(this.props.joke.id)
  }

  handleDeny = (event) => {
    this.props.handleDenyDeleteJoke()
  }

  render() {
    return (
      <div>
        <h3>Are you sure you wish to delete this joke?</h3>
        <button onClick={this.handleConfirm}>Yes</button>
        <button onClick={this.handleDeny}>No</button>
      </div>
    );
  }
}

export default DeleteJoke;
