import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/Header';

const ProcurarEmpresas = () => {
    return (
        <div id="page-criar-empresa">
            <Header />

            <div className="content">
                <div className="filtros">
                    <p className="titulo">Filtrar empresas</p>
                </div>

                <div className="mapa">

                </div>
            </div>
        </div>
    );
};

export default ProcurarEmpresas;