import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './channelDisplay.css';
class ChannelDisplay extends Component {
    constructor() {
        super();
        this.state = {
            newPost: "",
            inputId: "hiddenInput"
        }
    }
    settingState(value){
        this.setState({
            newPost: this.state.newPost+value
        })
    }
    inputChange(e) {
        for (let i = 0; i < this.state.newPost.length; i++) {
            if(this.state.newPost[i]===":" && this.state.newPost[i+1]==="("){
                console.log("sad detected");
            }else if(this.state.newPost[i]===";" && this.state.newPost[i+1]===")"){
                console.log("wink detected");
            }else if(this.state.newPost[i]===":" && this.state.newPost[i+1]==="|"){
                console.log("angry detected");
            }
        }
        this.setState({
            newPost: e.target.value
        })
    }
    componentDidMount() {
        if (this.props.logedAs !== "") {
            this.setState({
                inputId: "visibleInput"
            })
        }
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
            const child = node.querySelector('.input-container');
            //console.log("input:" + child);
            child.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
    }
    render() {
        var timeDif;
        var messages;
        function timeCondition(condition, text, value) {
            if (condition) {
                timeDif = Math.floor(timeDif / value);
                if (timeDif === 1) {
                    timeDif += " " + text + " ago"
                } else {
                    timeDif += " " + text + "s ago"
                }
            }
        }
        function displayPosts(propsName, name, array, accountsArray) {
            if (propsName === name) {
                messages = array.map((element) => {

                    const currentDate = new Date();
                    const postDate = new Date(element.date);
                    timeDif = (currentDate.getTime() - postDate.getTime()) / 1000;
                    timeCondition(timeDif >= 0 && timeDif < 60, "sec", 1);
                    timeCondition(timeDif >= 60 && timeDif < 3600, "min", 60);
                    timeCondition(timeDif >= 3600 && timeDif < 86400, "hour", 3600);
                    timeCondition(timeDif >= 86400 && timeDif < 86400 * 30, "day", 86400);
                    timeCondition(timeDif >= 86400 * 30 && timeDif < 86400 * 30 * 12, "month", 2592000);
                    timeCondition(timeDif >= 86400 * 30 * 12, "year", 2592000 * 12);

                    var imgSrc;
                    for (const item of accountsArray) {
                        if (element.author === item.account) {
                            imgSrc = item.img;
                        }
                    }
                    return (
                        <>
                            <hr />
                            <div className="post">
                                <img src={imgSrc} />
                                <h1 id="author">{element.author}</h1>
                                <h2 id="time">{timeDif}</h2>
                            </div>
                            <div className="post">
                                <h1 id="content">{element.content}</h1>
                            </div>
                        </>
                    );

                })
            }
        }
        displayPosts(this.props.name, "GamingArmy", this.props.GamingArmy, this.props.accounts);
        displayPosts(this.props.name, "ElMusico", this.props.ElMusico, this.props.accounts);
        displayPosts(this.props.name, "WeLoveCooking", this.props.WeLoveCooking, this.props.accounts);
        displayPosts(this.props.name, "Fitnez", this.props.Fitnez, this.props.accounts);
        displayPosts(this.props.name, "WhyNotGardening", this.props.WhyNotGardening, this.props.accounts);
        displayPosts(this.props.name, "FootballMadness", this.props.FootballMadness, this.props.accounts);
        return (
            <div className="channel-display">
                <div className="channel">
                    {messages}
                    <div class="input-container">
                        <h1>{this.props.logedAs}</h1>
                        <input value={this.state.newPost} class={this.state.inputId} onChange={(e) => this.inputChange(e)} />
                        <button class={this.state.inputId} onClick={() => this.props.comment(this.props.name, this.props.logedAs, new Date(), this.state.newPost)}><img alt="" src="https://img.icons8.com/color/48/000000/chat.png" /></button>
                    </div>
                    <div class="emojis">
                        <img onClick={()=>this.settingState(":(")} class={this.state.inputId} src="https://img.icons8.com/ios/50/000000/sad.png" />
                        <img onClick={()=>this.settingState(":|")}class={this.state.inputId} src="https://img.icons8.com/ios/50/000000/angry.png" />
                        <img onClick={()=>this.settingState(";)")} class={this.state.inputId} src="https://img.icons8.com/windows/32/000000/wink.png"/>
                        <img onClick={()=>this.settingState(":P")} class={this.state.inputId} src="https://img.icons8.com/ios/50/000000/tongue-out.png"/>                 
                     </div>
                </div>
                <img alt="" src="https://www.creativevirtual.com/wp-content/uploads/2018/10/people-on-devices-707x350.png" />
            </div>
        );
    }

}

export default ChannelDisplay;
