import React, { Component } from 'react'
import './homeDisplay.css';
import { Link } from 'react-router-dom';

class HomeDisplay extends Component {
    render() {
        console.log(this.props.servers);

        const display = this.props.servers.map((element) => {
            return (
                <Link key={element.id} to={{
                    pathname: element.name,
                }} style={{ textDecoration: 'none' }}><h1 >{element.name}</h1></Link>
            );
        });

        return (
            <div className="home-display">
                <div className="sign-center">
                    <div className="sign-div">
                        <h2>Lists of servers</h2>
                        {display}
                    </div>
                </div>
                <img alt="" src="https://www.creativevirtual.com/wp-content/uploads/2018/10/people-on-devices-707x350.png"></img>
            </div>
        );
    }

}

export default HomeDisplay;
