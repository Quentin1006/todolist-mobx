import React, { Component } from 'react';

import Logo from "../Logo";


class Navbar extends Component {
    render() {
        const { logoImg, logoTitle, children } = this.props;
        return (
            <nav className="navbar shadow-card">
                <Logo img={logoImg} title={logoTitle} />
                <div className="action-buttons">
                    {children}
                </div>
            </nav>
        );
    }
}

export default Navbar;