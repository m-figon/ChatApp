import React, { Component } from 'react'

export class SettingsContent extends Component {
    constructor(){
        super();
        this.state={
            oldPasswordValue: "",
            newPasswordValue: "",
            currentPasswordValue: "",
            img1Id: "",
            img2Id: "",
            img3Id: "",
            imgValue: ""
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
    changeAvatar(item){
        if(this.state.imgValue!==""){
            fetch('http://localhost:3000/accounts/'+item.id, {
        method: 'PUT',
        body: JSON.stringify({
          email: item.email,
          account: item.account,
          img: this.state.imgValue,
          password: item.password
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        }
    }
    settingImg(e, imgId) {
        if (eval("this.state." + imgId) === "selected") {
            this.setState({
                img1Id: "",
                img2Id: "",
                img3Id: "",
                imgValue: ""
            })
        } else {
            this.setState({
                img1Id: "",
                img2Id: "",
                img3Id: "",
                [imgId]: "selected",
                imgValue: e.target.src,
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
                            <img id="post-img" src={element.img} />
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
                        <div class="flex-imgs">
                            <img id={this.state.img1Id} alt="" onClick={(e) => this.settingImg(e, "img1Id")} src="https://robohash.org/77set=set7" />
                            <img id={this.state.img2Id} alt="" onClick={(e) => this.settingImg(e, "img2Id")} src="https://robohash.org/77set=set10" />
                            <img id={this.state.img3Id} alt="" onClick={(e) => this.settingImg(e, "img3Id")} src="https://robohash.org/77set=set20" />
                        </div>
                        <button onClick={()=>this.changeAvatar(element)}id="img-button">Change</button>

                    </>
                );
            }

        
    }
}

export default SettingsContent;
