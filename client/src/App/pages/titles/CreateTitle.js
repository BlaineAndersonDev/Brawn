import React, { Component } from 'react';
import axios from 'axios';

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
    axios.post(`/api/example/titles`, null, {
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
