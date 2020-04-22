import React, { Component } from 'react'
import './login.css';
class Login extends Component{
    constructor(){
        super();
        this.state={
            loginValue: "",
            passwordValue: "",
            loginId: "",
            passwordId: "",
            tooltipId: "hidden"
        }
    }
    onInputChange(array,e){
        this.setState({
            [array]: e.target.value
        })
    }
    validateData(){
        var loginFlag=false;
        this.props.accounts.map((element)=>{
            if(element.account===this.state.loginValue && element.password===this.state.passwordValue){
                loginFlag=true;
                this.props.settingState("logedAs",this.state.loginValue,"loginOperation"," Sign out");
                this.props.loginHandler();
            }
        })
        if(!loginFlag){
            this.setState({
                loginId: "incorrect",
                passwordId: "incorrect",
                tooltipId: "visible"
            })
        }
    }
    render(){
        return (
            <div class="login">
                <div class="login-form">
                    <button id="XButton" onClick={()=>this.props.loginHandler()}>X</button>
                    <h1>Login</h1><input id={this.state.loginId} value={this.state.loginValue} onChange={(e)=>this.onInputChange("loginValue",e)}/><div id={this.state.tooltipId} class="tooltip">Invalid account</div>
                    <h1>Password</h1><input id={this.state.passwordId} value={this.state.passwordValue} onChange={(e)=>this.onInputChange("passwordValue",e)}/>
                    <button onClick={()=>this.validateData()} id="loginButton">Login</button>
                </div>
            </div>
        )
    }
    
}

export default Login;
