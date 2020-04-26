import React, { Component } from 'react'

class TimeDisplay extends Component {
    constructor() {
        super();
        this.state = {
            currentDate: new Date()
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentDate: new Date()
            });
        }, 5000);
    }
    render() {
        var timeDif;
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
        const postDate = new Date(this.props.date);
        timeDif = (this.state.currentDate.getTime() - postDate.getTime()) / 1000;
        timeCondition(timeDif >= 0 && timeDif < 60, "sec", 1);
        timeCondition(timeDif >= 60 && timeDif < 3600, "min", 60);
        timeCondition(timeDif >= 3600 && timeDif < 86400, "hour", 3600);
        timeCondition(timeDif >= 86400 && timeDif < 86400 * 30, "day", 86400);
        timeCondition(timeDif >= 86400 * 30 && timeDif < 86400 * 30 * 12, "month", 2592000);
        timeCondition(timeDif >= 86400 * 30 * 12, "year", 2592000 * 12);
        return (
            <>
                <h2 id="time">{timeDif}</h2>
            </>
        )
    }

}

export default TimeDisplay;
