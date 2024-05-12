// NavbarComponent.js
import React from 'react';
import { Link } from 'react-router-dom';

import navcolors from '/nav-colors.png'
import logobosch from '/logo-bosch.png'

import '../../index.css'
function NavbarComponent() {
    return (
        <header>
            <img src={navcolors} className="nav-colors" alt="Nav Colors"/>
            <nav>
                <img src={logobosch} className="logo" alt="Bosch Logo"/>
                <Link to="/change_values" className="nav-button">Trocar valores</Link>
            </nav>
        </header>
    );
}

export default NavbarComponent;