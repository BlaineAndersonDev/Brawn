import React, { Component } from 'react';

class EditJoke extends Component {
  constructor(props){
    super(props);
    this.state = {
      newAuthor: '',
      newBody: '',
    };
  }

  componentDidMount() {
    this.setState({newAuthor: this.props.joke.author})
    this.setState({newBody: this.props.joke.body})
  }

  handleAuthorChange = (event) => {
    this.setState({newAuthor: event.target.value})
  }

  handleBodyChange = (event) => {
    this.setState({newBody: event.target.value})
  }

  handleSubmit = (event) => {
    this.props.handleUpdateJoke(this.props.joke.id, this.state.newAuthor, this.state.newBody)
  }

  handleCancel = (event) => {
    event.preventDefault();
    this.props.handleCancelEditJoke();
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
          <button onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default EditJoke;
