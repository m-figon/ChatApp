import React, { Component } from 'react'
import './settings.css';
import SettingsContent from './settingsContent.jsx';
class Settings extends Component {
    constructor() {
        super();
        this.state = {
            emailValue: "gogobatman@gmail.com",
            accountValue: "Gogobatman",
            currentState: "none",
            txt1Id: "",
            txt2Id: "",
            txt3Id: ""
        }
    }
    settingState(array, value, array2, value2) {
        this.setState({
            txt1Id: "",
            txt2Id: "",
            txt3Id: "",
            [array]: value,
            [array2]: value2
        })
    }

    render() {
        return (
            <div>
                <div className="home-display">
                    <div className="sign-center">
                        <div className="content-div">
                            <div className="options-div">
                                <div className="left">
                                    <h1 id={this.state.txt1Id} onClick={() => this.settingState("currentState", "none", "txt1Id", "chosen")}>{this.props.logedAs}</h1>
                                </div>
                                <div className="middle">
                                    <h1 id={this.state.txt2Id} onClick={() => this.settingState("currentState", "password", "txt2Id", "chosen")}>Change password</h1>
                                </div>
                                <div className="right">
                                    <h1 id={this.state.txt3Id} onClick={() => this.settingState("currentState", "avatar", "txt3Id", "chosen")}>Change avatar</h1>
                                </div>
                            </div>
                            <SettingsContent currentState={this.state.currentState} accounts={this.props.accounts} logedAs={this.props.logedAs} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Settings;
