import React from 'react'

import './Find.scss';

// import QuizThumbnail from '../../../../utils/QuizThumbnail/QuizThumbnail'
class AdminFind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="ad-find-container">
                <h1>What will we teach today?</h1>

                <div className="join-quiz-list-review" >
                    <div className="quiz-list-show-topic">
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminFind;