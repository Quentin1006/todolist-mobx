import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from "../Card"; 
import NotificationBase from './NotificationBase';
import withCSSTransition from "../HOC/withCSSTransition"


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
        this.props.close();

    }


    render() {
        const { icon, message, isOpen, classes, ...rest } = this.props; 
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
    close: PropTypes.func.isRequired,
    ttl: PropTypes.number
};

export default withCSSTransition({
    timeout:400,
    appear: true,
    unmountOnExit: true,
    classNames: "anim-snackbar"
})(Snackbar);