import { observable, computed, action } from "mobx";
import Modal from "../models/Modal";
import Input from "../models/Input";


class UiStore {
    @observable theme = "basic";
    @observable language = "fr_FR";
    @observable pendingRequest = 0;
    
    @observable todoTaskInput = new Input();
    @observable todoDateInput = new Input();
    @observable loginIdentifierInput = new Input();


    modal = new Modal();

    @observable.struct windowDimensions = {
        width: window.outerWidth,
        height: window.outerHeight
    }


    @computed 
    get appIsSync(){
        return this.pendingRequest === 0;
    }
}

export default UiStore;