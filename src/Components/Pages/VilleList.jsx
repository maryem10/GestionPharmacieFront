import React, { useState,useEffect} from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";


 const VilleLists = () => {

    const [villes , setVilles] = useState([]);
    useEffect(()=>{
        axios.get("/api/villes").then((response) =>{
            setVilles(response.data);
        });
    }, [villes]);



    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this city?")) {
            axios.delete(`/api/villes/delete/${id}`).then(() => {
                setVilles(villes.filter((ville) => ville.id !== id));
            });
        }
    };

    const handleEdit = (id) => {
        const newName = window.prompt("Enter the new name for this city:");
        if (newName) {
            axios.put(`/api/villes/update/${id}`, {nom:newName }).then(() => {
                setVilles(villes.map((ville) => {
                    if (ville.id === id) {
                        return { ...ville, nom: newName };
                    }
                    return ville;
                }));
            });
        }
    };

    return (
        <div>
            <h2>City List</h2>
            <Link to="/creationVille" className="btn btn-primary">
                Create City
            </Link>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {villes.map((ville) => (
                    <tr key={ville.id}>
                        <td>{ville.id}</td>
                        <td>{ville.nom}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(ville.id)}>
                                Delete
                            </button>
                            <button className="btn btn-secondary ml-2" onClick={() => handleEdit(ville.id)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
}


  const VilleForm = () => {
    const [nom, setNom] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/villes/save" , { nom }).then(() => {
            navigate("/");
        });

    };
    return(
        <div>
            <h2>Creation ville</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={nom}
                        onChange={(event) => setNom(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    )

}

export {VilleForm, VilleLists} ;