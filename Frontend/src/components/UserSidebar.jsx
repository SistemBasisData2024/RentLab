import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserSidebar = ({ userNPM }) => {
  const navigate = useNavigate()

  // sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const menus = [
    {
      name: "Loan Item",
      to: "/user/dashboard"
    },
    {
      name: "History Loan",
      to: `/user/historyPinjam/${userNPM}`
    },
    {
      name: "Log Out",
      to: "/"
    }
  ]
  const movePage = (menuUrl) => {
    navigate(menuUrl, {
      state: {
        npm: userNPM
      }
    })
  }

  return (
    <aside
      id="sidebar"
      className={`bg-[#fbe9d0] text-lg fixed top-40 h-fit px-2 py-10 flex flex-col justify-between z-20 border-gray-200 border-r-4 ease-in-out duration-500  rounded-r-3xl ${
        isSidebarOpen ? "left-0" : "-left-28"
      } `}
    >
      <div
        onClick={toggleSideBar}
        className="absolute top-20 rounded-l- h-fit -right-10 p-1 rounded-r-md bg-[#fbe9d4] border-gray-200 border-4 border-l-0 cursor-pointer bg-transparent"
      >
        <svg
          stroke="currentColor"
          fill="#244855"
          strokeWidth="0"
          viewBox="0 0 20 20"
          aria-hidden="true"
          height="2rem"
          width="2rem"
          xmlns="http://www.w3.org/2000/svg"
          className={`ease-in-out duration-300 ${
            isSidebarOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      
      {/* <div className='relative flex flex-col gap-2 h-full'>
        {menus.map((menu, i) => (
          <div
            key={i}
            className={`w-40 p-2 text-center rounded-sm cursor-pointer duration-200 hover:text-white ${
              menu.name === "Log Out"
                ? "absolute bottom-0 bg-[#E64833] text-white hover:bg-[#874F41]"
                : "bg-[#90AEAD] hover:bg-[#244855]"
            }`}
            onClick={() => movePage(menu.to)}
          >
            <p className='text-sm'>{menu.name}</p>
          </div>
        ))}
      </div> */}

      <div className='relative flex flex-col justify-center gap-2 h-full'>
        {menus.map((menu, i) => (
          <div
            key={i}
            className={`w-30 p-2 mr-5 text-center rounded-sm cursor-pointer duration-200 hover:text-white rounded-r-full hover:pl-16 ${
              menu.name === "Log Out"
                ? "bg-[#90AEAD] hover:bg-[#E64833]"
                : "bg-[#90AEAD] hover:bg-[#244855]"
            }`}
            onClick={() => movePage(menu.to)}
          >
            <p className='text-sm'>{menu.name}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default UserSidebar

