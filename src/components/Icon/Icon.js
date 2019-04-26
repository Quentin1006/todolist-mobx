import React, { memo } from "react";
import PropTypes from "prop-types";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as faIcons from '@fortawesome/free-solid-svg-icons';

// import all icons at once
const icons = Object.keys(faIcons).slice(2).map(iconName => faIcons[iconName]);
library.add(
    ...icons
)

const Icon = ({icon, style}) => {
    return (
        <FontAwesomeIcon icon={icon} style={style}/>
    )
}

Icon.defaultProps = {
    style: {}
}

Icon.propTypes = {
    icon: PropTypes.string.isRequired
}

export default memo(Icon);