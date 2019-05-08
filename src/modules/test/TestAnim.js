import React, { Component } from 'react';
import { observer } from 'mobx-react';


import Slide from "../../components/Transition/Slide"
import { ButtonIcon, Snackbar, Notification } from "../../components";
import Fade from '../../components/Transition/Fade';


@observer
class TestAnim extends Component {
    state = {
        isOpen: false,
        secIsOpen: true,
        showBg: true
    }
    
    open = () => {
        this.setState({isOpen: true})
    }

    close = () => {
        this.setState({isOpen: false})

    }

    closeSec = () => {
        this.setState({secIsOpen: false})
    }

    removeBg = () => {
        this.setState({showBg: false});
    }


    addBg = () => {
        this.setState({showBg: true})
    }

    render() {
        return (
            <div style={{background: this.state.showBg ? "red" : "transparent", minHeight: "100px"}}>
                <div style={{
                    textAlign: "center", 
                    margin:"50px auto", 
                    width: "320px",
                }}>
                    <ButtonIcon
                        icon="plus"
                        action= {this.open}
                        value={"OPEN SNACKBAR/NOTIF"}
                    />
                    <Slide 
                        in={this.state.isOpen}
                        from="left"
                        onEnter={this.addBg}
                        onExited={this.removeBg}
                    >
                        <Snackbar 
                            message="Hello im a notifiaction"
                            onClose={this.close}
                        />
                    </Slide>
                    <Fade in={this.state.isOpen}>
                        <Notification
                            message={"Hello Im a notificaiton"}
                            onClose={this.close}
                        />
                    </Fade>

                    <Fade in={this.state.secIsOpen}>
                        <Notification
                            message={"Hello Im a the second notif"}
                            onClose={this.closeSec}
                        />
                    </Fade>
                </div>  
            </div>
            
        );
    }
}



export default TestAnim;