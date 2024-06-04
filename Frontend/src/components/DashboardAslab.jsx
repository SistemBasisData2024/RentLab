import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import icon_add from '../assets/dashboard-aslab/add.png'
import icon_lists from '../assets/dashboard-aslab/clipboard.png'

import '../assets/dashboard-aslab/style.css'

const DashboardAslab = () => {
  const navigate = useNavigate();

  // base URL
  const baseUrl = "http://localhost:8463";

  // location state
  const location = useLocation();
  const currentAslabNPM = location.state.npm;
  console.log("current aslab in dashboard : ", currentAslabNPM);

  // items state
  const [items, setItems] = useState([]);

  const fetchItems = async (labId) => {
    try {
      const response = await axios.get(`${baseUrl}/barang/getBarang/${labId}`);
      if (response && response.data) {
        setItems(response.data);
        console.log("Response Items -->", response.data);
      } else {
        alert("Failed to fetch items data");
      }
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  useEffect(() => {
    const fetchLabIdAndItems = async () => {
      try {
        const response = await axios.get(`${baseUrl}/aslab/getAslabById/${currentAslabNPM}`);
        const lab_id = response.data[0].lab_id;
        fetchItems(lab_id);
      } catch (error) {
        console.error("Error fetching lab id and items: ", error);
      }
    };

    fetchLabIdAndItems();
  }, [currentAslabNPM]);

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`${baseUrl}/pinjam/deleteByBarangId/${itemId}`);
      await axios.delete(`${baseUrl}/barang/deleteBarang/${itemId}`);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  const handleEditItem = (itemId) => {
    navigate(`/aslab/editBarang/${itemId}`);
  };

  const handleTambahBarang = async () => {
    try {
      const response = await axios.get(`${baseUrl}/aslab/getAslabById/${currentAslabNPM}`);
      const lab_id = response.data[0].lab_id;
      navigate(`/aslab/createBarang`, { 
        state: { 
          lab_id: lab_id, 
          npm: currentAslabNPM
        } 
      });
    } catch (error) {
      console.error("Error fetching lab id: ", error);
    }
  };

  const handleListPinjam = async () => {
    try {
      const response = await axios.get(`${baseUrl}/aslab/getAslabById/${currentAslabNPM}`);
      const lab_id = response.data[0].lab_id;
      const url = "/aslab/listPinjam/" + lab_id;
      navigate(url, { 
        state: { npm: currentAslabNPM } 
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-20 mt-5">
      <h1 className="text-3xl font-semibold mb-8 text-center">Manage Laboratory Items</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="w-full flex gap-4 justify-end items-center">
          <button className={`bg-green-500 flex gap-1 items-center text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400`} onClick={handleTambahBarang}>
            <p>Add Item</p>
            <img src={icon_add} className="w-4  mt-1" />
          </button>
          <button className="bg-blue-500 flex gap-1 items-center text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleListPinjam}>
            <p>Comfirmation List</p>
            <img src={icon_lists} className="w-4 " />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="relative shadow-md rounded-lg">
              <div className="card-item relative w-full overflow-hidden rounded-t-lg "
              onClick={() => handleEditItem(item.id)}
              >
                <img src={item.image_url} alt={item.nama} className="card-image w-full h-40 object-cover hover:scale-150 hover:rotate-12 duration-200" />
                <div className="slide-cover-image absolute w-full h-full top-0 pt-96 hover:pt-0 duration-300 ease-linear cursor-pointer">
                  <div className="flex justify-center items-center bg-gradient-to-t from-yellow-400 to-transparent shadow-yellow-400 bg-opacity-40 h-full  backdrop-blur-sm">
                  <p className="text-white text-xl text-center">Edit this Item</p>
                  </div>
                </div>
              </div>
             
              <div className="w-full h-fit p-4 flex flex-col justify-between gap-2">
                <h2 className="text-xl font-semibold">{item.nama}</h2>
                <div className="flex gap-2 justify-between">
                <p className="text-gray-700">Availability: {item.jumlah_ketersediaan}</p>
                  <button className="ring-2 ring-red-500 text-red-500 px-4 py-1 rounded-md hover:bg-red-400 hover:text-white duration-150 focus:outline-none focus:ring-2 focus:ring-red-400" onClick={() => handleDeleteItem(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="">No items available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAslab;
