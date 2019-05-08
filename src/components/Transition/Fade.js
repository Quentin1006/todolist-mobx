import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from "react-transition-group";

import "./Fade.scss";

class Fade extends Component {
    constructor(props){
        super(props);
    }

    handleEnter = () => {
        const { onEnter } = this.props;

        if(onEnter){
            onEnter();
        }
        
    }


    handleEntered = () => {

    }


    handleExit = () => {
    }


    handleExited = () => {
        const { onExited } = this.props;
        if(onExited){
            onExited();
        }
    }


    render() {
        const { 
            in: inProp,
            children
        } = this.props;
        return (
            <CSSTransition
                in={inProp}
                timeout={400}
                appear
                mountOnEnter
                unmountOnExit
                classNames={`anim-fade`}
                onEnter={this.handleEnter}
                onExited={this.handleExited}
                onEntered={this.handleEntered}
                onExit={this.handleExit}
            >
                {children}
                
            </CSSTransition>
        );
    }
}


Fade.propTypes = {
    in: PropTypes.bool,
}

export default Fade;