import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PharmacieGardeForm = () => {
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacie, setSelectedPharmacie] = useState('');
  const [gardes, setGardes] = useState([]);
  const [selectedGarde, setSelectedGarde] = useState('');
  const [gardePharmacie, setGardePharmacie] = useState('');

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get('/api/pharmacie/all');
        setPharmacies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGardes = async () => {
      try {
        const response = await axios.get('/api/garde/all');
        setGardes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPharmacies();
    fetchGardes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the new entity object
    const newPharmacieGarde = {
      pk: {
        dateDebut: dateDebut,
        id_garde: selectedGarde,
        id_pharmacie: selectedPharmacie,
      },
      garde: {
        id_garde: selectedGarde,
      },
      pharmacie: {
        id: selectedPharmacie,
      },
      dateFin: dateFin,
    };

    try {
      const response = await axios.post('/api/phramacieGarde/save', newPharmacieGarde);
      console.log('New Pharmacie Garde:', response.data);

      // Clear the form fields
      setDateDebut(null);
      setDateFin(null);
      setSelectedPharmacie('');
      setSelectedGarde('');
      setGardePharmacie(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Add Pharmacie Garde</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Date Debut:</label>
          <DatePicker
            selected={dateDebut}
            onChange={(date) => setDateDebut(date)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Date Fin:</label>
          <DatePicker
            selected={dateFin}
            onChange={(date) => setDateFin(date)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Pharmacie:</label>
          <select
            value={selectedPharmacie}
            onChange={(e) => setSelectedPharmacie(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          >
            <option value="">Select a pharmacie</option>
            {pharmacies.map((pharmacie) => (
              <option key={pharmacie.id} value={pharmacie.id}>
                {pharmacie.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Garde:</label>
          <select
            value={selectedGarde}
            onChange={(e) => setSelectedGarde(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          >
            <option value="">Select a garde</option>
            {gardes.map((garde) => (
              <option key={garde.id_garde} value={garde.id_garde}>
                {garde.type}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default PharmacieGardeForm;
