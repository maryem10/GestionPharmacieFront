import React, { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const VilleList = () => {

    const [villes , setVilles] = useState([]);
    useEffect(()=>{
        axios.get("/api/villes/1").then((response) =>{
            setVilles(response.data);
        });
    }, []);
    return (
        <>
            <h1>data</h1>
            <p>Code: {villes.nom}</p>
        </>
    );
}


/*


 /*function VilleList() {
     const [btcData, setBtcData] = useState({});
         useEffect(() => {
         const headers = {
             "Access-Control-Allow-Origin": "http://localhost:8083"
         };
             console.log("btcData0", btcData);
         fetch("/api/villes/1", { method: 'GET', headers })
             .then(response => response.json())
             .then(jsonData => {
                 setBtcData(jsonData);
                 console.log("btcData1", btcData); // will log the previous value of btcData
             })
             .catch(error => console.log(error));
     }, []);console.log("btcData3", btcData);

     return (
         <>
             <h1>Current BTC/USD data</h1>
             <p>Code: {btcData.nom}</p>
         </>
     );
}*/
export default VilleList;