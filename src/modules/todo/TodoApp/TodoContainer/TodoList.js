import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { observer } from 'mobx-react';
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
                        <TransitionGroup component={"ul"}>
                            {todos.map((todo, idx) => (
                                <CSSTransition
                                    key={todo.id}
                                    timeout={400}
                                    classNames={"anim-todoitem"}
                                    onEnter={()=>console.log("Enter")}
                                    onEntering={()=>console.log("Entering")}
                                    onEntered={()=>console.log("Entered")}
                                >
                                    <SortableItem 
                                        index={idx} 
                                        deleteTodo={deleteTodo}
                                        todo={todo}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </SortableList>
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