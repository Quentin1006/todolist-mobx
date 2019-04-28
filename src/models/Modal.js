import { observable, action } from "mobx";

class Modal {
    @observable isOpen = false;

    @action.bound
    open = () => {
        this.isOpen = true;
    }


    @action.bound
    close = () => {
        this.isOpen = false;
    }

}

export default Modal;