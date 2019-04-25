import { observable, computed, action } from "mobx";


class UiStore {
    @observable theme = "basic";
    @observable language = "fr_FR";
    @observable pendingRequest = 0;
    @observable todoTaskInput = "";
    @observable todoDateInput = "";


    @observable.struct modal = {
        open: false,
    }

    @observable.struct windowDimensions = {
        width: window.outerWidth,
        height: window.outerHeight
    }


    @computed 
    get lastNotif(){
        return notifs.global.volatile[0];
    } 


    @computed 
    get appIsSync(){
        return this.pendingRequest === 0;
    }


    @action.bound
    updateTaskInput = (val) => {
        this.todoTaskInput = val;
    }


    @action.bound
    updateDateInput = (date) => {
        this.todoDateInput = date;
    }


    @action.bound
    openModal = () => {
        this.modal = {
            ...this.modal,
            open: true
        }
    }


    @action.bound
    closeModal = () => {
        this.modal = {
            ...this.modal,
            open: false
        }
    }


}

export default UiStore;