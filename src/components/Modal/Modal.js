import React, { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';


class Modal extends Component {
    renderModal = () => {
        const { close, closeOnBackdrop, children, classes } = this.props;
        return (
            <div className={`modal-container ${classes}`}>
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
    close: PropTypes.func.isRequired,
    closeOnBackdrop: PropTypes.bool,
    children: PropTypes.any,
    classes: PropTypes.string
};

export default Modal;