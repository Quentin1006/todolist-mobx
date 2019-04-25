import React from 'react';
import PropTypes from "prop-types"

import { Icon } from "../Icon";

const ButtonIcon = ({action, icon, value, children, ...rest}) => {
    const hasText = !!(value || children);
    return (
        <button className="btn-icon" onClick={action} {...rest}>
            <div className="btn-value-container">
                <Icon icon={icon}/>
                {
                    hasText &&
                    <div className="btn-value">{value ? value : children}</div>

                }
                
            </div>
        </button>
    )
}


ButtonIcon.propTypes = {
    action: PropTypes.func.isRequired,
    icon: PropTypes.any.isRequired,
    value: PropTypes.any,
    children: PropTypes.any
}


export default ButtonIcon;