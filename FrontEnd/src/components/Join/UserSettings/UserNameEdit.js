import React from 'react'
import './Settings.scss'
class UserNameEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="join-set-pop-up">
                <div className="join-set-pop-up-inner">
                    <h3>Pick a funny and cool name</h3>
                    <form>
                        <input/>
                    </form>
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

export default UserNameEdit;