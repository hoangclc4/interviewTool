import React from 'react';
import './TimeBar.scss';
class TimeBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="time-bar-container">
                <div className="htprogress-bar" style={{animation:`loader ${this.props.TimeOut}s linear forwards`}}>
                    <span className="htbar">
                        <span className="htprogress"></span>
                    </span>
                </div>
            </div>
        );
    }
}

export default TimeBar;