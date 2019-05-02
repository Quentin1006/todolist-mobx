import React from 'react';
import { CSSTransition } from "react-transition-group";
import PropTypes  from 'prop-types';


export default (CSSTransitionProps) => {
    return (ComponentToWrap) => {
        class C extends React.Component {
            constructor(props){
                super(props);
                this.state = {in: props.isOpen}
            }
            

            exitComponent = () => {
                this.setState({in: false});
            }
            
            handleClose = () => {
                const { close } = this.props; 
                close();
            }

            render(){
                return (
                    <CSSTransition 
                        {...CSSTransitionProps}
                        in={this.state.in}
                        onExited={this.handleClose}
                    >
                        <ComponentToWrap {...this.props} close={this.exitComponent}/>
                    </CSSTransition>
                    
                )
            }
        }

        C.propTypes = {
            close: PropTypes.func.isRequired,
            isOpen: PropTypes.bool.isRequired
        }

        return C;
    }
}
