import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';

import './styles.css';

import Header from '../../components/Header';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CriarEcoponto = () => {
    const [ufs, setUfs] = useState<string[]>([]);
    const [cidades, setCidades] = useState<string[]>([]);

    const [selectedEstado, setSelectedEstado] = useState('0');
    const [selectedCidade, setSelectedCidade] = useState('0');

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            ufInitials.sort();

            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if (selectedEstado === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstado}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome);
                cityNames.sort();

                setCidades(cityNames);
            });

    }, [selectedEstado]);

    function handleSelectEstado(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedEstado(uf);
    }

    function handleSelectCidade(event: ChangeEvent<HTMLSelectElement>) {
        const cidade = event.target.value;

        setSelectedCidade(cidade);
    }


    return (
        <div id="page-criar-ecoponto">
            <Header />

            <div className="content">
                <form>
                    <h1>Cadastro do ecoponto</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="nome">Nome do local</label>
                            <input type="text" name="nome" id="nome" />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="telefone">Telefone</label>
                                <input type="text" name="telefone" id="telefone" />
                            </div>

                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email" />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="endereco">Endereço</label>
                            <input type="text" name="endereco" id="endereco" />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado</label>
                                <select
                                    name="uf"
                                    id="uf"
                                    value={selectedEstado}
                                    onChange={handleSelectEstado}
                                >

                                    <option value="0">Selecione um estado</option>
                                    {ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select
                                    name="cidade"
                                    id="cidade"
                                    value={selectedCidade}
                                    onChange={handleSelectCidade}
                                >

                                    <option value="0">Selecione uma cidade</option>
                                    {cidades.map(cidade => (
                                        <option key={cidade} value={cidade}>{cidade}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Ítens de coleta</h2>
                            <span>Selecione um ou mais itens abaixo</span>
                        </legend>

                        <ul className="items-grid">
                            <li>
                                <img src="http://localhost:3333/uploads/oleos.svg" alt="" />
                                <span>Óleo de Cozinha</span>
                            </li>

                            <li>
                                <img src="http://localhost:3333/uploads/oleos.svg" alt="" />
                                <span>Óleo de Cozinha</span>
                            </li>

                            <li>
                                <img src="http://localhost:3333/uploads/oleos.svg" alt="" />
                                <span>Óleo de Cozinha</span>
                            </li>

                            <li>
                                <img src="http://localhost:3333/uploads/oleos.svg" alt="" />
                                <span>Óleo de Cozinha</span>
                            </li>

                            <li>
                                <img src="http://localhost:3333/uploads/oleos.svg" alt="" />
                                <span>Óleo de Cozinha</span>
                            </li>

                            <li>
                                <img src="http://localhost:3333/uploads/oleos.svg" alt="" />
                                <span>Óleo de Cozinha</span>
                            </li>
                        </ul>
                    </fieldset>

                    <button type="submit">
                        Cadastrar ecoponto
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CriarEcoponto;