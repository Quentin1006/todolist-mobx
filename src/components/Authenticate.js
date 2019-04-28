import React, { Component, Fragment } from 'react';
import { observer } from "mobx-react";

import withAuthenticate from "./HOC/withAuthenticate";


@observer
class Authenticate extends Component {

    async componentDidMount(){
        await this.authenticate(); 
    }


    async componentDidUpdate(){
        await this.authenticate();
    }

    
    authenticate = async () => {
        const { rememberme, logIn } = this.props;
        if(rememberme){
            await logIn();
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