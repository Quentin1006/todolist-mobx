import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

import { Modal, ModalTitle, ButtonIcon } from "../../../components";
import { Fade, Slide } from "../../../components/Transition";
import LoginForm from "./LoginForm"

import Input from "../../../models/Input";



@observer
class Login extends Component {
    
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
                
                <Fade 
                    in={modal.isOpen}
                    onEnter={()=>{console.log("Enter modal")}}
                >
                    <Modal
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
                </Fade>
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