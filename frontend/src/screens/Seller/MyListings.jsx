import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_property_listings } from "../../redux/Action/action";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MyListings() {
  const dispatch = useDispatch();
  const { property_listings } = useSelector((state) => state.data);

  useEffect(() => {
    load_property_listings(dispatch);
  }, [dispatch]);

  const handleEdit = (id) => {
    // Logic for handling the edit action
    console.log("Edit property with id:", id);
  };

  const handleDelete = (id) => {
    // Logic for handling the delete action
    console.log("Delete property with id:", id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {property_listings?.map((property, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full h-48 object-cover"
              src="https://t4.ftcdn.net/jpg/01/23/68/71/360_F_123687102_3rPakqjpruQ7hV0yImMYcSYBXGkTCwE5.jpg"
              alt="Property"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{property.title}</div>
              <p className="text-gray-700 text-base">{property.description}</p>
            </div>
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Area:</span>
                <span className="font-bold">{property.area} sq ft</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Bedrooms:</span>
                <span className="font-bold">{property.bedrooms}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Bathrooms:</span>
                <span className="font-bold">{property.bathrooms}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Price:</span>
                <span className="font-bold">₹{property.price}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Location:</span>
                <span className="font-bold">{property.location}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Nearby Hospitals:</span>
                <span className="font-bold">{property.nearbyHospitals}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Nearby Colleges:</span>
                <span className="font-bold">{property.nearbyColleges}</span>
              </div>
              <div className="px-6 py-4 flex justify-between">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(property._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(property._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
