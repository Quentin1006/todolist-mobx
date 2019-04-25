import React, { Component } from 'react';

import Input from "./Input";
import { Icon } from "../Icon";


class InputGroup extends Component {

    render() {
        const { type, icon } = this.props;

        return (
            <div className="input-group">
                <Input {...this.props} type={type} />
                <span className="input-group-addon">
                    <Icon icon={icon}/>
                </span>
            </div>
            
        )
    }
}

export default InputGroup;