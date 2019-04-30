import React, { Component, Fragment } from 'react';
import { observer } from "mobx-react";

import withAuthenticate from "./HOC/withAuthenticate";


@observer
class Authenticate extends Component {

    async componentDidMount(){
        await this.authenticate(); 
    }

    
    authenticate = async () => {
        const { rememberme, setUser, logInFromSessId } = this.props;
        const { user, error } = rememberme ? await logInFromSessId() : {};
        if(user){
            setUser(user);
        }
        if(error){
            // Do something with error
        }
    }


    render(){
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}



export default withAuthenticate(Authenticate);