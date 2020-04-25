import React, { Component } from 'react'
import './navigationBar.css';
import { Link } from 'react-router-dom';
class NavigationBar extends Component {
    constructor() {
        super();
        this.state = {
            searchedValue: ""
        }
    }
    login() {
        if (this.props.loginOperation === " Sign out") {
            this.props.settingState("logedAs", "",
                "loginOperation", "Sign in", "logedImg", "");
        } else if (this.props.loginOperation === "Sign in") {
            this.props.loginHandler();
        }
    }
    settingInput(array,e){
        this.setState({
            [array]: e.target.value
        })
    }
    
    render() {
    const ConditionalLinkButton = () =>{
        var correct = false;
        var url;
        for(const elem of this.props.channels){
            if(elem.name===this.state.searchedValue){
                console.log("correct channel!");
                correct = true;
                url="/"+this.state.searchedValue;
            }
        }
        if(correct){
            return(<Link to={url} style={{ textDecoration: 'none' }}><button ><img alt="" src="https://img.icons8.com/color/48/000000/chat.png" /></button></Link>);
        }else{
            return(<button ><img alt="" src="https://img.icons8.com/color/48/000000/chat.png" /></button>);
        }
    }
        if (this.props.loginOperation === "Sign in") {
            return (
                <div className="navigation-bar">
                    <div className="left-part">
                        <Link to="/" style={{ textDecoration: 'none' }}><img alt="" src="https://img.icons8.com/color/48/000000/chat.png" /></Link>
                        <Link to="/" style={{ textDecoration: 'none' }}><h1>Chat app</h1></Link>
                    </div>
                    <div className="middle-part">
                        <input value={this.state.searchedValue} onChange={(e) => this.settingInput("searchedValue", e)} />
                        <ConditionalLinkButton/>
                    </div>
                    <div className="right-part">
                        <h1 onClick={() => this.login()}>{this.props.loginOperation}</h1>
                        <h1 onClick={() => this.props.registerHandler()}>Register</h1>
                    </div>

                </div>
            );
        } else if (this.props.loginOperation === " Sign out") {
            return (
                <div className="navigation-bar">
                    <div className="left-part">
                        <Link to="/" style={{ textDecoration: 'none' }}><img alt="" src="https://img.icons8.com/color/48/000000/chat.png" /></Link>
                        <Link to="/" style={{ textDecoration: 'none' }}><h1>Chat app</h1></Link>
                    </div>
                    <div className="middle-part">
                        <input value={this.state.searchedValue} onChange={(e) => this.settingInput("searchedValue", e)} />
                        <ConditionalLinkButton/>
                    </div>
                    <div className="right-part">
                        <h1 onClick={() => this.login()}>{this.props.loginOperation}</h1>
                        <h1 onClick={() => this.props.registerHandler()}>Register</h1>
                        <img src={this.props.logedImg} />
                        <h1> {this.props.logedAs}</h1>
                    </div>
                </div>
            );
        }
    }


}

export default NavigationBar;
