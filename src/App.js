import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavigationBar from './navigationBar/navigationBar.jsx';
import HomeDisplay from './homeDisplay/homeDisplay.jsx';
import ChannelDisplay from './channelDisplay/channelDisplay.jsx';
import Login from './login/login.jsx';
import Register from './register/register.jsx';
import Settings from './settings/settings.jsx';
class App extends Component {
  constructor() {
    super();
    this.state = {
      channels: [],
      accounts: [],
      login: false,
      register: false,
      logedAs: "",
      logedImg: "",
      loginOperation: "Sign in"
    }
    this.addComment = this.addComment.bind(this);
    this.settingOpositeState = this.settingOpositeState.bind(this);
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
    this.fetchData("accounts");
  }

  addComment(nameOfChannel, authorValue, dateValue, contentValue) {
    if (contentValue !== "") {
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
      this.fetchData("accounts");
    }
  }
  settingOpositeState(array) {
    this.setState({
      [array]: eval("!this.state." + array)
    })
  }
  settingState(array1, value1, array2, value2, array3, value3) {
    this.setState({
      [array1]: value1,
      [array2]: value2,
      [array3]: value3
    })
  }
  render() {
    console.log("accounts: " + this.state.accounts);
    const navigationProps = {
      channels: this.state.channels, logedImg: this.state.logedImg, settingState: this.settingState, loginOperation: this.state.loginOperation, logedAs: this.state.logedAs, settingOpositeState: this.settingOpositeState
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
            <Login settingState={this.settingState} settingOpositeState={this.settingOpositeState} />
          </>
        );
      } else if (!this.state.login && this.state.register) {
        return (
          <>
            <div class="blured">
              <NavigationBar {...navigationProps} />
              <HomeDisplay servers={this.state.channels} />
            </div>
            <Register settingOpositeState={this.settingOpositeState} settingState={this.settingState} />
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
            <ChannelDisplay {...channelProps} name={channelName} />
          </>
        );
      }
      else if (this.state.login && !this.state.register) {
        return (
          <>
            <div class="blured">
              <NavigationBar {...navigationProps} />
              <ChannelDisplay {...channelProps} name={channelName} />
            </div>
            <Login settingState={this.settingState} settingOpositeState={this.settingOpositeState} />
          </>
        );
      }
      else if (!this.state.login && this.state.register) {
        return (
          <>
            <div class="blured">
              <NavigationBar {...navigationProps} />
              <ChannelDisplay {...channelProps} name={channelName} />
            </div>
            <Register settingOpositeState={this.settingOpositeState} settingState={this.settingState} />
          </>
        );
      }
    }
    const SettingsComponent = () => {
      if (!this.state.login && !this.state.register) {
        return (
          <>
            <NavigationBar {...navigationProps} />
            <Settings logedAs={this.state.logedAs} accounts={this.state.accounts}/>
          </>
        );
      } else if (this.state.login && !this.state.register) {
        return (
          <>
            <div class="blured">
              <NavigationBar {...navigationProps} />
              <Settings logedAs={this.state.logedAs} accounts={this.state.accounts}/>
            </div>
            <Login settingState={this.settingState} settingOpositeState={this.settingOpositeState} />
          </>
        );
      } else if (!this.state.login && this.state.register) {
        return (
          <>
            <div class="blured">
              <NavigationBar {...navigationProps} />
              <Settings logedAs={this.state.logedAs} accounts={this.state.accounts}/>
            </div>
            <Register settingOpositeState={this.settingOpositeState} settingState={this.settingState} />
          </>
        );
      }
    }
    return (
      <>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/:channel" component={ChannelComponent} />
        <Route exact path="/:account/settings" component={SettingsComponent} />
      </>
    );
  }
}

export default App;
