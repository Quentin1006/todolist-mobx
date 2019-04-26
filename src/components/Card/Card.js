import React from 'react';
import PropTypes from "prop-types";

import "./card.scss";

class Card extends React.Component {
    render(){
        const { children, classes, ...rest } = this.props;

        return (
            <div {...rest} className={`card ${classes}`}>
                {children}
            </div>
        )
    }
}

Card.defaultProps = {
    classes:""
}

Card.propTypes = {
    classes: PropTypes.string
}

export default React.memo(Card);