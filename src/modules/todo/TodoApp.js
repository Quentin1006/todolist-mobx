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
import LoginButton from './TodoApp/LoginButton';
import withStores from '../../components/HOC/withStores';


const {appName, logoImg } = config;


@observer
class TodoApp extends Component {
    
    async componentDidMount(){
        const { todoStore } = this.props;
        await todoStore.load();
    }


    render() {
        console.log("rendering app");
        const { userStore, uiStore, todoStore, notificationStore } = this.props;
        const {isLoggedIn, logIn, logOut } = userStore;
        const { notifs, remove } = notificationStore;
        const { sticky } = notifs.global;
        return (
            <Fragment>
                <Navbar logoTitle={appName} logoImg={logoImg} {...this.props}>
                    {
                        isLoggedIn 
                        ? <ButtonIcon 
                            action={ logOut} 
                            icon="igloo"
                            value="Log out"
                        />
                        : <LoginButton
                            logIn={logIn}
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