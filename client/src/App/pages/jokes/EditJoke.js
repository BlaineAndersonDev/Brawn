import React, { Component } from 'react';
import axios from 'axios';
import {Image} from 'cloudinary-react';

class EditJoke extends Component {
  constructor(props){
    super(props);
    this.state = {
      newAuthor: '',
      newBody: '',
      newimagePublicId: '',
    };
  }

  componentDidMount() {
    this.setState({newAuthor: this.props.joke.author})
    this.setState({newBody: this.props.joke.body})
    this.setState({newimagePublicId: this.props.joke.imagePublicId})
  }

  handleAuthorChange = (event) => {
    this.setState({newAuthor: event.target.value})
  }

  handleBodyChange = (event) => {
    this.setState({newBody: event.target.value})
  }

  handleSubmit = (event) => {
    this.props.handleUpdateJoke(this.props.joke.id, this.state.newAuthor, this.state.newBody, this.state.newimagePublicId)
  }

  handleCancel = (event) => {
    event.preventDefault();
    this.props.handleCancelEditJoke();
  }

  handleImageUpload = (event) => {
    const widget = window.cloudinary.openUploadWidget(
      {
        cloud_name: 'BrawnImages',
        upload_preset: 'tester',
        tags: ['blaine']
      }, (error, result) => {
        if (result && result.event === "success") {
          // If this.state.newimagePublicId is not null, then delete the image based on the publicId provided as the user has changed the image again.
          if (this.state.newimagePublicId !== null) {
            this.handleImageDelete(this.state.newimagePublicId)
          }
          this.setState({newimagePublicId: result.info.public_id})
          widget.close({quiet: true});
        }
      }
    );
    event.preventDefault()
  };

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
    return (
      <div style={{backgroundColor: "#ffcc66"}}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Author:
            <input type="text" value={this.state.newAuthor} onChange={this.handleAuthorChange} />
          </label>
          <label>
            Body:
            <input type="textArea" value={this.state.newBody} onChange={this.handleBodyChange} />
          </label>
          <button onClick={this.handleImageUpload}> Update Image </button>
          <input type="submit" value="Submit" />
          <button onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default EditJoke;
