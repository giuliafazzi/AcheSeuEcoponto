import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import api from '../../services/api';
import axios from 'axios';

import './styles.css';

import Header from '../../components/Header';

interface Material {
    id: number;
    nome: string;
    imagem_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const CriarEcoponto = () => {
    const [materiais, setMateriais] = useState<Material[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cidades, setCidades] = useState<string[]>([]);

    const [selectedMateriais, setSelectedMateriais] = useState<number[]>([]);
    const [selectedEstado, setSelectedEstado] = useState('0');
    const [selectedCidade, setSelectedCidade] = useState('0');

    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
        cep: '',
        bairro: '',
        endereco: '',
    });

    const history = useHistory();

    useEffect(() => {
        api.get('materiais').then(response => {
            console.log(response.data);
            setMateriais(response.data);
        });


    }, []);

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

    function handleSelectMaterial(id: number) {
        const alreadySelected = selectedMateriais.findIndex(material => material === id);

        if (alreadySelected >= 0) {
            const filteredMateriais = selectedMateriais.filter(material => material != id);

            setSelectedMateriais(filteredMateriais);
        }
        else {
            setSelectedMateriais([...selectedMateriais, id]);
        }

    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    async function handleEnviar(event: FormEvent) {
        event.preventDefault();

        const { nome, telefone, email, cep, bairro, endereco } = formData;
        const estado = selectedEstado;
        const cidade = selectedCidade;
        const materiais = selectedMateriais;

        //const data = new FormData();

        /*data.append('nome', nome);
        data.append('telefone', telefone);
        data.append('email', email);
        data.append('cep', cep);
        data.append('bairro', bairro);
        data.append('endereco', endereco);
        data.append('estado', estado);
        data.append('cidade', cidade);
        data.append('materiais', materiais.join(','));*/

        const data = {
            nome,
            telefone,
            email,
            cep,
            bairro,
            endereco,
            estado,
            cidade,
            materiais
        }

        await api.post('ecopontos', data);

        alert('Ecoponto criado!');

        history.push('/');
    }

    return (
        <div id="page-criar-ecoponto">
            <Header />

            <div className="content">
                <form onSubmit={handleEnviar}>
                    <h1>Cadastrar ecoponto</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="nome">Nome do local</label>
                            <input
                                type="text"
                                name="nome"
                                id="nome"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="telefone">Telefone</label>
                                <input
                                    type="text"
                                    name="telefone"
                                    id="telefone"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                        </legend>

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
                                <label htmlFor="cidade">Cidade</label>
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

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="cep">CEP</label>
                                <input
                                    type="text"
                                    name="cep"
                                    id="cep"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="bairro">Bairro</label>
                                <input
                                    type="text"
                                    name="bairro"
                                    id="bairro"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="endereco">Endereço</label>
                            <input
                                type="text"
                                name="endereco"
                                id="endereco"
                                onChange={handleInputChange}
                            />
                        </div>


                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Ítens de coleta</h2>
                            <span>Selecione um ou mais itens abaixo</span>
                        </legend>

                        <ul className="items-grid">
                            {materiais.map(material => (
                                <li
                                    key={material.id}
                                    onClick={() => handleSelectMaterial(material.id)}
                                    className={selectedMateriais.includes(material.id) ? 'selected' : ''}
                                >

                                    <img src={material.imagem_url} alt={material.nome} />
                                    <span>{material.nome}</span>
                                </li>
                            ))}
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