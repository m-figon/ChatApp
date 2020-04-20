import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavigationBar from './navigationBar/navigationBar.jsx';
import HomeDisplay from './homeDisplay/homeDisplay.jsx';
import ChannelDisplay from './channelDisplay/channelDisplay.jsx';
class App extends Component {
  constructor() {
    super();
    this.state = {
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
  addComment() {
    fetch('http://localhost:3000/channels?id=0', {
      method: 'POST',
      body: JSON.stringify({
        user: "test",
        title: "test",
        post: 'test',
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
      
    })
  }
  render() {
    const HomeComponent = () => {
      return (
        <>
          <NavigationBar />
          <HomeDisplay servers={this.state.channels} />
        </>
      );
    }
    const ChannelComponent = (props) => {
      var idValue;
      this.state.channels.forEach(element => {
        if ('/' + element.name === props.location.pathname) {
          idValue = element.id;
        }
      })
      return (
        <>
          <NavigationBar />
          <ChannelDisplay comment={this.addComment} id={idValue} servers={this.state.channels} />
        </>
      );
    }
    return (
      <>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/:channel" component={ChannelComponent} />
      </>
    );
  }

}

export default App;
