import { observable, action } from "mobx";
import uniqid from "uniqid";


class Input {
    @observable id = uniqid();
    @observable value = "";
    @observable error = "";


    @action.bound
    setError = (err) => {
        this.error = err;
    }


    @action.bound
    setValue = (val) => {
        this.value = val;
    } 


    @action.bound 
    reset = () => {
        this.value = "";
        this.error = "";
    }
}

export default Input;