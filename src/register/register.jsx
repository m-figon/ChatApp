import React, { Component } from 'react'
import './register.css';
class Register extends Component {
    constructor() {
        super();
        this.state = {
            emailValue: "",
            accountValue: "",
            passwordValue: "",
            password2Value: "",
            imgValue: "",
            emailId: "",
            accountId: "",
            passwordId: "",
            password2Id: "",
            selectImgId: "",
            tooltipEmailId: "hidden",
            tooltipAccountId: "hidden",
            tooltipPasswordId: "hidden",
            tooltipPassword2Id: "hidden",
            tooltipSelectImgId: "hidden",
            img1Id: "",
            img2Id: "",
            img3Id: ""

        }
        this.checkValue = this.checkValue.bind(this);
    }
    settingImg(array, e, imgId) {
        this.setState({
            [array]: e.target.src,
        })
        if (eval("this.state." + imgId) === "selected") {
            this.setState({
                img1Id: "",
                img2Id: "",
                img3Id: ""
            })
        } else {
            this.setState({
                img1Id: "",
                img2Id: "",
                img3Id: "",
                [imgId]: "selected"
            })
        }
    }
    onInputChange(array, e) {
        this.setState({
            [array]: e.target.value
        })
    }
    checkValue(condition, id, tooltip) {
        if (condition) {
            this.setState({
                [id]: "incorrect",
                [tooltip]: "visible"
            })
            return false;
        }
        else {
            this.setState({
                [id]: "correct",
                [tooltip]: "hidden"
            })
            return true;
        }
    }
    addUser(emailValue, accountValue, passwordValue, imgValue) {
        fetch('https://rocky-citadel-32862.herokuapp.com/Chat/accounts', {
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
    validateData() {
        var correctFlag = true;
        if (this.checkValue(this.state.emailValue.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null, "emailId", "tooltipEmailId")) {
        } else { correctFlag = false; }
        if (this.checkValue(this.state.accountValue.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null, "accountId", "tooltipAccountId")) {
        } else { correctFlag = false; }
        if (this.checkValue(this.state.passwordValue.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null, "passwordId", "tooltipPasswordId")) {
        } else { correctFlag = false; }
        if (this.checkValue(!(this.state.passwordValue === this.state.password2Value && this.state.password2Value !== ""), "password2Id", "tooltipPassword2Id")) {
        } else { correctFlag = false; }
        if (this.state.img1Id === "" && this.state.img2Id === "" && this.state.img3Id === "") {
            this.setState({
                tooltipSelectImgId: "visible"
            })
            correctFlag = false;
        }
        else {
            this.setState({
                tooltipSelectImgId: "hidden"
            })
        }
        if (correctFlag) {
            this.addUser(this.state.emailValue, this.state.accountValue, this.state.passwordValue, this.state.imgValue);
        }
    }
    render() {
        return (
            <div className="register">
                <div className="register-form">
                    <div className="for-blur">
                        <div className="cancel-register-button">
                            <button id="X2Button" onClick={() => this.props.settingOpositeState("register")}>X</button>
                        </div>
                        <h1>Email</h1><input autoComplete="off" id={this.state.emailId} value={this.state.emailValue} onChange={(e) => this.onInputChange("emailValue", e)} /><div id={this.state.tooltipEmailId} className="emailTooltip"><h1>Invalid email address</h1></div>
                        <h1>Login</h1><input autoComplete="off" id={this.state.accountId} value={this.state.loginValue} onChange={(e) => this.onInputChange("accountValue", e)} /><div id={this.state.tooltipAccountId} className="accountTooltip"><h1>Account name should be a letter,digit between 4-10 letters</h1></div>
                        <h1>Password</h1><input autoComplete="off" type="password" id={this.state.passwordId} value={this.state.passwordValue} onChange={(e) => this.onInputChange("passwordValue", e)}/><div id={this.state.tooltipPasswordId} className="passwordTooltip"><h1>Password must contain one uppercase, one lowercase letter,number,special sig, have from 18 to 13 letters length</h1></div>
                        <h1>Confirm password</h1><input autoComplete="off" type="password" id={this.state.password2Id} value={this.state.password2Value} onChange={(e) => this.onInputChange("password2Value", e)}/><div id={this.state.tooltipPassword2Id} className="password2Tooltip"><h1>Passwords doesn't match or confirm password is empty</h1></div>

                        <h1>Choose avatar</h1>
                        

                        <div className="flex">
                            <img alt="" id={this.state.img1Id} onClick={(e) => this.settingImg("imgValue", e, "img1Id")} src="https://robohash.org/77set=set7" />
                            <img alt="" id={this.state.img2Id} onClick={(e) => this.settingImg("imgValue", e, "img2Id")} src="https://robohash.org/77set=set10" />
                            <img alt="" id={this.state.img3Id} onClick={(e) => this.settingImg("imgValue", e, "img3Id")} src="https://robohash.org/77set=set20" />
                        </div>
                        <div id={this.state.tooltipSelectImgId} className="selectImgId"><h1>Please choose avatar</h1></div>
                        <button onClick={() => this.validateData()} id="registerButton">Register</button>
                        <div className="register-tootlips">
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Register;