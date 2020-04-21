import React, { Component } from 'react'
import './login.css';
class Login extends Component{
    constructor(){
        super();
        this.state={
            loginValue: "",
            passwordValue: ""
        }
    }
    onInputChange(array,e){
        this.setState({
            [array]: e.target.value
        })
    }
    render(){
        return (
            <div class="login">
                <div class="login-form">
                    <button id="XButton" onClick={()=>this.props.loginHandler()}>X</button>
                    <h1>Login</h1><input value={this.state.loginValue} onChange={(e)=>this.onInputChange("loginValue",e)}/>
                    <h1>Password</h1><input value={this.state.passwordValue} onChange={(e)=>this.onInputChange("passwordValue",e)}/>
                    <button id="loginButton">Login</button>
                </div>
            </div>
        )
    }
    
}

export default Login;
