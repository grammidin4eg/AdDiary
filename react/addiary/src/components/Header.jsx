import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">
                Дневник давления
            </NavLink>
        </nav>
    </header>
)

//Header.propTypes = {};

export default Header;