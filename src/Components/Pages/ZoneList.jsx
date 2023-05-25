import React, { useState, useEffect } from "react";
import { Link, useNavigate ,useParams }  from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { Button } from "reactstrap";


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

const ZoneLists = () => {
  const [zones, setZones] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);


  const [villeNom, setVilleNom] = useState("");

  const [zoneName, setZoneName] = useState([]);

/////////////////////////////////////

const [nom, setNom] = useState("");
    const [villeId, setVilleId] = useState("");

    const [ville, setVille] = useState({});


    const [zone, setZone] = useState([]);
    const [villes, setVilles] = useState([]);



    const { id } = useParams()

    useEffect(() => {
        loadZone()
        villeList()

    }, []
    );

    const handleVilleChange = (selectedOption) => {
    
       const VilleId = selectedOption.value;

       setVille(VilleId);
       setVilleId(VilleId.id);

       console.log("imaaane",ville);
       console.log("imaaane",villeId);

    };


    const loadZone = async () => {

        const result = await axios.get(`/api/zones/findById/${id}`)
        setZone(result.data)
        setNom(result.data.nom)
        setVille(result.data.ville)
        console.log(result.data)

    };
    const villeList = () => {
        axios
            .get('/api/ville/all')
            .then((response) => {
                setVilles(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

  


    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(ville);
      //  console.log(villeId);


        axios.put("/api/zone/update/", {
            
            id: id,
            nom: nom,
            ville: {
                id: villeId
            },


        }).then((response) => {
;
        });
    };


  
  // Load data
  useEffect(() => {
    axios.get("/api/zone/all").then((response) => {
      setZones(response.data);
    })
  }, [villeId]);

  useEffect(() => {
    axios.get("api/ville/all").then((response) => {
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
    axios.get(`/api/zone/find/${zone.id}`).then((response) => {
        setVille(response.data.ville);
        setZoneName(zone.nom);
      });

    
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedZone(null);
    setModalIsOpen(false);
  };

  

  return (
    <div>
      <h2>Zone List</h2>
      <Link to="/creationZone" className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center ml-4">
        Create Zone<FaPlus className="ml-2"/>
      </Link>
      <p>
        
      </p>
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
                    className="bg-red-500 text-white  py-2 px-4 rounded-md flex items-center justify-center ml-4"
                    onClick={() => handleDelete(zone.id)}
                  >
                    Delete <FaTrash className="ml-2" />
                  </button>
                  <p>



                  </p>
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
      <Modal  isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <h3>Modification de la zone</h3>
        
            <label>Nom de la zone:</label>
            <form onSubmit={handleSubmit} >
            <input
             value={nom}
             name='nom'
             onChange={(event) => setNom(event.target.value)}
          
             required
             label='Nom'
              type="text"
           
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
         
            <label>Ville:</label>
            <select 


  id='select3'
                                required
                                className='form-control'
                                onChange={handleVilleChange}
                                value={{ value: villeId, label: ville && ville.nom }}
                               // value={ville && { value: ville, label: ville.nom }}
                              //  value={{ value: villeId, label: ville && ville.nom }}
                              //value={{villeId}}

                                options={villes.map((v) => ({ value: v, label: v.nom }))}   >         </select>
            
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleCloseModal}
        >
          Annuler
        </button>
          <Button type='submit'>Edit</Button>
        </form>
      </Modal>
    </div>
  );
};

export { ZoneForm, ZoneLists };
