import React from 'react';

import { inject } from "mobx-react";


const mapStateToProps = ({store}) => ({
    Todos: store.todoStore
})


export default ComponentToWrap => {
    return inject(mapStateToProps)(({Todos, ...rest}) => (
        <ComponentToWrap 
            {...rest}
            Todos={Todos}
        />
    ))
}
