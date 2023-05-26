import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const Location = () => {
    const map = useMap();
    useEffect(()=>{
         L.Control.geocoder({
            defaultMarkGeocode: false
          })
            .on('markgeocode', function(e) {
              var lat_lng = e.geocode.center;
              L.marker(lat_lng).addTo(map).bindPopup(e.geocode.name).openPopup();
              map.fitBounds(e.geocode.bbox);
            }).on("click", function(e){
              console.log(e)
            })
            .addTo(map);
    },[]);
    return null;
};

export default Location;