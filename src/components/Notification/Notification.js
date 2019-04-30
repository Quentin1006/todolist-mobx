import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NotificationBase from './NotificationBase';


class Notification extends Component {

    render() {
        const { level, message, icon, onClose, classes } = this.props;
        return (
        <NotificationBase 
                onClose={onClose}
                message={message}
                icon={icon}
                level={level}
                classes={`${classes} notification`}
            />
        );
    }
}

Notification.defaultProps = {

}

Notification.propTypes = {
    level: PropTypes.string,
    message: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onClose: PropTypes.func.isRequired,

};

export default Notification;