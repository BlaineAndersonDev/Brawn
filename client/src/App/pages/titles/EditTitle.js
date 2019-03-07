import React, { Component } from 'react';
import axios from 'axios';

class EditTitle extends Component {
  constructor(props){
    super(props);
    this.state = {
      showMenu: false,
      nameValue: ''
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
    const titleId = this.props.titleInfo.id;
    const params = {
    	name: this.state.nameValue,
    };
    const results = axios.put(`/api/example/titles/${titleId}`, {
        params
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error))
    console.log(results)
    event.preventDefault();
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
