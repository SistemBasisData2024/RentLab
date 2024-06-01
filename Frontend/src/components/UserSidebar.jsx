import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserSidebar = ({userNPM}) => {
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
        className={`bg-slate-100 text-lg fixed top-0 h-full px-2 py-16 flex flex-col justify-between z-20 border-grey-2 border-r-2 ease-in-out duration-500 ${
            isSidebarOpen ? "left-0" : "-left-44"
        } `}
        >
            <div
            onClick={toggleSideBar}
            className="absolute top-4 -right-10 p-1 rounded-r-md border-grey-2 border-2 border-l-0 cursor-pointer"
            >
            <svg
                stroke="currentColor"
                fill="#3b82f6"
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
            
            <div className='flex flex-col gap-2'>
                {
                menus.map((menu, i) => (
                    <div key={i} className='bg-slate-200 w-40 p-2 text-center rounded-sm hover:bg-blue-600 cursor-pointer duration-150 hover:text-white' onClick={() => movePage(menu.to)}>
                    <p className='text-sm'>{menu.name}</p>
                    </div>
                ))
                }
            </div>
        </aside>
  )
}

export default UserSidebar