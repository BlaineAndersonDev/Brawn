import React, { Component } from 'react';
import axios from 'axios';

class EditTitle extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameValue: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({nameValue: event.target.value});
  }
  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.nameValue);
    event.preventDefault();
  }

  updateTitle = (event) => {
    event.preventDefault();
    const titleId = this.props.titleInfo.id;
    axios.put(`/api/example/titles/${titleId}`, null, {
      params: {
        name: this.state.nameValue
      }
    })
    .catch(err => {
      console.warn(err);
    })
    .then(res => {
      console.log(JSON.stringify(res));
      console.log(JSON.stringify(res.status));
      console.log(JSON.stringify(res.data));
      this.setState({nameValue: ''});
      // Add some kind on 'Creation Complete' Block.
    });
  }



  render() {
    return (
      <div>
        <form onSubmit={this.updateTitle}>
          <label>
            Edit Name:
            <input type="text" value={this.state.nameValue} onChange={this.handleNameChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

export default EditTitle;
