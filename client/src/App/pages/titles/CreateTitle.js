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

  // createTitle = (event) => {
  //   event.preventDefault();
  //   console.log(this.state.nameValue)
  //   axios.post(`api/example/titles`, {
  //     name: this.state.nameValue
  //     })
  //     .catch(error => console.log(error))
  //     .then(res => {
  //       console.log(JSON.stringify(res));
  //       console.log(JSON.stringify(res.data));
  //     })
  //   }

  createTitle = (event) => {
    axios.post(`/api/example/titles`, null, { params: {
      name: this.state.nameValue
    }})
    .then(response => response.status)
    .catch(err => console.warn(err));
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
