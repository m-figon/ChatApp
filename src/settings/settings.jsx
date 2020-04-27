import React, { Component } from 'react'
import './settings.css';
import Password from './password.jsx';
class Settings extends Component {
    constructor() {
        super();
        this.state = {
            emailValue: "gogobatman@gmail.com",
            accountValue: "Gogobatman",
            currentState: "none"
        }
    }
    /*
    updateJSON(){
        fetch('http://localhost:3000/FootballMadness/1', {
        method: 'PUT',
        body: JSON.stringify({
          author: "testAuthor",
          date: "2018-01-19T14:25:43.511Z",
          content: "PUT test",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
    }
    */
    settingState(array, value) {
        this.setState({
            [array]: value
        })
    }
    
    render() {
        return (
            <div>
                <div className="home-display">
                    <div className="sign-center">
                        <div className="options-div">
                            <h1 onClick={() => this.settingState("currentState", "none")}>{this.props.logedAs}</h1>
                            <hr></hr>
                            <h1 onClick={() => this.settingState("currentState", "password")}>Change password</h1>
                            <hr></hr>
                            <h1 onClick={() => this.settingState("currentState", "avatar")}>Change avatar</h1>
                            <hr></hr>
                        </div>
                        {/* if change password*/}
                        <div className="content-div">
                            <Password currentState={this.state.currentState} accounts={this.props.accounts} logedAs={this.props.logedAs}/>
                        </div>
                        {/* if change password*/}
                    </div>
                    <img alt="" src="https://www.creativevirtual.com/wp-content/uploads/2018/10/people-on-devices-707x350.png"></img>
                </div>
            </div>
        );
    }

}

export default Settings;
