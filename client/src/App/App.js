import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import Titles from './pages/titles/Titles.js';
import JokesContainer from './pages/jokes/JokesContainer.js';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/titles' component={Titles}/>
          <Route path='/jokes' component={JokesContainer}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
