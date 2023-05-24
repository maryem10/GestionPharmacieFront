import React from 'react';
import { Table } from 'react-bootstrap';

const CityList = ({ cities }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Population</th>
                {/* Ajoutez d'autres en-têtes de colonne selon vos besoins */}
            </tr>
            </thead>
            <tbody>
            {cities.map((city, index) => (
                <tr key={city.id}>
                    <td>{index + 1}</td>
                    <td>{city.name}</td>
                    <td>{city.population}</td>
                    {/* Ajoutez d'autres cellules de données selon vos besoins */}
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default CityList