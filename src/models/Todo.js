import { observable, computed, action } from "mobx";

import config from "../config";

const { SECONDS_IN_DAY, status } = config.Todo;
const { ALERT, WARNING, OK } = status;

class Todo {
    @observable id = null;
    @observable completed= false;
    @observable task = "";
    @observable deadline = null;
    

    @computed 
    get pastDeadline(){
        return this.deadline && this.deadline < Date.now();
    }

    @computed 
    get status(){
        if(this.pastDeadline){
            return ALERT;
        }
        else if(this.closeToDeadline){
            return WARNING;
        }
        else {
            return OK;
        }
    }


    @computed 
    get closeToDeadline(){
        if(!this.deadline)
            return false;

        const timeLeft = this.deadline - Date.now();
        return timeLeft > 0 && timeLeft < SECONDS_IN_DAY;
    }


    constructor({id=Date.now(), task, deadline=0, completed=false, authorId=null}){

        this.id = id;
        this.task = task;
        this.completed = completed
        this.deadline = deadline;
        this.authorId= authorId;
    }


    get = () => {
        return {
            id: this.id,
            completed: this.completed,
            task: this.task,
            deadline: this.deadline,
            authorId: this.authorId
        }
    }


    @action.bound
    toggleComplete(){
        this.completed = !this.completed;
        return this.completed;
    }
}


export default Todo;