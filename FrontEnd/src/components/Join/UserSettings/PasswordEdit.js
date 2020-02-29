import React from 'react'
import './Settings.scss'

class PassworpdEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="join-set-pop-up">
                <div className="join-set-pop-up-inner">
                    <h3>Update Password</h3>
                    <h3>Enter new password</h3>
                    <input />
                    <h3>Re-enter new password</h3>
                    <input />
                    <div className="set-btn-group">
                        <button className="set-cancel-btn"
                            onClick={this.props.togglePopUp}>
                            Cancel
                        </button>
                        <button className="set-save-btn">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PassworpdEdit;