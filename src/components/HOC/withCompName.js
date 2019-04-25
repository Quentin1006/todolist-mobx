import React, { Component } from 'react';

// NE MARCHE PAS
export default (ComponentToWrap) => {
    return class withCompName extends Component {
        getDisplayName = (ComponentToWrap) => {
            return ComponentToWrap._reactInternalFiber.elementType.name;
        };

        render() {
            const compName = this.getDisplayName();
            return (
                <ComponentToWrap {...this.props} componentName={compName}/>
            );
        }
    }
}
