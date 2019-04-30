import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, IconMapper } from "../Icon";

// DEPENDS ON FONTAWESOME ICONS NAME
const ICONS = {
    info: "info-circle",
    warning: "exclamation-triangle",
    error: "times",
    success: "check-circle"
}


class NotificationBase extends Component {
    handleClose = (e) => {
        e.preventDefault();
        this.props.onClose();
    }


    render() {
        const { level, message, icon, classes } = this.props;
        const iconName = icon ? icon : ICONS[level];
        return (
            <div className={`notification-base ${level} ${classes}`} >
               <div className="icon">
                    <Icon icon={iconName}/>
                </div>
                <div className="vertical-splitter"></div>
                <div className="content">{message}</div>
                <div className="close"><a href="#" onClick={this.handleClose}>x</a></div>
            </div>
        );
    }
}


NotificationBase.defaultProps = {
    level: "info",
    classes: ""
}

NotificationBase.propTypes = {
    level: PropTypes.oneOf(["error", "warning", "info", "success"]),
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    icon: PropTypes.string
};

export default NotificationBase;