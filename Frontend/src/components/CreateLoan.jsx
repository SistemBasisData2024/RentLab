import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateLoan = () => {
  const { barangId } = useParams();
  const [formData, setFormData] = useState({
    user_npm: "",
    barang_id: barangId,
    jumlah_barang: "",
    alasan_kebutuhan: "",
    jangka_waktu: "",
    lab_id: "",
  });
  const [labs, setLabs] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get("http://localhost:8463/lab/getAll");
        setLabs(response.data);
      } catch (error) {
        console.error("Error fetching labs: ", error);
      }
    };

    fetchLabs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8463/pinjam/addPinjam", formData);
      setMessage(response.data);
      setSubmitting(false);
    } catch (error) {
      console.error("Error creating loan: ", error);
      setMessage("Internal Server Error");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Loan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="user_npm">
              User NPM
            </label>
            <input type="text" id="user_npm" name="user_npm" value={formData.user_npm} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="jumlah_barang">
              Jumlah Barang
            </label>
            <input type="number" id="jumlah_barang" name="jumlah_barang" value={formData.jumlah_barang} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="alasan_kebutuhan">
              Alasan Kebutuhan
            </label>
            <textarea id="alasan_kebutuhan" name="alasan_kebutuhan" value={formData.alasan_kebutuhan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="jangka_waktu">
              Jangka Waktu (hari)
            </label>
            <input type="number" id="jangka_waktu" name="jangka_waktu" value={formData.jangka_waktu} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="lab_id">
              Lab
            </label>
            <select id="lab_id" name="lab_id" value={formData.lab_id} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required>
              <option value="">Select Lab</option>
              {labs.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.nama} - {lab.lokasi}
                </option>
              ))}
            </select>
          </div>
          {message && <p className="my-6 text-center text-black-500">{message}</p>}
          <button type="submit" disabled={submitting} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLoan;
