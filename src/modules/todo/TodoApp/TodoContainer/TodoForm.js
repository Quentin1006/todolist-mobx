import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { TextInput, CalendarInput } from "../../../../components/Input";
import ButtonIcon from "../../../../components/Button/ButtonIcon";


const TODO_TASK_ID = "todo-task";
const TODO_DATE_ID = "todo-date";
const FORM_NAME = "todo-form";

@observer
class TodoForm extends Component {
    _asTimestamp = (dat) => {
        dat = dat.split("-");
        return (new Date(dat[1]+"/"+dat[2]+"/"+dat[0])).getTime();
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        console.log("event type: ", e.type);
        const { taskInput, dateInput, onSubmit } = this.props;
        onSubmit({
            task: taskInput,
            deadline: this._asTimestamp(dateInput)
        });

        return false;

    }

    render() {
        const { 
            taskInput, 
            dateInput, 
            updateTaskInput, 
            updateDateInput 
        } = this.props;


        return (
            <form name={FORM_NAME} className="todo-form" noValidate>
                <div className="todo-task todo-input">
                    <label htmlFor={TODO_TASK_ID}>Task:
                    <TextInput 
                        id={TODO_TASK_ID}
                        onChange={updateTaskInput}
                        value={taskInput}
                        placeholder={"Enter your task..."}
                    />
                    </label>
                </div>
                <div className="todo-date todo-input">
                    <label htmlFor={TODO_DATE_ID}>Deadline:
                    <CalendarInput 
                        id={TODO_DATE_ID}
                        onChange={updateDateInput}
                        icon="calendar-alt"
                        value={dateInput}
                        placeholder={"Enter the deadline"}
                    />
                    </label>
                </div>
                <div className="todo-submit">
                    <ButtonIcon 
                        icon={"plus"} 
                        action={this.onHandleSubmit}
                        value="Ajouter"
                    />
                </div>
                
            </form>
        );
    }
}

export default TodoForm;