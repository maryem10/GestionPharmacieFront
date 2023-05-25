import React from "react";

const PharmacyCard = ({ name, address, phone, isOpen }) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2">
        <h2 className="text-gray-800 text-lg font-semibold capitalize">{name}</h2>
        <p className="text-gray-600 text-sm mt-1">{address}</p>
        <p className="text-gray-600 text-sm mt-1">Phone: {phone}</p>
      </div>
      <div className="px-4 py-2 bg-gray-100">
        {isOpen ? (
          <span className="text-green-600">Open</span>
        ) : (
          <span className="text-red-600">Closed</span>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const pharmacies = [
    {
      id: 1,
      name: "Pharmacy A",
      address: "123 Main St, City",
      phone: "123-456-7890",
      isOpen: true,
    },
    {
      id: 2,
      name: "Pharmacy B",
      address: "456 Elm St, City",
      phone: "987-654-3210",
      isOpen: false,
    },
    // Add more pharmacies...
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Pharmacies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pharmacies.map((pharmacy) => (
          <PharmacyCard
            key={pharmacy.id}
            name={pharmacy.name}
            address={pharmacy.address}
            phone={pharmacy.phone}
            isOpen={pharmacy.isOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
