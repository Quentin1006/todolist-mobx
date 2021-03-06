import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import withStores from "../../components/HOC/withStores";
import { ButtonIcon, Card, NotificationBox, Snackbar } from "../../components";
import Slide from "../../components/Transition/Slide";
import ComponentWithInternalState from "./ComponentWithInternalState";

let id = 0;


@observer
class TestNotifs extends Component {
    state={
        snackbarDemoIsOpen: true
    }

    createVolatileNotif = () => {
        const { add } = this.props.notificationStore;
        const params = {
            content: "notification "+ id++,
        }
        add(params);
    }

    createStickyNotif = () => {
        const { add } = this.props.notificationStore;
        const params = {
            content: "notification "+ id++,
            type: "sticky"
        }
        add(params);
    }


    // componentDidUpdate(){
    //     console.log("TestNotifs updating");
    // }


    render() {
        const { notificationStore } = this.props;
        const { remove, notifs } = notificationStore;
        const { volatile, sticky } = notifs.global
        return (
            <>
                <div style={{textAlign: "right"}}>
                    <Card style={{display: "inline-flex",flexFlow:"reverse-row"}}>
                        <fieldset >
                            <legend>Notification</legend>
                            <ButtonIcon
                                icon="plus"
                                action= {this.createVolatileNotif}
                                value={"CREATE VOLATILE"}
                            />
                            <ButtonIcon
                                icon="plus"
                                action= {this.createStickyNotif}
                                value={"CREATE STICKY"}
                            />


                        </fieldset>
                        <Slide 
                            in={this.state.snackbarDemoIsOpen}
                            from={"left"}
                        >
                            <Snackbar 
                                message="Hello im a notifiaction"
                                onClose={() => {this.setState({snackbarDemoIsOpen: false})}}
                            />
                        </Slide>
                        {/** 
                          * This Comp test whether a comp can update his state
                          * Inside a comp that uses memo
                         **/
                        }
                        <ComponentWithInternalState />
                    </Card> 
                </div>  

                <NotificationBox 
                    notifs={volatile} 
                    onCloseNotif={remove}
                    type={"snackbar"}

                />

                {/* <NotificationBox 
                    notifs={sticky}
                    onCloseNotif={remove}
                /> */}
            </>
            
        );
    }
}

TestNotifs.propTypes = {

};

export default withStores(["notificationStore"])(TestNotifs);