import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaAd } from 'react-icons/fa';

const GuardManagement = () => {
  const [guards, setGuards] = useState([]);
  const [type, settype] = useState('');

  // Function to fetch the list of guards from the backend
  const fetchGuards = async () => {
    try {
      const response = await axios.get('/api/gardes/all');
      setGuards(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add a guard
  const addGuard = async () => {
    try {
      const response = await axios.post('/api/gardes/save', { name: type });
      setGuards([...guards, response.data]);
      settype('');
    } catch (error) {
      console.error(error);
    }
    fetchGuards();
  };

  // Function to delete a guard
  const deleteGuard = async (id) => {
    try {
      await axios.delete(`/api/gardes/delete/${id}`);
      const updatedGuards = guards.filter((guard) => guard.id !== id);
      setGuards(updatedGuards);
    } catch (error) {
      console.error(error);
    }
    fetchGuards();
  };

  useEffect(() => {
    fetchGuards();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-g font-big1 slide-in-top">Gardes</h1>
      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type"
          value={type}
          onChange={(e) => settype(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addGuard}>
         <FaAd/>
        </button>
      </div>
      <br/>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Guard Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {guards.map((guard, index) => (
            <tr key={guard.id}>
              <th scope="row">{index + 1}</th>
              <td>{guard.type}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteGuard(guard.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default GuardManagement;
