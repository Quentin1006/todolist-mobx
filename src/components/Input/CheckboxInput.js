import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Input } from '.';

class CheckboxInput extends Component {
    render() {
        const { value, label, labelClass, id, ...rest } = this.props;
        return (
            <label htmlFor={id} className={labelClass}>
                <Input 
                    id={id}
                    type="checkbox"
                    checked={!!value}
                    className="checkbox"
                    {...rest}
                /> {label}
            </label>
        );
    }
}


CheckboxInput.propTypes = {
    label: PropTypes.string
}

export default CheckboxInput;