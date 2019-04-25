import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import Snackbar from "./Snackbar";
import { prototype } from 'events';


const getTypeOfNotif = (type) => {
    switch(type){
        case "snackbar":
            return Snackbar;
        case "regular":
        default:
            return Notification;
    }
}

class NotificationBox extends Component {

    constructor(props){
        super(props);
        this.typeOfNotif = getTypeOfNotif(props.type);
    }


    handleCloseNotif = id => {
        const { onCloseNotif } = this.props;
        return () => {
            onCloseNotif(id)
        }
    }
    render() {
        const { notifs, type, maxNotifs } = this.props;
        const from = Math.max(notifs.length - maxNotifs, 0);
        const notifsToDisplay = notifs.slice(from);
        
        const Notif = this.typeOfNotif;
        const typeClass = type === "snackbar" ? "snackbar" : "notification";

        return (
            <div className={`${typeClass}-container`}>
                {notifsToDisplay.map(({content, date=0, expire=0, id}) => (
                    <Notif
                        date={date}
                        message={content}
                        ttl={expire}
                        onClose={this.handleCloseNotif(id)}
                        key={id}
                    />
                ))}
            </div>
        );
    }
}


NotificationBox.defaultProps = {
    maxNotifs: 3
}


NotificationBox.propTypes = {
    maxNotifs: PropTypes.number,
    onCloseNotif: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["snackbar", "regular"]),
    notifs: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.string,
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ).isRequired,
};

export default NotificationBox;