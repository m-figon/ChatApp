import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavigationBar from './navigationBar/navigationBar.jsx';
import HomeDisplay from './homeDisplay/homeDisplay.jsx';
import ChannelDisplay from './channelDisplay/channelDisplay.jsx';
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
    const HomeComponent = () => {
      return (
        <>
          <NavigationBar />
          <HomeDisplay servers={this.state.channels} />
        </>
      );
    }
    const ChannelComponent = (props) => {
      console.log(props.location.pathname);
      //here you should compare pathname to name in channels array and give props id to channelDisplay
      return (
        <>
          <NavigationBar />
          <ChannelDisplay servers={this.state.channels}/>
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
