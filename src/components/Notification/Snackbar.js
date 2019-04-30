import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card } from "../Card"; 
import NotificationBase from './NotificationBase';


class Snackbar extends Component {

    constructor(props){
        super(props);
        this.timeoutId =  null;
    }

    onClose = () => {
        if(this.timeoutId){
            clearTimeout(this.timeoutId)
            this.timeoutId = null;
        }
        this.props.onClose();
    }

    
    autoDestruct = () => {
        let { ttl, onClose } = this.props;
        if(ttl < 999){
            // So the user can set time in sec
            ttl = ttl*1000;
        }
        this.timeoutId = setTimeout(onClose, ttl)
    }

    componentDidMount(){
        if(this.props.ttl){
            this.autoDestruct();
        }
    }


    render() {
        const { icon, message, isOpen, classes, ...rest } = this.props; 
        return (
            isOpen && 
            <Card classes={`${classes}`}>
                <NotificationBase 
                    {...rest}
                    onClose={this.onClose}
                    message={message}
                    icon={icon}
                    classes={"snackbar"}
                />
            </Card>    
        );
    }
}

Snackbar.defaultProps = {
    classes: "",
}

Snackbar.propTypes = {
    message: PropTypes.string,
    icon: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    ttl: PropTypes.number
};

export default Snackbar;