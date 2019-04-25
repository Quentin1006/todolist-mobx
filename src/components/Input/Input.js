import React, { Component } from 'react';
import PropTypes from "prop-types";

const types = [
    "button", "checkbox", "date", "email", "file", "number", "password", "radio",
    "submit", "text", "color"
]

class Input extends Component {

    onHandleChange = (e) => {
        const value = e.target.value;
        this.props.onHandleChange(value);
    }

    render() {
        const {
            id="",
            name="",
            type,
            value="",
            placeholder,
            inputProps

        } = this.props;
        

        return (

            <input 
                className="input"
                id={id}
                type={type}
                name={name}
                onChange={this.onHandleChange}
                placeholder={placeholder}
                value={value}
                {...inputProps}
            />            
        );
    }
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(types).isRequired,
    onHandleChange: PropTypes.func.isRequired,
    name: PropTypes.string,

}

export default Input;