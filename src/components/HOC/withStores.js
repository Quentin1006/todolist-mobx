import React from 'react';

import { inject } from "mobx-react";


const requestStores = storesRequested => {
    return ({store}) => (
        storesRequested.reduce((obj, storeName) => {
            return {
                ...obj,
                [storeName]: store[storeName]
            }
        }, {})
    )
}

export default storesRequested => {
    storesRequested = Array.isArray(storesRequested) ? storesRequested : [storesRequested]
    const mapStateToProps = requestStores(storesRequested);

    return (ComponentToWrap) => {
        return inject(mapStateToProps)(({storesRequested, ...rest}) => (
            <ComponentToWrap 
                {...rest}
                {...storesRequested}
            />
        ))
    }

}