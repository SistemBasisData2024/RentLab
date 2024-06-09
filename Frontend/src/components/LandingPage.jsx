import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import logo from "../assets/dashboard.png"; 

// Import Swiper styles
import "swiper/css";
import { Link } from 'react-router-dom';

import { Cursor, useTypewriter } from 'react-simple-typewriter';

const LandingPage = () => {

  const labs = [
    {
      name: "Network Laboratory",
      location: "MRPQ Lt. 3"
    },
    {
      name: "Digital Laboratory",
      location: "Gedung DTE Lt. 3"
    },
    {
      name: "TTPL",
      location: "Gedung DTE Lt. 2"
    }
  ]

  const [text] = useTypewriter({
    words: ["Anywhere", "Anytime"],
    loop: {}
  })

  return (
    <div className='container w-full h-full'>
      <div className="w-full h-screen flex flex-row justify-center items-center p-4" style={{ backgroundColor: "#90AEAD" }}>
        <div className='h-fit w-3/5 flex flex-col text-white px-20 gap-2'>
          <p className='text-5xl font-semibold text-white mb-10'>
            Rent whatever you need {' '}
            <span className='text-[#244855]'>{text}</span>
            <span><Cursor cursorStyle='|' /></span>
          </p>
          <p className='text-xl '>A website used for borrowing items from the laboratories at FTUI. Created by Group 11 - Final Project for the Database Systems course.</p>
          <Link to='/authentication' className='w-fit bg-[#E64833] text-white py-2 px-6 rounded-md hover:bg-[#874F41] transition-colors duration-200 inline-block mt-4'>Get Started</Link>
          <p className='italic'>Less is more. Borrow what you need and live clutter-free</p>
        </div>
        <div className='h-fit w-2/5'>
          <img src={logo} alt="" />
        </div>
      </div>
      <Swiper className="mySwiper">
        {

        }
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>

      </Swiper>
    </div>
  )
}

export default LandingPage