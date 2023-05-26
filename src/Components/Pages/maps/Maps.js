
// Map dependencies
import './Map.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import L from 'leaflet';
import React, { useState } from "react";
import Location from './Location';



import { useEffect } from "react";
import { useMap } from 'react-leaflet';
import MyPosition from "./MyPosition";
const DEFAULT_LATITUDE = 33.9716;
const DEFAULT_LANGITUDE = -6.8498;



// Map component:
function Maps() {
    const position = [DEFAULT_LATITUDE, DEFAULT_LANGITUDE]

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ display: "flex", flexDirection: "column" }}>
            <TileLayer
                attribution='hind nadiaa'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Location />
            <MyPosition />
            <MultipleLocations />
        </MapContainer>
    );
}



function MultipleLocations() {
    let data = [];
    useEffect(() => {
        async function fetchData() {
            let response = await fetch("localhost:9098/pharmacies/all", {
                method: "GET"
            });
            data = await response.json();
        };
        fetchData();
    }, []);

    // const testData = [
    //     {
    //         zone: 'A',
    //         id: 2,
    //         latitude: 33.9716 - 4,
    //         adresse: "7dak asa7bi",
    //         langitude: -6.8498 - 4,
    //         nom: "hind"
    //     },
    //     {
    //         zone: 'A',
    //         id: 3,
    //         latitude: 33.9716 + 4,
    //         adresse: "7dak",
    //         langitude: -6.8498 + 3,
    //         nom: "hind"
    //     },
    //     {
    //         zone: 'A',
    //         id: 4,
    //         latitude: 33.9716 + 2,
    //         adresse: "chof map a ****",
    //         langitude: -6.8498 - 3,
    //         nom: "hind"
    //     }
    // ]

    let DefaultIcon = L.icon({
        iconUrl: "/marker.png",
        iconSize: [30, 48.5141]
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    //const filtredLocs = _data.filter(loc => loc.zone == 'A')
    return (data.map(loc => (
        <Marker
            key={loc.id}
            position={[loc.latitude, loc.langitude]}>
            <Popup>
                {loc.nom} <br />
                <b>Adresse</b>: {loc.adresse} <br />
                <b>zone</b>: {loc.zone}<br />
            </Popup>
        </Marker>

    )));
}

//Click listenner
function buttonClicked() {
    return true;
}

export default Maps;