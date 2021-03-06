import { observable, computed, action } from "mobx"
import Todo from "../models/Todo";

import { arrayMoveMutate } from "../utils";

import config from "../config";

const { MIN_TASK_LENGTH, msg } = config.Todo


class TodoStore {
    rootStore;
    httpService; // service to communicate with the server for todos
    autoSave = false;
    taskList = new Set(); // stores only the tasks

    @observable todos = [];
    @observable isLoading = false;
    @observable lastDeleted = null;
    @observable isSyncWithServer = false;



    constructor(rootStore, httpService){
        this.rootStore = rootStore;
        this.httpService = httpService;
    }


    @action.bound
    load = async () => {
        this.isLoading = true;
        const fetched = await this.httpService.fetchTodos();

        this.todos = fetched.map(todo => {
            this.taskList.add(todo.task);
            return this._instantiateTodo(todo);
        });

        this.isLoading = false;
    }

    _instantiateTodo = (todo) => {
        return new Todo(todo, this.taskList)
    }

    
    @action.bound
    create = ({task, deadline=0}) => {
        if(task.length <= MIN_TASK_LENGTH){
            return {error: {task: msg.TASK_IS_TOO_SHORT}};
        }

        if(this.taskList.has(task)){
            return {error: {task: msg.TASK_ALREADY_EXIST}};
        }
        
        const infos = {task, deadline};
        const todo = this._instantiateTodo(infos);

        this.todos.unshift(todo);
        this.taskList.add(task);

        this.isSyncWithServer = false;

        if(this.autoSave){
            this.sync()
        }

        return {todo};

    }

    @action.bound
    edit = (todoId, newValue) => {
        throw new Error("Not implemented yet");
    }

    @action.bound
    remove = (todoId) => {
        let taskFound = false;
        this.todos = this.todos.filter(todo => {
            if(todo.id === todoId){
                this.lastDeleted = todo;
                this.taskList.delete(todo.task);
                taskFound = true;
                return false;
            }
            return true;
        });

        if(!taskFound){
            return {error:msg.TASK_INEXISTANT};
        }

        return this.lastDeleted;
    }

    @action.bound
    reorder = (oldIdx=0, newIdx=0) => {
        arrayMoveMutate(this.todos, oldIdx, newIdx);
    }

    @action.bound
    clearAll = () => {
        return this.todos = [];
    }


    sync = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {resolve()}, 2000);
        })
    }



}

export default TodoStore;