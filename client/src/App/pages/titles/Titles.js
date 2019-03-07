import React, { Component } from 'react';
import axios from 'axios';
import DisplayTitle from './DisplayTitle.js';
import CreateTitle from './CreateTitle.js';
import EditTitle from './EditTitle.js';

class Titles extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      titles: [],
      showResults: false,
      showTitleMenu: false
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

  onTitleMenuClick = () => {
    if (this.state.showTitleMenu) {
      this.setState({ showTitleMenu: false });
    } else {
      this.setState({ showTitleMenu: true })
    };
  }

  render() {
    let editMenu = null;
    if (this.state.showTitleMenu) {
      editMenu = <div><EditTitle titleInfo={this.props.titleInfo}/> - Delete </div>
    } else {
      editMenu = null
    }

    let displayTitles = null;
    if (this.state.showResults) {
      displayTitles = this.state.titles.map((item) =>
        <DisplayTitle
          key={item.id}
          titleInfo={item}
          onTitleMenuClick={this.onTitleMenuClick}
          showTitleMenu={this.state.showTitleMenu}
          editMenu={editMenu}

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
