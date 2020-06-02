import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavigationBar from './navigationBar/navigationBar.jsx';
import HomeDisplay from './homeDisplay/homeDisplay.jsx';
import ChannelDisplay from './channelDisplay/channelDisplay.jsx';
import Login from './login/login.jsx';
import Register from './register/register.jsx';
import Settings from './settings/settings.jsx';
import Info from './info/info.jsx';
import load from './load.gif';
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
      accountInspect: "",
      loginOperation: "Sign in",
      loadingId: ""
    }
    this.addComment = this.addComment.bind(this);
    this.settingOpositeState = this.settingOpositeState.bind(this);
    this.settingState = this.settingState.bind(this);
    this._isMounted = false;

  }
  fetchData(array) {
    fetch("https://rocky-citadel-32862.herokuapp.com/Chat/" + array)
      .then(response => response.json())
      .then(json => {
        if (this._isMounted) {
          this.setState({
            [array]: json
          });
        }
      })
  }
  componentDidMount() {
    this._isMounted = true;
    //console.log('fetching');
    this.fetchData("channels");
    this.fetchData("accounts");
    let interval = setInterval(() => {
      if (document.readyState === "complete") {
        this.setState({
          loadingId: "hidden"
        })
        clearInterval(interval);
      }
    }, 500)
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  addComment(nameOfChannel, authorValue, dateValue, contentValue) {
    console.log('https://rocky-citadel-32862.herokuapp.com/Chat/' + nameOfChannel);
    if (contentValue !== "") {
      fetch('https://rocky-citadel-32862.herokuapp.com/Chat/' + nameOfChannel, {
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
    if (this._isMounted) {
      this.setState({
        [array]: eval("!this.state." + array)
      })
    }
  }
  settingState(array1, value1, array2, value2, array3, value3) {
    if (this._isMounted) {
      this.setState({
        [array1]: value1,
        [array2]: value2,
        [array3]: value3
      })
    }
  }
  render() {
    console.log("accounts: " + this.state.accounts);
    const navigationProps = {
      channels: this.state.channels, logedImg: this.state.logedImg, settingState: this.settingState, loginOperation: this.state.loginOperation, logedAs: this.state.logedAs, settingOpositeState: this.settingOpositeState
    };
    const channelProps = {
      settingState: this.settingState, logedAs: this.state.logedAs, comment: this.addComment, GamingArmy: this.state.GamingArmy, ElMusico: this.state.ElMusico,
      WeLoveCooking: this.state.WeLoveCooking, Fitnez: this.state.Fitnez, WhyNotGardening: this.state.WhyNotGardening, FootballMadness: this.state.FootballMadness, accounts: this.state.accounts
    };
    const InfoComponent = (props) => {
      return (
        <>
          <NavigationBar {...navigationProps} />
          <Info accountInspect={this.state.accountInspect} accounts={this.state.accounts} />
        </>
      );
    }
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
            <div className="blured">
              <NavigationBar {...navigationProps} />
              <HomeDisplay servers={this.state.channels} />
            </div>
            <Login settingState={this.settingState} settingOpositeState={this.settingOpositeState} />
          </>
        );
      } else if (!this.state.login && this.state.register) {
        return (
          <>
            <div className="blured">
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
            <div className="blured">
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
            <div className="blured">
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
            <Settings logedAs={this.state.logedAs} accounts={this.state.accounts} />
          </>
        );
      } else if (this.state.login && !this.state.register) {
        return (
          <>
            <div className="blured">
              <NavigationBar {...navigationProps} />
              <Settings logedAs={this.state.logedAs} accounts={this.state.accounts} />
            </div>
            <Login settingState={this.settingState} settingOpositeState={this.settingOpositeState} />
          </>
        );
      } else if (!this.state.login && this.state.register) {
        return (
          <>
            <div className="blured">
              <NavigationBar {...navigationProps} />
              <Settings logedAs={this.state.logedAs} accounts={this.state.accounts} />
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
        <Route exact path="/info/:account" component={InfoComponent} />
        <div className="loading" id={this.state.loadingId}>
          <img src={load} />
        </div>
      </>
    );
  }
}

export default App;
