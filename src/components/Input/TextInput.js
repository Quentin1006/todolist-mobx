import React, { Component } from 'react';

import Input from "./Input";

class TextInput extends Component {

    render() {
        return (
            <Input 
                {...this.props} 
                type="text" 
            />
        )
    }
}

export default TextInput;