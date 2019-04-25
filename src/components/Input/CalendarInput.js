import React, { Component } from 'react';

import InputGroup from "./InputGroup";

class CalendarInput extends Component {

    render() {
        const { icon } = this.props;

        return (
            <InputGroup {...this.props} type="date" icon={icon}/>
        )
    }
}

export default CalendarInput;