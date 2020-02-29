import React from 'react'
import './Settings.scss'
import { Select } from "antd"
import "antd/dist/antd.css"

class GradeEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    gradeList = () => {
        let { Option } = Select;
        return [
            <Option key="1">1st</Option>,
            <Option key="2">2nd</Option>,
            <Option key="3">3rd</Option>,
            <Option key="4">4th</Option>,
            <Option key="5">5th</Option>,
            <Option key="6">6th</Option>,
            <Option key="7">7th</Option>,
            <Option key="8">8th</Option>,
            <Option key="9">9th</Option>,
            <Option key="10">10th</Option>,
            <Option key="11">11th</Option>,
            <Option key="12">12th</Option>,
            <Option key="13">University</Option>,
            <Option key="14">Professional Development</Option>
        ];
    };
    render() {
        let gradeList = this.gradeList();
        return (
            <div className="join-set-pop-up">
                <div className="join-set-pop-up-inner">
                    <h3>Choose your grade</h3>
                    <Select
                        placeholder="Select a grade"
                    >
                        {gradeList}
                    </Select>

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

export default GradeEdit;