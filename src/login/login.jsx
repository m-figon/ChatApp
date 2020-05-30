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
        this._isMounted = false;
    }
    onInputChange(array, e) {
        if(this._isMounted){
            this.setState({
                [array]: e.target.value
            })
        }
        
    }
    componentDidMount() {
        this._isMounted = true;

        fetch("https://rocky-citadel-32862.herokuapp.com/Chat/accounts")
            .then(response => response.json())
            .then(json => {
                if(this._isMounted){
                this.setState({
                    accounts: json
                });
            }
            })
    }
    componentWillUnmount() {
        this._isMounted = false;
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
        if (!loginFlag && this._isMounted) {
            this.setState({
                loginId: "incorrect",
                passwordId: "incorrect",
                tooltipId: "visible"
            })
        }
    }
    render() {
        return (
            <div className="login">
                <div className="login-form">
                    <div className="for-blur">
                        <div className="cancel-button">
                            <button id="X1Button" onClick={() => this.props.settingOpositeState("login")}>X</button>
                        </div>
                        <h1>Login</h1><input autoComplete="off" id={this.state.loginId} value={this.state.loginValue} onChange={(e) => this.onInputChange("loginValue", e)} />
                        <h1>Password</h1><input autoComplete="off" id={this.state.passwordId} value={this.state.passwordValue} type="password" onChange={(e) => this.onInputChange("passwordValue", e)} />
                        <button onClick={() => this.validateData()} id="loginButton">Login</button>
                        <div className="div-position">
                            <div id={this.state.tooltipId} className="tooltip">Invalid account</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;
