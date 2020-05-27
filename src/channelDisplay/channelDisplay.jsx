import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './channelDisplay.css';
import ReactEmoji from 'react-emoji';
import TimeDisplay from './timeDisplay/timeDisplay.jsx';
import { Link } from 'react-router-dom';
class ChannelDisplay extends Component {
    constructor() {
        super();
        this.state = {
            GamingArmy: [],
            ElMusico: [],
            WeLoveCooking: [],
            Fitnez: [],
            WhyNotGardening: [],
            FootballMadness: [],
            newPost: "",
            channelArray: [
                "GamingArmy", "ElMusico", "WeLoveCooking", "Fitnez", "WhyNotGardening", "FootballMadness"
            ],
            emojiArray: [
                ":)", ":(", ":D", ":P", ":/", ":*", ":'(", ">:(", ":o"
            ],
            inputId: "hiddenInput"
        }
        this._isMounted = false;

    }
    addingEmoji(value) {
        if (this._isMounted) {
        this.setState({
            newPost: this.state.newPost + value
        })
    }
    }
    inputChange(e) {
        if (this._isMounted) {
        this.setState({
            newPost: e.target.value
        })
    }
    }
    fetchData(array) {
        fetch("http://localhost:3000/" + array)
            .then(response => response.json())
            .then(json => {
                if (this._isMounted) {
                    this.setState({
                        [array]: json
                    });
                } 
            })
            
    }

    componentDidMount() {
        this._isMounted = true;
        
            for (const item of this.state.channelArray) {
                this.fetchData(item);
            }
            if (this.props.logedAs !== "") {
                if (this._isMounted) {
                    this.setState({
                        inputId: "visibleInput"
                    })
                }
                
            }
        
        
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    render() {
        const EmojiComponent = () => {
            var emojis = this.state.emojiArray.map((elem) => {
                return (
                    <h1 onClick={() => this.addingEmoji(elem)} className={this.state.inputId}>{ReactEmoji.emojify(elem)}</h1>
                );

            })
            return (emojis);
        }
        var messages;
        function displayPosts(propsName, name, array, accountsArray, setingStateHandler) {
            if (propsName === name) {
                messages = array.map((element) => {
                    var imgSrc;
                    for (const item of accountsArray) {
                        if (element.author === item.account) {
                            imgSrc = item.img;
                        }
                    }
                    return (
                        <>
                            <hr />
                            <div key={element.id} className="post">
                                <img id="post-img" alt="" src={imgSrc} />
                                <Link onClick={() => setingStateHandler("accountInspect", element.author)} key={element.id} to={{
                                    pathname: "info/" + element.author,
                                }} style={{ textDecoration: 'none' }}><h1 id="author">{element.author}</h1></Link>
                                <TimeDisplay date={element.date} />
                            </div>
                            <div className="post">
                                <h1 id="content">{ReactEmoji.emojify(element.content)}</h1>
                            </div>
                        </>
                    );

                })
            }
        }
        for (const item of this.state.channelArray) {
            displayPosts(this.props.name, item, eval("this.state." + item), this.props.accounts, this.props.settingState);
        }
        return (
            <div className="channel-display">
                <div className="channel">
                    {messages}
                    <hr></hr>
                    <div className="input-container">
                        <h1 id="nick-name">{this.props.logedAs}</h1>
                        <input value={this.state.newPost} className={this.state.inputId} onChange={(e) => this.inputChange(e)} />
                        <button className={this.state.inputId} onClick={() => this.props.comment(this.props.name, this.props.logedAs, new Date(), this.state.newPost)}><img alt="" src="https://img.icons8.com/color/48/000000/chat.png" /></button>
                    </div>
                    <div id={this.state.inputId} className="emojis">
                        <EmojiComponent />
                    </div>
                    <div>
                        <h1 className="end-of-scroll"></h1>
                    </div>
                </div>
            </div>
        );
    }

}

export default ChannelDisplay;
