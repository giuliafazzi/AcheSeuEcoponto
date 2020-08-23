import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoBox, InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode";
import Slider from 'react-input-slider';
import config from '../../config.json';
import api from '../../services/api';
import marker from '../../assets/pin.png';

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

interface Ponto {
    latitude: number;
    longitude: number;
}

const ProcurarEcopontos = () => {
    const [materiais, setMateriais] = useState<Material[]>([]);
    const [distancia, setDistancia] = useState(0);
    const [slider, setSlider] = useState({ x: 10, y: 10 });
    const [ecopontos, setEcopontos] = useState<Ecoponto[]>([]);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [marcadores, setMarcadores] = useState<Marcador[]>([]);
    const [address, setAddress] = useState("");
    const [map, setMap] = useState(null)

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

    function rad(x: number) {
        return x * Math.PI / 180;
    };

    function calcularDistancia(p1: Ponto, p2: Ponto) {
        var R = 6378137;
        var dLat = rad(p2.latitude - p1.latitude);
        var dLong = rad(p2.longitude - p1.longitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };

    const MapComponent = (props: any) =>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
        >
            <Marker
                position={center}
            />

            <div className="pin ecoponto">
                {ecopontos.map(ecoponto => {
                    let dist_ecopontos = calcularDistancia({ latitude: center.lat, longitude: center.lng }, { latitude: ecoponto.latitude, longitude: ecoponto.longitude }) / 1000;
                    if (dist_ecopontos <= distancia) {
                        return (
                            <Marker
                                key={String(ecoponto.id)}
                                position={{ lat: ecoponto.latitude, lng: ecoponto.longitude }}
                                icon={marker}
                            />
                        )
                    }
                })}
            </div>
        </GoogleMap>

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

                    <fieldset>
                        <legend>
                            <span className="3">Distância: {distancia}</span>
                        </legend>

                        <Slider
                            axis="x"
                            x={distancia}
                            onChange={({ x }) => setDistancia(x)}
                        />
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

                                    {ecopontos.map(ecoponto => {
                                        let dist_ecopontos = calcularDistancia({ latitude: center.lat, longitude: center.lng }, { latitude: ecoponto.latitude, longitude: ecoponto.longitude }) / 1000;
                                        if (dist_ecopontos <= distancia) {
                                            return (
                                                <Marker
                                                    key={String(ecoponto.id)}
                                                    position={{ lat: ecoponto.latitude, lng: ecoponto.longitude }}
                                                    icon={marker}
                                                />
                                            )
                                        }
                                    })}
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