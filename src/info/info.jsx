import React from 'react'
import '../settings/settings.css';
function Info(props) {
    var element;
    for (const item of props.accounts) {
        if (item.account === props.accountInspect) {
            element = item;
        }
    }
    //console.log("info: " + element);
    return (
        <div className="home-display">
            <div className="sign-center">
                <div className="content-div">
                    <h2>Account informations</h2>
                    <h1>Account name: {element.account}</h1>
                    <h1>Email: {element.email}</h1>
                    <h1>Avatar:</h1>
                    <img id="post-img" src={element.img} />
                </div>
            </div>
        </div>
    )
}

export default Info
