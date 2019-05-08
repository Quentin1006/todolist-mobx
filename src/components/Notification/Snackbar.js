import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from "../Card"; 
import NotificationBase from './NotificationBase';


class Snackbar extends Component {

    constructor(props){
        super(props);
        this.timeoutId =  null;
    }
    
    autoDestruct = () => {
        let { ttl } = this.props;
        if(ttl < 999){
            // So the user can set time in sec
            ttl = ttl*1000;
        }
        this.timeoutId = setTimeout(this.handleClose, ttl)
    }


    componentDidMount(){
        if(this.props.ttl){
            this.autoDestruct();
        }
    }


    handleClose = () => {
        if(this.timeoutId){
            clearTimeout(this.timeoutId)
            this.timeoutId = null;
        }
        this.props.onClose();

    }


    render() {
        const { icon, message, classes, ...rest } = this.props; 
        return (
            <Card classes={`${classes}`}>
                <NotificationBase 
                    {...rest}
                    onClose={this.handleClose}
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