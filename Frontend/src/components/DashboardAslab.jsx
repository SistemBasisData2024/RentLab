import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import icon_add from '../assets/dashboard-aslab/add.png'
import icon_lists from '../assets/dashboard-aslab/clipboard.png'
import icon_logout from '../assets/dashboard-aslab/logout.png'

import '../assets/dashboard-aslab/style.css'

const DashboardAslab = () => {
  const navigate = useNavigate();

  // sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // base URL
  const baseUrl = "http://localhost:8463";

  // location state
  const location = useLocation();
  const currentAslabNPM = location.state.npm;
  console.log("current aslab in dashboard : ", currentAslabNPM);

  // items state
  const [items, setItems] = useState([]);

  // lab state
  const [labId, setLabId] = useState('');

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

        setLabId(lab_id)
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
    navigate(`/aslab/editBarang/${itemId}`, { 
      state: { 
        lab_id: labId,
        npm: currentAslabNPM
      } 
    });
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

  const [hovered, setHovered] = useState(false)

  const movePage = (menuUrl) => {
    navigate(menuUrl, {
      state: {
        
      }
    })
  }

  return (
    <>

    {/* Log Out Side Bar */}
    <aside
      id="sidebar"
      className={`bg-[#fbe9d0] text-lg fixed top-24 h-fit px-2 py-3 flex flex-col justify-between z-20 border-gray-200 border-l-4 ease-in-out duration-500  rounded-l-full ${
        hovered ? "right-0" : "-right-24"
      } `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <div className='relative flex flex-col justify-center gap-2 h-full'>
          <div
            className={`flex gap-4 justify-center items-center w-30 p-1 mr-5 text-center rounded-sm cursor-pointer duration-200 hover:text-white rounded-r-full  $bg-[#90AEAD] hover:bg-[#E64833]"
            }`}
            onClick={() => movePage("/")}
          >
            <img src={icon_logout} alt="" className="w-5 h-5 rotate-180" />
            <p className='text-md font-semibold text-[#E64833]'>Log Out</p>
          </div>
      </div>
    </aside>

    <div className="container h-full mx-auto px-4 lg:px-20" style={{ backgroundColor: "#90AEAD" }}>
      <h1 className="text-4xl font-semibold py-8 text-center" style={{ color: "#244855" }}>Manage Laboratory Items</h1>
      <div className="mb-4 flex justify-between items-center">
        <div className="w-full flex gap-4 justify-end items-center">
          <button className="flex gap-1 items-center text-white px-4 py-2 rounded-md bg-[#E64833] hover:bg-[#244855] duration-200 focus:outline-none focus:ring-2 focus:ring-green-400" 
            // style={{ backgroundColor: "#E64833" }} 
            onClick={handleTambahBarang}>
            <p>Add Item</p>
            <img src={icon_add} className="w-4 mt-1" />
          </button>
          <button className="flex gap-1 items-center text-white px-4 py-2 rounded-md bg-[#E64833] hover:bg-[#244855] duration-200  focus:outline-none focus:ring-2 focus:ring-blue-400" 
            // style={{ backgroundColor: "#E64833" }} 
            onClick={handleListPinjam}>
            <p>Confirmation List</p>
            <img src={icon_lists} className="w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="bg-[#e4e5e6] border-2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300" style={{ borderColor: "#E64833" }}>
              <div className="card-item relative w-full overflow-hidden rounded-t-lg" onClick={() => handleEditItem(item.id)}>
                <img src={item.image_url} alt={item.nama} className="card-image w-full h-40 object-cover hover:scale-110 transition-transform duration-200" />
                <div className="slide-cover-image absolute w-full h-full top-0 flex justify-center items-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <p className="text-xl">Edit this Item</p>
                </div>
              </div>
              <div className="w-full h-fit p-4 flex flex-col justify-between gap-2">
                <h2 className="text-xl font-semibold" style={{ color: "#244855" }}>{item.nama}</h2>
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
          <p className="text-center" style={{ color: "#874F41" }}>No items available</p>
        )}
      </div>
    </div>
    </>

  );
};

export default DashboardAslab;
