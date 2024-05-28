import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateBarangForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    lab_id: "",
    jumlah_ketersediaan: "",
    image_url: "",
  });

  const [labs, setLabs] = useState([]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8463/barang/addBarang", formData);
      if (response.status === 201) {
        alert("Sukses menambah barang");
        setFormData({
          nama: "",
          lab_id: "",
          jumlah_ketersediaan: "",
          image_url: "",
        });
      } else {
        alert("Gagal menambah barang");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Tambah Barang</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nama</label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Lab</label>
          <select name="lab_id" value={formData.lab_id} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required>
            <option value="" disabled>
              Pilih Lab
            </option>
            {labs.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.nama} - {lab.lokasi}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Jumlah Ketersediaan</label>
          <input type="number" name="jumlah_ketersediaan" value={formData.jumlah_ketersediaan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image URL</label>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Tambah Barang
        </button>
      </form>
    </div>
  );
};

export default CreateBarangForm;
