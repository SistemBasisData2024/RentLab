import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpAslab = () => {
  const [npm, setNpm] = useState("");
  const [nama, setNama] = useState("");
  const [labId, setLabId] = useState("");
  const [password, setPassword] = useState("");
  const [labs, setLabs] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get("http://localhost:8463/lab/getAll");
        setLabs(response.data);
      } catch (error) {
        console.error("Error fetching labs:", error);
      }
    };

    fetchLabs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8463/aslab/signup", {
        npm,
        nama,
        lab_id: labId,
        password,
      });
      setMessage(response.data);

      if (response.status) {
        navigate("/aslab/login")
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setMessage("Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up Aslab</h2>
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
            <label className="block text-gray-700 mb-2" htmlFor="labId">
              Lab
            </label>
            <select id="labId" className="w-full p-2 border border-gray-300 rounded" value={labId} onChange={(e) => setLabId(e.target.value)} required>
              <option value="" disabled>
                Pilih Lab
              </option>
              {labs.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {message && <p className="mb-4 text-center text-red-500">{message}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpAslab;
