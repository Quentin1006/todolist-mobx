import React, { Component } from 'react';
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { TransitionGroup } from "react-transition-group";
import { observer } from 'mobx-react';

// HOC
import withLoader from '../../../../components/HOC/withLoader';

// Components
import { Card } from "../../../../components";
import TodoItem from "./TodoList/TodoItem";
import { Fade } from "../../../../components/Transition"


const SortableItem = SortableElement(TodoItem);

const SortableList = SortableContainer(({children}) => (children))


@observer
class TodoList extends Component {

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.reorderTodos(oldIndex, newIndex);
    };

    renderList = (todos, deleteTodo) => (
        <SortableList 
            onSortEnd={this.onSortEnd} 
            lockAxis={"y"} 
            distance={5}
            helperClass="sortable-helper"
        >
            <TransitionGroup component={"ul"}>
            {todos.map((todo, idx) => (
                <Fade key={todo.id}>
                <SortableItem 
                    index={idx} 
                    deleteTodo={deleteTodo}
                    todo={todo}
                />
                </Fade>
                
            ))}
            </TransitionGroup>
        </SortableList> 
    )

    render() {
        const { todos, deleteTodo } = this.props;

        return (
            
            <Card classes="todo-list">
                {todos.length > 0 
                ? this.renderList(todos, deleteTodo)
                : "No task yet..."}    
            </Card>
            
        );
    }
}


TodoList.defaultProps = {
    todos: []
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired
}



export default withLoader("userStore")(TodoList);