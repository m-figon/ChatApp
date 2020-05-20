import React, { Component } from 'react'
import './login.css';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            loginValue: "",
            passwordValue: "",
            loginId: "",
            passwordId: "",
            tooltipId: "hidden",
            accounts: []
        }
    }
    onInputChange(array, e) {
        this.setState({
            [array]: e.target.value
        })
    }
    componentDidMount() {
        fetch("http://localhost:3000/accounts")
            .then(response => response.json())
            .then(json => {
                this.setState({
                    accounts: json
                });
            })
    }
    validateData() {
        var loginFlag = false;
        for (const element of this.state.accounts) {
            if (element.account === this.state.loginValue && element.password === this.state.passwordValue) {
                loginFlag = true;
                this.props.settingState("logedAs", this.state.loginValue, "loginOperation", " Sign out", "logedImg", element.img);
                this.props.settingOpositeState("login");
            }
        }
        if (!loginFlag) {
            this.setState({
                loginId: "incorrect",
                passwordId: "incorrect",
                tooltipId: "visible"
            })
        }
    }
    render() {
        return (
            <div class="login">
                <div class="login-form">
                    <div class="for-blur">
                        <div className="cancel-button">
                            <button id="X1Button" onClick={() => this.props.settingOpositeState("login")}>X</button>
                        </div>
                        <h1>Login</h1><input id={this.state.loginId} value={this.state.loginValue} onChange={(e) => this.onInputChange("loginValue", e)} />
                        <h1>Password</h1><input id={this.state.passwordId} value={this.state.passwordValue} type="password" onChange={(e) => this.onInputChange("passwordValue", e)} />
                        <button onClick={() => this.validateData()} id="loginButton">Login</button>
                        <div className="div-position">
                            <div id={this.state.tooltipId} class="tooltip">Invalid account</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;
