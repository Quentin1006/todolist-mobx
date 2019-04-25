import React, { PureComponent } from 'react';
import PropTypes from "prop-types";

const sizeMapper = ["small", "medium", "large"];

import "./loader.scss";

class Loader extends PureComponent {
    render() {
        const { size } = this.props;
        return (
            <div className={`loader ${sizeMapper[size]}`}>
            </div>
        );
    }
}

Loader.defaultProps = {
    size: 1
}

Loader.propTypes = {
    size: PropTypes.oneOf([0, 1, 2])
}


export default Loader;