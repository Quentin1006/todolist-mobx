import React from 'react';

import { inject } from "mobx-react";


const mapStateToProps = ({store}) => ({
    userProps: store.userStore
})


export default ComponentToWrap => {
    return inject(mapStateToProps)(({userProps, ...rest}) => (
        <ComponentToWrap 
            {...rest}
            User={userProps}
        />
    ))
}



