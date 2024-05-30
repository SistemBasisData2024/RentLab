import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserSidebar from './UserSidebar.jsx'

const DashboardUser = () => {

  const navigate = useNavigate()

  // base UrL
  const baseUrl = "http://localhost:8463"

  // location state
  const location = useLocation()
  const currentUserNPM = location.state.npm

  // labs and items state
  const [labs, setLabs] = useState([])
  const [items, setItems] = useState([])
  const [selectedLab, setSelectedLab] = useState("")


  const fetchLabs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/lab/getAll`)
      if (response) {
        setLabs(response.data)
        console.log("Response Labs -->", response.data)
      } else {
        alert("Failed to fetch labs data")
      }
    } catch (error) {
      console.error("Error fetching labs: ", error)
    }
  }

  const fetchItems = async (labId) => {
    try {
      const response = await axios.get(`${baseUrl}/barang/getBarang/${labId}`)
      if (response && response.data) {
        setItems(response.data)
        console.log("Response Items -->", response.data)
      } else {
        alert("Failed to fetch items data")
      }
    } catch (error) {
      console.error("Error fetching items: ", error)
    }
  }

  useEffect(() => {
    fetchLabs()
  }, [currentUserNPM])

  useEffect(() => {
    if (selectedLab) {
      fetchItems(selectedLab)
    }
  }, [selectedLab])

  const handleLabChange = (event) => {
    setSelectedLab(event.target.value)
  }

  const handleChooseItem = (itemId) => {
    navigate(`/user/createPinjam/${itemId}`, {
      state: {
        npm: currentUserNPM
      }
    })
  }

  return (
    <>
      <UserSidebar 
        userNPM={currentUserNPM}
      />

      <div className="container mx-auto px-10 mt-5">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedLab ? 
            items.map((item) => (
              <div key={item.id} className="border border-gray-300 rounded-lg p-4">
                <img
                  src={item.image_url}
                  alt={item.nama}
                  className="w-full h-40 object-cover mb-4"
                />
                <div className='w-full h-fit flex flex-col justify-between gap-2'>
                  <div>
                    <h2 className="text-xl font-semibold">{item.nama}</h2>
                    <p className="text-gray-700">Availability: {item.jumlah_ketersediaan}</p>
                  </div>
                  <button className='flex justify-center items-center bg-blue-500 text-white rounded-sm hover:bg-blue-600 duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg'
                  onClick={() => handleChooseItem(item.id)}>Loan Item</button>
                </div>
              </div>
            ))
            :
            <p className=''>Choose Laboratorium to view items</p>
            }
        </div>
      </div>
    </>

  )
}

export default DashboardUser
