import React, { Component } from 'react';

let n =0;

class ComponentWithInternalState extends Component {
    state = {
        x:0
    }
    componentDidMount(){
        setInterval(()=> {
            this.setState({x: n++})
        }, 5000)
    }


    render() {
        return (
            <div>
                {this.state.x}
            </div>
        );
    }
}

export default ComponentWithInternalState;