import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStores from "../../components/HOC/withStores";

class TestStore extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                
            </div>
        );
    }
}

TestStore.propTypes = {

};

export default withStores(["notificationStore", "userStore"])(TestStore);