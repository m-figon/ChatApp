import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavigationBar from './navigationBar/navigationBar.jsx';
import HomeDisplay from './homeDisplay/homeDisplay.jsx';

class App extends Component {
  constructor(){
    super();
    this.state={
      channels: []
    }
  }
  componentDidMount() {
    console.log('fetching');
    fetch("http://localhost:3000/channels")
      .then(response => response.json())
      .then(json => {
        this.setState({
          channels: json
        });
      })
  }
  render() {
    const MyComponent = () => {
      return (
        <>
          <NavigationBar />
          <HomeDisplay servers={this.state.channels} />
        </>
        /*<Link to="/about">About</Link> */
      );
    }
    return (
      <>
        <Route exact path="/" component={MyComponent} />
        <Route exact path="/Chat" component={MyComponent} />
      </>
    );
  }

}

export default App;
