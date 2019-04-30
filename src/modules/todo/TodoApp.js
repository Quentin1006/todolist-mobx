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


const {appName, logoImg, LOG_OUT, LOG_IN, SUCCESS, Session } = config;


@observer
class TodoApp extends Component {


    handleLogOut = () => {
        const { logOut } = this.props.sessionStore;
        logOut();

    }


    handleLogIn = async () => {
        const { logIn } = this.props.sessionStore;
        const { setUser } = this.props.userStore;
        const { modal, loginIdentifierInput } = this.props.uiStore;

        const {error, user} = await logIn(loginIdentifierInput.value);

        if(error){
            loginIdentifierInput.setError(error);
        }

        if(user){
            setUser(user);
            loginIdentifierInput.reset();
            modal.close();

            this.props.notificationStore.add({
                content: Session.msg.IS_NOW_LOGGED_IN,
                level: SUCCESS,
                expire: 3
            })

        }
    }


    render() {
        const { userStore, uiStore, todoStore, notificationStore, sessionStore } = this.props;
        const {isLoggedIn, toggleRememberme, rememberme } = sessionStore;
        const { setUser } = userStore;
        const { notifs, remove } = notificationStore;
        const { 
            modal, 
            loginIdentifierInput,
        } = uiStore;
        const { sticky } = notifs.global;
        return (
            <Fragment>
                <Navbar logoTitle={appName} logoImg={logoImg} {...this.props}>
                    {isLoggedIn 
                    ? <ButtonIcon 
                        action={ this.handleLogOut} 
                        icon="power-off"
                        value={LOG_OUT}
                    />
                    : <Login
                        logIn={this.handleLogIn}
                        logInText={LOG_IN}
                        setUser={setUser}
                        modal={modal}
                        loginIdentifierInput={loginIdentifierInput}
                        toggleRememberme={toggleRememberme}
                        rememberme={rememberme}
                    />}
                                 
                </Navbar>
                
                <NotificationBox 
                    notifs={sticky} 
                    onCloseNotif={remove}
                />

                <If cond={isLoggedIn}>
                    <TodoContainer 
                        userStore={userStore} 
                        uiStore={uiStore} 
                        todoStore={todoStore}
                        notificationStore={notificationStore}
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
        "sessionStore",
        "notificationStore"
    ])(TodoApp);