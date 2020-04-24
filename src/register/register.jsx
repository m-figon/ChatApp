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
            imgValue: "",
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
    settingImg(array,e){
        this.setState({
            [array]: e.target.src
        })
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
            return false;   
        }
        else{
            this.setState({
                [id]: "correct",
                [tooltip]: "hidden"
            })   
            return true;
        }
    }
    addUser(emailValue,accountValue,passwordValue,imgValue){
        fetch('http://localhost:3000/accounts', {
      method: 'POST',
      body: JSON.stringify({
        email: emailValue,
        account: accountValue,
        password: passwordValue,
        img: imgValue
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    }
    validateData(){
        var correctFlag=true;
        if(this.checkValue(this.state.emailValue.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null,"emailId","tooltipEmailId")){
        }else{correctFlag=false;}
        if(this.checkValue(this.state.accountValue.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null,"accountId","tooltipAccountId")){
        }else{ correctFlag=false;}
        if(this.checkValue(this.state.passwordValue.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null,"passwordId","tooltipPasswordId")){
        }else{ correctFlag=false;}
        if(this.checkValue(!(this.state.passwordValue === this.state.password2Value && this.state.password2Value!==""),"password2Id","tooltipPassword2Id")){
        }else{ correctFlag=false;}
        if(correctFlag){
            this.addUser(this.state.emailValue,this.state.accountValue,this.state.passwordValue,this.state.imgValue);
        }
    }
    render(){
        return (
            <div class="register">
                <div class="register-form">
                    <div class="for-blur">
                    <button id="X2Button" onClick={()=>this.props.registerHandler()}>X</button>
                    <h1>Email</h1><input id={this.state.emailId} value={this.state.emailValue} onChange={(e)=>this.onInputChange("emailValue",e)}/><div id={this.state.tooltipEmailId} class="emailTooltip">Invalid email address</div>
                    <h1>Login</h1><input id={this.state.accountId} value={this.state.loginValue} onChange={(e)=>this.onInputChange("accountValue",e)}/><div id={this.state.tooltipAccountId} class="accountTooltip">Account name should be a letter,digit between 4-10 letters</div>
                    <h1>Password</h1><input id={this.state.passwordId} value={this.state.passwordValue} onChange={(e)=>this.onInputChange("passwordValue",e)}/><div id={this.state.tooltipPasswordId} class="passwordTooltip">Password must contain one uppercase, one lowercase letter,number,special sig, have from 18 to 13 letters length</div>
                    <h1>Confirm password</h1><input id={this.state.password2Id} value={this.state.password2Value} onChange={(e)=>this.onInputChange("password2Value",e)}/><div id={this.state.tooltipPassword2Id} class="password2Tooltip">Passwords doesn't match or confirm password is empty</div>
                    <h1>Choose avatar</h1>
                    <div class="flex">
                        <img onClick={(e)=>this.settingImg("imgValue",e)} src="https://img.icons8.com/wired/64/000000/user.png"/>
                        <img onClick={(e)=>this.settingImg("imgValue",e)} src="https://img.icons8.com/nolan/64/user.png"/>
                        <img onClick={(e)=>this.settingImg("imgValue",e)} src="https://img.icons8.com/carbon-copy/100/000000/user.png"/>
                    </div>
                    <button onClick={()=>this.validateData()} id="registerButton">Register</button>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Register;
