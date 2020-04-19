import React, { Component } from 'react'
import './homeDisplay.css';
class HomeDisplay extends Component {
    
    
    render() {
        console.log(this.props.servers);
        
        const display = this.props.servers.map((element) => {
                return (
                    <h1>{element.name}</h1>
                    );
                });
        
        return (
            <div class="home-display">
                <div class="sign-center">
                    <div class="sign-div">
                        <h2>Lists of servers</h2>
                        {display}
                    </div>
                </div>
                <img src="https://www.creativevirtual.com/wp-content/uploads/2018/10/people-on-devices-707x350.png"></img>
            </div>
        );
    }

}

export default HomeDisplay;
