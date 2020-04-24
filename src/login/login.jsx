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
        this.state.accounts.map((element) => {
            if (element.account === this.state.loginValue && element.password === this.state.passwordValue) {
                loginFlag = true;
                console.log(element.img);
                this.props.settingState("logedAs", this.state.loginValue, "loginOperation", " Sign out","logedImg",element.img);
                this.props.loginHandler();
            }
        })
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
                    <button id="X1Button" onClick={() => this.props.loginHandler()}>X</button>
                    <h1>Login</h1><input id={this.state.loginId} value={this.state.loginValue} onChange={(e) => this.onInputChange("loginValue", e)} /><div id={this.state.tooltipId} class="tooltip">Invalid account</div>
                    <h1>Password</h1><input id={this.state.passwordId} value={this.state.passwordValue} onChange={(e) => this.onInputChange("passwordValue", e)} />
                    <button onClick={() => this.validateData()} id="loginButton">Login</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;
