import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './channelDisplay.css';
import ReactEmoji from 'react-emoji';
import TimeDisplay from './timeDisplay/timeDisplay.jsx';
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
    }
    addingEmoji(value) {
        this.setState({
            newPost: this.state.newPost + value
        })
    }
    inputChange(e) {
        this.setState({
            newPost: e.target.value
        })
    }
    fetchData(array) {
        fetch("http://localhost:3000/" + array)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    [array]: json
                });
            })
    }

    componentDidMount() {
        for (const item of this.state.channelArray) {
            this.fetchData(item);
        }
        if (this.props.logedAs !== "") {
            this.setState({
                inputId: "visibleInput"
            })
        }
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof HTMLElement) {
            const child = node.querySelector('.end-of-scroll');
            console.log("input:" + child);
            child.scrollIntoView({ behavior: 'auto', block: 'start' })
            //child.scrollBy(0,50);
        }
    }

    render() {
        const EmojiComponent = () => {
            var emojis = this.state.emojiArray.map((elem) => {
                return (
                    <h1 onClick={() => this.addingEmoji(elem)} class={this.state.inputId}>{ReactEmoji.emojify(elem)}</h1>
                );

            })
            return (emojis);
        }
        var messages;
        function displayPosts(propsName, name, array, accountsArray) {
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
                            <div className="post">
                                <img id="post-img" alt="" src={imgSrc} />
                                <h1 id="author">{element.author}</h1>
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
            displayPosts(this.props.name, item, eval("this.state." + item), this.props.accounts);
        }
        return (
            <div className="channel-display">
                <div className="channel">
                    {messages}
                    <hr></hr>
                    <div class="input-container">
                        <h1>{this.props.logedAs}</h1>
                        <input value={this.state.newPost} class={this.state.inputId} onChange={(e) => this.inputChange(e)} />
                        <button class={this.state.inputId} onClick={() => this.props.comment(this.props.name, this.props.logedAs, new Date(), this.state.newPost)}><img alt="" src="https://img.icons8.com/color/48/000000/chat.png" /></button>
                    </div>
                    <div id={this.state.inputId} class="emojis">
                        <EmojiComponent />
                    </div>
                    <div>
                        <h1 class="end-of-scroll"></h1>
                    </div>
                </div>
                <img alt="" src="https://www.creativevirtual.com/wp-content/uploads/2018/10/people-on-devices-707x350.png" />
            </div>
        );
    }

}

export default ChannelDisplay;
