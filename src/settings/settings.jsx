import React, { Component } from 'react'
import './settings.css';
class Settings extends Component {
    constructor() {
        super();
        this.state = {
            emailValue: "gogobatman@gmail.com",
            accountValue: "Gogobatman",
            oldPasswordValue: "",
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
    render() {
        return (
            <div>
                <div className="home-display">
                    <div className="sign-center">
                        <div className="options-div">
                            <h1>{this.props.logedAs}</h1>
                            <hr></hr>
                            <h1>Change password</h1>
                            <hr></hr>
                            <h1>Change avatar</h1>
                            <hr></hr>
                        </div>
                        {/* if change password*/}
                        <div className="content-div">
                            <h1>Changing password</h1>
                            <h1>Enter your old password</h1><input value="password" type="password"/>
                            <h1>Enter new password</h1><input value="password" type="password"/>
                            <h1>Confirm new password</h1><input value="password" type="password"/>
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
