import React, { Component, Fragment } from 'react';

import If from "../../components/utils/If";
import { observer } from 'mobx-react';

import config from "../../config";

import {
    Navbar,
    ButtonIcon,
    NotificationBox
} from "../../components";

import TodoContainer from "./TodoApp/TodoContainer";
import Login from './TodoApp/Login';
import withStores from '../../components/HOC/withStores';


const {appName, logoImg } = config;


@observer
class TodoApp extends Component {
    handleLogOut = () => {
        const { logOut } = this.props.userStore;
        logOut();

    }


    render() {
        const { userStore, uiStore, todoStore, notificationStore } = this.props;
        const {isLoggedIn, logIn, toggleRememberme, rememberme } = userStore;
        const { notifs, remove } = notificationStore;
        const { 
            modal, 
            loginError, 
            loginIdentifierInput,
            setLoginIdentifier,
            setLoginError
        } = uiStore;
        const { sticky } = notifs.global;
        return (
            <Fragment>
                <Navbar logoTitle={appName} logoImg={logoImg} {...this.props}>
                    {
                        isLoggedIn 
                        ? <ButtonIcon 
                            action={ this.handleLogOut} 
                            icon="power-off"
                            value="Log out"
                        />
                        : <Login
                            logIn={logIn}
                            modal={modal}
                            loginError={loginError}
                            loginIdentifierInput={loginIdentifierInput}
                            setLoginIdentifier={setLoginIdentifier}
                            setLoginError={setLoginError}
                            toggleRememberme={toggleRememberme}
                            rememberme={rememberme}
                        />       
                    }
                                 
                </Navbar>
                <div style={{display:"none"}}>{notifs.global.sticky.reduce((acc, notif) => (acc + " " + notif.id), "")}</div>
                <NotificationBox 
                    notifs={sticky} 
                    onCloseNotif={remove}
                />

                <If cond={isLoggedIn}>
                    <TodoContainer 
                        userStore={userStore} 
                        uiStore={uiStore} 
                        todoStore={todoStore}
                    />
                </If>
            </Fragment>
            
        );
    }
}

export default 
    withStores([
        "todoStore", 
        "userStore", 
        "uiStore", 
        "notificationStore"
    ])(TodoApp);