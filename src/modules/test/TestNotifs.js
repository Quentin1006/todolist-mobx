import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import withStores from "../../components/HOC/withStores";
import { ButtonIcon, Card, NotificationBox } from "../../components";


let id = 0;


@observer
class TestNotifs extends Component {

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


    render() {
        const { notificationStore } = this.props;
        const { remove, notifs } = notificationStore;
        const { volatile, sticky } = notifs.global
        return (
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

                    {/* SANS CETTE LIGNE notif N'EST PAS UPDATE */}
                    <div style={{display: "none"}}>
                    <div>{notifs.global.volatile.reduce((acc, notif) => (acc + " " + notif.id), "")}</div>
                    <div>{notifs.global.sticky.reduce((acc, notif) => (acc + " " + notif.id), "")}</div>
                    </div>
                </fieldset>

                <NotificationBox 
                    notifs={volatile} 
                    onCloseNotif={remove}
                    type={"snackbar"}
                />

                {/* <NotificationBox 
                    notifs={sticky}
                    onCloseNotif={remove}
                /> */}
            </Card> 
            </div>
        );
    }
}

TestNotifs.propTypes = {

};

export default withStores(["notificationStore"])(TestNotifs);