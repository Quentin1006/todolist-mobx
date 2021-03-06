import React, { Component } from 'react';
import PropTypes from 'prop-types';
import format from "date-fns/format";

import {ButtonIcon, CheckboxInput, EditableLabel } from "../../../../../components";
import { observer } from 'mobx-react';


@observer
class TodoItem extends Component {
    onDeleteBtn = (e) => {
        const { deleteTodo } = this.props;
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        deleteTodo(id);

    }


    
    render() {
        const { todo } = this.props;
        const colorInGreen = todo.completed ? "color-in-green" : "";
        const formattedDeadline = format(todo.deadline, 'DD/MM/YYYY');
        const deadlineClass = todo.status;
        
        return (
            <li className={`todo-item ${colorInGreen}`}>
                <div className="todo-checkbox">
                    <CheckboxInput  
                        id={String(todo.id)}
                        checked={todo.completed}
                        value={todo.completed} 
                        onChange={todo.toggleComplete}
                    />
                </div>
                <EditableLabel 
                    classes={"todo-task todo-cell"}
                    label={todo.task}
                    onEdit={todo.edit}
                />
                <div className={`todo-deadline todo-cell ${deadlineClass}`}>{formattedDeadline} </div>
                <div className="todo-delete">
                    <ButtonIcon 
                        action={this.onDeleteBtn}
                        data-id={todo.id}
                        icon={"times-circle"}
                    />
                </div>            
            </li>
        );
    }
}


TodoItem.propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.any.isRequired,
        deadline: PropTypes.number,
        task: PropTypes.string.isRequired
    })
};

export default TodoItem;