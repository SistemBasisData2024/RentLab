import React from 'react'

const About = () => {
  return (
    <div className='container w-full h-full'>
        <div className='w-full flex flex-col justify-center items-center text-white mt-32'>
            <p className='text-5xl font-semibold'>Use RentLab to <span className='text-[#244855]'>loan</span> your needs</p>
            <p className='w-2/3 text-center text-xl mt-5'>
                <span className='text-[#244855] font-bold'>RentLab </span>
                adalah website peminjaman barang yang dirilis untuk kebutuhan <span className='text-[#244855] font-bold'>peminjaman barang</span> laboratorium di Departemen Teknik Elektro. Data yang ada pada <span className='text-[#244855] font-bold'>RentLab</span> berdasarkan data yang diberikan oleh seluruh <span className='text-[#244855] font-bold'>laboratorium DTE</span>  serta barang-barang yang ada didalamnya. Jika ada barang yang tidak ada, artinya memang tidak ada.
            </p>
        </div>
    </div>
  )
}

export default About