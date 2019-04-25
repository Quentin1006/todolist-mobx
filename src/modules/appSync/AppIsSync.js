import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { observer } from 'mobx-react';

// HOC
import withUiState from "../../components/HOC/withUiState";

// Component
import { Loader, Card, Icon } from "../../components";


@observer
class AppIsSync extends Component {
    constructor(props){
        super(props)
        this.container = document.createElement("div");
        this.container.className = "app-sync";

    }


    componentDidMount(){
        document.body.appendChild(this.container);
    }


    componentWillUnmount(){
        document.body.removeChild(this.container)
    }


    renderAppSync = () => {
        const { appIsSync } = this.props.uiState;
        const text = appIsSync ? "App is sync:" : "Syncing"
        const containerClass =  appIsSync ? "is-hidden" : "is-visible"
        return (
            <Card classes={`app-sync ${containerClass}`} ref={this.appSyncCard}>
                <div className="text">{text}</div> 
                {appIsSync 
                ? <Icon icon="check-circle" style={{color: "green"}}/> 
                : <Loader size={0}/>}
            </Card>
        );
    }
    render() {
        return ReactDOM.createPortal(
            this.renderAppSync(),
            this.container
        )
    }
}

export default withUiState(AppIsSync);