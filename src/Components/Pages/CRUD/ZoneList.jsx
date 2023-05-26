import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';


const ZoneForm = () => {
  const [nom, setNom] = useState("");
  const [cityId, setCityId] = useState("");
  const [cities, setCities] = useState([]);
 

  // Load cities
  useEffect(() => {
    axios.get("/api/ville/all").then((response) => {
      setCities(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/zone/save", {
        nom,
        ville: {
          id: cityId,
        },
      })
      .then((response) => {
        setCityId("");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name:
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            id="name"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cityId" className="block text-gray-700">
            Ville:
          </label>
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            id="cityId"
            value={cityId}
            onChange={(event) => setCityId(event.target.value)}
          >
            <option value="">Select a city</option>
            {cities &&
              cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nom}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add Zone
        </button>
      </div>
    </form>
  );
};

const ZoneLists = ({ villeId }) => {
  const [zones, setZones] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [villes, setVilles] = useState([]);
  const [ville, setVille] = useState(null);
  const [zoneName, setZoneName] = useState("");

  useEffect(() => {
    axios.get("/api/zone/all").then((response) => {
      setZones(response.data);
    });
  }, [villeId]);

  useEffect(() => {
    axios.get("/api/ville/all").then((response) => {
      setVilles(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Zone?")) {
      axios.delete(`/api/zone/delete/${id}`).then(() => {
        setZones(zones.filter((zone) => zone.id !== id));
      });
    }
  };

  const handleOpenModal = (zone) => {
    setSelectedZone(zone);
    setVille(zone.ville);
    setZoneName(zone.nom);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedZone(null);
    setModalIsOpen(false);
  };

  const handleSave = () => {
    const updatedZone = {
      id: selectedZone.id,
      nom: zoneName,
      ville: {
        id: ville.id,
      },
    };

    axios.put(`/api/zone/update/${selectedZone.id}`, updatedZone)
      .then((response) => {
        // Handle successful update
        console.log("Zone updated successfully!");
        // Refresh the zone list
        axios.get("/api/zone/all").then((response) => {
          setZones(response.data);
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to update zone:", error);
      });

    handleCloseModal();
  };

  return (
    <div>
      <h2>Zone List</h2>
      <Link to="/creationZone" className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center ml-4">
        Create Zone <FaPlus className="ml-2" />
      </Link>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border py-2 px-4">ID</th>
            <th className="border py-2 px-4">Name</th>
            <th className="border py-2 px-4">Ville</th>
            <th className="border py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id}>
              <td className="border py-2 px-4">{zone.id}</td>
              <td className="border py-2 px-4">{zone.nom}</td>
              <td className="border py-2 px-4">
                {zone.ville && zone.ville.nom}
              </td>
              <td className="border py-2 px-4">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-center ml-4"
                  onClick={() => handleDelete(zone.id)}
                >
                  Delete <FaTrash className="ml-2" />
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-md flex items-center justify-center ml-4"
                  onClick={() => handleOpenModal(zone)}
                >
                  Edit <FaEdit className="ml-2" />
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
            <input
              type="text"
              value={zoneName}
              onChange={(event) => setZoneName(event.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </li>
          <li>
            <label>Ville:</label>
            <select
              value={ville ? ville.id : ""}
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
      </Modal>
    </div>
  );
};


export { ZoneForm, ZoneLists };
