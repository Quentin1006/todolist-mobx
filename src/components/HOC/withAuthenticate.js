import React, { Component } from 'react';
import { inject } from "mobx-react";


const mapStateToProps = ({store}) => {
    const { logIn, logInFromSessId, rememberme, sessionIsExpired, logOut }  = store.sessionStore;
    const { setUser } = store.userStore;
    return {
        logIn,
        logInFromSessId,
        rememberme,
        sessionIsExpired,
        logOut,
        setUser
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