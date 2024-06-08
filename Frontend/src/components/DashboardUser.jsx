import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserSidebar from './UserSidebar.jsx'

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import '../assets/dashboard-aslab/style.css'

const DashboardUser = () => {
  const navigate = useNavigate();

  // base UrL
  const baseUrl = "http://localhost:8463";

  // location state
  const location = useLocation();
  const currentUserNPM = location.state.npm;

  // current user state
  const [currentUser, setCurrentUser] = useState({
    npm: "",
    nama: "",
    jurusan: "",
    password: ""
  })
  const [isUserExist, setIsUserExist] = useState(false)

  // labs and items state
  const [labs, setLabs] = useState([])
  const [items, setItems] = useState([])
  const [selectedLab, setSelectedLab] = useState("")

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/getUserById/${currentUserNPM}`)

      if (response.status) {
        setCurrentUser(response.data)
        setIsUserExist(true)
      }
    } catch (error) {
      alert("Failed to get user data");
    }
  }

  const fetchLabs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/lab/getAll`);
      if (response) {
        setLabs(response.data);
      } else {
        alert("Failed to fetch labs data");
      }
    } catch (error) {
      console.error("Error fetching labs: ", error);
    }
  };

  const fetchItems = async (labId) => {
    try {
      const response = await axios.get(`${baseUrl}/barang/getBarang/${labId}`);
      if (response && response.data) {
        setItems(response.data);
      } else {
        alert("Failed to fetch items data");
      }
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  // toast state
  const notify = () => {
    toast(`Welcome, ${currentUserNPM}!`);
  }

  useEffect(() => {
    getCurrentUser()
    fetchLabs()

    notify()
  }, [currentUserNPM])

  useEffect(() => {
    if (selectedLab) {
      fetchItems(selectedLab);
    }
  }, [selectedLab]);

  const handleLabChange = (event) => {
    setSelectedLab(event.target.value);
  };

  const handleChooseItem = (itemId) => {
    navigate(`/user/createPinjam/${itemId}`, {
      state: {
        npm: currentUserNPM,
      },
    });
  };

  const handleHistoryClick = () => {
    navigate(`/user/historyPinjam/${currentUserNPM}`);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
      <UserSidebar 
        userNPM={currentUserNPM}
      />

      <div className="w-full h-full flex flex-col px-4 md:px-10" style={{ backgroundColor: "#90AEAD" }}>
        <h1 className="text-4xl font-semibold mb-8 text-center my-10" style={{ color: "#244855" }}>Loan Anything You Need</h1>
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center mx-2 md:mx-10">
          <div className="mb-4 md:mb-0">
            <label htmlFor="labSelect" className="mr-2" style={{ color: "#874F41" }}>
              Pilih Lab:
            </label>
            <select
              id="labSelect"
              value={selectedLab}
              onChange={handleLabChange}
              className="border-2 rounded px-2 py-1"
              style={{ borderColor: "#E64833", color: "#244855" }}
            >
              <option value="">Pilih lab</option>
              {labs.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.nama}
                </option>
              ))}
            </select>
          </div>
        
        </div>

        <div className={`${selectedLab ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex justify-center"}`}>
          {selectedLab ? 
            items.map((item) => (
              <div key={item.id} className="bg-[#e4e5e6] border-2 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300" style={{ 
                borderColor: "#E64833",
                }}>
                <div className="card-item relative w-full overflow-hidden rounded-t-lg"
                  onClick={() => handleChooseItem(item.id)}
                >
                  <img src={item.image_url} alt={item.nama} className="card-image w-full h-40 object-cover hover:scale-110 transition-transform duration-200" />
                  <div className="slide-cover-image absolute w-full h-full top-0 flex justify-center items-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <p className="text-xl">Loan this Item</p>
                  </div>
                </div>
                <div className='w-full h-fit flex flex-col justify-between gap-2 p-4'>
                  <div>
                    <h2 className="text-xl font-semibold" style={{ color: "#244855" }}>{item.nama}</h2>
                    <p className="text-gray-700">Availability: {item.jumlah_ketersediaan}</p>
                  </div>
                  <button className='flex justify-center items-center p-2 text-white rounded-md hover:bg-purple-800 transition-colors duration-200'
                    style={{ backgroundColor: "#874F41" }}
                    onClick={() => handleChooseItem(item.id)}>Loan Item</button>
                </div>
              </div>
            ))
            :
            <p className='text-center' style={{ color: "#874F41" }}>Choose Laboratory to view items</p>
          }
        </div>
      </div>
    </>
  )
}

export default DashboardUser;
