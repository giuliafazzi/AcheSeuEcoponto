import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Link, useHistory } from 'react-router-dom';
import Marker from '../Marker';

import './styles.css';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const Mapa = (props: any) => {
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [zoom, setZoom] = useState(11);

    const history = useHistory();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;

                setCenter({ lat: latitude, lng: longitude });
                console.log(center);
            });
        } else {
            alert("Not Available");
        }

    }, []);

    /*useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setCenter({ lat: latitude, lng: longitude })
            //alert(center.lat);
        });

    }, []);*/

    return (
        <div style={{ height: '100%', width: '100%', MozBorderRadius: '8px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBMM4FSTN2KrlYBuJpoBhGE9S-V6L8BRjg' }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <Marker
                    lat={11.0168}
                    lng={76.9558}
                    name="My Marker"
                    color="blue"
                />
            </GoogleMapReact>
        </div>
    );
}

export default Mapa;