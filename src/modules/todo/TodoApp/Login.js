import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

import { Modal, ModalTitle, ButtonIcon } from "../../../components";
import LoginForm from "./LoginForm"
import If from "../../../components/utils/If";



@observer
class LoginButton extends Component {
    onLogin = async () => {
        const { logIn, closeModal, loginIdentifierInput, setLoginError } = this.props;
        const resp = await logIn(loginIdentifierInput);

        if(resp.error){
            setLoginError(resp.error);
        }

        if(resp.id){
            closeModal();
        }
    }
    

    render() {
        const { 
            closeModal, 
            openModal, 
            modal, 
            loginError, 
            loginIdentifierInput,
            setLoginIdentifier,
            setLoginError,
            toggleRememberme,
            rememberme
        } = this.props;
        
        return (
            <Fragment>
                
                <ButtonIcon
                    action={openModal}
                    value="Log in"
                    icon="sign-in-alt"
                />
                
                <If cond={modal.open}>
                    <Modal
                        open={modal.open}
                        close={closeModal}
                    >
                        <ModalTitle>Login</ModalTitle>
                        <LoginForm 
                            onLogin={this.onLogin}
                            loginError={loginError}
                            loginIdentifierInput = {loginIdentifierInput}
                            setLoginIdentifier = {setLoginIdentifier}
                            setLoginError= {setLoginError}
                            rememberme={rememberme}
                            toggleRememberme={toggleRememberme}
                        />
                        
                    </Modal>
                </If>
                
            </Fragment>
        );
    }
}

LoginButton.propTypes = {
    logIn: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    loginError: PropTypes.string,
    loginIdentifierInput: PropTypes.string,
};

export default LoginButton;