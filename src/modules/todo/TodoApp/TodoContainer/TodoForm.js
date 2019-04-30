import React, { Component } from 'react';
import PropTypes from "prop-types";
import { observer } from 'mobx-react';

import { 
    TextInput, 
    CalendarInput, 
    Notification, 
    ButtonIcon 
} from "../../../../components";


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
        const { inputs, createTodo } = this.props;
        const [ todoTaskInput, todoDateInput ] = inputs;

        const {error, todo } = createTodo({
            task: todoTaskInput.value,
            deadline: this._asTimestamp(todoDateInput.value)
        });

        if(error && error.task){
            return todoTaskInput.setError(error.task);
        }

        if(error && error.date){
            return todoDateInput.setError(error.date)
        }

        inputs.forEach(input => {
            input.reset();
        })
       
        return todo;

    }

    render() {
        const { inputs } = this.props;
        const [ todoTaskInput, todoDateInput ] = inputs 

        return (
            <div className="todo-form-wrapper">
                {inputs.map(input => {
                    return (
                        input.error &&
                        <Notification 
                            key={input.id}
                            level="error"
                            message={input.error}
                            onClose={input.reset}
                            classes={"todo-task-error"}
                        /> 
                    )
                })}
                    
                <form name={FORM_NAME} className="todo-form" noValidate>
                    <div className="todo-task todo-input">
                        <label htmlFor={TODO_TASK_ID}>Task:
                        <TextInput 
                            id={TODO_TASK_ID}
                            onChange={todoTaskInput.setValue}
                            value={todoTaskInput.value}
                            placeholder={"Enter your task..."}
                        />
                        </label>
                    </div>
                    <div className="todo-date todo-input">
                        <label htmlFor={TODO_DATE_ID}>Deadline:
                        <CalendarInput 
                            id={TODO_DATE_ID}
                            onChange={todoDateInput.setValue}
                            icon="calendar-alt"
                            value={todoDateInput.value}
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
            </div>
        );
    }
}

TodoForm.propTypes = {
    inputs: PropTypes.array.isRequired
}

export default TodoForm;