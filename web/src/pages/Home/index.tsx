import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaRecycle } from 'react-icons/fa';

import './styles.css';

import logo from '../../assets/logo.svg';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="AcheSeuEcoponto" />

                    <Link to="/criar-ecoponto">
                        <FaRecycle />
                        Cadastrar ecoponto
                    </Link>
                </header>

                <main>
                    <h1>Portal AcheSeuEcoponto</h1>
                    <p>Encontre empresas e ecopontos para atender cada uma de suas necessidades de descarte de resíduos.</p>

                    <div className="field-group">
                        <div className="field">
                            <Link to="/ecopontos">
                                <span>
                                    <FaSearch />
                                </span>
                                <strong>Encontrar ecopontos</strong>
                            </Link>
                        </div>

                        <div className="field">
                            <Link to="/empresas">
                                <span>
                                    <FaSearch />
                                </span>
                                <strong>Encontrar empresas</strong>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;