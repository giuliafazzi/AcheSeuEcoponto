import React, { useState, useEffect } from 'react';
import Geocode from "react-geocode";
import config from '../../config.json';
import api from '../../services/api';

import './styles.css';

import Header from '../../components/Header';
import Mapa from '../../components/Mapa';

const key = config.map_key;
Geocode.setApiKey(key);

// set response language. Defaults to english.
Geocode.setLanguage("pt-br");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("br");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

interface Material {
    id: number;
    nome: string;
    imagem_url: string;
}

const ProcurarEcopontos = () => {
    const [materiais, setMateriais] = useState<Material[]>([]);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [address, setAddress] = useState("");
    const [map, setMap] = React.useState(null)

    const [selectedMateriais, setSelectedMateriais] = useState<number[]>([]);

    useEffect(() => {
        api.get('materiais').then(response => {
            console.log(response.data);
            setMateriais(response.data);
        });


    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;

                setCenter({ lat: latitude, lng: longitude });
                decodificarLocalizacao(latitude, longitude);
            });
        } else {
            alert("Not Available");
        }

    }, []);

    function decodificarLocalizacao(lat: number, lng: number) {
        // Get address from latitude & longitude.
        Geocode.fromLatLng(lat.toString(), lng.toString()).then(
            response => {
                const rua = response.results[0].address_components[1].short_name
                const numero = response.results[0].address_components[0].short_name
                const bairro = response.results[0].address_components[2].short_name
                const cidade = response.results[0].address_components[3].short_name
                const estado = response.results[0].address_components[4].short_name

                setAddress(rua + ', ' + numero + ' - ' + bairro + ', ' + cidade + '/' + estado);
            },
            error => {
                console.error(error);
            }
        );
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

    return (
        <div id="page-procurar-ecopontos">
            <Header />

            <div className="content">
                <div className="filtros">
                    <p className="titulo">Filtrar ecopontos</p>

                    <fieldset>
                        <legend>
                            <span className="3">Materiais</span>
                        </legend>

                        <ul className="materiais-filtro">
                            {materiais.map(material => (
                                <li
                                    key={material.id}
                                    onClick={() => handleSelectMaterial(material.id)}
                                    className={selectedMateriais.includes(material.id) ? 'selected' : ''}
                                >
                                    <span>{material.nome}</span>
                                </li>
                            ))}
                        </ul>
                    </fieldset>
                </div>

                <div className="localizacao">
                    <div className="info">
                        <p className="endereco">Sua localizacao atual:</p>
                        <p className="endereco">
                            {address}
                        </p>
                    </div>

                    <div className="mapa">
                        <Mapa />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProcurarEcopontos;