import React from 'react';

import { inject } from "mobx-react";


const mapStateToProps = ({store}) => ({
    uiState: store.uiStore
})


export default ComponentToWrap => {
    return inject(mapStateToProps)(({uiState, ...rest}) => (
        <ComponentToWrap 
            {...rest}
            uiState={uiState}
        />
    ))
}
