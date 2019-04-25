import React, { Fragment } from 'react';

import { inject } from "mobx-react";

import { Loader } from "../Loader"; 

const mapStateToProps = (storeName) => {
    return ({store}) => ({
        isLoading: store[storeName].isLoading
    })
}


export default storeName => {
    return (ComponentToWrap) => {
        return inject( mapStateToProps(storeName) )( ({isLoading, ...rest}) => {
            return (
                <Fragment>
                    {isLoading 
                    ? <Loader /> 
                    : <ComponentToWrap 
                        {...rest}
                    />}
                </Fragment>
            )
        })
    }
}
