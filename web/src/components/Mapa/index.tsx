import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";
import config from '../../config.json';

import './styles.css';

const key = config.map_key;
Geocode.setApiKey(key);

// set response language. Defaults to english.
Geocode.setLanguage("pt-br");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("br");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

const containerStyle = {
    width: '100%',
    height: '100%'
};

const Mapa = (props: any) => {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [address, setAddress] = useState("");

    const [map, setMap] = React.useState(null)

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;

                setCenter({ lat: latitude, lng: longitude });
            });
        } else {
            alert("Not Available");
        }

    }, []);

    return (
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
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default Mapa;