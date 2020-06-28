import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/Header';
import Mapa from '../../components/Mapa';

const ProcurarEmpresas = () => {
    return (
        <div id="page-criar-empresa">
            <Header />

            <div className="content">
                <div className="filtros">
                    <p className="titulo">Filtrar empresas</p>
                </div>

                <div className="localizacao">
                    <div className="info">
                        <p className="endereco">Sua localizacao atual:</p>
                        <p className="endereco">Rua Tal, nº X</p>
                    </div>

                    <div className="mapa">
                        <Mapa />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProcurarEmpresas;