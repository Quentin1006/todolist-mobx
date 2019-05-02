import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

import { Modal, ModalTitle, ButtonIcon } from "../../../components";
import LoginForm from "./LoginForm"
import If from "../../../components/utils/If";

import Input from "../../../models/Input";



@observer
class Login extends Component {

    handleLogin = () => {

    }

    
    render() {
        const { 
            modal,  
            loginIdentifierInput,
            toggleRememberme,
            rememberme, 
            logInText,
            logIn
        } = this.props;
        
        return (
            <Fragment>
                
                <ButtonIcon
                    action={modal.open}
                    value={logInText}
                    icon="sign-in-alt"
                />
                
                <If cond={modal.isOpen}>
                    <Modal
                        isOpen={modal.isOpen}
                        close={modal.close}
                    >
                        <ModalTitle>{logInText}</ModalTitle>
                        <LoginForm 
                            logIn={logIn}
                            loginIdentifierInput = {loginIdentifierInput}
                            rememberme={rememberme}
                            toggleRememberme={toggleRememberme}
                        />
                    </Modal>
                </If>
                
            </Fragment>
        );
    }
}

Login.propTypes = {
    logIn: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired,
    loginIdentifierInput: PropTypes.instanceOf(Input),
};

export default Login;