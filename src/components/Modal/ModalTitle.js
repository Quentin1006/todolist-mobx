import React, { memo } from 'react';
import PropTypes from 'prop-types';


const ModalTitle = ({children, value}) => {
    const title = children ? children : value;
    return (
        <div className="modal-title">
            <h3>{title}</h3>
            <hr/>
        </div>
    )
}

ModalTitle.propTypes = {

};

export default memo(ModalTitle);