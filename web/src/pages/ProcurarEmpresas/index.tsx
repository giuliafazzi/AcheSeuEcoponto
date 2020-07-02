import React, { useState, useEffect } from 'react';
import Geocode from "react-geocode";
import config from '../../config.json';

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

const ProcurarEmpresas = () => {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [address, setAddress] = useState("");

    const [map, setMap] = React.useState(null)

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
                setAddress(response.results[0].formatted_address);
                console.log(address);
            },
            error => {
                console.error(error);
            }
        );
    }

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

export default ProcurarEmpresas;