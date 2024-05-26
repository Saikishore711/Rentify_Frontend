import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AddForm from '../../components/AddForm';
import { Button } from '@mui/material';
import { add_property } from '../../redux/Action/action';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Addproperty() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mainData, setMainData] = useState({});

  const formFields = [
    {
      key: "title",
      label: "Title",
      placeholder: "Title",
      type: "text",
      required: true,
      autoFocus: true,
      length: "col-span-full",
      value: mainData?.title ?? "",
    },
    {
      key: "description",
      label: "Description",
      placeholder: "Enter Description",
      type: "textarea",
      length: "col-span-full",
      value: mainData?.description ?? "",
    },
    {
      key: "area",
      label: "Area (sq ft)",
      placeholder: "Enter Area",
      type: "number",
      length: "col-span-full",
      value: mainData?.area ?? "",
    },
    {
      key: "bedrooms",
      label: "Bedrooms",
      placeholder: "Enter Number of Bedrooms",
      type: "number",
      length: "col-span-full",
      value: mainData?.bedrooms ?? "",
    },
    {
      key: "bathrooms",
      label: "Bathrooms",
      placeholder: "Enter Number of Bathrooms",
      type: "number",
      length: "col-span-full",
      value: mainData?.bathrooms ?? "",
    },
    {
      key: "price",
      label: "Price",
      placeholder: "Enter Price",
      type: "number",
      length: "col-span-full",
      value: mainData?.price ?? "",
    },
    {
      key: "location",
      label: "Location",
      placeholder: "Enter Location",
      type: "text",
      length: "col-span-full",
      value: mainData?.location ?? "",
    },
    {
      key: "nearbyHospitals",
      label: "Nearby Hospitals",
      placeholder: "Enter Nearby Hospitals",
      type: "text",
      length: "col-span-full",
      value: mainData?.nearbyHospitals ?? "",
    },
    {
      key: "nearbyColleges",
      label: "Nearby Colleges",
      placeholder: "Enter Nearby Colleges",
      type: "text",
      length: "col-span-full",
      value: mainData?.nearbyColleges ?? "",
    }
  ];
  

  const handleInputonChange = (key, value) => {
    console.log("key", key, "value", value);

    let newMainData = { ...mainData };
    newMainData[key] = value;
    setMainData(newMainData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    console.log("mainData", mainData);
  
    let payload = {
      title: mainData?.title,
      description: mainData?.description,
      area: mainData?.area,
      bedrooms: mainData?.bedrooms,
      bathrooms: mainData?.bathrooms,
      price: mainData?.price,
      location: mainData?.location,
      nearbyHospitals: mainData?.nearbyHospitals,
      nearbyColleges: mainData?.nearbyColleges,
    };
  
    console.log("payload", payload);

    let resp = await add_property(payload);
    
    if (resp == "Property posted") {
      toast?.success(resp);
      navigate("/seller/my-listings");
    }
  };

  return (
    <div>
      <div className='text-xl font-bold'> Add Property</div>

      <form onSubmit={handleFormSubmit} className="h-full ">

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 p-3 px-6 pb-20">
            <AddForm
              data={formFields}
              handleInputonChange={handleInputonChange}
            />
          </div>

          <div className="fixed bottom-0 right-5 w-fit p-3 bg-white bg-opacity-50 rounded-b-xl">
            <Button
              type="submit"
              variant="contained"
              className="!rounded-full !normal-case w-full !max-w-xs !text-base"
            >
              Save
            </Button>
          </div>
        </form>
    </div>
  )
}
