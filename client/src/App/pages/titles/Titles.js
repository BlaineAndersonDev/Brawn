import React, { Component } from 'react';
import axios from 'axios';
import DisplayTitle from './DisplayTitle.js';
import CreateTitle from './CreateTitle.js';

class Titles extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      titles: [],
      showResults: false,
      editMenuActive: false,
      selectedTitle: 1,
    };
  }

  componentDidMount() {
    this.getTitles();
  }

  onClick = () => {
    if (this.state.showResults) {
      this.setState({ showResults: false });
    } else {
      this.setState({ showResults: true })
    };
  }

  getTitles = () => {
    const results = axios.get('/api/example/titles')
    .then(response => {
      console.log(response)
      this.setState({titles: response.data})
    })
    .catch(error => console.log(error))
    this.setState({ titles: results })
  }

  toggleMenu = (event) => {
    // console.log(event.currentTarget.dataset.id)
    this.state.editMenuActive ? this.setState({ editMenuActive: false }) : this.setState({ editMenuActive: true })
  }

  render() {

    let displayTitles = null;
    if (this.state.showResults) {
      displayTitles = this.state.titles.map((item) =>
        <DisplayTitle
          key={item.id} // Required identifier.
          titleInfo={item} // Info Object.
          toggleMenu={this.toggleMenu} // editMenuActive toggle function.
          editMenuActive={this.state.editMenuActive} // editMenuActive state.
        />
      )
    } else {
      displayTitles = null
    };

    return (
      <div className="App">
        <h1>Titles</h1>
        <CreateTitle />
        <h4>An example of CRUD application in both Frontend & Backend!</h4>
        <input type="submit" value="Get Titles" onClick={this.onClick} />
        {displayTitles}
      </div>
    );
  }
}

export default Titles;
