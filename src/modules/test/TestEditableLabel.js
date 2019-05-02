import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditableLabel } from '../../components/Label';

class TestEditableLabel extends Component {
    render() {
        return (
            <div>
                <EditableLabel 
                    label="hello"
                    onEdit={() => {console.log("edited")}}
                />
            </div>
        );
    }
}

TestEditableLabel.propTypes = {
};

export default TestEditableLabel;
