import React, { Component } from 'react';
import PropTypes from "prop-types";

import { observer } from 'mobx-react';

import WelcomeMessage from "./TodoContainer/WelcomeMessage";
import TodoForm from "./TodoContainer/TodoForm";
import TodoList from "./TodoContainer/TodoList";
import ButtonIcon from '../../../components/Button/ButtonIcon';
import { Modal, ModalTitle } from "../../../components/Modal";



@observer
class TodoContainer extends Component {
    async componentDidMount(){
        const { todoStore } = this.props;
        await todoStore.load();
    }

    render() {
        const { userStore, uiStore, todoStore } = this.props;
        const { firstName } = userStore;
        const { 
            todoDateInput, 
            todoTaskInput, 
            updateTaskInput, 
            updateDateInput,
            modal,
            openModal,
            closeModal
        } = uiStore;

        const { todos, create, remove, reorder, toggleComplete } = todoStore;


        return (
            <section className="todo-container">
                <WelcomeMessage name={firstName}/>
                <TodoForm 
                    dateInput={todoDateInput} 
                    taskInput={todoTaskInput}
                    updateTaskInput={updateTaskInput}
                    updateDateInput={updateDateInput}
                    onSubmit={create}
                />

                <TodoList 
                    todos={todos} 
                    deleteTodo={remove} 
                    reorderTodos={reorder}
                    completeTodo={toggleComplete}
                />

                <ButtonIcon 
                    value={"OPEN MODAL"}
                    action={openModal}
                    icon="plus"
                />

                {
                    modal.open &&
                    <Modal
                        open={modal.open}
                        close={closeModal}
                    >
                        <ModalTitle>Hallo Modal</ModalTitle>
                    </Modal>
                }
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