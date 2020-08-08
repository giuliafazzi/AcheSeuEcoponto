import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";
import config from '../../config.json';
import api from '../../services/api';

import './styles.css';

import Header from '../../components/Header';

const key = config.map_key;
Geocode.setApiKey(key);
Geocode.setLanguage("pt-br");
Geocode.setRegion("br");
Geocode.enableDebug();

const containerStyle = {
    width: '100%',
    height: '100%'
};

interface Material {
    id: number;
    nome: string;
    imagem_url: string;
}

interface Ecoponto {
    id: number;
    nome: string;
    cep: string;
    bairro: string;
    endereco: string;
    cidade: string;
    estado: string;
    latitude: number,
    longitude: number,
    telefone: string;
    email: string;
}

interface Marcador {
    id: number;
    nome: string;
    latitude: number;
    longitude: number;
}

const ProcurarEcopontos = () => {
    const [materiais, setMateriais] = useState<Material[]>([]);
    const [ecopontos, setEcopontos] = useState<Ecoponto[]>([]);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [marcadores, setMarcadores] = useState<Marcador[]>([]);
    const [address, setAddress] = useState("");
    const [map, setMap] = React.useState(null)

    const [selectedMateriais, setSelectedMateriais] = useState<number[]>([]);

    useEffect(() => {
        api.get('materiais').then(response => {
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

    useEffect(() => {
        api.get('ecopontos', {
            params: {
                materiais: selectedMateriais
            }
        }).then(response => {
            setEcopontos(response.data.ecopontos);
        })
    }, [selectedMateriais]);

    function decodificarLocalizacao(lat: number, lng: number) {
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
            const filteredMateriais = selectedMateriais.filter(material => material !== id);

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
                        <div style={{ height: '100%', width: '100%', MozBorderRadius: '8px' }}>
                            <LoadScript
                                googleMapsApiKey={key}
                            >
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={14}
                                >
                                    <Marker
                                        position={center}
                                    />

                                    {ecopontos.map(ecoponto => (
                                        <Marker
                                            key={String(ecoponto.id)}
                                            position={{ lat: ecoponto.latitude, lng: ecoponto.longitude }}
                                        />
                                    ))}
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProcurarEcopontos;