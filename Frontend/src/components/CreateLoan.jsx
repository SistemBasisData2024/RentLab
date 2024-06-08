import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateLoan = () => {
  // navigate and location state
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserNPM = location.state.npm;

  const { barangId } = useParams();
  const [formData, setFormData] = useState({
    user_npm: currentUserNPM,
    barang_id: barangId,
    jumlah_barang: "",
    alasan_kebutuhan: "",
    jangka_waktu: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get("http://localhost:8463/lab/getAll");
        // setLabs(response.data); // Tidak digunakan dalam komponen ini
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

      if (response.status) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Error creating loan: ", error);
      setMessage("Internal Server Error");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "#90AEAD" }}>
      <div className="p-8 rounded shadow-md w-full max-w-md" style={{ backgroundColor: "#FBE9D0" }}>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#244855" }}>Create Loan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="jumlah_barang" style={{ color: "#874F41" }}>
              Jumlah Barang
            </label>
            <input type="number" id="jumlah_barang" name="jumlah_barang" value={formData.jumlah_barang} onChange={handleChange} className="w-full p-2 border-2 rounded" style={{ borderColor: "#E64833", color: "#244855" }} required />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="alasan_kebutuhan" style={{ color: "#874F41" }}>
              Alasan Kebutuhan
            </label>
            <textarea id="alasan_kebutuhan" name="alasan_kebutuhan" value={formData.alasan_kebutuhan} onChange={handleChange} className="w-full p-2 border-2 rounded" style={{ borderColor: "#E64833", color: "#244855" }} required />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="jangka_waktu" style={{ color: "#874F41" }}>
              Jangka Waktu (hari)
            </label>
            <input type="number" id="jangka_waktu" name="jangka_waktu" value={formData.jangka_waktu} onChange={handleChange} className="w-full p-2 border-2 rounded" style={{ borderColor: "#E64833", color: "#244855" }} required />
          </div>

          {message && <p className="my-6 text-center" style={{ color: "#874F41" }}>{message}</p>}
          <button type="submit" disabled={submitting} className="w-full py-2 rounded hover:bg-blue-600" style={{ backgroundColor: "#244855", color: "#FBE9D0" }}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLoan;
