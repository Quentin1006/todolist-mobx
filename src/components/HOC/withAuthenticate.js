import React, { Component } from 'react';
import { inject } from "mobx-react";


const mapStateToProps = ({store}) => {
    const { logIn, rememberme, sessionIsExpired, logOut }  = store.userStore;
    return {
        logIn, 
        rememberme,
        sessionIsExpired,
        logOut
    };
}


export default ComponentToWrap => {
    return inject(mapStateToProps)(
        
        class extends Component {
            
            componentDidMount(){
                this.verifyIfSessionExpired();
            }
    
    
            componentDidUpdate(){
                this.verifyIfSessionExpired();
            }

            verifyIfSessionExpired = () => {
                const { sessionIsExpired, logOut } = this.props;
                if(sessionIsExpired){
                    logOut();
                }
            }
    
    
            render(){
                return (
                    <ComponentToWrap {...this.props}/>
                )
            }
        }
    )
}