import React from 'react'
import './navigationBar.css';
import {Link} from 'react-router-dom';
function NavigationBar() {
    return (
        <div className="navigation-bar">
            <div className="left-part">
            <Link to="/" style={{ textDecoration: 'none' }}><img alt="" src="https://img.icons8.com/color/48/000000/chat.png"/></Link>
            <Link to="/" style={{ textDecoration: 'none' }}><h1>Chat app</h1></Link>
            </div>
            <div className="middle-part">
            </div>
            <div className="right-part">
                <h1>Log in</h1>
                <h1>Register</h1>
            </div>
        </div>
    );
}

export default NavigationBar;
