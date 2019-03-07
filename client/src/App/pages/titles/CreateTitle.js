import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

class CreateTitle extends Component {
  constructor(props){
    super(props);
    this.state = {
      showMenu: false,
      nameValue: ''
    };
  }

  handleTitleCreate = (event) => {
    this.setState({nameValue: event.target.value});
  }

  createTitle = (event) => {
    event.preventDefault();
    const user = {
      name: this.state.nameValue
    };
    return axios.post(`api/example/titles`, { user })
      .catch(error => console.log(error))
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

  render() {
    return (
      <div>
        <form onSubmit={this.createTitle}>
          <label>
            Create Title:
            <input type="text" value={this.state.nameValue} onChange={this.handleTitleCreate} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

export default CreateTitle;
