import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardAslab = () => {
  const navigate = useNavigate();

  // base URL
  const baseUrl = "http://localhost:8463";

  // location state
  const location = useLocation();
  const currentAslabNPM = location.state.npm;

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
      navigate(`/aslab/createBarang`, { state: { lab_id } });
    } catch (error) {
      console.error("Error fetching lab id: ", error);
    }
  };

  const handleListPinjam = async () => {
    try {
      const response = await axios.get(`${baseUrl}/aslab/getAslabById/${currentAslabNPM}`);
      const lab_id = response.data[0].lab_id;
      const url = "/aslab/listPinjam/" + lab_id;
      navigate(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-5">
      <h1 className="text-3xl font-semibold mb-8 text-center">Manage Laboratory Items</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" onClick={handleTambahBarang}>
            Tambah Barang
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleListPinjam}>
            List Pinjam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="border border-gray-300 rounded-lg p-4">
              <img src={item.image_url} alt={item.nama} className="w-full h-40 object-cover mb-4" />
              <div className="w-full h-fit flex flex-col justify-between gap-2">
                <div>
                  <h2 className="text-xl font-semibold">{item.nama}</h2>
                  <p className="text-gray-700">Availability: {item.jumlah_ketersediaan}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" onClick={() => handleDeleteItem(item.id)}>
                    Delete
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400" onClick={() => handleEditItem(item.id)}>
                    Edit
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
