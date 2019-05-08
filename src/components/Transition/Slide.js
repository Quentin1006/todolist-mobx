import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from "react-transition-group";

import "./Slide.scss";

class Slide extends Component {
    constructor(props){
        super(props);

        this.bodyOverflow = null;
        console.warn("Slides from right and bottom have a glitch")
    }

    handleEnter = () => {
        const { onEnter } = this.props;
        // this.bodyOverflow = document.body.style.overflow;
        // document.body.style.overflow = "hidden";
        
        if(onEnter){
            onEnter();
        }
        
    }


    handleEntered = () => {

        //document.body.style.overflow = this.bodyOverflow;
    }


    handleExit = () => {
        // this.bodyOverflow = document.body.style.overflow;
        // document.body.style.overflow = "hidden";


    }


    handleExited = () => {
        const { onExited } = this.props;

        //document.body.style.overflow = this.bodyOverflow;
        
        if(onExited){
            onExited();
        }
        
    }


    render() {
       
        const { 
            in: inProp,
            from,
            children
        } = this.props;
        return (
            <CSSTransition
                in={inProp}
                timeout={400}
                appear
                mountOnEnter
                unmountOnExit
                classNames={`anim-slide-${from}`}
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


Slide.defaultProps = {
    from: "left"
}

Slide.propTypes = {
    in: PropTypes.bool,
    from: PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired
};

export default Slide;