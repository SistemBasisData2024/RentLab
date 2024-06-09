import React from 'react'

import instagram from '../assets/instagram.png'
import email from '../assets/mail.png'
import whatsapp from '../assets/whatsapp.png'

const Contact = () => {
  return (
    <div className='container w-full h-screen'>
        <div className='w-full h-fit mt-20'>
            <p className='text-6xl text-center text-white font-semibold'>Contact Us</p>
        </div>
        <div className='w-full h-screen bg-[#FBE9D0] mt-10 pt-10 flex flex-col items-center'>
            <p className='w-2/3 text-center text-[#244855] text-xl'>Kami memastikan akan selalu memberikan pengalaman terbaik untuk para mahasiswa dalam melakukan <span className='font-bold'>peminjaman barang</span>. Setiap laboratorium menyediakan seluruh kebutuhan praktikum. Hubungi kontak di bawah ini jika ingin berdiskusi sesuatu atau mengalami <span className='font-bold'>kendala</span> saat peminjaman barang.</p>

            <div className='w-3/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center mt-10'>
                <div className='flex flex-col items-center text-[#244855] gap-4'>
                    <p className='text-3xl font-semibold'>Instagram</p>
                    <img src={instagram} alt="" />
                    <a href="www.instagram.com" className='text-lg font-semibold'>@rentlabftui</a>
                </div>
                <div className='flex flex-col items-center text-[#244855] gap-4'>
                    <p className='text-3xl font-semibold'>Email</p>
                    <img src={email} alt="" />
                    <a href="https://mail.google.com/" className='text-lg font-semibold'>rentlabftui@gmail.com</a>
                </div>
                <div className='flex flex-col items-center text-[#244855] gap-4'>
                    <p className='text-3xl font-semibold'>Whatsapp</p>
                    <img src={whatsapp} alt="" />
                    <div className='flex flex-col justify-center items-center'>
                        <a href="https://wa.me/082130227727" className='text-lg font-semibold'>082130227727 (Harris)</a>
                        <a href="https://wa.me/" className='text-lg font-semibold'>081234567891 (Ruqi)</a>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact