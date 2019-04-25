import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NotificationBase from './NotificationBase';


class Notification extends Component {

    render() {
        const { type, message, icon, onClose } = this.props;
        return (
            <NotificationBase 
                onClose={onClose}
                message={message}
                icon={icon}
                type={type}
                classes={"notification"}
            />
        );
    }
}

Notification.defaultProps = {

}

Notification.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onClose: PropTypes.func.isRequired,

};

export default Notification;