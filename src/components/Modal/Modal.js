import { Component } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';


class Modal extends Component {
    constructor(props) {
        super(props);

        const isOpen = props.open ? "open" : "";

        // Parent of the modal and the backdrop
        this.container = document.createElement('div');
        this.container.className = `modal-container `+isOpen;

        // What contains the modal
        this.wrapper = document.createElement('div');
        this.wrapper.className = `modal-wrapper`;

        this.addCloseBtn(this.wrapper);

        // Backdrop behind the modal
        this.backdrop = document.createElement("div");
        this.backdrop.className = `modal-backdrop`;

        this.container.appendChild(this.backdrop);
        this.container.appendChild(this.wrapper);


        if(props.closeOnBackdrop){
            this.setAsModalCloser(this.backdrop);
        }

    }


    componentDidMount(){
        document.body.appendChild(this.container);        
    }


    componentWillUnmount() {
        document.body.removeChild(this.container);
    }


    addCloseBtn = (wrapper) => {

        const closeEl = document.createElement("a");
        closeEl.className = "modal-close-btn";
        closeEl.href = "#";
        closeEl.setAttribute("style", "position: absolute; right: 10px; top: 10px;");
        closeEl.innerHTML = "x";

        this.setAsModalCloser(closeEl);
        wrapper.appendChild(closeEl);
    }


    setAsModalCloser = (el) => {
        const { close } = this.props;
        el.addEventListener("click", (e) => {
            e.stopPropagation();
            close()
        })
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.wrapper
        )
    }
}

Modal.defaultProps = {
    closeOnBackdrop: true,
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    closeOnBackdrop: PropTypes.bool,
    children: PropTypes.any
};

export default Modal;