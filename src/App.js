import React, { Component, Fragment } from 'react';
import { Provider } from "mobx-react";
import DevTools from 'mobx-react-devtools';

import RootStore from "./stores/RootStore";

import TodoApp from './modules/todo/TodoApp';
import AppIsSync from "./modules/appSync/AppIsSync";

import Authenticate from "./components/Authenticate"
import TestStore from './modules/test/TestStore';
import TestNotifs from './modules/test/TestNotifs';
import TestEditableLabel from './modules/test/TestEditableLabel';

const store = new RootStore();

class App extends Component {
    render() {
        return (
            <Fragment>
                <Provider store={store}>
                    <Fragment>
                        <Authenticate>
                            <TodoApp />
                            <TestNotifs />
                            {/* <TestStore />
                            <TestEditableLabel /> */}
                        </Authenticate>
                        <AppIsSync />
                        
                    </Fragment>
                    
                </Provider>
                <DevTools />
            </Fragment>
            
        )
    }
}

export default App;