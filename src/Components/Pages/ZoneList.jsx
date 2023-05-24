import React, { useState,useEffect} from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";


const ZoneForm= () => {

    const [nom, setNom] = useState("");
    const [cityId, setCityId] = useState("");
    const [cities, setCities] = useState([]);

//charger liste
    useEffect(() => {
        axios.get("/api/ville/all").then((response) => {
            setCities(response.data);
        
        });
    }, []);
//ajouter zone

const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/zone/save", {
        nom,
        ville: {
            id: cityId
        }
    }).then((response) => {
        //onZoneAdded(response.data);
        
        setCityId("");
    });
};



    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={nom}
                    onChange={(event) => setNom(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cityId">Ville:</label>
                <select
                    className="form-control"
                    id="cityId"
                    value={cityId}
                    
                    onChange={(event) => setCityId(event.target.value)}
                >
                    <option value="">Select a city </option>
                    {cities && cities.map((city) => (
                        <option key={city.id} value={city.id}>
                         
                            {city.nom}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                Add Zone
            </button>
        </form>
    );

}

const ZoneLists = ({villeId}) => {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [villes , setVilles] = useState([]);

//load data 

useEffect(()=>{
    axios.get("/api/zone/all").then((response) =>{
        setZones(response.data);
    });

}, [villeId]);




    useEffect(()=>{
        axios.get("http://localhost:8080/api/zone/all").then((response) =>{
            setVilles(response.data);
        });
    
    }, []);
//load villes
  


    /**   useEffect(() => {
        const fetchCities = async () => {
            const result = await axios(`/api/cities`);
            setCities(result.data);
        };
        fetchCities();
    }, []); */



    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Zone?")) {
            axios.delete(`/api/zone/delete/${id}`).then(() => {
                setZones(zones.filter((zone) => zone.id !== id));
            });
        }
    };

    const handleOpenModal = (zone) => {
        setSelectedZone(zone);
        setModalIsOpen(true);
    };
    const handleCloseModal = () => {
        setSelectedZone(null);
        setModalIsOpen(false);
    };
    const handleSave = () => {
        // TODO: handle save logic
        handleCloseModal();
    };


    return (
        <div>
            <h2>Zone List</h2>
            <Link to="/creationZone" className="btn btn-primary">
                Create City
            </Link>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Ville</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {zones.map((zone) => (
                        <tr key={zone.id}>
                            <td>{zone.id}</td>
                            <td>{zone.nom}</td>
                            <td>{ zone.ville && zone.ville.nom}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(zone.id)}>
                                    Delete
                                </button>
                                <button className="btn btn-primary" onClick={() => handleOpenModal(zone)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
                <h3>Modification de la zone</h3>
                <ul>
                    <li>
                        <label>Nom de la zone:</label>
                        <input type="text" value={selectedZone && selectedZone.nom} />
                    </li>
                    <li>
                        <label>Ville:</label>
                        <select value={selectedZone && selectedZone.city && selectedZone.city.id}>
                            {villes.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.nom}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={handleCloseModal}>
                    Annuler
                </button>
                <button className="btn btn-success" onClick={handleSave}>
                    Sauvegarder
                </button>
            </Modal>

        </div>
    );

    console.log(zones);
}


export  {ZoneForm, ZoneLists} ;