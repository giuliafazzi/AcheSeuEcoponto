import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import './styles.css';

import Header from '../../components/Header';

const CriarEcoponto = () => {
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
                            <label htmlFor="nome">Nome</label>
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
                                <select name="uf" id="uf">
                                    <option value="0">Selecione um estado</option>
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="cidade">Cidade</label>
                                <select name="cidade" id="cidade">
                                    <option value="0">Selecione uma cidade</option>
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