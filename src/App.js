import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavigationBar from './navigationBar/navigationBar.jsx';
import HomeDisplay from './homeDisplay/homeDisplay.jsx';
import ChannelDisplay from './channelDisplay/channelDisplay.jsx';
import Login from './login/login.jsx';
import Register from './register/register.jsx';
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
      FootballMadness: [],
      accounts: [],
      login: false,
      register: false,
      logedAs: "",
      loginOperation: "Sign in"
    }
    this.addComment = this.addComment.bind(this);
    this.settingLogin = this.settingLogin.bind(this);
    this.settingRegister = this.settingRegister.bind(this);
    this.settingState = this.settingState.bind(this);
  }
  fetchData(array) {
    fetch("http://localhost:3000/" + array)
      .then(response => response.json())
      .then(json => {
        this.setState({
          [array]: json
        });
      })
  }
  componentDidMount() {
    //console.log('fetching');
    this.fetchData("channels");
    this.fetchData("GamingArmy");
    this.fetchData("ElMusico");
    this.fetchData("WeLoveCooking");
    this.fetchData("Fitnez");
    this.fetchData("WhyNotGardening");
    this.fetchData("FootballMadness");
    this.fetchData("accounts");
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
    
    this.fetchData("channels");
    this.fetchData("GamingArmy");
    this.fetchData("ElMusico");
    this.fetchData("WeLoveCooking");
    this.fetchData("Fitnez");
    this.fetchData("WhyNotGardening");
    this.fetchData("FootballMadness");
    this.fetchData("accounts");

  }

  settingLogin() {
    this.setState({
      login: !this.state.login
    })
  } settingRegister() {
    this.setState({
      register: !this.state.register
    })
  }
  settingState(array1, value1, array2, value2) {
    this.setState({
      [array1]: value1,
      [array2]: value2
    })
  }
  render() {
    console.log("accounts: " + this.state.accounts);
    const navigationProps = {
      settingState: this.settingState, loginOperation: this.state.loginOperation, logedAs: this.state.logedAs, registerHandler: this.settingRegister, loginHandler: this.settingLogin
    };
    const channelProps = {
      logedAs: this.state.logedAs, comment: this.addComment, GamingArmy: this.state.GamingArmy, ElMusico: this.state.ElMusico,
      WeLoveCooking: this.state.WeLoveCooking, Fitnez: this.state.Fitnez, WhyNotGardening: this.state.WhyNotGardening, FootballMadness: this.state.FootballMadness, accounts: this.state.accounts
    };
    const HomeComponent = () => {
      if (!this.state.login && !this.state.register) {
        return (
          <>
            <NavigationBar {...navigationProps} />
            <HomeDisplay servers={this.state.channels} />
          </>
        );
      } else if (this.state.login && !this.state.register) {
        return (
          <>
            <div class="blured">
              <NavigationBar {...navigationProps} />
              <HomeDisplay servers={this.state.channels} />
            </div>
            <Login settingState={this.settingState} loginHandler={this.settingLogin} />
          </>
        );
      } else if (!this.state.login && this.state.register) {
        return (
          <>
            <div class="blured">
              <NavigationBar {...navigationProps} />
              <HomeDisplay servers={this.state.channels} />
            </div>
            <Register registerHandler={this.settingRegister} settingState={this.settingState} loginHandler={this.settingLogin} />
          </>
        );
      }

    }
    const ChannelComponent = (props) => {
      var channelName;
      this.state.channels.forEach(element => {
        if ('/' + element.name === props.location.pathname) {
          channelName = element.name;
        }
      })
      if (!this.state.login && !this.state.register) {
        return (
          <>
            <NavigationBar {...navigationProps} />
            <ChannelDisplay {...channelProps}  name={channelName}/>
          </>
        );
      }
      else if (this.state.login && !this.state.register) {
        return (
          <>
            <div class="blured">
              <NavigationBar {...navigationProps} />
              <ChannelDisplay {...channelProps}  name={channelName}/>
            </div>
            <Login settingState={this.settingState} loginHandler={this.settingLogin} />
          </>
        );
      }
      else if (!this.state.login && this.state.register) {
        return (
          <>
            <div class="blured">
              <NavigationBar {...navigationProps} />
              <ChannelDisplay {...channelProps}  name={channelName}/>
            </div>
            <Register registerHandler={this.settingRegister} settingState={this.settingState} loginHandler={this.settingLogin} />
          </>
        );
      }
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
