import React, { Component, Fragment } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { observer } from 'mobx-react';

// HOC
import withLoader from '../../../../components/HOC/withLoader';

// Components
import { Card } from "../../../../components/Card";
import TodoItem from "./TodoList/TodoItem";



const SortableItem = SortableElement(TodoItem);

const SortableList = SortableContainer(({children}) => (
    <Fragment>{children}</Fragment>
))


@observer
class TodoList extends Component {

    render() {
        const { todos, deleteTodo, reorderTodos } = this.props;
        const onSortEnd = ({oldIndex, newIndex}) => {
            reorderTodos(oldIndex, newIndex);
        };

        return (
            <Card classes="todo-list">
                <SortableList 
                    onSortEnd={onSortEnd} 
                    lockAxis={"y"} 
                    distance={5}
                    helperClass="sortable-helper"
                >
                    <ul>
                        {todos.map((todo, idx) => (
                            <SortableItem 
                                key={todo.id}
                                index={idx} 
                                deleteTodo={deleteTodo}
                                todo={todo}
                            />
                        ))}
                    </ul>
                </SortableList>
            </Card>
        );
    }
}

TodoList.defaultProps = {
    todos: []
}



export default withLoader("userStore")(TodoList);