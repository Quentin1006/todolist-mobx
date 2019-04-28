import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { TextInput, ButtonIcon, Notification } from "../../../components";
import CheckboxInput from '../../../components/Input/CheckboxInput';



@observer
class LoginForm extends Component {
 
    render() {
        const { 
            onLogin, 
            loginError, 
            loginIdentifierInput, 
            setLoginIdentifier,
            setLoginError,
            toggleRememberme,
            rememberme
        } = this.props;

        return (
            <div className="form-login-container">  
                
                {loginError.length > 0 &&
                <div>
                    <Notification
                        onClose={() => {setLoginError("")}}
                        type="error"
                        message={loginError}
                    />
                </div>}
                <div className="login-nameinput-wrapper">
                    <TextInput 
                        id="form-login-input"
                        onChange={setLoginIdentifier}
                        value={loginIdentifierInput}
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
                        action={ onLogin }
                        icon="sign-in-alt"
                        value="Login"
                    />
                </div>
                
            </div>
        );
    }
}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginForm;