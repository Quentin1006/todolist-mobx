import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import PropTypes from 'prop-types';


class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            in: props.isOpen
        }
    }

    exitComponent = () => {
        this.setState({in: false});
    }

    handleClose = () => {
        this.props.close();
    }

    renderModal = () => {
        const { isOpen, closeOnBackdrop, children } = this.props;
        return (
            <CSSTransition
                in={this.state.in}
                timeout={400}
                appear
                unmountOnExit
                classNames="modal-slide"
                onExited={this.handleClose}
            >
                <div className={`modal-container ${isOpen?"open":""}`}>
                    <div className="modal-wrapper">
                        <a 
                            href="#" 
                            className="modal-close-btn"
                            style={{position: "absolute", right: "10px", top: "10px"}}
                            onClick={this.exitComponent}
                        >
                        x
                        </a>
                        {children}
                    </div>
                
                    <div 
                        className="modal-backdrop" 
                        onClick={closeOnBackdrop && this.exitComponent}
                    >
                    </div>
                </div>
            </CSSTransition>
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

export default Modal;