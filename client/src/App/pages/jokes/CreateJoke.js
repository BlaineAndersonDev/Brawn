import React, { Component } from 'react';

class CreateJoke extends Component {
  constructor(props){
    super(props);
    this.state = {
      newAuthor: '',
      newBody: '',
    };
  }

  handleAuthorChange = (event) => {
    this.setState({newAuthor: event.target.value})
  }

  handleBodyChange = (event) => {
    this.setState({newBody: event.target.value})
  }

  handleSubmit = (event) => {
    this.props.handleCreateJoke(this.state.newAuthor, this.state.newBody)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Author:
            <input type="text" value={this.state.newAuthor} onChange={this.handleAuthorChange} />
          </label>
          <label>
            Body:
            <input type="textArea" value={this.state.newBody} onChange={this.handleBodyChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateJoke;
