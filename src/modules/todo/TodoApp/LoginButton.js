import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

import { Modal, ModalTitle } from "../../../components/Modal";
import { ButtonIcon } from "../../../components/Button";
import If from "../../../components/utils/If";

import withUiState from "../../../components/HOC/withUiState";


@observer
class LoginButton extends Component {

    handleLogin = async () => {
        const { logIn, uiState } = this.props;
        const resp = await logIn();

        if(resp.id){
            uiState.closeModal();
        }
    }

    render() {
        const { uiState } = this.props;
        return (
            <Fragment>
                
                <ButtonIcon
                    action={uiState.openModal}
                    value="Log in"
                    icon="igloo"
                />
                
                <If cond={uiState.modal.open}>
                    <Modal
                        open={uiState.modal.open}
                        close={uiState.closeModal}
                    >
                        <ModalTitle>Login</ModalTitle>
                        <div>{uiState.pendingRequest}</div>
                        <ButtonIcon
                            action={ this.handleLogin }
                            icon="igloo"
                            value="Login"
                        />
                    </Modal>
                </If>
                
            </Fragment>
        );
    }
}

LoginButton.propTypes = {
    logIn: PropTypes.func.isRequired
};

export default withUiState(LoginButton);