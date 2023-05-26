import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const PharmacyForm = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacieNom, setPharmacieNom] = useState('');
  const [pharmacieAdresse, setPharmacieAdresse] = useState('');
  const [pharmacieLatitude, setPharmacieLatitude] = useState('');
  const [pharmacieLongitude, setPharmacieLongitude] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [zones, setZones] = useState([]);
  const [editingPharmacieId, setEditingPharmacieId] = useState(null);

 

  useEffect(() => {
    axios.get("/api/zone/all").then((response) => {
      setZones(response.data);
    });
  }, []);

 
  const savePharmacy = async () => {
    if (editingPharmacieId) {
      try {
        await axios.put(`/api/pharmacie/update/${editingPharmacieId}`, {
          id: editingPharmacieId,
          nom: pharmacieNom,
          adress: pharmacieAdresse,
          lat: pharmacieLatitude,
          lag: pharmacieLongitude,
          zone_id: zoneId
        });
        setEditingPharmacieId(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post('/api/pharmacie/save', {
          nom: pharmacieNom,
          adress: pharmacieAdresse,
          latitude: pharmacieLatitude,
          lag: pharmacieLongitude,
          zone_id: zoneId
        });
        setPharmacies([...pharmacies, response.data]);
      } catch (error) {
        console.error(error);
      }
    }

    setPharmacieNom('');
    setPharmacieAdresse('');
    setPharmacieLatitude('');
    setPharmacieLongitude('');
    setZoneId('');
  };



  return (
    <form>
      {/* <form onSubmit={editingPharmacieId}></form> */}
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            placeholder="Name"
            value={pharmacieNom}
            onChange={(e) => setPharmacieNom(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Address" className="block text-gray-700">Address</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            placeholder="Address"
            value={pharmacieAdresse}
            onChange={(e) => setPharmacieAdresse(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Latitude" className="block text-gray-700">Latitude</label>
          <input
            type="text"
            placeholder="Latitude"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            value={pharmacieLatitude}
            onChange={(e) => setPharmacieLatitude(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Longitude" className="block text-gray-700">Longitude</label>
          <input
            type="text"
            placeholder="Longitude"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            value={pharmacieLongitude}
            onChange={(e) => setPharmacieLongitude(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zoneId" className="block text-gray-700">
            Zone: </label>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
          >
            <option value="">Select Zone</option>
            {zones && zones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.nom}
              </option>
            ))}
          </select>
          </div>
          <button onClick={savePharmacy}
             className="bg-blue-500 text-white py-2 px-4 rounded-md">
            {editingPharmacieId ? 'Update Pharmacy' : 'Create Pharmacy'}
          </button>
      </div>

    </form >
  );
};


const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacieNom, setPharmacieNom] = useState('');
  const [pharmacieAdresse, setPharmacieAdresse] = useState('');
  const [pharmacieLatitude, setPharmacieLatitude] = useState('');
  const [pharmacieLongitude, setPharmacieLongitude] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [zones, setZones] = useState([]);
  const [editingPharmacieId, setEditingPharmacieId] = useState(null);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get('/api/pharmacie/all');
        setPharmacies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchZones = async () => {
      try {
        const response = await axios.get('/api/zone/all');
        setZones(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPharmacies();
    fetchZones();
  }, []);


  const deletePharmacy = async (id) => {
    try {
      await axios.delete(`/api/pharmacie/delete/${id}`);
      setPharmacies(pharmacies.filter((pharmacie) => pharmacie.id !== id));

    } catch (error) {
      console.error(error);
    }
  };

  const editPharmacy = (pharmacie) => {
    setPharmacieNom(pharmacie.nom);
    setPharmacieAdresse(pharmacie.adress);
    setPharmacieLatitude(pharmacie.lat);
    setPharmacieLongitude(pharmacie.lag);
    setZoneId(pharmacie.zone_id);
    setEditingPharmacieId(pharmacie.id);
  };

  return (
<div>
  <h2>Pharmacy List</h2>
  <Link to="/creationPharmacie" className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center ml-4">
        Create Pharmacie <FaPlus className="ml-2" />
    </Link>
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="border py-2 px-4">ID</th>
        <th className="border py-2 px-4">Name</th>
        <th className="border py-2 px-4">Address</th>
        <th className="border py-2 px-4">Latitude</th>
        <th className="border py-2 px-4">Longitude</th>
        <th className="border py-2 px-4">Zone Name</th>
        <th className="border py-2 px-4">Actions</th>
      </tr>
    </thead>
    <tbody>
      {pharmacies.map((pharmacie) => (
        <tr key={pharmacie.id}>
          <td className="border py-2 px-4">{pharmacie.id}</td>
          <td className="border py-2 px-4">{pharmacie.nom}</td>
          <td className="border py-2 px-4">{pharmacie.adress}</td>
          <td className="border py-2 px-4">{pharmacie.lat}</td>
          <td className="border py-2 px-4">{pharmacie.lag}</td>
          <td className="border py-2 px-4">{pharmacie.zone && pharmacie.zone.nom}</td>
          <td className="border py-2 px-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-center ml-4"
              onClick={() => deletePharmacy(pharmacie.id)}
            >
              Delete <FaTrash className="ml-2" />
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md flex items-center justify-center ml-4"
              onClick={() => editPharmacy(pharmacie)}
            >
              Edit <FaEdit className="ml-2" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {/* <Modal isOpen={editPharmacy} onRequestClose={handleCloseModal}>
        <h3>Modification de la pharmacie</h3>
        <ul>
          <li>
            <label>Nom de la pharmacie:</label>
            <input
              type="text"
              value={pharmacieNom}
              onChange={(event) => setPharmacieNom(event.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </li>
          <li>
            <label>Zone:</label>
            <select
              value={zone ? zone.id : ""}
              onChange={(event) => {
                const selectedVille = villes.find(
                  (city) => city.id === parseInt(event.target.value)
                );
                setVille(selectedVille);
              }}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            >
              {villes.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nom}
                </option>
              ))}
            </select>
          </li>
        </ul>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleCloseModal}
        >
          Annuler
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md ml-2"
          onClick={handleSave}
        >
          Sauvegarder
        </button>
      </Modal> */}
</div>

  );
};



export  {PharmacyForm,PharmacyList};
