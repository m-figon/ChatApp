import React from 'react'
import './channelDisplay.css';
function ChannelDisplay(props) {
    var timeDif;
    function timeCondition(condition,text,value){
        if(condition){
            timeDif=Math.floor(timeDif/value);
            if(timeDif===1){
                timeDif+=" "+text+" ago"
            }else{
                timeDif+=" "+text+"s ago"
            }
        }
    }
    const messages = props.servers[props.id].messages.map((element) => {
        const currentDate = new Date();
        const postDate= new Date(element.date);
        console.log(postDate);
        timeDif = (currentDate.getTime() - postDate.getTime())/1000;
        console.log(timeDif);
        timeCondition(timeDif>=0 && timeDif<60,"sec",1);
        timeCondition(timeDif>=60 && timeDif<3600,"min",60);
        timeCondition(timeDif>=3600 && timeDif<86400,"hour",3600);
        timeCondition(timeDif>=86400 && timeDif<86400*30,"day",86400);
        timeCondition(timeDif>=86400*30 && timeDif<86400*30*12,"month",2592000);
        timeCondition(timeDif>=86400*30*12,"year",2592000*12);
        return (
            <>
            <h2 id="time">{timeDif}</h2>
            <div className="post">
            <h1>{element.author}:</h1>
            <h1>{element.content}</h1>
        </div></>
        );

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
