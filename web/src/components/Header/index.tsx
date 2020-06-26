import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle } from 'react-icons/fa';

import './styles.css';

import logo from '../../assets/logo.svg';

const Header = () => {
    return (
        <header>
            <Link to="/">
                <img src={logo} alt="AcheSeuEcoponto" />
            </Link>

            <div className="menu">
                <Link to="/criar-ecoponto">
                    <FaRecycle />
                    Cadastrar ecoponto
                </Link>

                <Link to="/criar-ecoponto">
                    <FaRecycle />
                    Cadastrar empresa
                </Link>
            </div>

        </header>
    );

}

export default Header;