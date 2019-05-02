import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

import withCSSTransition from "../HOC/withCSSTransition";

class Modal extends Component {
    renderModal = () => {
        const { isOpen, close, closeOnBackdrop, children } = this.props;
        return (
            <div className={`modal-container ${isOpen?"open":""}`}>
                <div className="modal-wrapper">
                    <a 
                        href="#" 
                        className="modal-close-btn"
                        style={{position: "absolute", right: "10px", top: "10px"}}
                        onClick={close}
                    >
                    x
                    </a>
                    {children}
                </div>
            
                <div 
                    className="modal-backdrop" 
                    onClick={closeOnBackdrop && close}
                >
                </div>
            </div>
        )
    }


    render() {
        return ReactDOM.createPortal(
            this.renderModal(),
            document.body
        )
    }
}

Modal.defaultProps = {
    closeOnBackdrop: true,
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    closeOnBackdrop: PropTypes.bool,
    children: PropTypes.any
};

export default withCSSTransition({
    timeout:400,
    appear: true,
    unmountOnExit: true,
    classNames:"modal-slide"
})(Modal);