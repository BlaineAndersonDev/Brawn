import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.js';
import Nav from './pages/Nav.js';
import Footer from './pages/Footer.js';
import JokesContainer from './pages/jokes/JokesContainer.js';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/jokes' component={JokesContainer}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <div id="appContainer">
          <div id="appNavigation"><Nav /></div>
          <div id="appBody"><App /></div>
          <div id="appFooter"><Footer /></div>
        </div>
      </Switch>
    );
  }
}

export default App;
