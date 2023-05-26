import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';


const VilleLists = () => {
  const [villes, setVilles] = useState([]);

  useEffect(() => {
    axios.get("/api/ville/all").then((response) => {
      setVilles(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      axios.delete(`/api/ville/delete/${id}`).then(() => {
        setVilles(villes.filter((ville) => ville.id !== id));
      });
    }
  };

  const handleEdit = (id) => {
    const newName = window.prompt("Enter the new name for this city:");
    if (newName) {
      axios.put(`/api/ville/update/${id}`, { nom: newName }).then(() => {
        setVilles((villes) =>
          villes.map((ville) => {
            if (ville.id === id) {
              return { ...ville, nom: newName };
            }
            return ville;
          })
        );
      });
    }
  };

  return (
    <div className=" items-center justify-center ">
      <div className="bg-white p-4 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">City List</h2>
       <div>
      <Link to="/creationVille" className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center ml-4">
          Create City <FaPlus className="ml-2"/>
        </Link>
        </div> 
        <p>


                    
</p>
       
        <table  className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">ID</th>
              <th className="border py-2 px-4">Name</th>
              <th className="border py-2 px-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {villes.map((ville) => (
              <tr key={ville.id}>
                <td className="border py-2 px-4">{ville.id}</td>
                <td className="border py-2 px-4">{ville.nom}</td>
                <td className="border py-2 px-10">
                  <button
                    className="bg-red-500 text-white  py-2 px-4 rounded-md flex items-center justify-center ml-4"
                    onClick={() => handleDelete(ville.id)}
                  >
                    Delete <FaTrash className="ml-2" />
                  </button>
                  <p>



                  </p>
                  <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-md flex items-center justify-center ml-4"
                  onClick={() => handleEdit(ville.id)}
                >
                  Edit <FaEdit className="ml-2" />
                </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const VilleForm = () => {
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/ville/save", { nom }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-4 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Creation ville</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Nom:
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              id="name"
              value={nom}
              onChange={(event) => setNom(event.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export { VilleForm, VilleLists };
