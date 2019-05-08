import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { TextInput, ButtonIcon, Notification, CheckboxInput } from "../../../components";
import { Fade } from '../../../components/Transition';



@observer
class LoginForm extends Component {
    componentWillUnmount(){
        const { loginIdentifierInput } = this.props;
        loginIdentifierInput.reset();
    }

    
    render() {
        const { 
            logIn, 
            loginIdentifierInput, 
            toggleRememberme,
            rememberme
        } = this.props;

        const { error, setError, value, setValue } = loginIdentifierInput;

        return (
            <div className="form-login-container">  
                <Fade in={error.length > 0}>
                    <Notification
                        onClose={() => {setError("")}}
                        level="error"
                        message={error}
                    />
                </Fade>
                <div className="login-nameinput-wrapper">
                    <TextInput 
                        id="form-login-input"
                        onChange={setValue}
                        value={value}
                        placeholder="Enter your name..."
                    />  
                </div>
                <div>
                    <CheckboxInput 
                        id="login-rememberme"
                        labelClass="label-rememberme"
                        value={rememberme}
                        onChange={toggleRememberme}
                        label={"Remember me"}
                    />
                </div>
                <div className="login-submit-wrapper">
                    <ButtonIcon
                        action={logIn}
                        icon="sign-in-alt"
                        value="Login"
                    />
                </div>
                
            </div>
        );
    }
}

LoginForm.propTypes = {
    logIn: PropTypes.func.isRequired,
};

export default LoginForm;