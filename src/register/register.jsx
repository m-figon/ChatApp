import React, { Component } from 'react'
import './register.css';
class Register extends Component{
    constructor(){
        super();
        this.state={
            emailValue: "",
            accountValue: "",
            passwordValue: "",
            password2Value: "",
            emailId: "",
            accountId: "",
            passwordId: "",
            password2Id: "",
            tooltipEmailId: "hidden",
            tooltipAccountId: "hidden",
            tooltipPasswordId: "hidden",
            tooltipPassword2Id: "hidden"

        }
        this.checkValue = this.checkValue.bind(this);
    }
    onInputChange(array,e){
        this.setState({
            [array]: e.target.value
        })
    }
    checkValue(condition,id,tooltip){
        if (condition){
            this.setState({
                [id]: "incorrect",
                [tooltip]: "visible"
            })     
        }
        else{
            this.setState({
                [id]: "correct",
                [tooltip]: "hidden"
            })   
        }
    }
    validateData(){
       this.checkValue(this.state.emailValue.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null,"emailId","tooltipEmailId");
       this.checkValue(this.state.accountValue.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null,"accountId","tooltipAccountId");
       this.checkValue(this.state.passwordValue.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null,"passwordId","tooltipPasswordId");
       this.checkValue(!(this.state.passwordValue === this.state.password2Value && this.state.password2Value!==""),"password2Id","tooltipPassword2Id");
    }
    render(){
        return (
            <div class="register">
                <div class="register-form">
                    <button id="XButton" onClick={()=>this.props.registerHandler()}>X</button>
                    <h1>Email</h1><input id={this.state.emailId} value={this.state.emailValue} onChange={(e)=>this.onInputChange("emailValue",e)}/><div id={this.state.tooltipEmailId} class="emailTooltip">Invalid email address</div>
                    <h1>Login</h1><input id={this.state.accountId} value={this.state.loginValue} onChange={(e)=>this.onInputChange("accountValue",e)}/><div id={this.state.tooltipAccountId} class="accountTooltip">Account name should be a letter,digit between 4-10 letters</div>
                    <h1>Password</h1><input id={this.state.passwordId} value={this.state.passwordValue} onChange={(e)=>this.onInputChange("passwordValue",e)}/><div id={this.state.tooltipPasswordId} class="passwordTooltip">Password must contain one uppercase, one lowercase letter,number,special sig, have from 18 to 13 letters length</div>
                    <h1>Confirm password</h1><input id={this.state.password2Id} value={this.state.password2Value} onChange={(e)=>this.onInputChange("password2Value",e)}/><div id={this.state.tooltipPassword2Id} class="password2Tooltip">Passwords doesn't match or confirm password is empty</div>
                    <button onClick={()=>this.validateData()} id="registerButton">Register</button>
                </div>
            </div>
        )
    }
    
}

export default Register;
