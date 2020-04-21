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
      channels: [],
      GamingArmy: [],
      ElMusico: [],
      WeLoveCooking: [],
      Fitnez: [],
      WhyNotGardening: [],
      FootballMadness: []
      }
      //this.addComment = this.addComment.bind(this);
  }
  fetchData(array) {
    console.log(array);
    fetch("http://localhost:3000/" + array)
      .then(response => response.json())
      .then(json => {
        this.setState({
          [array]: json
        });
      })
  }
  componentDidMount() {
    console.log('fetching');
    this.fetchData("channels");
    this.fetchData("GamingArmy");
    this.fetchData("ElMusico");
    this.fetchData("WeLoveCooking");
    this.fetchData("Fitnez");
    this.fetchData("WhyNotGardening");
    this.fetchData("FootballMadness");
  }

  addComment(nameOfChannel, authorValue, dateValue, contentValue) {
    fetch('http://localhost:3000/' + nameOfChannel, {
      method: 'POST',
      body: JSON.stringify({
        author: authorValue,
        date: dateValue,
        content: contentValue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    window.location.reload();
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
      var channelName;
      this.state.channels.forEach(element => {
        if ('/' + element.name === props.location.pathname) {
          channelName = element.name;
        }
      })
      return (
        <>
          <NavigationBar />
          <ChannelDisplay comment={this.addComment} name={channelName} GamingArmy={this.state.GamingArmy} ElMusico={this.state.ElMusico}
            WeLoveCooking={this.state.WeLoveCooking} Fitnez={this.state.Fitnez} WhyNotGardening={this.state.WhyNotGardening} FootballMadness={this.state.FootballMadness} />
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
