import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../components';
import uniqid from "uniqid";

class EditableLabel extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEditing: props.isEditing,
            value: props.label,
            hasError: false,
            id: uniqid()
        }
    }


    componentDidUpdate(prevProps){
        const { label } = this.props;
        if(prevProps.label !== label){
            this.setState({value: label});
        }
        
    }   


    handleBlur = () => {
        const { value } = this.state;
        this.handleEdit(value);
    }


    handleEdit = (value) => {
        const { success, error } = this.props.onEdit(value);
        if(error){
            this.setState({hasError: true})
            return;  
        }
        this.setState({
            isEditing: false,
            hasError: false
        });
    }


    handleChange = (val) => {
        this.setState({value: val})
    }


    handleKeyPress = (ev) => {
        if(ev.key === "Enter"){
            this.handleEdit(this.state.value)
        }
    }


    switchToEdit = () => {
        const { isEditing } = this.props;
        if(!isEditing){
            this.setState({isEditing: true})
        }
    }


    render() {
        const { classes } = this.props;
        const { value, isEditing, id, hasError } = this.state
        return (
            <div 
                className={`${classes}`}
                onDoubleClick={this.switchToEdit}
            >
            {
                isEditing
                ? <TextInput 
                    id={id}
                    value={value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onKeyPress={this.handleKeyPress}
                    autoFocus
                    classes={hasError?"error": ""}
                  />
                : value
            }
                
            </div>
        );
    }
}

EditableLabel.defaultProps = {
    isEditing: false,
    classes:""
}

EditableLabel.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onEdit: PropTypes.func.isRequired,
    isEditing: PropTypes.bool,
    classes: PropTypes.string
};

export default EditableLabel;