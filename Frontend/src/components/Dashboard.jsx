import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4">RentLab</h1>
        <p className="text-gray-700 mb-8">Sebuah web yang digunakan untuk melakukan peminjaman barang dari laboratorium yang ada di FTUI. Dibuat oleh Kelompok 11 - Proyek Akhir Sistem Basis Data.</p>
        <div className="flex flex-col space-y-4">
          <a href="http://localhost:5173/user/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block text-center">
            Login User
          </a>
          <a href="http://localhost:5173/user/signup" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 inline-block text-center">
            Sign Up User
          </a>
          <a href="http://localhost:5173/aslab/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block text-center">
            Login Aslab
          </a>
          <a href="http://localhost:5173/aslab/signup" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 inline-block text-center">
            Sign Up Aslab
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
