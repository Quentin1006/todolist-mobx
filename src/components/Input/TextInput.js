import React, { Component } from 'react';

import Input from "./Input";

class TextInput extends Component {

    render() {
        const { onHandleChange } = this.props;
        return (
            <Input 
                {...this.props} 
                type="text" 
                onHandleChange={onHandleChange}
            />
        )
    }
}

export default TextInput;