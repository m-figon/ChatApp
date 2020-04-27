import React, { Component } from 'react'

export class Password extends Component {
    constructor(){
        super();
        this.state={
            oldPasswordValue: "",
            newPasswordValue: "",
            currentPasswordValue: ""
        }
    }
    inputChanging(array,e){
        this.setState({
            [array]: e.target.value
        })
    }
    changePassword(item){
        console.log(this.state.oldPasswordValue);
        console.log(this.state.newPasswordValue);
        console.log(this.state.confirmPasswordValue);
        if(item.password===this.state.oldPasswordValue && this.state.newPasswordValue===this.state.confirmPasswordValue){
            fetch('http://localhost:3000/accounts/'+item.id, {
        method: 'PUT',
        body: JSON.stringify({
          email: item.email,
          account: item.account,
          img: item.img,
          password: this.state.newPasswordValue
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        }
    }
    render() {
        var element;
            for (const item of this.props.accounts) {
                if (item.account === this.props.logedAs) {
                    element = item;
                }
            }
            if (this.props.currentState === "none") {
                if (element != null) {
                    return (
                        <>
                            <h2>Account informations</h2>
                            <h1>Account name: {element.account}</h1>
                            <h1>Email: {element.email}</h1>
                            <h1>Avatar:</h1>
                            <img src={element.img} />
                        </>
                    );
                } else {
                    return (null);
                }

            } else if (this.props.currentState === "password") {
                return (
                    <>
                        <h2>Changing password</h2>
                                <h1>Enter your old password</h1><input value={this.state.oldPasswordValue} type="password" onChange={(e)=>this.inputChanging("oldPasswordValue",e)}/>
                                <h1>Enter new password</h1><input value={this.state.newPasswordValue} type="password" onChange={(e)=>this.inputChanging("newPasswordValue",e)}/>
                                <h1>Confirm new password</h1><input value={this.state.confirmPasswordValue}  type="password" onChange={(e)=>this.inputChanging("confirmPasswordValue",e)}/>
                                <button onClick={()=>this.changePassword(element)}id="password-button">Reset</button>
                    </>
                )
            } else if (this.props.currentState === "avatar") {
                return (
                    <>
                        <h2>Choose new avtar</h2>
                        <div class="flex">
                            <img alt="" onClick={(e) => this.settingImg("imgValue", e, "img1Id")} src="https://img.icons8.com/wired/64/000000/user.png" />
                            <img alt="" onClick={(e) => this.settingImg("imgValue", e, "img2Id")} src="https://img.icons8.com/nolan/64/user.png" />
                            <img alt="" onClick={(e) => this.settingImg("imgValue", e, "img3Id")} src="https://img.icons8.com/carbon-copy/100/000000/user.png" />
                        </div>
                    </>
                );
            }

        
    }
}

export default Password;
