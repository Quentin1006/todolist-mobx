import React, { Component } from 'react';
import PropTypes from "prop-types";

import { observer } from 'mobx-react';

import WelcomeMessage from "./TodoContainer/WelcomeMessage";
import TodoForm from "./TodoContainer/TodoForm";
import TodoList from "./TodoContainer/TodoList";
import { Modal, ModalTitle, ButtonIcon } from "../../../components";

import config from "../../../config";

const { OPEN_MODAL, HALLO_MODAL } = config;



@observer
class TodoContainer extends Component {
    async componentDidMount(){
        const { todoStore } = this.props;
        await todoStore.load();
    }

    render() {
        const { userStore, uiStore, todoStore, notificationStore } = this.props;
        const { firstName } = userStore;
        const { 
            todoDateInput, 
            todoTaskInput, 
            modal,
        } = uiStore;

        const { todos, create, remove, reorder, toggleComplete } = todoStore;


        return (
            <section className="todo-container">
                <WelcomeMessage name={firstName}/>
                <TodoForm 
                    inputs={[todoDateInput, todoTaskInput]} 
                    createTodo={create}
                />

                <TodoList 
                    todos={todos} 
                    deleteTodo={remove} 
                    reorderTodos={reorder}
                    completeTodo={toggleComplete}
                    addNotif={notificationStore.add}
                />

                <ButtonIcon 
                    value={OPEN_MODAL}
                    action={modal.open}
                    icon="plus"
                />

                {modal.isOpen &&
                <Modal
                    isOpen={modal.isOpen}
                    close={modal.close}
                >
               
                    <ModalTitle>{HALLO_MODAL}</ModalTitle>
                    <ButtonIcon
                        icon={"plus"}
                        value={"CLOSE"}
                        action={modal.close}
                    />                
                </Modal>}
            </section>
        );
    }
}


TodoContainer.propTypes = {
    userinfo: PropTypes.shape({
        id: PropTypes.any.isRequired,
        getId: PropTypes.func.isRequired,
        getFirstName: PropTypes.func.isRequired
    })
}

export default TodoContainer;