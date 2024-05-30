import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/dashboard.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full">
        <img src={logo} alt="Logo RentLab" className="mx-auto w-60 h-30 object-cover" />
        <p className="text-gray-600 mb-10">Web yang digunakan untuk melakukan peminjaman barang dari laboratorium yang ada di FTUI. Dibuat oleh Kelompok 11 - Proyek Akhir Sistem Basis Data.</p>
        <div className="flex flex-col space-y-3">
          <Link to="/user/login" className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200">
            Login User
          </Link>
          <Link to="/user/signup" className="bg-purple-400 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200">
            Sign Up User
          </Link>
          <Link to="/aslab/login" className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200">
            Login Aslab
          </Link>
          <Link to="/aslab/signup" className="bg-purple-400 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200">
            Sign Up Aslab
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
