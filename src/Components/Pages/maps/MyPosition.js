import React, {useEffect} from "react";
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import {useState} from 'react'

// Map dependencies
import {Marker, Popup} from 'react-leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"

const MyLocationFinder = () => {
  let DefaultIcon = L.icon({
    iconUrl: "/me.png",
    iconSize: [30, 48.5141]
  });
  L.Marker.prototype.options.icon = DefaultIcon;

    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
  
    const map = useMap();
    
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        console.log(e);
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        //const radius = e.accuracy;
        //const circle = L.circle(e.latlng, radius);
        //circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);
  
  
    return position === null ? null : (
      <Marker position={position} >
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  
  }
  export default MyLocationFinder;