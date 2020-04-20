import React from 'react'
import './channelDisplay.css';
function ChannelDisplay(props) {
    //console.log(props.servers[0].messages);
    const messages = props.servers[0].messages.map((element)=>{
        return(<div className="post">
        <h1>{element.author}:</h1>
        <h1>{element.content}</h1>
        </div>);
        
    })
    console.log(messages);
    return (
        <div className="channel-display">
            <div className="channel">
            {messages}
            </div>
            <img alt="" src="https://www.creativevirtual.com/wp-content/uploads/2018/10/people-on-devices-707x350.png"></img>
        </div>
    );
}

export default ChannelDisplay;
