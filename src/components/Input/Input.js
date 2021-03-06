import React, { Component } from 'react';
import PropTypes from "prop-types";

const types = [
    "button", "checkbox", "date", "email", "file", "number", "password", "radio",
    "submit", "text", "color"
]

class Input extends Component {

    handleChange = (e) => {
        const value = e.target.value;
        this.props.onChange(value);
    }

    render() {
        const {
            id="",
            name="",
            type,
            value="",
            onChange, // important to mention it so its not overwritten in the input
            placeholder,
            classes,
            ...otherProps
        } = this.props;
        
        
        return (

            <input 
                className={`input ${classes}`}
                id={id}
                type={type}
                name={name? name: id}
                onChange={this.handleChange}
                placeholder={placeholder}
                value={value}
                {...otherProps}
            />            
        );
    }
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(types).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    name: PropTypes.string,

}

export default Input;