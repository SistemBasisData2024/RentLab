import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/dashboard.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4" style={{ backgroundColor: "#90AEAD" }}>
      <div className="bg-[#FBE9D0] p-6 rounded-lg shadow-md text-center max-w-md w-full">
        <img src={logo} alt="Logo RentLab" className="mx-auto w-60 h-30 object-cover" />
        <p className="mb-10" style={{ color: "#244855" }}>
          Web yang digunakan untuk melakukan peminjaman barang dari laboratorium yang ada di FTUI. Dibuat oleh Kelompok 11 - Proyek Akhir Sistem Basis Data.
        </p>
        <div className="flex flex-col space-y-3">
          <Link to="/user/login" className="py-2 px-4 rounded-md hover:bg-[#244855] transition-colors duration-200" style={{ backgroundColor: "#E64833", color: "#FBE9D0" }}>
            Login User
          </Link>
          <p className="text-sm" style={{ color: "#874F41" }}>or you are a laboratory assistant?</p>
          <Link to="/aslab/login" className="py-2 px-4 rounded-md hover:bg-[#244855] transition-colors duration-200" style={{ backgroundColor: "#874F41", color: "#FBE9D0" }}>
            Login Aslab
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
