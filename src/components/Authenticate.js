import React, { Component, Fragment } from 'react';
import { inject, observer } from "mobx-react";


@observer
class Authenticate extends Component {

    async componentDidMount(){
        const { logIn } = this.props;
        await logIn();
    }

    render(){
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}

const mapStateToProps = ({store}) => {
    const {logIn} = store.userStore;
    return {logIn}
}


export default inject(mapStateToProps)(Authenticate);