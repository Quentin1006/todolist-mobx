import React, { Component } from 'react';

import { inject } from "mobx-react";

const mapStateToProps = ({store}) => {
    const { logIn } = store.userStore;
    return {
        logIn
    }
}


export default ComponentToWrap => {
    return inject(mapStateToProps)(
        class extends Component {
            async componentDidMount(){
                const { logIn } = this.props;
                await logIn();
            }

            render(){
                return (
                    <ComponentToWrap {...this.props}/>
                )
            }
        }
    )
}