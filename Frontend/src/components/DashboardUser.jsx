import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserSidebar from './UserSidebar.jsx'

import { ToastContainer, toast } from "react-toastify";
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
        console.log("Response Labs -->", response.data);
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
        console.log("Response Items -->", response.data);
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
        transition: Bounce
      />
      <UserSidebar 
        userNPM={currentUserNPM}
      />

      <div className="w-full flex flex-col px-10 mt-5">
        <h1 className="text-3xl font-semibold mb-8 text-center">Loan Anything You Need</h1>
        <div className="mb-4 flex justify-between items-center mx-10">
          <div>
            <label htmlFor="labSelect" className="mr-2">
              Pilih Lab:
            </label>
            <select
              id="labSelect"
              value={selectedLab}
              onChange={handleLabChange}
              className="border border-gray-300 rounded px-2 py-1"
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
              <div key={item.id} className="border border-gray-300 rounded-lg">
                <div className="card-item relative w-full overflow-hidden rounded-t-lg "
                onClick={() => handleChooseItem(item.id)}
                >
                  <img src={item.image_url} alt={item.nama} className="card-image w-full h-40 object-cover hover:scale-150 hover:rotate-12 duration-200" />
                  <div className="slide-cover-image absolute w-full h-full top-0 pt-96 hover:pt-0 duration-300 ease-linear cursor-pointer">
                    <div className="flex justify-center items-center bg-gradient-to-t from-purple-700 to-transparent shadow-yellow-400 bg-opacity-40 h-full  backdrop-blur-sm">
                    <p className="text-white text-xl text-center w-3/4">Loan this Item</p>
                    </div>
                  </div>
                </div>
                <div className='w-full h-fit flex flex-col justify-between gap-2 p-4'>
                  <div>
                    <h2 className="text-xl font-semibold">{item.nama}</h2>
                    <p className="text-gray-700">Availability: {item.jumlah_ketersediaan}</p>
                  </div>
                  <button className='flex justify-center items-center p-1 bg-purple-700 text-white rounded-md hover:bg-purple-800 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg'
                  onClick={() => handleChooseItem(item.id)}>Loan Item</button>
                </div>
              </div>
            ))
            :
              <p className='text-center'>Choose Laboratorium to view items</p>
            }
        </div>
      </div>
    </>

  )
}

export default DashboardUser;
