import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

import { Modal, ModalTitle, ButtonIcon } from "../../../components";
import LoginForm from "./LoginForm"
import If from "../../../components/utils/If";



@observer
class LoginButton extends Component {
    onLogin = async () => {
        const { logIn, modal, loginIdentifierInput, setLoginError } = this.props;
        const resp = await logIn(loginIdentifierInput);

        if(resp.error){
            setLoginError(resp.error);
        }

        if(resp.id){
            modal.close();
        }
    }
    

    render() {
        const { 
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
                    action={modal.open}
                    value="Log in"
                    icon="sign-in-alt"
                />
                
                <If cond={modal.isOpen}>
                    <Modal
                        open={modal.isOpen}
                        close={modal.close}
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
    loginError: PropTypes.string,
    loginIdentifierInput: PropTypes.string,
};

export default LoginButton;