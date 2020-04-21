import React, { Component } from 'react'
import './channelDisplay.css';
class ChannelDisplay extends Component {
    constructor() {
        super();
        this.state = {
            newPost: ""
        }
    }
    inputChange(e) {
        this.setState({
            newPost: e.target.value
        })
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
        function displayPosts(propsName,name,array){
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
    
                    return (
                        <>
                            <h2 id="time">{timeDif}</h2>
                            <div className="post">
                                <h1>{element.author}:</h1>
                                <h1>{element.content}</h1>
                            </div></>
                    );
    
                })
            }
        }
        displayPosts(this.props.name,"GamingArmy",this.props.GamingArmy);
        displayPosts(this.props.name,"ElMusico",this.props.ElMusico);
        displayPosts(this.props.name,"WeLoveCooking",this.props.WeLoveCooking);
        displayPosts(this.props.name,"Fitnez",this.props.Fitnez);
        displayPosts(this.props.name,"WhyNotGardening",this.props.WhyNotGardening);
        displayPosts(this.props.name,"FootballMadness",this.props.FootballMadness);
        console.log(messages);
        return (
            <div className="channel-display">
                <div className="channel">
                    {messages}
                    {/*only if logged*/}
                    <div class="input-container">
                        <h1>Gogobatman:</h1>
                        <input value={this.state.newPost} onChange={(e) => this.inputChange(e)} />
                        <button onClick={() => this.props.comment(this.props.name)}><img alt="" src="https://img.icons8.com/color/48/000000/chat.png" /></button>
                    </div>
                    {/*only if logged*/}
                </div>
                <img alt="" src="https://www.creativevirtual.com/wp-content/uploads/2018/10/people-on-devices-707x350.png"></img>
            </div>
        );
    }

}

export default ChannelDisplay;