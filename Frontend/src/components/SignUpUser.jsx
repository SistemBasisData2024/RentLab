import React, { useState } from "react";
import axios from "axios";

const SignUpUser = () => {
  const [npm, setNpm] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8463/user/signup", {
        npm,
        nama,
        jurusan,
        password,
      });
      setMessage(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="npm">
              NPM
            </label>
            <input type="text" id="npm" className="w-full p-2 border border-gray-300 rounded" value={npm} onChange={(e) => setNpm(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="nama">
              Nama
            </label>
            <input type="text" id="nama" className="w-full p-2 border border-gray-300 rounded" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="jurusan">
              Jurusan
            </label>
            <input type="text" id="jurusan" className="w-full p-2 border border-gray-300 rounded" value={jurusan} onChange={(e) => setJurusan(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {message && <p className="mb-4 text-center text-black-500">{message}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpUser;