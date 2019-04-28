import { observable, computed, action } from "mobx";
import Modal from "../models/Modal";


class UiStore {
    @observable theme = "basic";
    @observable language = "fr_FR";
    @observable pendingRequest = 0;
    
    @observable todoTaskInput = "";
    @observable todoDateInput = "";

    @observable loginIdentifierInput = "";
    @observable loginError = "";


    modal = new Modal();

    @observable.struct windowDimensions = {
        width: window.outerWidth,
        height: window.outerHeight
    }


    @computed 
    get appIsSync(){
        return this.pendingRequest === 0;
    }

    
    @action.bound
    setLoginIdentifier = (identifier) => {
        this.loginIdentifierInput = identifier;
        console.log(this.loginIdentifierInput);
    }


    @action.bound
    setLoginError = (errMsg) => {
        this.loginError = errMsg
    } 


    @action.bound
    updateTaskInput = (val) => {
        this.todoTaskInput = val;
    }


    @action.bound
    updateDateInput = (date) => {
        this.todoDateInput = date;
    }
}

export default UiStore;